import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { create, verify, getNumericDate } from "https://deno.land/x/djwt@v3.0.1/mod.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.78.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const JWT_SECRET = Deno.env.get('JWT_SECRET') || 'default-secret-change-in-production';

// Rate limiting configuration
const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION_MINUTES = 15;
const ATTEMPT_WINDOW_MINUTES = 15;

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function generateJWT(): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(JWT_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );

  const jwt = await create(
    { alg: "HS256", typ: "JWT" },
    { 
      exp: getNumericDate(60 * 60 * 24), // 24 hours
      iat: getNumericDate(0),
      portfolio_access: true,
    },
    key
  );

  return jwt;
}

async function verifyJWT(token: string): Promise<boolean> {
  try {
    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(JWT_SECRET),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign", "verify"]
    );

    const payload = await verify(token, key);
    return payload.portfolio_access === true;
  } catch {
    return false;
  }
}

function getClientIP(req: Request): string {
  // Try to get real IP from common headers
  const forwardedFor = req.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  
  const realIP = req.headers.get('x-real-ip');
  if (realIP) {
    return realIP;
  }
  
  return 'unknown';
}

async function checkRateLimit(ipAddress: string): Promise<{ allowed: boolean; remainingAttempts?: number; lockedUntil?: string }> {
  // Check if IP is currently locked
  const { data: existing } = await supabase
    .from('password_attempts')
    .select('*')
    .eq('ip_address', ipAddress)
    .single();

  const now = new Date();

  if (existing) {
    // Check if locked
    if (existing.locked_until && new Date(existing.locked_until) > now) {
      return { 
        allowed: false, 
        lockedUntil: existing.locked_until 
      };
    }

    // Check if attempts are within the time window
    const lastAttempt = new Date(existing.last_attempt_at);
    const minutesSinceLastAttempt = (now.getTime() - lastAttempt.getTime()) / (1000 * 60);

    if (minutesSinceLastAttempt > ATTEMPT_WINDOW_MINUTES) {
      // Reset attempts if outside window
      await supabase
        .from('password_attempts')
        .update({
          attempt_count: 1,
          last_attempt_at: now.toISOString(),
          locked_until: null
        })
        .eq('ip_address', ipAddress);
      
      return { allowed: true, remainingAttempts: MAX_ATTEMPTS - 1 };
    }

    // Check if exceeded max attempts
    if (existing.attempt_count >= MAX_ATTEMPTS) {
      const lockedUntil = new Date(now.getTime() + LOCKOUT_DURATION_MINUTES * 60 * 1000);
      
      await supabase
        .from('password_attempts')
        .update({
          locked_until: lockedUntil.toISOString()
        })
        .eq('ip_address', ipAddress);

      console.log(`IP ${ipAddress} locked until ${lockedUntil.toISOString()} after ${existing.attempt_count} attempts`);
      
      return { allowed: false, lockedUntil: lockedUntil.toISOString() };
    }

    return { 
      allowed: true, 
      remainingAttempts: MAX_ATTEMPTS - existing.attempt_count 
    };
  }

  // First attempt from this IP
  await supabase
    .from('password_attempts')
    .insert({
      ip_address: ipAddress,
      attempt_count: 1,
      last_attempt_at: now.toISOString()
    });

  return { allowed: true, remainingAttempts: MAX_ATTEMPTS - 1 };
}

async function recordFailedAttempt(ipAddress: string): Promise<void> {
  const { data: existing } = await supabase
    .from('password_attempts')
    .select('attempt_count')
    .eq('ip_address', ipAddress)
    .single();

  if (existing) {
    await supabase
      .from('password_attempts')
      .update({
        attempt_count: existing.attempt_count + 1,
        last_attempt_at: new Date().toISOString()
      })
      .eq('ip_address', ipAddress);
  }
}

async function resetAttempts(ipAddress: string): Promise<void> {
  await supabase
    .from('password_attempts')
    .delete()
    .eq('ip_address', ipAddress);
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const ipAddress = getClientIP(req);

  try {
    const { password, token } = await req.json();

    // If token is provided, verify it
    if (token) {
      const isValid = await verifyJWT(token);
      return new Response(
        JSON.stringify({ isValid }),
        { 
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Check rate limit before processing password
    const rateLimitCheck = await checkRateLimit(ipAddress);
    
    if (!rateLimitCheck.allowed) {
      console.log(`Rate limit exceeded for IP ${ipAddress}`);
      return new Response(
        JSON.stringify({ 
          error: 'Too many attempts. Please try again later.',
          lockedUntil: rateLimitCheck.lockedUntil 
        }),
        { 
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Validate password input
    if (!password || typeof password !== 'string' || password.length > 100) {
      return new Response(
        JSON.stringify({ error: 'Authentication failed' }),
        { 
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    const correctPassword = Deno.env.get('PORTFOLIO_PASSWORD');

    if (!correctPassword) {
      return new Response(
        JSON.stringify({ error: 'Authentication failed' }),
        { 
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    const isValid = password === correctPassword;

    if (isValid) {
      // Reset attempts on successful authentication
      await resetAttempts(ipAddress);
      
      const token = await generateJWT();
      return new Response(
        JSON.stringify({ isValid: true, token }),
        { 
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Record failed attempt
    await recordFailedAttempt(ipAddress);
    console.log(`Failed password attempt from IP ${ipAddress}`);

    return new Response(
      JSON.stringify({ 
        isValid: false,
        remainingAttempts: rateLimitCheck.remainingAttempts ? rateLimitCheck.remainingAttempts - 1 : undefined
      }),
      { 
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('Error in validate-password function:', error);
    return new Response(
      JSON.stringify({ error: 'Authentication failed' }),
      { 
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});

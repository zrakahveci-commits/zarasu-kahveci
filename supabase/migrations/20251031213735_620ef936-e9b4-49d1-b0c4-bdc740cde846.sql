-- Create table to track password validation attempts for rate limiting
CREATE TABLE IF NOT EXISTS public.password_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_address TEXT NOT NULL,
  attempt_count INTEGER NOT NULL DEFAULT 1,
  last_attempt_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  locked_until TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index for efficient IP lookup
CREATE INDEX IF NOT EXISTS idx_password_attempts_ip ON public.password_attempts(ip_address);

-- Create index for cleanup queries
CREATE INDEX IF NOT EXISTS idx_password_attempts_locked_until ON public.password_attempts(locked_until);

-- Enable RLS (not strictly necessary for this use case since it's accessed via edge function, but good practice)
ALTER TABLE public.password_attempts ENABLE ROW LEVEL SECURITY;

-- Create a function to clean up old attempts (older than 24 hours)
CREATE OR REPLACE FUNCTION public.cleanup_old_password_attempts()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  DELETE FROM public.password_attempts
  WHERE created_at < now() - interval '24 hours';
END;
$$;
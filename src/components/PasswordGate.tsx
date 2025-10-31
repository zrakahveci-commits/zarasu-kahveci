import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface PasswordGateProps {
  children: React.ReactNode;
}

export const PasswordGate = ({ children }: PasswordGateProps) => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user has a valid JWT token
    const verifyToken = async () => {
      const token = sessionStorage.getItem('portfolio_auth_token');
      if (token) {
        try {
          const { data, error } = await supabase.functions.invoke('validate-password', {
            body: { token }
          });

          if (!error && data?.isValid) {
            setIsAuthenticated(true);
          } else {
            sessionStorage.removeItem('portfolio_auth_token');
          }
        } catch {
          sessionStorage.removeItem('portfolio_auth_token');
        }
      }
      setIsLoading(false);
    };

    verifyToken();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('validate-password', {
        body: { password }
      });

      if (error) {
        throw error;
      }

      if (data?.isValid && data?.token) {
        sessionStorage.setItem('portfolio_auth_token', data.token);
        setIsAuthenticated(true);
        toast({
          title: 'Access Granted',
          description: 'Welcome to the portfolio!',
        });
      } else {
        toast({
          title: 'Access Denied',
          description: 'Incorrect password. Please try again.',
          variant: 'destructive',
        });
        setPassword('');
      }
    } catch (error) {
      console.error('Password validation error:', error);
      toast({
        title: 'Error',
        description: 'Failed to validate password. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md p-8 space-y-6 animate-fade-in">
          <div className="text-center space-y-2">
            <div className="flex justify-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Lock className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-2xl font-bold">Protected Portfolio</h1>
            <p className="text-muted-foreground">
              Please enter the password to access this portfolio
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full"
                autoFocus
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Validating...' : 'Access Portfolio'}
            </Button>
          </form>

          <p className="text-xs text-center text-muted-foreground">
            Access will remain active during this browser session
          </p>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
};

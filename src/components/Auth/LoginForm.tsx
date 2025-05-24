
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { EyeIcon, EyeOffIcon, Loader, CheckCircle } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { toast } from '@/hooks/use-toast';

interface LoginFormProps {
  onToggleMode: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onToggleMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { login } = useAuth();

  const getErrorMessage = (errorMessage: string) => {
    console.log('Login error message:', errorMessage);
    
    if (errorMessage.includes('Invalid login credentials') || errorMessage.includes('invalid_credentials')) {
      return 'Incorrect email or password. Please check your credentials and try again.';
    }
    if (errorMessage.includes('Email not confirmed') || errorMessage.includes('email_not_confirmed')) {
      return 'Please check your email and click the confirmation link before logging in.';
    }
    if (errorMessage.includes('Too many requests')) {
      return 'Too many login attempts. Please wait a moment before trying again.';
    }
    if (errorMessage.includes('User not found')) {
      return 'No account found with this email address. Please sign up first.';
    }
    
    return 'Login failed. Please try again.';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear previous errors and success state
    setError('');
    setSuccess(false);
    
    // Validate form fields
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    
    setIsLoading(true);
    
    try {
      console.log('Attempting login for:', email);
      await login(email, password);
      
      // Show success message briefly before redirect
      setSuccess(true);
      toast({
        title: "Login successful!",
        description: "Welcome back! Redirecting to dashboard...",
      });
      
      // The redirect will happen automatically via the auth context
      
    } catch (error: any) {
      console.error("Login error:", error);
      const errorMessage = getErrorMessage(error.message || error.toString());
      setError(errorMessage);
      
      toast({
        title: "Login failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-card/50 backdrop-blur-lg border-border/50 animate-fade-in">
      <CardHeader className="space-y-1">
        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Welcome Back
        </CardTitle>
        <CardDescription>
          Log in to continue your career journey
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        {success && (
          <Alert className="mb-4 border-green-500 text-green-700 bg-green-50 dark:bg-green-950/20">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>Login successful! Redirecting...</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">Email</label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError(''); // Clear error when user starts typing
              }}
              placeholder="your.email@example.com"
              required
              disabled={isLoading}
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">Password</label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(''); // Clear error when user starts typing
                }}
                placeholder="••••••••"
                required
                disabled={isLoading}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={togglePasswordVisibility}
                className="absolute right-0 top-0 h-full px-3 text-muted-foreground"
                disabled={isLoading}
              >
                {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          
          <div className="text-right">
            <a href="#" className="text-sm text-primary hover:underline">
              Forgot password?
            </a>
          </div>
          
          <Button 
            type="submit" 
            className="w-full"
            disabled={isLoading || success}
          >
            {isLoading ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Logging in...
              </>
            ) : success ? (
              <>
                <CheckCircle className="mr-2 h-4 w-4" />
                Success!
              </>
            ) : (
              "Log in"
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <div className="text-center w-full">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <button 
              type="button" 
              onClick={onToggleMode}
              className="text-primary hover:underline font-medium"
              disabled={isLoading}
            >
              Sign up
            </button>
          </p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;

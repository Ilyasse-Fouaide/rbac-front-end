import React from 'react';
import { useSearchParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

import { useAuth } from '@/features/auth/components/AuthProvider';

function GoogleSuccess() {
  const [searchParams] = useSearchParams();
  const [error, setError] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);
  const accessToken = searchParams.get('accessToken');
  const navigate = useNavigate();
  const { checkAuth } = useAuth();

  React.useEffect(() => {
    if (!accessToken) {
      setError('No access token provided');
      setIsLoading(false);
      return;
    }
    const authenticateWithGoogle = async () => {
      try {
        // Store the access token in localStorage
        localStorage.setItem('accessToken', accessToken);

        await checkAuth();

        // Navigate to home after successful authentication
        navigate('/');
      } catch (error) {
        setError('Authentication failed. Please try again.');
        console.error('Error during authentication check:', error);
      } finally {
        setIsLoading(false);
      }
    };

    authenticateWithGoogle();
  }, [accessToken, checkAuth, navigate]);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <Alert variant="destructive" className="max-w-md">
          <AlertTitle>Authentication Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      {isLoading && (
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">
            Completing authentication...
          </p>
        </div>
      )}
    </div>
  );
}

export default GoogleSuccess;

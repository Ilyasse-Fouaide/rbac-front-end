import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/features/auth/components/AuthProvider';

export const description =
  "A login form with email and password. There's an option to login with Google and a link to sign up if you don't have an account.";

const GoogleIcon = () => {
  return (
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
      <g>
        <path
          fill="#EA4335"
          d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
        ></path>
        <path
          fill="#4285F4"
          d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
        ></path>
        <path
          fill="#FBBC05"
          d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
        ></path>
        <path
          fill="#34A853"
          d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
        ></path>
        <path fill="none" d="M0 0h48v48H0z"></path>
      </g>
    </svg>
  );
};

function SignIn() {
  const navigate = useNavigate();
  const { login, checkAuth } = useAuth();
  const [error, setError] = React.useState(null);

  const {
    register,
    resetField,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate, isPending } = useMutation({
    mutationFn: (data) => login(data.email, data.password),
    onSuccess: async (data) => {
      const { accessToken } = data;
      localStorage.setItem('accessToken', accessToken);
      await checkAuth();
      navigate('/');
    },
    onError: (err) => {
      setError(err.response.data.message);
      resetField('password');
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  const google = () => {
    // window.open(
    //   'https://www.w3schools.com',
    //   'popup',
    //   'popup=true,toolbar=yes,scrollbars=yes,resizable=yes,width=600,height=700',
    // );
  };

  return (
    <div className="flex h-screen items-center">
      <Card className="mx-auto w-[450px] border-none shadow-none">
        <CardHeader>
          <Button disabled={isPending} className="w-full" onClick={google}>
            <GoogleIcon />
            Sign in with Google
          </Button>
        </CardHeader>
        <div className="flex items-center justify-center space-x-4 px-6 pb-6">
          <div className="h-[1px] w-full bg-muted-foreground/50"></div>
          <span className="text-sm text-muted-foreground">OR</span>
          <div className="h-[1px] w-full bg-muted-foreground/50"></div>
        </div>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
            {error && (
              <Alert
                variant="destructive"
                className="bg-red-100 dark:bg-red-950"
              >
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                disabled={isPending}
                placeholder="you@example.com"
                className="aria-required:border-destructive aria-required:bg-red-100 aria-required:ring-destructive aria-required:placeholder:text-destructive dark:aria-required:bg-red-950"
                autoComplete="email"
                {...register('email', { required: true })}
                aria-required={errors.email ? 'true' : 'false'}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                name="password"
                disabled={isPending}
                className="aria-required:border-destructive aria-required:bg-red-100 aria-required:ring-destructive dark:aria-required:bg-red-950"
                autoComplete="current-password"
                {...register('password', { required: true })}
                aria-required={errors.password ? 'true' : 'false'}
              />
            </div>
            <Button disabled={isPending} type="submit" className="w-full">
              Login
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link to="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default SignIn;

import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { LockKeyhole, AlertCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@features-auth/components/AuthProvider';
import { useToast } from '@/hooks/use-toast';
import Default from '../layout/Default';
import UseUpdatePassword from '../hooks/useUpdatePassword';

const page = 'Password';
const pageTitle = 'Password';
const pageDescription = 'Modify your current password';

function Password() {
  const [error, setError] = React.useState(null);
  const { user } = useAuth();
  const { toast } = useToast();

  const {
    register,
    resetField,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate, isPending } = useMutation({
    mutationFn: (data) => UseUpdatePassword(user.userId, data),
    onSuccess: () => {
      setError(null);
      toast({
        description: 'Password updated successfully',
      });
      // reset fields after change password
      resetField('currentPassword');
      resetField('newPassword');
    },
    onError: (err) => {
      const message =
        err?.response?.data?.message || 'An unknown error occurred.';
      setError(message);
    },
  });

  const onSubmit = (data) => {
    // console.log(data);
    // console.log('change password');
    mutate(data);
  };

  return (
    <Default
      page={page}
      pageTitle={pageTitle}
      pageDescription={pageDescription}
    >
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div className="border-none bg-transparent">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-6 pb-6 pt-0 md:grid-cols-2">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Current password</Label>
              <div className="relative">
                <LockKeyhole
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 transform"
                />
                <Input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  disabled={isPending}
                  className="px-8 aria-required:border-destructive aria-required:bg-red-100 aria-required:ring-destructive dark:aria-required:bg-red-950"
                  {...register('currentPassword', { required: true })}
                  aria-required={errors.currentPassword ? 'true' : 'false'}
                />
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">New password</Label>
              <div className="relative">
                <LockKeyhole
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 transform"
                />
                <Input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  disabled={isPending}
                  className="px-8 aria-required:border-destructive aria-required:bg-red-100 aria-required:ring-destructive dark:aria-required:bg-red-950"
                  {...register('newPassword', { required: true })}
                  aria-required={errors.newPassword ? 'true' : 'false'}
                />
              </div>
            </div>
          </div>
          <div>
            <Button type="submit" disabled={isPending}>
              Update
            </Button>
          </div>
        </form>
      </div>
    </Default>
  );
}

export default Password;

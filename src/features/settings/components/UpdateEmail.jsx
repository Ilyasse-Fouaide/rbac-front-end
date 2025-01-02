import React from 'react';
import { useForm } from 'react-hook-form';
import { Pencil } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import UseUpdateProfile from '../hooks/useUpdateProfile';

function UpdateEmail({ user }) {
  const [disabled, setDisabled] = React.useState(true);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const toggleDisabled = () => {
    setDisabled((prev) => !prev);
  };

  const { mutate } = useMutation({
    mutationFn: (data) => UseUpdateProfile(user.userId, data),
    onSuccess: () => {
      toggleDisabled();
      toast({
        description: 'Email updated successfully',
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardHeader>
          <CardTitle>
            Change Your Email
            {disabled && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      className="ml-2 p-1"
                      onClick={toggleDisabled}
                    >
                      <Pencil className="text-primary" size={14} />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Edit email</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </CardTitle>
          <CardDescription>
            Update your email to stay connected.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Input
            type="email"
            id="email"
            name="email"
            className="aria-required:border-destructive aria-required:bg-red-100 aria-required:ring-destructive dark:aria-required:bg-red-950"
            disabled={disabled}
            defaultValue={user.email}
            placeholder="New Email Address"
            {...register('email', { required: true })}
            aria-required={errors.email ? 'true' : 'false'}
          />
        </CardContent>
        <CardFooter className="gap-3 border-t px-6 py-4">
          <Button disabled={disabled}>Save</Button>
          {!disabled && (
            <Button variant="secondary" onClick={toggleDisabled}>
              Cancel
            </Button>
          )}
        </CardFooter>
      </form>
    </Card>
  );
}

export default UpdateEmail;

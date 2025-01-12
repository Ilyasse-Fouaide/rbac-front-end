import React from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AlertCircle, LoaderCircle, PlusCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import UseFetchRoles from '../hooks/useFetchRoles';
import UseCreateUser from '../hooks/useCreateUser';
import { useToast } from '@/hooks/use-toast';

function AddUser() {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = React.useState(false); // Track the dialog state
  const [role, setRole] = React.useState();
  const [error, setError] = React.useState('');

  const query = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, // Use this to reset the form after submission
    resetField,
  } = useForm();

  React.useEffect(() => {
    if (!isOpen) {
      setError('');
      reset();
    }
  }, [isOpen, reset]);

  const { data: roles, isPending } = useQuery({
    queryKey: ['roles'],
    queryFn: UseFetchRoles,
    enabled: isOpen,
  });

  const { mutate, isPending: userCreating } = useMutation({
    mutationFn: (data) => UseCreateUser(data),
    onSuccess: (res) => {
      setIsOpen(false);
      toast({
        title: 'Failed deleting users',
        description: res.message,
      });
      reset();
      query.invalidateQueries('users');
    },
    onError: (err) => {
      const messageError = err.response.data.message;
      setError(messageError);
      resetField('password');
    },
  });

  const handleRoleChange = (data) => {
    setRole(data);
  };

  const onSubmit = (data) => {
    const payload = { ...data, role };
    mutate(payload);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)}>
          <PlusCircle /> New
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Create new user</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when {"you're"}{' '}
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {error && (
              <Alert variant="destructive" className="bg-destructive/10">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                type="email"
                id="email"
                name="email"
                disabled={isPending || userCreating}
                className="col-span-3 aria-required:border-destructive aria-required:bg-destructive/20 aria-required:ring-destructive"
                {...register('email', { required: 'Email is required' })}
                aria-required={errors.email ? 'true' : 'false'}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                Password
              </Label>
              <Input
                type="password"
                id="password"
                name="password"
                disabled={isPending || userCreating}
                className="col-span-3 aria-required:border-destructive aria-required:bg-destructive/20 aria-required:ring-destructive"
                {...register('password', { required: 'Password is required' })}
                aria-required={errors.password ? 'true' : 'false'}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                Role
              </Label>
              <Select
                name="role"
                id="role"
                onValueChange={handleRoleChange}
                disabled={isPending || userCreating}
              >
                <SelectTrigger className="col-span-3 [&_[data-description]]:hidden">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  {isPending ? (
                    <div className="flex justify-center py-4">
                      <LoaderCircle className="animate-spin" />
                    </div>
                  ) : (
                    roles?.map((role, key) => (
                      <SelectItem value={role._id} key={key}>
                        <div className="text-muted-foreground">
                          <div className="grid w-fit gap-0.5">
                            <p className="capitalize text-foreground">
                              {role.name}
                            </p>
                            <p className="text-xs" data-description>
                              {role.description}
                            </p>
                          </div>
                        </div>
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button disabled={isPending || userCreating} type="submit">
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddUser;

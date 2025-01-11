import { Plus } from 'lucide-react';
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

function AddUser() {
  const [isOpen, setIsOpen] = useState(false); // Track the dialog state
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, // Use this to reset the form after submission
  } = useForm();

  const onSubmit = (data) => {
    console.log(data); // Handle form submission, e.g., API call
    setIsOpen(false); // Close dialog on successful form submission
    reset(); // Optionally reset the form fields after submission
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)}>
          <Plus />
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
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                type="email"
                id="email"
                name="email"
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
                className="col-span-3 aria-required:border-destructive aria-required:bg-destructive/20 aria-required:ring-destructive"
                {...register('password', { required: 'Password is required' })}
                aria-required={errors.password ? 'true' : 'false'}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddUser;

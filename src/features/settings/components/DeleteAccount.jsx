import React from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import LogoutButton from '@features-auth/components/LogoutButton';

function DeleteAccount() {
  const [open, setOpen] = React.useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('action');
    // colose dialog after action
    setOpen(false);
  };

  return (
    <div className="flex flex-col space-y-1.5">
      <h2 className="text-2xl font-bold leading-none tracking-tight">
        Account security
      </h2>
      <p className="text-sm text-muted-foreground">
        Manage your account security.
      </p>
      <div className="flex items-center gap-6">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="link" className="w-fit p-0 text-red-500">
              Delete account
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <form onSubmit={onSubmit}>
                <Button
                  type="submit"
                  variant="secondary"
                  className="text-red-600 outline outline-1 outline-muted-foreground/40"
                >
                  Confirm
                </Button>
              </form>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <LogoutButton>Log out</LogoutButton>
      </div>
    </div>
  );
}

export default DeleteAccount;

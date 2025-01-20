import React from 'react';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { MoreHorizontal, MoveRight, Trash2 } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import UseDeleteRole from '../hooks/useDeleteRole';

function RoleAction({ row, prefetchRole }) {
  const [open, setOpen] = React.useState(false);

  const query = useQueryClient();

  const { mutate: deleteRole } = useMutation({
    mutationFn: () => UseDeleteRole(row.getValue('_id')),
    onSuccess: () => {
      // colose dialog after action
      setOpen(false);
      query.invalidateQueries('roles');
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const onDeleteRole = (e) => {
    e.preventDefault();
    deleteRole();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[150px]" align="end">
          <Link to={row.getValue('_id')}>
            <DropdownMenuItem
              className="justify-between"
              onMouseEnter={() => prefetchRole(row.getValue('_id'))}
            >
              View role
              <MoveRight />
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          <DialogTrigger asChild>
            <DropdownMenuItem className="justify-between text-destructive">
              Delete
              <Trash2 />
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <form onSubmit={onDeleteRole}>
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
  );
}

export default RoleAction;

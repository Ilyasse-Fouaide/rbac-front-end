import React from 'react';
import { X, Search, UsersRound } from 'lucide-react'; // Icons from Lucide React
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input'; // shadcn Input component
import { Button } from '@/components/ui/button'; // shadcn Button component
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import AssingUserToRole from './AssingUserToRole';
import { useToast } from '@/hooks/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import UseRemoveUserFromRole from '../hooks/useRemoveUserFromRole';

const XCircle = () => {
  return (
    <svg
      aria-hidden="true"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="10" fill="transparent"></circle>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M12 23a11 11 0 1 0 0-22 11 11 0 0 0 0 22Zm4.7-15.7a1 1 0 0 0-1.4 0L12 10.58l-3.3-3.3a1 1 0 0 0-1.4 1.42L10.58 12l-3.3 3.3a1 1 0 1 0 1.42 1.4L12 13.42l3.3 3.3a1 1 0 0 0 1.4-1.42L13.42 12l3.3-3.3a1 1 0 0 0 0-1.4Z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

function ManageMembers({ users, roleId, roleName }) {
  const [members, setMembers] = React.useState(users);
  const [memberIdToDelete, setMemberIdToDelete] = React.useState('');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [assignUserDialogOpen, setIsAssignUserDialogOpen] =
    React.useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);

  const { toast } = useToast();
  const query = useQueryClient();

  const deletetingMember = useMutation({
    mutationFn: ({ userIds, roleIds }) =>
      UseRemoveUserFromRole(userIds, roleIds),
    onSuccess: (data) => {
      setMembers((prev) => prev.filter((m) => m._id !== memberIdToDelete));
      query.invalidateQueries(['roles', roleId]);
      toast({
        description: data.message,
      });
    },
    onError: (err) => {
      const message =
        err?.response?.data?.message || 'An unknown error occurred.';

      toast({
        variant: 'destructive',
        description: message,
      });
    },
  });

  // Handle removing a member
  const handleRemoveMember = (id) => {
    const userIds = [id];
    const roleIds = [roleId];
    deletetingMember.mutate({ userIds, roleIds });
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle clearing the search input
  const handleClearSearch = () => {
    setSearchQuery('');
  };

  // Filter members based on search query
  const filteredMembers = members.filter((member) =>
    member.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div>
      {/* Search Bar */}
      <div className="mb-6 flex flex-col-reverse gap-4 sm:flex-row">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform" />
          <Input
            type="text"
            placeholder="Search members..."
            value={searchQuery}
            className="px-10"
            onChange={handleSearchChange}
          />
          {searchQuery && (
            <div
              role="button"
              onClick={handleClearSearch}
              className="absolute right-3 top-1/2 flex h-5 w-5 -translate-y-1/2 transform items-center justify-center"
            >
              <X className="h-full w-full" />
            </div>
          )}
        </div>
        <Button onClick={() => setIsAssignUserDialogOpen(true)}>
          Add members
        </Button>
      </div>

      {/* Members List */}
      <div className="space-y-3">
        {filteredMembers.map((member) => (
          <div
            key={member.id}
            className="flex h-10 w-full items-center justify-between rounded-lg px-2 hover:bg-muted"
          >
            <div className="flex items-center space-x-2">
              <Avatar className="mr-1 h-6 w-6">
                <AvatarImage
                  src={`${import.meta.env.VITE_API_BASE_URL}/images/${member._id}`}
                  alt={member.email}
                />
                <AvatarFallback>{member.email.charAt(0)}</AvatarFallback>
              </Avatar>
              <p className="w-[200px] truncate sm:w-full">{member.email}</p>
            </div>
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onClick={() => {
                      setIsDeleteDialogOpen(true);
                      setMemberIdToDelete(member._id);
                    }}
                  >
                    <XCircle />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="px-2 py-1 text-xs">
                  Remove member
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        ))}
        {filteredMembers.length === 0 && (
          <div className="flex items-center justify-center gap-2 py-4 text-muted-foreground">
            <UsersRound className="h-5 w-5" />
            No members found
          </div>
        )}
      </div>
      <React.Suspense>
        {assignUserDialogOpen && (
          <AssingUserToRole
            roleId={roleId}
            roleName={roleName}
            setIsAssignUserDialogOpen={setIsAssignUserDialogOpen}
            assignUserDialogOpen={assignUserDialogOpen}
          />
        )}
      </React.Suspense>
      {/* Delete Role Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              role and remove all associated permissions and members.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleRemoveMember(memberIdToDelete)}
              // disabled={deleteRoleMutation.isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {/* {deleteRoleMutation.isPending ? 'Deleting...' : 'Delete'} */}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default ManageMembers;

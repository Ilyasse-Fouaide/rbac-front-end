import React from 'react';
import { Button } from '@/components/ui/button';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { UserPlus, Check, X, Loader2, SearchX } from 'lucide-react';
import { useDebounce } from 'use-debounce';

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import UseFetchUsersNotInRole from '../hooks/useFetchUsersNotInRole';
import { useToast } from '@/hooks/use-toast';
import useAssignUserToRole from '../hooks/useAssignUserToRole';

function AssingUserToRole({
  roleId,
  roleName,
  assignUserDialogOpen,
  setIsAssignUserDialogOpen,
}) {
  const [search, setSearch] = React.useState('');
  const [searchDebounced] = useDebounce(search, 1000);
  const [selectedUsers, setSelectedUsers] = React.useState([]);
  const inputRef = React.useRef(null);
  const { toast } = useToast();

  const query = useQueryClient();

  React.useEffect(() => {
    if (selectedUsers !== 0 && inputRef.current) {
      inputRef.current.focus();
    }
  }, [selectedUsers]);

  const {
    data: availableUsers,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['user-role', roleId, { search: searchDebounced }],
    queryFn: () => UseFetchUsersNotInRole(roleId, searchDebounced),
    enabled: !!assignUserDialogOpen,
  });

  const assign = useMutation({
    mutationFn: useAssignUserToRole,
    onSuccess: (data) => {
      toast({
        description: data.message,
      });
      query.invalidateQueries('user-role');
      setSelectedUsers([]);
      setSearch('');
      setIsAssignUserDialogOpen(false);
    },
    onError: (err) => {
      const message =
        err?.response?.data?.message || 'An unknown error occurred.';

      toast({
        description: message,
      });
    },
  });

  const toggleUserSelection = (user) => {
    setSelectedUsers((prev) =>
      prev.find((u) => u._id === user._id)
        ? prev.filter((u) => u._id !== user._id)
        : [...prev, user],
    );
  };

  const handleAssignUsers = () => {
    // Here you would typically make an API call to assign the users
    const array = selectedUsers.map((u) => {
      return {
        role: roleId,
        user: u._id,
      };
    });
    assign.mutate(array);
  };

  return (
    <Dialog
      open={assignUserDialogOpen}
      onOpenChange={setIsAssignUserDialogOpen}
    >
      <DialogContent className="h-full w-full sm:h-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add members</DialogTitle>
          <DialogDescription>{roleName}</DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="relative flex min-h-10 w-full flex-wrap items-center gap-0.5 rounded-sm border border-input bg-muted/30 p-1">
            {selectedUsers.map((user) => (
              <a
                role="button"
                tabIndex={0}
                onClick={() => toggleUserSelection(user)}
                key={user._id}
                className="ml-0.5 flex h-6 items-center rounded-sm bg-primary px-2 py-0.5 text-xs text-primary-foreground"
              >
                <Avatar className="mr-1 h-4 w-4">
                  <AvatarImage
                    src={`${import.meta.env.VITE_API_BASE_URL}/images/${user._id}`}
                    alt={user.email}
                  />
                  <AvatarFallback>{user.email.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="max-w-[100px] truncate sm:max-w-[120px]">
                  {user.email}
                </span>
                <button
                  className="ml-1"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent the parent onClick from firing
                    toggleUserSelection(user);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.stopPropagation();
                      toggleUserSelection(user);
                    }
                  }}
                >
                  <X className="h-3 w-3" />
                </button>
              </a>
            ))}
            <input
              ref={inputRef}
              autoFocus
              role="combobox"
              spellCheck={false}
              aria-activedescendant="user-row-0"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Backspace' && search === '') {
                  setSelectedUsers((previousArr) => previousArr.slice(0, -1));
                }
              }}
              placeholder={
                selectedUsers.length !== 0
                  ? 'Add more users...'
                  : 'Search users'
              }
              className="flex-grow appearance-none bg-transparent px-1 text-base outline-none placeholder:text-muted-foreground focus:ring-0"
            />
          </div>
          <div className="mt-2">
            <ScrollArea className="h-56">
              {isPending ? (
                <div className="flex h-10 items-center justify-center">
                  <Loader2 className="animate-spin" />
                </div>
              ) : availableUsers.length === 0 ? (
                <div className="flex h-56 w-full flex-col items-center justify-center p-4">
                  <div className="mb-2 flex h-20 w-20 items-center justify-center rounded-full border-2 border-dashed border-primary/30 bg-muted">
                    <SearchX className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <p className="text-center text-sm leading-none text-muted-foreground">
                    No members with name <strong>{search}</strong>
                  </p>
                </div>
              ) : (
                availableUsers.map((user, key) => (
                  <div
                    key={key}
                    onClick={() => toggleUserSelection(user)}
                    className="flex cursor-pointer items-center space-x-2 rounded-md px-1.5 py-2 aria-selected:bg-muted"
                    aria-selected={selectedUsers.some(
                      (u) => u._id === user._id,
                    )}
                  >
                    <Checkbox
                      checked={selectedUsers.some((u) => u._id === user._id)}
                      onCheckedChange={(e) => {
                        e.stopPropagation();
                        toggleUserSelection(user);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.stopPropagation();
                          toggleUserSelection(user);
                        }
                      }}
                    />
                    <div className="flex grow items-center gap-2 pl-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage
                          src={`${import.meta.env.VITE_API_BASE_URL}/images/${user._id}`}
                          alt={user.email}
                        />
                        <AvatarFallback>{user.email.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    {selectedUsers.find((u) => u._id === user._id) && (
                      <Check className="h-4 w-4 text-primary" />
                    )}
                  </div>
                ))
              )}
            </ScrollArea>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="link"
            onClick={() => {
              setSelectedUsers([]);
              setSearch('');
              setIsAssignUserDialogOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleAssignUsers}
            disabled={selectedUsers.length === 0}
            className="gap-2"
          >
            <UserPlus className="h-4 w-4" />
            Assign {selectedUsers.length > 0 && `(${selectedUsers.length})`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AssingUserToRole;

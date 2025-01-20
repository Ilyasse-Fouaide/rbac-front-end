import React from 'react';
import { Button } from '@/components/ui/button';
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
import { UserPlus, Check, X } from 'lucide-react';

function AssingUserToRole({
  roleName,
  assignUserDialogOpen,
  setIsAssignUserDialogOpen,
}) {
  const [selectedUsers, setSelectedUsers] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    if (selectedUsers !== 0 && inputRef.current) {
      inputRef.current.focus();
    }
  }, [selectedUsers]);

  // Sample available users for assignment
  const availableUsers = [
    {
      _id: 'user1',
      email: 'john.doe@example.com',
      avatar: { mediumImage: { url: '/api/placeholder/64/64' } },
    },
    {
      _id: 'user2',
      email: 'jane.smith@example.com',
      avatar: { mediumImage: { url: '/api/placeholder/64/64' } },
    },
    {
      _id: 'user3',
      email: 'alex.wilson@example.com',
      avatar: { mediumImage: { url: '/api/placeholder/64/64' } },
    },
    {
      _id: 'user4',
      email: 'sarah.parker@example.com',
      avatar: { mediumImage: { url: '/api/placeholder/64/64' } },
    },
  ];

  const filteredUsers = availableUsers.filter((user) =>
    user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const toggleUserSelection = (user) => {
    setSelectedUsers((prev) =>
      prev.find((u) => u._id === user._id)
        ? prev.filter((u) => u._id !== user._id)
        : [...prev, user],
    );
  };

  const handleAssignUsers = () => {
    // Here you would typically make an API call to assign the users
    console.log('Assigning users:', selectedUsers);
    setSelectedUsers([]);
    setSearchQuery('');
    setIsAssignUserDialogOpen(false);
  };

  return (
    <Dialog
      open={assignUserDialogOpen}
      onOpenChange={setIsAssignUserDialogOpen}
    >
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add members</DialogTitle>
          <DialogDescription>{roleName}</DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="relative flex w-full flex-wrap items-center gap-y-0.5 rounded-sm border border-input bg-muted p-1">
            {selectedUsers.map((user) => (
              <div
                onClick={() => toggleUserSelection(user)}
                key={user._id}
                className="ml-0.5 flex cursor-pointer items-center rounded-sm bg-primary px-2 py-0.5 text-xs text-primary-foreground"
              >
                {user.email}
                <button
                  className="pointer-events-none ml-1"
                  onClick={() => toggleUserSelection(user)}
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
            <input
              ref={inputRef}
              autoFocus
              placeholder={selectedUsers.length !== 0 ? '' : 'Search users'}
              className="flex-1 bg-transparent px-1 outline-none placeholder:text-muted-foreground focus:ring-0"
            />
          </div>
          <div className="mt-2">
            <ScrollArea className="h-56">
              {availableUsers.map((user, key) => (
                <div
                  key={key}
                  onClick={() => toggleUserSelection(user)}
                  className="flex cursor-pointer items-center space-x-2 rounded-md px-1.5 py-2 aria-selected:bg-muted"
                  aria-selected={selectedUsers.some((u) => u._id === user._id)}
                >
                  <Checkbox
                    className="pointer-events-none"
                    checked={selectedUsers.some((u) => u._id === user._id)}
                    onCheckedChange={() => toggleUserSelection(user)}
                  />
                  <div className="flex grow items-center gap-2 pl-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={user.avatar} alt={user.email} />
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
              ))}
            </ScrollArea>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              setSelectedUsers([]);
              setSearchQuery('');
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

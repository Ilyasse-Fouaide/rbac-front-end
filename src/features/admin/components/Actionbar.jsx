import React, { memo } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Trash, Users } from 'lucide-react';

import { Button } from '@/components/ui/button';
import UseDeleteUsers from '../hooks/useDeleteUsers';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

function Actionbar({ selectedCount, selectedIds, onClearSelection }) {
  const { toast } = useToast();

  const query = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (userIds) => UseDeleteUsers(userIds),
    onSuccess: (data) => {
      query.invalidateQueries('users');
      toast({
        title: 'Delete',
        description: data.message,
      });
      onClearSelection();
    },
    onError: (err) => {
      toast({
        className: cn(
          'fixed right-0 top-0 flex md:right-4 md:top-4 md:max-w-[320px]',
        ),
        variant: 'destructive',
        title: 'Failed deleting users',
        description: err.response.data.message,
      });
    },
  });

  const handleDeleteSelected = React.useCallback(() => {
    mutate(selectedIds);
  }, [mutate, selectedIds]);

  return (
    <div
      className={cn(
        'fixed bottom-0 left-1/2 z-50 flex w-full -translate-x-1/2 translate-y-32',
        'max-w-3xl items-center justify-between rounded-none border-t',
        'backdrop-blur supports-[backdrop-filter]:bg-muted/50',
        'p-3 shadow-lg transition-all duration-200 ease-in-out',
        'sm:bottom-6 sm:w-[95%] sm:rounded-lg sm:border',
        selectedCount > 0 && 'translate-y-0 opacity-100',
      )}
    >
      <div className="flex items-center gap-2 sm:gap-3">
        <Users className="h-5 w-5 shrink-0 text-primary" />
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium sm:text-base">
            {selectedCount} selected
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="secondary" size="sm" onClick={onClearSelection}>
          Clear
        </Button>
        <Button
          variant="destructive"
          size="sm"
          className="gap-2 sm:px-4"
          onClick={handleDeleteSelected}
        >
          <Trash className="h-4 w-4" />
          <span className="hidden sm:inline">Delete</span>
        </Button>
      </div>
    </div>
  );
}

export default memo(Actionbar);

import React from 'react';
import { Check, LoaderCircle, Plus } from 'lucide-react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import UseFetchRoles from '../hooks/useFetchRoles';
import { useQuery } from '@tanstack/react-query';

function RolesPopover({ row }) {
  const [userId] = React.useState(row.original._id);
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedRoles, setSelectedRoles] = React.useState([
    ...row.original.roles.map((role) => {
      return {
        role: role._id,
        user: userId,
      };
    }),
  ]);

  // React.useEffect(() => {
  //   console.log(selectedRoles);
  // }, [selectedRoles]);

  const { data: roles, isLoading: rolesPending } = useQuery({
    queryKey: ['roles'],
    queryFn: UseFetchRoles,
    enabled: !!isOpen,
  });

  const onCheckChange = (e) => {
    const roleId = e.target.value;
    const isChecked = e.target.checked;

    if (isChecked) {
      const newRole = { role: roleId, user: userId };
      setSelectedRoles((prevSelected) => [...prevSelected, newRole]);
    } else {
      setSelectedRoles((prevSelected) =>
        prevSelected.filter((item) => item.role !== roleId),
      );
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger>
        <Button
          className="h-6 w-6 opacity-0 group-hover:opacity-100"
          size="icon"
          variant="ghost"
        >
          <Plus />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-44 p-1">
        {rolesPending || !roles ? (
          <div className="flex animate-spin items-center justify-center py-1">
            <LoaderCircle size={20} />
          </div>
        ) : (
          <div>
            {roles?.map((roleItem, indx) => (
              <div key={indx} className="relative">
                <input
                  type="checkbox"
                  value={roleItem._id}
                  id={roleItem._id}
                  checked={selectedRoles.some(
                    (item) => item.role === roleItem._id,
                  )}
                  onChange={onCheckChange}
                  className="peer sr-only"
                />
                <label
                  htmlFor={roleItem._id}
                  className="group flex cursor-pointer items-center justify-between rounded-sm px-3 py-1.5 hover:bg-accent peer-checked:[&_.checkbox]:bg-primary"
                  data-state={
                    selectedRoles.some((item) => item.role === roleItem._id)
                      ? 'checked'
                      : 'unchecked'
                  }
                >
                  <div
                    role="checkbox"
                    aria-checked={selectedRoles.some(
                      (item) => item.role === roleItem._id,
                    )}
                    className="checkbox absolute right-2.5 top-1/2 flex h-4 w-4 shrink-0 -translate-y-1/2 cursor-pointer items-center justify-center rounded-sm border border-primary"
                  >
                    <Check
                      strokeWidth={3}
                      className="hidden h-3 w-3 text-primary-foreground group-data-[state=checked]:block"
                    />
                  </div>

                  <div className="text-sm capitalize">{roleItem.name}</div>
                </label>
              </div>
            ))}
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}

export default RolesPopover;

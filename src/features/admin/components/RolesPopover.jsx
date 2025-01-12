import React from 'react';
import { Plus } from 'lucide-react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import UseFetchRoles from '../hooks/useFetchRoles';
import { useQuery } from '@tanstack/react-query';

function RolesPopover({ row }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedRoles, setSelectedRoles] = React.useState([]); // Store selected roles as an array

  const { data: roles, isPending } = useQuery({
    queryKey: ['roles'],
    queryFn: UseFetchRoles,
    enabled: !!isOpen,
  });

  const onCheckChange = (e) => {
    const roleId = e.target.value;
    setSelectedRoles((prevSelected) => {
      if (prevSelected.includes(roleId)) {
        // If already selected, remove it
        return prevSelected.filter((id) => id !== roleId);
      } else {
        // Otherwise, add it to the selected roles array
        return [...prevSelected, roleId];
      }
    });
  };

  console.log(selectedRoles); // You can inspect selected roles here

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger>
        <Button
          className="h-6 w-6 opacity-0 group-hover:opacity-100"
          size="icon"
        >
          <Plus />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-44 p-1">
        <div>
          {roles?.map((roleItem, indx) => (
            <div key={indx} className="relative">
              <input
                type="checkbox"
                value={roleItem._id}
                id={roleItem._id}
                checked={selectedRoles.includes(roleItem._id)} // Check if the role is selected
                onChange={onCheckChange}
                className="peer sr-only"
              />
              <div className="absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 rounded-sm border border-primary peer-checked:bg-primary"></div>
              <label
                htmlFor={roleItem._id}
                className="flex cursor-pointer items-center justify-between rounded-sm px-3 py-1.5 hover:bg-accent"
              >
                <div className="text-sm capitalize">{roleItem.name}</div>
              </label>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default RolesPopover;

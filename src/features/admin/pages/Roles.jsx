import React from 'react';
import { useQuery } from '@tanstack/react-query';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import UseFetchRoles from '../hooks/useFetchRoles';
import { MoreHorizontal, MoveRight, PlusCircle, Trash2 } from 'lucide-react';
import Administrator from '../components/Administrator';
import { Link } from 'react-router-dom';

const Shield = () => {
  return (
    <svg
      aria-hidden="true"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        fill="#99aab5"
        d="M3.47 5.18c.27-.4.64-.74 1.1-.96l6.09-3.05a3 3 0 0 1 2.68 0l6.1 3.05A2.83 2.83 0 0 1 21 6.75v3.5a14.17 14.17 0 0 1-8.42 12.5c-.37.16-.79.16-1.16 0A14.18 14.18 0 0 1 3 9.77V6.75c0-.57.17-1.11.47-1.57Zm2.95 10.3A12.18 12.18 0 0 0 12 20.82a12.18 12.18 0 0 0 5.58-5.32A9.49 9.49 0 0 0 12.47 14h-.94c-1.88 0-3.63.55-5.11 1.49ZM12 13a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
      ></path>
    </svg>
  );
};

function Roles() {
  const { data: roles, isPending: rolesPending } = useQuery({
    queryKey: ['roles'],
    queryFn: UseFetchRoles,
  });

  const [columns] = React.useState([
    {
      accessorKey: '_id',
      header: 'id',
      show: true,
      cell: ({ row }) => row.getValue('_id'),
    },
    {
      accessorKey: 'name',
      header: 'Roles',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Shield />
          <span className="truncate capitalize">{row.getValue('name')}</span>
        </div>
      ),
    },
    {
      accessorKey: 'members',
      header: () => <div className="text-center">Members</div>,
      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-2">
          <span className="truncate">{row.getValue('members')}</span>
          {/* <UserRound className="h-5 w-5" fill="white" /> */}
        </div>
      ),
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[150px]" align="end">
                <Link to={row.getValue('_id')}>
                  <DropdownMenuItem className="justify-between">
                    View role
                    <MoveRight />
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="justify-between text-destructive">
                  Delete
                  <Trash2 />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ]);

  const table = useReactTable({
    data: roles ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      columnVisibility: {
        _id: false,
      },
    },
  });

  return (
    <Administrator>
      <div className="flex justify-end gap-2 py-4">
        <Button size="sm">
          <PlusCircle />
          Create role
        </Button>
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup, key) => (
            <TableRow key={key}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="whitespace-nowrap p-2 [&:has([role=checkbox])]:w-10"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {rolesPending ? (
            Array.from({ length: 10 }).map((_, i) => (
              <TableRow
                key={i}
                className="animate-pulse odd:bg-muted/50 [&:last-child]:border-0"
              >
                <TableCell colSpan="4"></TableCell>
              </TableRow>
            ))
          ) : table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    className="whitespace-nowrap p-2 [&:has([role=checkbox])]:w-10"
                    key={cell.id}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center text-muted-foreground"
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Administrator>
  );
}

export default Roles;

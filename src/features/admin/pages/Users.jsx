import React from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
} from '@tanstack/react-table';
import { useDebounce } from 'use-debounce';
import { parseAsInteger, useQueryState } from 'nuqs';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Administrator from '../components/Administrator';
import UseFetchUsers from '../hooks/useFetchUsers';
import { ChevronDown, MoreHorizontal } from 'lucide-react';
import { useAuth } from '@features-auth/components/AuthProvider';
import Actionbar from '../components/Actionbar';
import UserPagination from '../components/UserPagination';
import AddUser from '../components/AddUser';
import RolesPopover from '../components/RolesPopover';

function Users() {
  const { user } = useAuth();
  const [search, setSearch] = useQueryState('', { defaultValue: '' });
  const [searchDebounced] = useDebounce(search, 1000);
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));
  const [limit, setLimit] = useQueryState('per_page', { defaultValue: '25' });
  const [sort] = React.useState([]);
  const [select] = React.useState([]);

  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] = React.useState({});

  const { data, isLoading } = useQuery({
    queryKey: [
      'users',
      'search',
      { search: searchDebounced, page, limit, select, sort },
    ],
    queryFn: () =>
      UseFetchUsers({ search: searchDebounced, page, limit, select, sort }),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 10,
  });

  const [columns] = React.useState([
    {
      id: 'select',
      enableSorting: false,
      enableHiding: false,
      header: ({ table }) => (
        <div className="flex w-5 items-center justify-center">
          <Checkbox
            className="h-4 w-4"
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && 'indeterminate')
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
          />
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex w-5 items-center justify-center">
          <Checkbox
            className="h-4 w-4"
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
          />
        </div>
      ),
    },
    {
      accessorKey: 'email',
      header: 'Email',
      size: {
        min: '12rem',
        max: '1fr',
      },
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <img
            src={row.original.avatar.smallImage.url}
            alt="pfp"
            className="h-6 w-6 shrink-0 rounded-md"
          />
          <span className="truncate">{row.getValue('email')}</span>
        </div>
      ),
    },
    {
      accessorKey: 'roles',
      header: () => <div>Roles</div>,
      size: {
        min: '8rem',
        max: '8rem',
      },
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <div className="flex h-6 items-center justify-center truncate rounded-sm bg-muted p-1 text-xs capitalize">
            <span className="mx-1">{row.getValue('roles')[0]}</span>
          </div>
          <RolesPopover row={row} />
        </div>
      ),
    },
    {
      id: 'actions',
      enableHiding: false,
      size: '3rem',
      cell: ({ _row, table }) => {
        // const payment = row.original;

        return (
          <div className="flex items-center justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => table.toggleAllPageRowsSelected(false)}
                >
                  View customer
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ]);

  const table = useReactTable({
    data: data?.users ?? [],
    columns,
    enableRowSelection: (row) => row.original._id !== user.userId,
    getCoreRowModel: getCoreRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
      columnVisibility,
    },
  });

  const handleClearSelection = React.useCallback(() => {
    table.toggleAllPageRowsSelected(false);
  }, [table]);

  const currentPage = data?.pagination?.currentPage;
  const totalPages = data?.pagination?.totalPages;
  const selectedCount = table.getFilteredSelectedRowModel().rows.length;
  const selectedIds = table
    .getFilteredSelectedRowModel()
    .rows.map((row) => row.original._id);

  const valuesMemorized = React.useMemo(
    () => ({
      selectedCount,
      selectedIds,
      currentPage,
      totalPages,
    }),
    [selectedCount, selectedIds, currentPage, totalPages],
  );

  return (
    <Administrator>
      <div className="flex flex-col-reverse gap-2 py-4 lg:flex-row">
        <div className="flex w-full items-center gap-2">
          <Input
            placeholder="Filter emails..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full lg:max-w-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <AddUser />
      </div>
      <div className="w-full overflow-auto rounded-md border">
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
            {isLoading ? (
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
                <TableRow
                  key={row.id}
                  aria-disabled={row.original._id === user.userId}
                  className="group aria-disabled:pointer-events-none aria-disabled:opacity-60"
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      className="whitespace-nowrap p-2 [&:has([role=checkbox])]:w-10"
                      key={cell.id}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
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
      </div>
      {isLoading ? (
        <p>loading...</p>
      ) : (
        <UserPagination
          limit={limit}
          setLimit={setLimit}
          totalPages={valuesMemorized.totalPages}
          currentPage={valuesMemorized.currentPage}
          setPage={setPage}
        />
      )}
      <Actionbar
        selectedCount={valuesMemorized.selectedCount}
        selectedIds={valuesMemorized.selectedIds}
        onClearSelection={handleClearSelection}
      />
    </Administrator>
  );
}

export default Users;

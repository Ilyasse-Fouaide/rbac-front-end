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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
  PaginationEllipsis,
} from '@/components/ui/pagination';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Administrator from '../components/Administrator';
import UseFetchUsers from '../hooks/useFetchUsers';
import { ChevronDown, MoreHorizontal, Trash, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@features-auth/components/AuthProvider';

const columns = [
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
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
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
      <div className="inline-flex items-center gap-2">
        <img
          src={row.original.avatar.smallImage.url}
          alt="pfp"
          className="h-6 w-6 shrink-0 rounded-full"
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
      <div className="flex items-center">
        <div className="truncate rounded-sm bg-muted px-2 py-1 text-xs capitalize">
          {row.getValue('roles')[0]}
        </div>
      </div>
    ),
  },
  {
    id: 'actions',
    enableHiding: false,
    size: '3rem',
    cell: ({ row }) => {
      const payment = row.original;

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
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(payment.id)}
              >
                Copy payment ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View customer</DropdownMenuItem>
              <DropdownMenuItem>View payment details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];

function Users() {
  const { user } = useAuth();
  const [search, setSearch] = useQueryState('', { defaultValue: '' });
  const [searchDebounced] = useDebounce(search, 1000);
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));
  const [limit, setLimit] = useQueryState('per_page', { defaultValue: '25' });
  const [sort, setSort] = React.useState([]);
  const [select, setSelect] = React.useState([]);

  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] = React.useState({});

  const { data, isLoading } = useQuery({
    queryKey: [
      'search',
      { search: searchDebounced, page, limit, select, sort },
    ],
    queryFn: () =>
      UseFetchUsers({ search: searchDebounced, page, limit, select, sort }),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 10,
  });

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

  const getPageNumbers = () => {
    const current = data?.pagination?.currentPage;
    const last = data?.pagination?.totalPages;
    const delta = 2; // Number of pages to show on each side
    const range = [];

    if (last === 1) {
      range.push(last);
      return range;
    }

    for (
      let i = Math.max(2, current - delta);
      i <= Math.min(last - 1, current + delta);
      i++
    ) {
      range.push(i);
    }

    if (current - delta > 2) {
      range.unshift('...');
    }
    if (current + delta < last - 1) {
      range.push('...');
    }

    range.unshift(1);
    range.push(last);

    return range;
  };

  const handleClearSelection = React.useCallback(() => {
    table.toggleAllPageRowsSelected(false);
  }, [table]);

  const handleDeleteSelected = React.useCallback(() => {
    // Logic for deleting selected users
  }, []);

  return (
    <Administrator>
      <div className="flex items-center gap-2 py-4">
        <Input
          placeholder="Filter emails..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="max-w-sm"
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
      <div className="w-full overflow-auto rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup, key) => (
              <TableRow key={key}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="whitespace-nowrap [&:has([role=checkbox])]:w-10"
                    // style={{
                    //   minWidth: header.column.columnDef.size,
                    //   maxWidth: header.column.columnDef.size,
                    // }}
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
                      className="whitespace-nowrap [&:has([role=checkbox])]:w-10"
                      key={cell.id}
                      // style={{
                      //   minWidth: cell.column.columnDef.size,
                      //   maxWidth: cell.column.columnDef.size,
                      // }}
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
        <div className="flex items-center justify-between">
          <Pagination className="justify-start py-4">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => {
                    if (data.pagination.currentPage === 1) return;
                    setPage((p) => p - 1);
                  }}
                  className={
                    data.pagination.currentPage === 1
                      ? 'pointer-events-none opacity-50'
                      : ''
                  }
                />
              </PaginationItem>

              {getPageNumbers().map((pageNum, idx) => (
                <PaginationItem key={idx}>
                  {pageNum === '...' ? (
                    <PaginationEllipsis />
                  ) : (
                    <PaginationLink
                      onClick={() => setPage(pageNum)}
                      isActive={pageNum === data.pagination.currentPage}
                    >
                      {pageNum}
                    </PaginationLink>
                  )}
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  onClick={() => {
                    if (
                      data.pagination.currentPage === data.pagination.totalPages
                    ) {
                      return;
                    }
                    setPage((p) => p + 1);
                  }}
                  className={
                    data.pagination.currentPage === data.pagination.totalPages
                      ? 'pointer-events-none opacity-50'
                      : ''
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
          <Select value={limit} onValueChange={(v) => setLimit(v)}>
            <SelectTrigger className="w-[120px] shrink-0">
              <SelectValue placeholder={`per page ${limit}`} />
            </SelectTrigger>
            <SelectContent>
              {[10, 25, 50, 100].map((pageSize) => (
                <SelectItem key={pageSize} value={pageSize.toString()}>
                  {pageSize} rows
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <div
        className={cn(
          'fixed bottom-0 left-1/2 z-50 flex w-full -translate-x-1/2 translate-y-32',
          'max-w-3xl items-center justify-between rounded-none border-t',
          'backdrop-blur supports-[backdrop-filter]:bg-muted/50',
          'p-3 shadow-lg transition-all duration-200 ease-in-out',
          'sm:bottom-6 sm:w-[95%] sm:rounded-lg sm:border',
          table.getFilteredSelectedRowModel().rows.length > 0 &&
            'translate-y-0 opacity-100',
        )}
      >
        <div className="flex items-center gap-2 sm:gap-3">
          <X className="h-5 w-5 shrink-0 text-primary" />
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium sm:text-base">
              {table.getFilteredSelectedRowModel().rows.length} selected
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" onClick={handleClearSelection}>
            Clear
          </Button>
          <Button variant="destructive" size="sm" className="gap-2 sm:px-4">
            <Trash className="h-4 w-4" />
            <span className="hidden sm:inline">Delete</span>
          </Button>
        </div>
      </div>
    </Administrator>
  );
}

export default Users;

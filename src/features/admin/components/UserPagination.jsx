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

import { getPageNumbers } from '@/lib/utils';

function UserPagination({ limit, setLimit, totalPages, currentPage, setPage }) {
  return (
    <div className="flex items-center justify-between">
      <Pagination className="justify-start py-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => {
                if (currentPage === 1) return;
                setPage((p) => p - 1);
              }}
              className={
                currentPage === 1 ? 'pointer-events-none opacity-50' : ''
              }
            />
          </PaginationItem>

          {getPageNumbers(currentPage, totalPages).map((pageNum, idx) => (
            <PaginationItem key={idx}>
              {pageNum === '...' ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  onClick={() => setPage(pageNum)}
                  isActive={pageNum === currentPage}
                >
                  {pageNum}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              onClick={() => {
                if (currentPage === totalPages) {
                  return;
                }
                setPage((p) => p + 1);
              }}
              className={
                currentPage === totalPages
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
  );
}

export default UserPagination;

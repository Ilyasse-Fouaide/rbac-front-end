import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
} from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { getPageNumbers } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function UserPagination({ limit, setLimit, totalPages, currentPage, setPage }) {
  return (
    <div className="flex items-center justify-between">
      <Pagination className="justify-start py-4">
        <PaginationContent>
          <PaginationItem>
            <Button
              size="icon"
              variant="ghost"
              className="disabled:pointer-events-none disabled:opacity-50"
              onClick={() => {
                if (currentPage === 1) return;
                setPage((p) => p - 1);
              }}
              disabled={currentPage === 1}
              aria-label="Go to previous page"
            >
              <ChevronLeft size={16} strokeWidth={2} aria-hidden="true" />
            </Button>
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
            <Button
              size="icon"
              variant="ghost"
              className="disabled:pointer-events-none disabled:opacity-50"
              onClick={() => {
                if (currentPage === totalPages) {
                  return;
                }
                setPage((p) => p + 1);
              }}
              disabled={currentPage === totalPages}
              aria-label="Go to previous page"
            >
              <ChevronRight size={16} strokeWidth={2} aria-hidden="true" />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <Select value={limit} onValueChange={(v) => setLimit(v)}>
        <SelectTrigger className="w-[120px] shrink-0">
          <SelectValue placeholder={`per page ${limit}`} />
        </SelectTrigger>
        <SelectContent>
          {[5, 10, 25, 50, 100].map((pageSize) => (
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

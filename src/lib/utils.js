import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getPageNumbers(currentPage, totalPages) {
  const current = currentPage;
  const last = totalPages;
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
}

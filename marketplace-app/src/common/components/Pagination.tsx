import { useEffect, useMemo, useState } from 'react';
import { Paginate, Paginated } from 'types';

type PaginationProps = {
  paginated: Paginated<any>;
  onPaginated: (paginate: Paginate) => void;
};

const LINKS_THRESHOLD = 1;

export function Pagination({ paginated, onPaginated }: PaginationProps) {
  const [pages, setPages] = useState<(number | null)[]>([]);

  useEffect(calculatePages, [paginated]);

  const currentPage = useMemo(
    () => Math.ceil(paginated.offset / paginated.pageSize),
    [paginated]
  );
  const pageCount = useMemo(
    () => Math.ceil(paginated.total / paginated.pageSize),
    [paginated]
  );

  function calculatePages() {
    if (pageCount <= 1) {
      setPages([]);
      return;
    }

    const newPages: (number | null)[] = [0];

    const from = Math.max(1, currentPage - LINKS_THRESHOLD);
    const to = Math.min(currentPage + LINKS_THRESHOLD + 1, pageCount - 1);

    if (from > 1) {
      newPages.push(null);
    }

    for (let page = from; page < to; page++) {
      newPages.push(page);
    }

    if (to < pageCount - 1) {
      newPages.push(null);
    }

    if (to < pageCount) {
      newPages.push(pageCount - 1);
    }

    setPages(newPages);
  }

  function paginate(page: number) {
    onPaginated({
      offset: paginated.pageSize * page,
      pageSize: paginated.pageSize,
    });
  }

  return (
    <div className='flex gap-3 items-center'>
      {pages.map((page, index) => {
        return page === null ? (
          <div key={index}>⋯</div>
        ) : (
          <div
            className={`flex items-center bg-teal-200 dark:bg-teal-700 rounded-lg px-3 py-1 cursor-pointer hover:bg-teal-300 dark:hover:bg-teal-600 border-green-400 dark:border-white ${
              currentPage === page ? 'bg-teal-300 border-4' : ''
            }`}
            onClick={() => paginate(page)}
            key={index}
          >
            {page + 1}
          </div>
        );
      })}
    </div>
  );
}

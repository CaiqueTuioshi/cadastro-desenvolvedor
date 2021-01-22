import React, { useEffect, useState } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import styled from 'styled-components';

type Props = {
  currentPage: number;
  totalPages: number;
  search(page?: number): void;
};

const PaginationContainer = styled.div`
  position: fixed;
  right: 50%;
`;

const FIRST_PAGE = 1;
const MAX_PAGES_RENDER = 3;

const PaginationTable: React.FC<Props> = ({
  currentPage,
  totalPages,
  search,
}) => {
  const [pages, setPages] = useState<number[]>([]);

  useEffect(() => {
    search();
  }, [search]);

  useEffect(() => {
    let start = currentPage + 1 - MAX_PAGES_RENDER / 2;

    if (totalPages <= MAX_PAGES_RENDER) {
      start = Math.max(1, Math.floor(start));
    } else {
      start = Math.max(1, Math.ceil(start));
    }

    const end = Math.min(totalPages, start + MAX_PAGES_RENDER - 1);

    if (currentPage === totalPages) {
      start = Math.max(1, end - MAX_PAGES_RENDER + 1);
    }

    const pages = [];

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (totalPages < MAX_PAGES_RENDER || pages.length === MAX_PAGES_RENDER) {
      setPages(pages);
    }
  }, [totalPages, currentPage]);

  const loadPreviousPage = (page: number) => {
    if (page) {
      search(page);
    }
  };

  const loadNextPage = (page: number) => {
    if (page <= totalPages) {
      search(page);
    }
  };

  return (
    <PaginationContainer>
      <Pagination size='md'>
        {currentPage !== FIRST_PAGE && totalPages > MAX_PAGES_RENDER && (
          <>
            <PaginationItem>
              <PaginationLink first onClick={() => search(FIRST_PAGE)} />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                previous
                onClick={() => loadPreviousPage(currentPage - 1)}
              />
            </PaginationItem>
          </>
        )}
        {pages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink onClick={() => search(page)}>{page}</PaginationLink>
          </PaginationItem>
        ))}
        {currentPage !== totalPages && totalPages > MAX_PAGES_RENDER && (
          <>
            <PaginationItem>
              <PaginationLink
                next
                onClick={() => loadNextPage(currentPage + 1)}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink last onClick={() => search(totalPages)} />
            </PaginationItem>
          </>
        )}
      </Pagination>
    </PaginationContainer>
  );
};

export default PaginationTable;

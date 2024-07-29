import { useMemo } from "react";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

type Props = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export const PaginationSelector = ({
  page,
  totalPages,
  onPageChange,
}: Props) => {
  const prevThreePageNos = useMemo(
    () =>
      Array.from({ length: 3 }, (_, index) => page - 1 - index)
        .filter((val) => val > 0)
        .reverse(),
    [page]
  );

  const lastThreePageNos = useMemo(
    () =>
      Array.from({ length: 3 }, (_, index) => page + index).filter(
        (val) => val <= totalPages
      ),
    [page, totalPages]
  );

  const paginationArray = [...prevThreePageNos, ...lastThreePageNos];

  return (
    <Pagination>
      <PaginationContent>
        {page > 1 && (
          <PaginationItem>
            <PaginationPrevious onClick={() => onPageChange(page - 1)} />
          </PaginationItem>
        )}
        {paginationArray?.map((item) => (
          <PaginationItem key={item}>
            <PaginationLink
              isActive={page === item}
              onClick={() => onPageChange(item)}
            >
              {item}
            </PaginationLink>
          </PaginationItem>
        ))}
        {page < totalPages && (
          <PaginationItem>
            <PaginationNext onClick={() => onPageChange(page + 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

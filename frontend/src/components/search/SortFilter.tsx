import { useMemo } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import { sortOptions } from "../../constants/data";

type Props = {
  sortOption: string;
  onSortChange: (sortOption: string) => void;
};

export const SortFilter = ({ sortOption, onSortChange }: Props) => {
  const sortLabel = useMemo(
    () => sortOptions.find((option) => option.value === sortOption)?.label,
    [sortOption]
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="border border-borderPrimary p-2 rounded-md w-fit outline-none">
        Sort: {sortLabel}
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        {sortOptions.map((sortOption) => (
          <DropdownMenuItem
            onClick={() => onSortChange(sortOption.value)}
            key={sortOption.value}
          >
            {sortOption.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

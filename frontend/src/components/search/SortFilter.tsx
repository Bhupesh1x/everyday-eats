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
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="border border-borderPrimary p-2 rounded-md w-fit">
        Sort: {sortOption}
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

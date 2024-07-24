import { Check } from "lucide-react";

import { Button } from "../ui/button";

import { cuisineList } from "../../constants/data";

type Props = {
  isExpanded: boolean;
  selectedCuisines: string[];
  onChangeExpand: () => void;
  onChange: (cuisines: string[]) => void;
};

export const CuisinesFilter = ({
  onChange,
  isExpanded,
  onChangeExpand,
  selectedCuisines,
}: Props) => {
  function handleSelect(cuisine: string) {
    if (selectedCuisines.includes(cuisine)) {
      const cousines: string[] = selectedCuisines.filter(
        (cousinesValue) => cousinesValue !== cuisine
      );
      onChange(cousines);
    } else {
      onChange([...selectedCuisines, cuisine]);
    }
  }

  return (
    <div className="border p-3 rounded-md h-fit">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold tracking-tight">Filter By Cuisine</h3>
        <p
          className="text-sm text-blue-500 underline font-semibold cursor-pointer"
          onClick={() => onChange([])}
        >
          Reset Filters
        </p>
      </div>

      <div className="flex flex-col gap-3 mt-4">
        {cuisineList
          .slice(0, isExpanded ? cuisineList.length : 7)
          .map((cuisine) => {
            const isSelected = selectedCuisines?.includes(cuisine);
            return (
              <p
                className={`border py-1.5 px-3 rounded-full flex items-center gap-2 cursor-pointer transition ${
                  isSelected ? "border-primary text-primary" : "border-gray-300"
                }`}
                onClick={() => handleSelect(cuisine)}
                key={cuisine}
              >
                {isSelected && <Check className="size-5" />}
                {cuisine}
              </p>
            );
          })}
      </div>

      <div className="flex items-center justify-center">
        <Button variant="link" className="mt-2" onClick={onChangeExpand}>
          {isExpanded ? "View Less" : "View More"}
        </Button>
      </div>
    </div>
  );
};

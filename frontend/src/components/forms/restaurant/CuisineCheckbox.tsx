import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { FormControl, FormItem, FormLabel } from "../../ui/form";
import { Checkbox } from "../../ui/checkbox";

type Props = {
  cuisine: string;
  field: ControllerRenderProps<FieldValues, "cuisines">;
};

export const CuisineCheckbox = ({ cuisine, field }: Props) => {
  return (
    <FormItem className="flex flex-row items-center gap-2">
      <FormControl>
        <Checkbox
          className="h-4 w-4"
          checked={field.value?.includes(cuisine)}
          onCheckedChange={(checked) => {
            if (checked) {
              field?.onChange([...field.value, cuisine]);
            } else {
              field?.onChange(
                field.value?.filter((item: string) => item !== cuisine)
              );
            }
          }}
        />
      </FormControl>
      <FormLabel className="!m-0 text-base font-normal">{cuisine}</FormLabel>
    </FormItem>
  );
};

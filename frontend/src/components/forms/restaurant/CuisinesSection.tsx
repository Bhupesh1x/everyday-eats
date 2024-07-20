import { useFormContext } from "react-hook-form";

import { FormHeading } from "../FormHeading";
import { CuisineCheckbox } from "./CuisineCheckbox";
import { cuisineList } from "../../../constants/data";

import { FormField, FormItem, FormMessage } from "../../ui/form";

export const CuisinesSection = () => {
  const { control } = useFormContext();

  return (
    <div>
      <FormHeading
        title="Cuisines"
        subTitle="Select the cuisines that your restaurant serves"
      />

      <div className="mt-4">
        <FormField
          name="cuisines"
          control={control}
          render={({ field }) => (
            <FormItem>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-8">
                {cuisineList.map((cuisine) => (
                  <CuisineCheckbox
                    key={cuisine}
                    cuisine={cuisine}
                    field={field}
                  />
                ))}
              </div>

              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

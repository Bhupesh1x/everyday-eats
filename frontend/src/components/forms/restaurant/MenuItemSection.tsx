import { useFieldArray, useFormContext } from "react-hook-form";

import { FormHeading } from "../FormHeading";
import { MenuItemInput } from "./MenuItemInput";

import { Button } from "../../ui/button";
import { FormField, FormItem } from "../../ui/form";

export const MenuItemSection = () => {
  const { control } = useFormContext();

  const { fields, remove, append } = useFieldArray({
    name: "menuItems",
    control,
  });

  return (
    <div>
      <FormHeading
        title="Menu Item"
        subTitle="Create your meny and give each item a name and price"
      />

      <FormField
        name="menuItems"
        control={control}
        render={() => (
          <FormItem>
            {fields.map((_, index) => (
              <MenuItemInput
                key={index}
                index={index}
                removeItem={() => remove(index)}
              />
            ))}
          </FormItem>
        )}
      />
      <Button
        type="button"
        className="mt-4"
        onClick={() => append({ name: "", price: 0 })}
      >
        Add new
      </Button>
    </div>
  );
};

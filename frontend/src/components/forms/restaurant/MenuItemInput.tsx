import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Trash2 } from "lucide-react";

type Props = {
  index: number;
  removeItem: () => void;
};

export const MenuItemInput = ({ index, removeItem }: Props) => {
  const { control } = useFormContext();

  return (
    <div className="flex items-end gap-4 mt-4 w-full md:max-w-[50%]">
      <FormField
        control={control}
        name={`menuItems.${index}.name`}
        render={({ field }) => (
          <FormItem className="flex-1">
            <FormLabel>
              Name <FormMessage />
            </FormLabel>
            <FormControl>
              <Input {...field} placeholder="Pizza" />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={`menuItems.${index}.price`}
        render={({ field }) => (
          <FormItem className="flex-1">
            <FormLabel>
              Price <FormMessage />
            </FormLabel>
            <FormControl>
              <Input {...field} placeholder="10" type="number" min={0} />
            </FormControl>
          </FormItem>
        )}
      />

      <Button type="button" variant="destructive" onClick={removeItem}>
        <Trash2 className="h-5 w-5" />
      </Button>
    </div>
  );
};

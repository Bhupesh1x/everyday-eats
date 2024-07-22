import { z } from "zod";
import { Search } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem } from "./ui/form";

const formSchema = z.object({
  search: z.string().trim().min(1, "city name is required"),
});

export type SearchFormType = z.infer<typeof formSchema>;

type Props = {
  placeholder: string;
  onReset?: () => void;
  onSubmit: (data: SearchFormType) => void;
};

export const SearchBar = ({ onReset, onSubmit, placeholder }: Props) => {
  const form = useForm<SearchFormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: "",
    },
  });

  function handleReset() {
    form.reset({
      search: "",
    });

    if (onReset) {
      onReset();
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`group flex items-center border border-gray-400 shadow-md rounded-full py-1 px-3 md:mx-20 mx-4 focus-within:border-primary transition ${
          form.formState.errors?.search && "!border-red-500"
        }`}
      >
        <Search
          strokeWidth={2.5}
          size={30}
          className="text-primary hidden md:block"
        />

        <FormField
          name="search"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  {...field}
                  className="outline-none text-xl focus-visible:ring-0 border-none shadow-none"
                  placeholder={placeholder}
                />
              </FormControl>
            </FormItem>
          )}
        />
        {!!form.formState.isDirty && (
          <Button
            size="sm"
            type="button"
            variant="outline"
            className="rounded-full mr-2"
            onClick={handleReset}
          >
            Clear
          </Button>
        )}
        <Button size="sm" className="rounded-full">
          Search
        </Button>
      </form>
    </Form>
  );
};

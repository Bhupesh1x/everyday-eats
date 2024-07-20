import { useRef } from "react";
import { ImageIcon } from "lucide-react";
import { useFormContext } from "react-hook-form";

import { FormHeading } from "../FormHeading";

import { Input } from "../../ui/input";
import { FormControl, FormField, FormItem, FormMessage } from "../../ui/form";

export const ImageSection = () => {
  const { control, watch } = useFormContext();

  const inputRef = useRef<HTMLInputElement>(null);

  const imageFile = watch("imageFile");

  return (
    <div>
      <FormHeading
        title="Image"
        subTitle="Add an image that will be displayed on your restaurant listing in the search results.Adding a new image will override the existing one."
      />

      <FormField
        name="imageFile"
        control={control}
        render={({ field }) => (
          <FormItem className="mt-4 lg:max-w-[50%]">
            <FormControl>
              <Input
                ref={inputRef}
                className="hidden"
                type="file"
                accept=".jpg, .jpeg, .png"
                onChange={(e) =>
                  field.onChange(e.target.files ? e.target.files[0] : null)
                }
              />
            </FormControl>
            <div
              className="h-60 flex flex-col items-center justify-center bg-slate-200 rounded-md cursor-pointer border border-dashed border-slate-500"
              onClick={() => inputRef?.current?.click()}
            >
              <ImageIcon className="h-10 w-10 text-slate-500" />
              <p className="font-normal text-neutral-500">
                {imageFile ? imageFile?.name : "Choose a image"}
              </p>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

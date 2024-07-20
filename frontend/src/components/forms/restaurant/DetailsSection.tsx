import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";

import { FormHeading } from "../FormHeading";

export const DetailsSection = () => {
  const { control } = useFormContext();

  return (
    <div>
      <FormHeading
        title="Details"
        subTitle="Enter the details about your restaurant"
      />

      <div className="mt-4 space-y-4">
        <FormField
          name="name"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter restaurant name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            name="city"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter your city" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="country"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter your country" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            name="deliveryPrice"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Delivery Price (₹)</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="2.50" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="estimatedDeliveryTime"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estimated Delivery Time (minutes)</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="30" type="number" min={0} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
};

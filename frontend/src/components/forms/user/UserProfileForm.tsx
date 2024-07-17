import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";

import { LoadingButton } from "../../LoadingButton";

const formSchema = z.object({
  email: z.string().optional(),
  name: z.string().min(2, "Name should atleast have 2 characters"),
  address: z.string().min(6, "Address should be atleast have 6 characters"),
  city: z.string().min(3, "City should be atleast have 3 characters"),
  country: z.string().min(3, "Country should be atleast have 3 characters"),
});

type FormData = z.infer<typeof formSchema>;

type Props = {
  onSave: (formData: FormData) => void;
  isLoading: boolean;
};

const UserProfileForm = ({ isLoading, onSave }: Props) => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  return (
    <div className="lg:m-10 m-3 lg:p-10 p-5 bg-gray-200 rounded-md">
      <h1 className="text-2xl font-bold">User Profile</h1>
      <p className="text-sm text-muted-foreground">
        View and change your profile information here.
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSave)} className="space-y-4 mt-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} disabled className="bg-white" />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="bg-white"
                    placeholder="Enter your name"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-white"
                      placeholder="Enter your address"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-white"
                      placeholder="Enter your city"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-white"
                      placeholder="Enter your country"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="!mt-10">
            {isLoading ? <LoadingButton /> : <Button>Submit</Button>}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default UserProfileForm;

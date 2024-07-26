import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";

import { FormHeading } from "../FormHeading";

import { LoadingButton } from "../../LoadingButton";
import { UserFormData } from "../../../pages/UserProfile";

import { useGetUserDetails } from "../../../features/user/userQuery";

type Props = {
  title?: string;
  isDialog?: boolean;
  isLoading: boolean;
  buttonText?: string;
  onSave: (formData: UserFormData) => void;
  form: UseFormReturn<UserFormData, any, undefined>;
};

const UserProfileForm = ({
  form,
  title,
  onSave,
  isLoading,
  buttonText,
  isDialog = false,
}: Props) => {
  const { data: userDetails } = useGetUserDetails();

  useEffect(() => {
    if (userDetails) {
      form.reset({
        ...userDetails,
      });
    }
  }, [userDetails]);

  return (
    <div
      className={`${
        !isDialog ? "lg:m-10 m-3 lg:p-10 p-5 bg-slate-300 rounded-md" : ""
      }`}
    >
      <FormHeading
        title={title || "User Profile"}
        subTitle="View and change your profile information here."
      />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSave)} className="space-y-4 mt-4">
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
                <FormMessage />
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
                  <FormMessage />
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
                  <FormMessage />
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
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="!mt-10">
            {isLoading ? (
              <LoadingButton />
            ) : (
              <Button>{buttonText || "Submit"}</Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default UserProfileForm;

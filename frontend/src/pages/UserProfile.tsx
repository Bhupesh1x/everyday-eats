import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Layout from "../layouts/Layout";

import { useUpdateUser } from "../features/user/userQuery";

import UserProfileForm from "../components/forms/user/UserProfileForm";

export const userFormSchema = z.object({
  email: z.string().optional(),
  name: z.string().min(2, "Name should atleast have 2 characters"),
  address: z.string().min(6, "Address should be atleast have 6 characters"),
  city: z.string().min(3, "City should be atleast have 3 characters"),
  country: z.string().min(3, "Country should be atleast have 3 characters"),
});

export type UserFormData = z.infer<typeof userFormSchema>;

const defaultValues = {
  name: "",
  email: "",
  address: "",
  city: "",
  country: "",
};

function UserProfile() {
  const form = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
    defaultValues,
  });

  const mutation = useUpdateUser();

  const onSave = (data: UserFormData) => {
    if (form.formState.isDirty) {
      mutation.mutate(
        { ...data },
        {
          onError: () => {
            form.reset();
          },
        }
      );
    }
  };

  return (
    <Layout>
      <div className="container">
        <UserProfileForm
          form={form}
          onSave={onSave}
          isLoading={mutation.isLoading}
        />
      </div>
    </Layout>
  );
}

export default UserProfile;

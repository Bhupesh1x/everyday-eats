import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Layout from "../layouts/Layout";

import { useUpdateUser } from "../features/user/userQuery";

import UserProfileForm from "../components/forms/user/UserProfileForm";

const formSchema = z.object({
  email: z.string().optional(),
  name: z.string().min(2, "Name should atleast have 2 characters"),
  address: z.string().min(6, "Address should be atleast have 6 characters"),
  city: z.string().min(3, "City should be atleast have 3 characters"),
  country: z.string().min(3, "Country should be atleast have 3 characters"),
});

export type FormData = z.infer<typeof formSchema>;

const defaultValues = {
  name: "",
  email: "",
  address: "",
  city: "",
  country: "",
};

function UserProfile() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const mutation = useUpdateUser();

  const onSave = (data: FormData) => {
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

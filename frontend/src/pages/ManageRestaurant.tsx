import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Layout from "../layouts/Layout";

import { Form } from "../components/ui/form";

import {
  useCreateRestaurant,
  useGetRestaurant,
  useUpdateRestaurant,
} from "../features/my-restaurant/query";

import { ManageRestaurantForm } from "../components/forms/restaurant/ManageRestaurantForm";

const formSchema = z
  .object({
    name: z.string().min(2, "Name should atleast have 2 characters"),
    city: z.string().min(3, "City should atleast have 3 characters"),
    country: z.string().min(3, "City should atleast have 3 characters"),
    deliveryPrice: z.coerce.number({
      required_error: "delivery price is required",
      invalid_type_error: "must be a valid number",
    }),
    estimatedDeliveryTime: z.coerce.number({
      required_error: "Estimated delivery time is required",
      invalid_type_error: "must be a valid number",
    }),
    cuisines: z.array(z.string()).nonempty({
      message: "Please select atleast one item",
    }),
    menuItems: z.array(
      z.object({
        name: z.string().min(1, "Name is required"),
        price: z.coerce.number({
          required_error: "Price is required",
          invalid_type_error: "must be a number",
        }),
      })
    ),
    imageFile: z.instanceof(File).optional(),
    imageUrl: z.string().optional(),
  })
  .refine((data) => data.imageFile || data.imageUrl, {
    message: "Either image URL or image File must be provided",
    path: ["imageFile"],
  });

export type RestaurantFormData = z.infer<typeof formSchema>;

const defaultValues = {
  name: "",
  city: "",
  country: "",
  deliveryPrice: 0,
  estimatedDeliveryTime: 0,
  cuisines: [],
  menuItems: [{ name: "", price: 0 }],
};

function ManageRestaurant() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const mutation = useCreateRestaurant();
  const updateMutation = useUpdateRestaurant();

  const { isLoading, data: restaurantData } = useGetRestaurant();

  function onSave(data: FormData) {
    if (restaurantData?._id) {
      updateMutation.mutate(data);
    } else {
      mutation.mutate(data, {
        onSuccess() {
          form.reset();
        },
      });
    }
  }

  return (
    <Layout>
      <div className="lg:m-10 m-3 lg:p-10 p-5 bg-slate-300 rounded-md">
        <Form {...form}>
          <ManageRestaurantForm
            onSave={onSave}
            isLoading={
              mutation.isLoading || isLoading || updateMutation.isLoading
            }
            restaurantData={restaurantData}
          />
        </Form>
      </div>
    </Layout>
  );
}

export default ManageRestaurant;

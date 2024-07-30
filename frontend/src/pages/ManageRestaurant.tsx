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
import { useGetMyRestaurantOrders } from "../features/order/query";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Loader } from "../components/Loader";
import { OrderItemCard } from "../components/orders/OrderItemCard";
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

  const { isLoading: isLoadingOrders, data: orders } =
    useGetMyRestaurantOrders();

  if (isLoadingOrders) {
    return <Loader />;
  }

  return (
    <Layout>
      <div className="lg:m-10 m-3 lg:p-10 p-5 bg-slate-300 rounded-md">
        <Tabs defaultValue="orders">
          <TabsList>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="restaurant">Manage Restaurant</TabsTrigger>
          </TabsList>

          <TabsContent value="orders">
            <div className="mt-8">
              <h2 className="text-2xl font-bold tracking-tight">
                You have {orders?.length} active orders
              </h2>
              {orders?.map((order) => (
                <OrderItemCard order={order} key={order._id} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="restaurant">
            <Form {...form}>
              <ManageRestaurantForm
                onSave={onSave}
                isLoading={
                  mutation.isLoading || isLoading || updateMutation.isLoading
                }
                restaurantData={restaurantData}
              />
            </Form>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}

export default ManageRestaurant;

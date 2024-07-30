import Layout from "../layouts/Layout";

import { Loader } from "../components/Loader";

import { useGetMyOrders } from "../features/order/query";
import { OrderStatusHeader } from "../components/orders/OrderStatusHeader";
import { OrderStatusDetails } from "../components/orders/OrderStatusDetails";

function OrderStatusPage() {
  const { data: orders, isLoading } = useGetMyOrders();

  if (isLoading) {
    return <Loader />;
  }

  if (!orders || !orders.length) {
    return (
      <Layout>
        <p className="text-center text-2xl my-10">No orders found</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-10 container py-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="space-y-10 bg-slate-100 p-4 rounded-md"
          >
            <OrderStatusHeader
              status={order.status}
              time={order.createdAt}
              estimatedDeliveryTime={order.restaurant.estimatedDeliveryTime}
            />

            <div className="flex flex-col md:flex-row gap-5">
              <OrderStatusDetails order={order} />

              <div className="md:w-[50%]">
                <img
                  src={order.restaurant.imageUrl}
                  alt=""
                  className="h-full w-full object-cover rounded-md max-h-[310px]"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default OrderStatusPage;

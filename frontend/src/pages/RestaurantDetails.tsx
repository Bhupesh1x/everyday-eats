import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Layout from "../layouts/Layout";

import { useGetRestaurantById } from "../features/restaurant/query";

import { Loader } from "../components/Loader";
import { MenuItem } from "../components/restaurant/MenuItem";
import { OrderSummary } from "../components/restaurant/OrderSummary";
import { RestaurantInfo } from "../components/restaurant/RestaurantInfo";

export type CartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

function RestaurantDetails() {
  const params = useParams();
  const navigate = useNavigate();

  const {
    data: restaurant,
    isLoading,
    isError,
  } = useGetRestaurantById(params?.id);

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCartItems = sessionStorage.getItem(
      `cartItems-${restaurant?._id}`
    );

    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  function onAddCartItem(cartItem: CartItem) {
    const isItemExist = cartItems.findIndex(
      (item) => item._id === cartItem._id
    );

    if (isItemExist !== -1) {
      const items = [...cartItems];
      items[isItemExist] = {
        ...cartItem,
        quantity: items[isItemExist].quantity + 1,
      };

      sessionStorage.setItem(
        `cartItems-${restaurant?._id}`,
        JSON.stringify(items)
      );

      setCartItems(items);
    } else {
      const items = [...cartItems];
      items.push(cartItem);

      sessionStorage.setItem(
        `cartItems-${restaurant?._id}`,
        JSON.stringify(items)
      );
      setCartItems(items);
    }
  }

  function onRemoveCartItem(id: string) {
    setCartItems((prev) => {
      const items = prev.filter((item) => item._id !== id);

      sessionStorage.setItem(
        `cartItems-${restaurant?._id}`,
        JSON.stringify(items)
      );

      return items;
    });
  }

  if (isError || !restaurant) {
    navigate("/");
    return null;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Layout>
      <div className="container py-4">
        <div className="grid md:grid-cols-[5fr_3fr] gap-6">
          <div>
            {/* Image */}
            <div className="aspect-video max-h-[450px] w-full">
              <img
                src={restaurant.imageUrl}
                alt=""
                className="h-full w-full object-cover rounded-md"
              />
            </div>
            <div className="block md:hidden my-6">
              <RestaurantInfo restaurant={restaurant} />
            </div>
            {/* Menu Cards */}
            <h1 className="my-6 text-2xl font-semibold tracking-tight">Menu</h1>
            {restaurant.menuItems?.map((menu) => (
              <MenuItem
                key={menu._id}
                _id={menu._id}
                name={menu.name}
                price={menu.price}
                onAddCartItem={onAddCartItem}
              />
            ))}
          </div>

          <div>
            <div className="hidden md:block">
              <RestaurantInfo restaurant={restaurant} />
            </div>
            <OrderSummary
              cartItems={cartItems}
              restaurantId={restaurant._id}
              onRemoveCartItem={onRemoveCartItem}
              deliveryPrice={restaurant.deliveryPrice}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default RestaurantDetails;

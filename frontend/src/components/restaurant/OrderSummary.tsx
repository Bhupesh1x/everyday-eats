import { useMemo } from "react";
import { Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

import { useAuth } from "../../contexts/AuthContext";

import { CheckoutButton } from "./CheckoutButton";
import { UserFormData } from "../../pages/UserProfile";
import { CartItem } from "../../pages/RestaurantDetails";

import { useCreateCheckoutSession } from "../../features/order/query";

type Props = {
  restaurantId: string;
  deliveryPrice: number;
  cartItems: CartItem[];
  onRemoveCartItem: (id: string) => void;
};

export const OrderSummary = ({
  restaurantId,
  deliveryPrice,
  cartItems,
  onRemoveCartItem,
}: Props) => {
  const { isLoading, isLoggedIn } = useAuth();

  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/sign-in", { state: { from: `/restaurant/${restaurantId}` } });
  };

  const totalPrice = useMemo(() => {
    const data = cartItems.reduce((acc, curr) => {
      acc += (curr.price * curr.quantity) / 100;
      return acc;
    }, 0);

    return data + deliveryPrice / 100;
  }, [cartItems, deliveryPrice]);

  const mutation = useCreateCheckoutSession();

  const onSave = (data: UserFormData) => {
    const checkoutData = {
      restaurantId,
      cartItems: cartItems.map((item) => ({
        name: item.name,
        menuItemId: item._id,
        quantity: item.quantity.toString(),
      })),
      deliveryDetails: {
        name: data.name,
        city: data.city,
        email: data.email!,
        address: data.address,
      },
    };
    mutation.mutate(checkoutData, {
      onSuccess: ({ url }) => {
        window.location.href = url;
      },
    });
  };

  return (
    <div className="border border-borderPrimary shadow-md rounded-md p-5 h-fit md:mt-8 space-y-4">
      <div className="flex items-center justify-between text-2xl font-bold tracking-tight">
        <p>Your Order</p>
        <p>₹ {totalPrice.toFixed(2)}</p>
      </div>
      <Separator />
      {cartItems.map((cartItem) => (
        <div key={cartItem._id} className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="border-borderPrimary h-7 w-7 border rounded-md flex items-center justify-center">
              {cartItem.quantity}
            </span>
            <span>{cartItem.name}</span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onRemoveCartItem(cartItem._id)}
            >
              <Trash className="size-5 text-red-500 hover:text-red-500/60 transition" />
            </Button>
            <p className="min-w-14 text-right">
              ₹ {((cartItem.price * cartItem.quantity) / 100).toFixed(2)}
            </p>
          </div>
        </div>
      ))}

      <div className="flex items-center justify-between text-muted-foreground font-normal">
        <p>Delivery</p>
        <p>₹ {(deliveryPrice / 100).toFixed(2)}</p>
      </div>

      <Separator className="m-0 p-0" />

      {isLoggedIn && !isLoading ? (
        <CheckoutButton
          onSave={onSave}
          disabled={!cartItems.length}
          isLoading={mutation.isLoading}
        />
      ) : (
        <Button className="w-full" onClick={goToLogin}>
          Login
        </Button>
      )}
    </div>
  );
};

import { Button } from "../ui/button";
import { CartItem } from "../../pages/RestaurantDetails";

type Props = {
  _id: string;
  name: string;
  price: number;
  onAddCartItem: (cartItem: CartItem) => void;
};

export const MenuItem = ({ _id, name, price, onAddCartItem }: Props) => {
  return (
    <div className="border border-borderPrimary shadow-md rounded-md p-5 h-fit my-4 space-y-8">
      <h1 className="text-xl font-semibold tracking-tight">{name}</h1>

      <div className="flex items-center justify-between">
        <p className="font-normal">₹ {(price / 100).toFixed(2)}</p>
        <Button
          variant="primary"
          className="w-24"
          onClick={() => onAddCartItem({ _id, name, price, quantity: 1 })}
        >
          Add
        </Button>
      </div>
    </div>
  );
};

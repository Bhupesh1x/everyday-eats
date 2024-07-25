import { Banknote, Clock } from "lucide-react";

import { RestaurantType } from "../../types";

type Props = {
  restaurant: RestaurantType;
};

export const RestaurantInfo = ({ restaurant }: Props) => {
  return (
    <div className="border border-borderPrimary shadow-md rounded-md p-5 h-fit">
      <h1 className="text-3xl font-semibold tracking-tight">
        {restaurant.name}
      </h1>
      <p className="text-muted-foreground capitalize">
        {restaurant.city}, {restaurant.country}
      </p>

      <div className="mt-6">{restaurant.cuisines.join(" • ")}</div>

      <div className="mt-6 flex flex-col gap-6 w-full">
        <div className="flex items-center gap-2">
          <Clock className="text-green-500" />
          <p className="text-green-500">
            {restaurant.estimatedDeliveryTime} mins
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Banknote />
          Delivery From ₹{(restaurant.deliveryPrice / 100).toFixed(2)}
        </div>
      </div>
    </div>
  );
};

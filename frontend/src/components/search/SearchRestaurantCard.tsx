import { Link } from "react-router-dom";
import { Banknote, Clock } from "lucide-react";

import { RestaurantType } from "../../types";

type Props = {
  restaurant: RestaurantType;
};

export const SearchRestaurantCard = ({ restaurant }: Props) => {
  return (
    <Link to={`/restaurant/${restaurant._id}`} className="group">
      <div className="border shadow-sm p-2 flex flex-col gap-4 lg:flex-row rounded-md my-6 cursor-pointer">
        <div className="aspect-video lg:w-[40%] max-h-[150px] ">
          <img
            src={restaurant.imageUrl}
            alt="restaurant-image"
            className="object-cover rounded-md h-full w-full"
          />
        </div>

        <div className="lg:w-[60%] flex-col justify-between h-full lg:space-y-7 px-2">
          <h1 className="text-2xl font-bold tracking-tight group-hover:underline">
            {restaurant.name}
          </h1>
          <p className="my-3 flex-wrap">{restaurant.cuisines.join(" • ")}</p>

          <div className="flex items-center justify-between w-full">
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
      </div>
    </Link>
  );
};

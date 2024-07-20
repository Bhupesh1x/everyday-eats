export type UserType = {
  _id: string;
  city?: string;
  name: string;
  email: string;
  avatar?: string;
  address?: string;
  country?: string;
};

export type RestaurantType = {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  city: string;
  country: string;
  deliveryPrice: number;
  estimatedDeliveryTime: number;
  imageUrl: string;
  cuisines: string[];
  menuItems: { _id: string; name: string; price: number }[];
};

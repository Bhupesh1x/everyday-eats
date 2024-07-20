import { useFormContext } from "react-hook-form";

import { Button } from "../../ui/button";
import { Separator } from "../../ui/separator";

import { ImageSection } from "./ImageSection";
import { DetailsSection } from "./DetailsSection";
import { MenuItemSection } from "./MenuItemSection";
import { CuisinesSection } from "./CuisinesSection";

import { LoadingButton } from "../../LoadingButton";

import { RestaurantFormData } from "../../../pages/ManageRestaurant";

type Props = {
  isLoading: boolean;
  onSave: (formData: FormData) => void;
};

export const ManageRestaurantForm = ({ isLoading, onSave }: Props) => {
  const form = useFormContext<RestaurantFormData>();

  const onSubmit = (data: RestaurantFormData) => {
    const formData = new FormData();

    formData.append("name", data.name || "");
    formData.append("city", data.city || "");
    formData.append("country", data.country || "");
    formData.append(
      "deliveryPrice",
      (data.deliveryPrice * 100).toString() ?? ""
    );
    formData.append(
      "estimatedDeliveryTime",
      data.estimatedDeliveryTime.toString() ?? ""
    );

    data.cuisines.forEach((cuisine, index) => {
      formData.append(`cuisines[${index}]`, cuisine);
    });

    data.menuItems.forEach(({ name, price }, index) => {
      formData.append(`menuItems[${index}][name]`, name);
      formData.append(
        `menuItems[${index}][price]`,
        (price * 100).toString() ?? ""
      );
    });

    formData.append("imageFile", data.imageFile);

    onSave(formData);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <DetailsSection />
      <Separator />
      <CuisinesSection />
      <Separator />
      <MenuItemSection />
      <Separator />
      <ImageSection />

      {isLoading ? <LoadingButton /> : <Button type="submit">Submit</Button>}
    </form>
  );
};

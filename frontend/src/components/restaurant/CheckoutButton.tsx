import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

import UserProfileForm from "../forms/user/UserProfileForm";

import { UserFormData, userFormSchema } from "../../pages/UserProfile";

type Props = {
  disabled: boolean;
};

const defaultValues = {
  name: "",
  email: "",
  address: "",
  city: "",
  country: "",
};

export const CheckoutButton = ({ disabled }: Props) => {
  const form = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
    defaultValues,
  });

  const onSave = (data: UserFormData) => {
    console.log("da", data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full" disabled={disabled}>
          Go To Checkout
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="hidden"></DialogTitle>
        {!disabled && (
          <UserProfileForm
            isDialog
            form={form}
            onSave={onSave}
            isLoading={false}
            title="Confirm delivery details"
            buttonText="Continue to payment"
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

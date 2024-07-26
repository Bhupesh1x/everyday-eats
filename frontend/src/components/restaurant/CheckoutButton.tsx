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
  isLoading: boolean;
  onSave: (formData: UserFormData) => void;
};

const defaultValues = {
  name: "",
  email: "",
  address: "",
  city: "",
  country: "",
};

export const CheckoutButton = ({ disabled, onSave, isLoading }: Props) => {
  const form = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
    defaultValues,
  });

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
            isLoading={isLoading}
            title="Confirm delivery details"
            buttonText="Continue to payment"
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

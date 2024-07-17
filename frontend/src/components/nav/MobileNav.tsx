import { Menu } from "lucide-react";
import { Link } from "react-router-dom";

import { useLogout } from "../../features/auth/api/useLogout";

import { Separator } from "../ui/separator";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";

type Props = {
  isLoggedIn: boolean;
};

export const MobileNav = ({ isLoggedIn }: Props) => {
  const mutation = useLogout();

  function onLogout() {
    mutation.mutate();
  }

  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="h-6 w-6 text-primary hover:text-primary/60 transition" />
      </SheetTrigger>
      <SheetContent className="p-0 py-3 px-2">
        <SheetTitle className="mb-2">Welcome to Everydat-Eats</SheetTitle>
        <Separator />
        <div className="mt-4">
          <p className="p-2 font-normal text-neutral-700 rounded-md hover:bg-gray-200 hover:text-primary transition cursor-pointer">
            {isLoggedIn ? (
              <p onClick={onLogout}>Log Out</p>
            ) : (
              <Link to="/sign-in">
                <p>Log In</p>
              </Link>
            )}
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
};

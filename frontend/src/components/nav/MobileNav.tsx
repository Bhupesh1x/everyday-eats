import { Menu } from "lucide-react";
import { Link } from "react-router-dom";

import { navOptions } from "../../lib/constants";

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
        <div className="mt-2">
          {isLoggedIn ? (
            <div className="flex flex-col gap-3">
              {navOptions.map((option) => (
                <Link key={option.link} to={option.link}>
                  <p className="p-2 font-normal text-neutral-700 rounded-md hover:bg-gray-200 hover:text-primary transition cursor-pointer">
                    {option.name}
                  </p>
                </Link>
              ))}
              <p
                onClick={onLogout}
                className="p-2 font-normal text-neutral-700 rounded-md hover:bg-gray-200 hover:text-primary transition cursor-pointer"
              >
                Log Out
              </p>
            </div>
          ) : (
            <Link to="/sign-in">
              <p className="p-2 font-normal text-neutral-700 rounded-md hover:bg-gray-200 hover:text-primary transition cursor-pointer">
                Log In
              </p>
            </Link>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

import { Link } from "react-router-dom";

import { Button } from "../ui/button";

import { UserDropdown } from "./UserDropdown";

import { useLogout } from "../../features/auth/api/useLogout";

type Props = {
  isLoggedIn: boolean;
};

export const MainNav = ({ isLoggedIn }: Props) => {
  const mutation = useLogout();

  function onLogout() {
    mutation.mutate();
  }

  return (
    <>
      {isLoggedIn ? (
        <div className="flex items-center gap-1">
          <Link to="/order-status">
            <Button variant="ghost" className="hover:text-primary transition">
              Order Status
            </Button>
          </Link>
          <UserDropdown onLogout={onLogout} />
        </div>
      ) : (
        <Button variant="ghost" className="hover:text-primary transition">
          <Link to="/sign-in">
            <p>Log In</p>
          </Link>
        </Button>
      )}
    </>
  );
};

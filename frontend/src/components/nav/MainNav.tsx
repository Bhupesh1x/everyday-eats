import { Link } from "react-router-dom";

import { Button } from "../ui/button";

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
      <Link to="/sign-in">
        <Button variant="ghost" className="hover:text-primary transition">
          {isLoggedIn ? (
            <p onClick={onLogout}>Log Out</p>
          ) : (
            <Link to="/sign-in">
              <p>Log In</p>
            </Link>
          )}
        </Button>
      </Link>
    </>
  );
};

import { Link } from "react-router-dom";

import { Button } from "../ui/button";

type Props = {
  isLoggedIn: boolean;
};

export const MainNav = ({ isLoggedIn }: Props) => {
  return (
    <>
      <Link to="/sign-in">
        <Button variant="ghost" className="hover:text-primary transition">
          {isLoggedIn ? "Log Out" : "Log In"}
        </Button>
      </Link>
    </>
  );
};

import { Link } from "react-router-dom";

import { Button } from "../ui/button";

export const MainNav = () => {
  return (
    <>
      <Link to="/sign-in">
        <Button variant="ghost" className="hover:text-primary transition">
          Log In
        </Button>
      </Link>
    </>
  );
};

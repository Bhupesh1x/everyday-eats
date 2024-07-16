import { Link } from "react-router-dom";

import { MainNav } from "./nav/MainNav";
import { MobileNav } from "./nav/MobileNav";

import { useAuth } from "../contexts/AuthContext";

type Props = {
  showLinks?: boolean;
};

export const Header = ({ showLinks }: Props) => {
  const { isLoggedIn } = useAuth();

  return (
    <div className="border-2 border-b-primary flex items-center justify-between min-h-[60px] container">
      <Link to="/">
        <h1 className="text-xl font-bold text-primary tracking-tight cursor-pointer">
          Everyday-Eats
        </h1>
      </Link>

      {!!showLinks && (
        <>
          <div className="block md:hidden">
            <MobileNav isLoggedIn={isLoggedIn} />
          </div>

          <div className="hidden md:block">
            <MainNav isLoggedIn={isLoggedIn} />
          </div>
        </>
      )}
    </div>
  );
};

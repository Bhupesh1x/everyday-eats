import { Link } from "react-router-dom";

import { MainNav } from "./nav/MainNav";
import { MobileNav } from "./nav/MobileNav";

export const Header = () => {
  return (
    <div className="border-2 border-b-primary flex items-center justify-between h-[60px] container">
      <Link to="/">
        <h1 className="text-xl font-bold text-primary tracking-tight cursor-pointer">
          Everyday-Eats
        </h1>
      </Link>

      <div className="block md:hidden">
        <MobileNav />
      </div>

      <div className="hidden md:block">
        <MainNav />
      </div>
    </div>
  );
};

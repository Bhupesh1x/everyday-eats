import { Link } from "react-router-dom";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

type Props = {
  onLogout: () => void;
};

export const UserDropdown = ({ onLogout }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <img
          src="/placeholder.jpg"
          alt="user-img"
          className="h-10 w-10 rounded-full cursor-pointer bg-gray-100 p-1  hover:bg-gray-200 transition"
          title="User Profile"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col gap-3 min-w-[200px] mr-5">
        <Link to="/user-profile">
          <p className="p-2 font-normal text-neutral-700 rounded-md hover:bg-gray-200 hover:text-primary transition cursor-pointer">
            User Profile
          </p>
        </Link>
        <Link to="/my-restaurant">
          <p className="p-2 font-normal text-neutral-700 rounded-md hover:bg-gray-200 hover:text-primary transition cursor-pointer">
            My Restaurnat
          </p>
        </Link>
        <p
          className="p-2 font-normal text-neutral-700 rounded-md hover:bg-gray-200 hover:text-primary transition cursor-pointer"
          onClick={onLogout}
        >
          Logout
        </p>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

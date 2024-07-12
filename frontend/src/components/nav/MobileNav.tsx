import { Menu } from "lucide-react";

import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";

export const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="h-6 w-6 text-primary hover:text-primary/60 transition" />
      </SheetTrigger>
      <SheetContent>
        <SheetTitle className="mb-2">Welcome to Everydat-Eats</SheetTitle>
        <Separator />
        <div className="mt-4">
          <Button className="w-full text-white">Log In</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

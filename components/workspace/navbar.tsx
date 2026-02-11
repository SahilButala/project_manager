import React from "react";
import { Button } from "../ui/button";
import { Bell, LogOut } from "lucide-react";
import { ThemeToggle } from "../theme-toggle";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ProfileAvatar } from "../project/profile-avatar";
import { Separator } from "../ui/separator";
interface Props {
  id: string;
  name: string;
  email: string;
  image: string;
}

const Navbar = ({name , image , id , email}: Props) => {
  return (
    <nav className="flex items-center justify-between w-full p-4    ">
      <div className="flex gap-4">
        <h3 className="text-2x font-medium">Home</h3>
        <span className="text-sm text-muted-foreground">
          Lorem ipsum dolor sit amet.
        </span>
      </div>

      <div className="flex gap-3">
        <Button variant={"ghost"}>
          <Bell />
        </Button>

        <ThemeToggle />

        <Popover>
            <PopoverTrigger>
                <ProfileAvatar
                 url={image || undefined || ""}
                 name={name || "User"}

                >

                </ProfileAvatar>
            </PopoverTrigger>

            <PopoverContent>
                <div className="mb-4">
                    <h2 className="text-lg font-semibold">{name}</h2>
                    <p className="text-sm text-muted-foreground ">{email}</p>


                </div>

                    <Separator/>
        <Button className="mt-3" variant={"outline"} asChild>
          <LogoutLink>Log out</LogoutLink>
        </Button>
            </PopoverContent>
        </Popover>
      </div>
    </nav>
  );
};

export default Navbar;

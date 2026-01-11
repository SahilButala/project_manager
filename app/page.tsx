import { Button } from "@/components/ui/button";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import React from "react";

const Home = async () => {
  const { isAuthenticated } = getKindeServerSession();

  const isLoggedIn = await isAuthenticated();

  return (
    <div className="w-full h-screen flex justify-center  items-center flex-col ">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl  font-bold tracking-tight">
            <p>Your Personal Working Space</p>

            <p className="text-5xl md:text-6xl">
              for <span className="text-blue-400">better productivity</span>
            </p>
          </h1>

          <p className="mt-4  text-base text-muted-foreground max-w-187.5  text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum optio
            harum repudiandae praesentium incidunt perspiciatis explicabo
            quaerat, laudantium vitae vero facilis delectus voluptas impedit,
            odit officiis aliquid sed rem doloribus excepturi quos.
          </p>

          <div className="flex gap-4 mt-4 items-center justify-center">
            {isLoggedIn ? (
              <>
              <Button asChild>
                <Link href={"/workspace"}>
                Go to Workspace
                </Link>
              </Button>
              </>
            ) : (
              <>
                <Button>
                  <RegisterLink>Get Started</RegisterLink>
                </Button>

                <Button asChild variant={"outline"}>
                  <LoginLink>Sign in</LoginLink>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
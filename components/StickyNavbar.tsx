"use client";
import React, { useEffect } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  Card,
} from "@material-tailwind/react";
import Link from "next/link";


import { useContext } from "react";
import { UserContext } from "@/context/userContext/userContext";
import { UserType } from "@/types/userData";
import LogOutButton from "./LogOutButton";
export function StickyNavbar() {
  const [openNav, setOpenNav] = React.useState(false);
  const { user }:any = useContext<UserType | undefined>(UserContext);
  console.log(useContext<UserType | undefined>(UserContext));

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link onClick={()=>setOpenNav(false)} aria-label={`Topics`} href="/users" className="flex items-center">
          Users
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link onClick={()=>setOpenNav(false)} aria-label={`all-Topics`} href="/dashboard" className="flex items-center">
        dashboard
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link onClick={()=>setOpenNav(false)} aria-label={`Blocks`} href="#" className="flex items-center">
          Blocks
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link onClick={()=>setOpenNav(false)} aria-label={`Docs`} href="#" className="flex items-center">
          Docs
        </Link>
      </Typography>
    </ul>
  );

  return (
    <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Link onClick={()=>setOpenNav(false)} aria-label={`Next-JS`} href="/">
          <Typography className="mr-4 cursor-pointer py-1.5 font-medium">
            Next JS
          </Typography>
        </Link>
        <div className="flex items-center gap-4">
          <div className="mr-4 hidden lg:block">{navList}</div>


          {user? 
<>

<LogOutButton/>
</>
: 

<>

<Link onClick={()=>setOpenNav(false)} aria-label={`Docs`} href="/registration/login" className="flex items-center">
          <Button
            variant="gradient"
            size="sm"
            className="hidden lg:inline-block"
          >
            <span>Log in</span>
          </Button>
          </Link>

</>
                 }       

          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
            aria-label={openNav ? "Close navigation" : "Open navigation"}
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </IconButton>
        </div>
      </div>
      <Collapse open={openNav}>
        {navList}

{user? 
<>

<LogOutButton/>
</>


:
<>

<Link aria-label={`Docs`} href="/registration/login" className="flex items-center">
        <Button onClick={()=>setOpenNav(false)} variant="gradient" size="sm" fullWidth className="mb-2">
          <span>Log In</span>
        </Button>
        </Link>
</>


}



      </Collapse>
    </Navbar>
  );
}

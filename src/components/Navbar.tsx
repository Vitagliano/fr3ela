"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "./Button";
import { useAuthActions } from "@/context/AuthContext";

const navigation = [
  { title: "Customers", path: "/" },
  { title: "Careers", path: "/" },
  { title: "Guides", path: "/" },
  { title: "Partners", path: "/" },
];

const navigationItems = navigation.map((item, idx) => (
  <li key={idx} className="text-gray-600 hover:text-indigo-600">
    <Link href={item.path}>{item.title}</Link>
  </li>
));

const userNavigation = [
  { title: "Your Profile", path: "/" },
  { title: "Settings", path: "/" },
  { title: "Sign out", path: "/" },
];

const userNavigationItems = userNavigation.map((item, idx) => (
  <li key={idx}>
    <Link
      className="block text-gray-600 hover:text-gray-900 lg:hover:bg-gray-50 lg:p-3"
      href={item.path}
    >
      {item.title}
    </Link>
  </li>
));

const AvatarMenu = () => {
  const [state, setState] = useState(false);
  const { signOut } = useAuthActions();

  return (
    <div className="relative border-t lg:border-none">
      <div className="">
        <button
          className="hidden w-10 h-10 outline-none rounded-full ring-offset-2 ring-gray-200 lg:focus:ring-2 lg:block"
          onClick={() => setState(!state)}
        >
          <img
            src="https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg"
            className="w-full h-full rounded-full"
          />
        </button>
      </div>
      <ul
        className={`bg-white top-14 right-0 mt-6 space-y-6 lg:absolute lg:border lg:rounded-md lg:w-52 lg:shadow-md lg:space-y-0 lg:mt-0 ${
          state ? "" : "lg:hidden"
        }`}
      >
        {userNavigationItems}
        <Button
          onClick={signOut}
          className="block w-full text-justify !text-gray-600 hover:text-gray-900 border-t py-3 lg:hover:!bg-gray-50 lg:p-3 !bg-transparent !rounded-none !rounded-b-md"
        >
          Logout
        </Button>
      </ul>
    </div>
  );
};

export const Navbar = () => {
  return (
    <>
      {navigationItems}
      <AvatarMenu />
    </>
  );
};

export default Navbar;

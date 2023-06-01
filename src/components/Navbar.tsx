"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "./Button";
import { useAuth, useAuthActions } from "@/context/Auth";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import ConnectWallet from "./auth/ConnectWallet";

const navigation = [
  { title: "Home", path: "/" },
  { title: "Post Gig", path: "/gig/new" }
];

const navigationItems = navigation.map((item, idx) => (
  <li key={idx} className="text-gray-600 hover:text-indigo-600">
    <Link href={item.path}>{item.title}</Link>
  </li>
));



export const Navbar = () => {
  const { user } = useAuth();

  return (
    <>
      {navigationItems}
      <ConnectWallet />
    </>
  );
};

export default Navbar;

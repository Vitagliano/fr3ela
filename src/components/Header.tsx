"use client";
import { useAuth } from "@/context/Auth";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { sendEmailVerification } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Banner from "./Banner";
import { Button } from "./Button";
import Navbar from "./Navbar";
import Searchbar from "./Searchbar";
import Subnav from "./Subnav";
import EmailVerificationBanner from "./EmailVerificationBanner";

export const Header = () => {
  
  const [state, setState] = useState(false);
  const { user } = useAuth();

  const isUnverified = user?.emailVerified === false; 

  return (
    <>
      {isUnverified ? (
        <EmailVerificationBanner
          sendEmailVerification={() => sendEmailVerification(user)}
        />
      ) : null}
      <header className="bg-white text-base lg:text-sm">
        <div
          className={clsx(
            "items-center gap-x-14 px-4 max-w-screen-xl mx-auto lg:flex lg:px-8 lg:static",
            state && "h-full fixed inset-x-0"
          )}
        >
          <div className="flex items-center justify-between py-3 lg:py-5 lg:block">
            <Link href="/">
              <Image
                src="https://www.floatui.com/logo.svg"
                width={120}
                height={50}
                alt="Float UI logo"
              />
            </Link>
            <div className="lg:hidden">
              <Button
                className="text-gray-500 hover:text-gray-800"
                onClick={() => setState(!state)}
              >
                {state ? (
                  <XMarkIcon className="w-6 h-6" />
                ) : (
                  <Bars3Icon className="w-6 h-6" />
                )}
              </Button>
            </div>
          </div>
          <div
            className={clsx(
              "nav-menu flex-1 pb-28 mt-8 overflow-y-auto max-h-screen lg:block lg:overflow-visible lg:pb-0 lg:mt-0",
              !state && "hidden"
            )}
          >
            <ul className="items-center space-y-6 lg:flex lg:space-x-6 lg:space-y-0">
              <Searchbar />
              <Navbar />
            </ul>
          </div>
        </div>
        <nav className="border-b">
          <Subnav />
        </nav>
      </header>
    </>
  );
};

export default Header;

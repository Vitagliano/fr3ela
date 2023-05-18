"use client";
import { useState } from "react";
import Searchbar from "./Searchbar";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { Button } from "./Button";
import Link from "next/link";
import Navbar from "./Navbar";
import Subnav from "./Subnav";
import Banner from "./Banner";
import { useAuth } from "@/context/Auth";
import { sendEmailVerification } from "firebase/auth";

export const Header = () => {
  const [state, setState] = useState(false);
  const { user } = useAuth();

  const isVerified =
    user?.emailVerified === false ? (
      <Banner
        buttonLink="/"
        bannerText="You need to verify your e-mail!"
        buttonText="Click here to send <a href='/'>verification</a>"
        close={false}
        variant="default"
      >
        You need to verify your e-mail! Click here to send{" "}
        <Button
          className="font-semibold underline duration-150 hover:text-indigo-100 inline-flex items-center gap-x-1 !p-0"
          onClick={() => sendEmailVerification(user)}
        >
          verification
        </Button>
        .
      </Banner>
    ) : null;

  console.log(user);

  return (
    <>
      {isVerified}
      <header className="bg-white text-base lg:text-sm">
        <div
          className={`items-center gap-x-14 px-4 max-w-screen-xl mx-auto lg:flex lg:px-8 lg:static ${
            state ? "h-full fixed inset-x-0" : ""
          }`}
        >
          <div className="flex items-center justify-between py-3 lg:py-5 lg:block">
            <Link href="/">
              <img
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
            className={`nav-menu flex-1 pb-28 mt-8 overflow-y-auto max-h-screen lg:block lg:overflow-visible lg:pb-0 lg:mt-0 ${
              state ? "" : "hidden"
            }`}
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

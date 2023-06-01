"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import { useAuthActions } from "@/context/Auth";
import {
  ArrowRightOnRectangleIcon,
  UserIcon,
  WalletIcon,
  WrenchIcon
} from "@heroicons/react/24/solid";
import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import { Button } from "../Button";
import ThemeSwitcher from "../ThemeSwitcher";

type Account = Exclude<
  Parameters<
    Parameters<typeof ConnectButton.Custom>[0]["children"]
  >[0]["account"],
  undefined
>;

const userNavigation = [
  {
    title: "Profile",
    path: "/profile",
    icon: <UserIcon className="w-6 h-6" />
  },
  {
    title: "Settings",
    path: "/settings",
    icon: <WrenchIcon className="w-6 h-6" />
  }
];

const userNavigationItems = userNavigation.map((item, idx) => (
  <li key={idx}>
    <Link
      className="flex items-center gap-3 font-semibold text-gray-600 hover:text-gray-900 lg:hover:bg-gray-100 lg:p-3"
      href={item.path}
    >
      {item.icon} {item.title}
    </Link>
  </li>
));

const UserMenu = ({ account }: { account: Account }) => {
  const [state, setState] = useState(false);
  const { signOut } = useAuthActions();

  return (
    <div className="relative border-t lg:border-none">
      <Button
        className="px-4 cursor-pointer !border-gray-200 flex items-center !text-gray-600 !font-bold border justify-center gap-x-3 py-2.5 hover:!bg-gray-100 !bg-gray-50 !rounded-r-xl rounded-none duration-150 "
        type="button"
        onClick={() => setState(!state)}
      >
        <Jazzicon diameter={24} seed={jsNumberForAddress(account.address)} />
      </Button>
      <ul
        className={clsx(
          "bg-gray-50 overflow-hidden top-14 right-0 mt-6 space-y-6 lg:absolute lg:border lg:rounded-xl lg:w-52 lg:shadow-md lg:space-y-0 lg:mt-0",
          !state && "lg:hidden"
        )}
      >
        {userNavigationItems}
        <ThemeSwitcher />
        <Button
          onClick={signOut}
          className="flex w-full items-center gap-3 font-semibold !text-gray-600 hover:!text-gray-900 py-3 lg:hover:!bg-gray-100 lg:p-3 !bg-transparent !rounded-none !rounded-b-md"
        >
          <ArrowRightOnRectangleIcon className="w-6 h-6" /> Logout
        </Button>
      </ul>
    </div>
  );
};

export const ConnectWallet = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");
        console.log("Ready & connected!", connected ? "Yes" : "No");
        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none"
              }
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <div className="inline-flex">
                    <div>
                      <Button
                        className="w-full !border-gray-200 hover:!bg-gray-100 flex items-center !text-gray-600 !font-bold border-y border-l border-r-0 justify-center gap-x-3 py-2.5 !bg-gray-50 !rounded-l-xl rounded-none duration-150 "
                        onClick={openConnectModal}
                        type="button"
                      >
                        <WalletIcon className="w-6 h-6" />
                        Connect Wallet
                      </Button>
                    </div>
                    <Button
                      className="px-4 cursor-pointer hover:!bg-gray-100 !border-gray-200 flex items-center !text-gray-600 !font-bold border justify-center gap-x-3 py-2.5 !bg-gray-50 !rounded-r-xl rounded-none duration-150 "
                      type="button"
                      onClick={openConnectModal}
                    >
                      <UserIcon className="w-6 h-6" />
                    </Button>
                  </div>
                );
              }

              if (chain.unsupported) {
                return (
                  <Button
                    className="w-full flex items-center justify-center gap-x-3 py-2.5 border rounded-lg duration-150 "
                    onClick={openChainModal}
                    type="button"
                  >
                    Wrong Network
                  </Button>
                );
              }

              return (
                <div className="inline-flex">
                  <div>
                    <Button
                      className="w-full !border-gray-200 hover:!bg-gray-100 flex items-center !text-gray-600 !font-bold border-y border-l border-r-0 justify-center gap-x-3 py-2.5 !bg-gray-50 !rounded-l-xl rounded-none duration-150 "
                      onClick={openAccountModal}
                      type="button"
                    >
                      <WalletIcon className="w-6 h-6" />
                      {account.displayName}
                    </Button>
                  </div>
                  <UserMenu account={account} />
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default ConnectWallet;

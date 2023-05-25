"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import { Button } from "../Button";

export const LoginWithWallet = () => {
  return (
    // <Button className="w-full flex items-center justify-center gap-x-3 py-2.5 border rounded-lg bg-gray-50 hover:bg-gray-100 duration-150 active:bg-gray-100 text-neutral-700">
    //   <GoogleIcon />
    //   Continue with Google
    // </Button>
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
                  <Button
                    className="w-full flex items-center justify-center gap-x-3 py-2.5 border rounded-lg bg-gray-50 hover:bg-gray-100 duration-150 active:bg-gray-100 text-neutral-700"
                    onClick={openConnectModal}
                    type="button"
                  >
                    Connect with Wallet
                  </Button>
                );
              }

              if (chain.unsupported) {
                return (
                  <Button
                    className="w-full flex items-center justify-center gap-x-3 py-2.5 border rounded-lg bg-gray-50 hover:bg-gray-100 duration-150 active:bg-gray-100 text-neutral-700"
                    onClick={openChainModal}
                    type="button"
                  >
                    Wrong network
                  </Button>
                );
              }

              return (
                <Button
                  className="w-full flex items-center justify-center gap-x-3 py-2.5 border rounded-lg bg-gray-50 hover:bg-gray-100 duration-150 active:bg-gray-100 text-neutral-700"
                  onClick={openAccountModal}
                  type="button"
                >
                  {account.displayName}
                  {account.displayBalance ? ` (${account.displayBalance})` : ""}
                </Button>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default LoginWithWallet;

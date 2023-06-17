"use client";
import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import {
  arbitrum,
  avalanche,
  avalancheFuji,
  mainnet,
  optimism,
  polygon,
  polygonMumbai
} from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

import { PWC } from "@/types/components";
import { useEffect, useState } from "react";

import {
  createAuthenticationAdapter,
  RainbowKitAuthenticationProvider
} from "@rainbow-me/rainbowkit";
import { signOut } from "firebase/auth";

import { auth } from "@/firebase";
import { useAuth } from "@/context/Auth";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    polygonMumbai,
    avalanche,
    avalancheFuji
  ],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "FR3ELA",
  projectId: "FR3ELA",
  chains
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient
});

const authenticationAdapter = createAuthenticationAdapter({
  getNonce: async () => {
    const response = await fetch("/api/nonce");
    return await response.text();
  },

  createMessage: ({ nonce, address, chainId }) => {
    // return new SiweMessage({
    //   domain: window.location.host,
    //   address,
    //   statement: "Sign in with Ethereum to the app.",
    //   uri: window.location.origin,
    //   version: "1",
    //   chainId,
    //   nonce
    // });
  },

  getMessageBody: ({ message }) => {
    return message.prepareMessage();
  },

  verify: async ({ message, signature }) => {
    const verifyRes = await fetch("/api/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, signature })
    });
    return Boolean(verifyRes.ok);
  },

  signOut: async () => {
    await signOut(auth);
  }
});

export const Web3Provider = ({ children }: PWC) => {
  const [mounted, setMounted] = useState(false);
  const { user, status } = useAuth();
  useEffect(() => setMounted(true), []);

  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitAuthenticationProvider
          adapter={authenticationAdapter}
          status={status}
        >
          <RainbowKitProvider chains={chains} modalSize="compact">
            {mounted ? children : null}
          </RainbowKitProvider>
        </RainbowKitAuthenticationProvider>
      </WagmiConfig>
    </>
  );
};

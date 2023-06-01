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

export const Web3Provider = ({ children }: PWC) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains} modalSize="compact">
          {mounted ? children : null}
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
};

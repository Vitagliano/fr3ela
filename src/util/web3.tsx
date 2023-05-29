import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  polygonMumbai,
  avalanche,
  avalancheFuji
} from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

import { FC, ReactNode, createContext, useContext, useEffect } from "react";

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

export const Web3Provider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} modalSize="compact">
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

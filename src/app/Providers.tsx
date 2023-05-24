"use client";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/context/Auth";
import { PWC } from "@/types/components";
import { Web3Provider } from "@/util/web3";

ThemeProvider.displayName = "ThemeProvider";

const Providers = ({ children }: PWC) => (
  <AuthProvider>
    <Web3Provider>
      <ThemeProvider enableSystem={true} attribute="class">
        {children}
      </ThemeProvider>
    </Web3Provider>
  </AuthProvider>
);

export default Providers;

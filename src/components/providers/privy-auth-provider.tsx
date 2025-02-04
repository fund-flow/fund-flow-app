"use client";

import { PrivyProvider } from "@privy-io/react-auth";
import { useTheme } from "next-themes";
import { baseSepolia } from "viem/chains";

export default function PrivyAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { resolvedTheme } = useTheme();

  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
      config={{
        appearance: {
          accentColor: "#118DF0",
          theme: resolvedTheme as "light" | "dark",
          logo: "/assets/fund-flow-icon-no-bg.png",
        },
        supportedChains: [baseSepolia],
      }}
    >
      {children}
    </PrivyProvider>
  );
}

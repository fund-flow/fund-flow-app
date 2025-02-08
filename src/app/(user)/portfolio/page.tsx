"use client";

import React from "react";
import { usePrivy } from "@privy-io/react-auth";
import { PortfolioHeatmap } from "@/components/layout/portfolio/portfolio-heatmap";
import { PortfolioSkeleton } from "@/components/layout/portfolio/portfolio-skeleton";
import { TokenTable } from "@/components/layout/portfolio/token-table";
import { usePortfolioData } from "@/hooks/usePortfolioData";
import { RingLoader } from "react-spinners";

export const dynamic = "force-dynamic";

function PortfolioPage() {
  const { user, ready } = usePrivy();
  const { isLoading, portfolioData, error } = usePortfolioData(
    user?.wallet?.address,
    ready
  );

  if (!ready) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center h-screen">
        <RingLoader color="#4A90E2" size={60} />
      </div>
    );
  }

  if (!user?.wallet?.address) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-muted-foreground">
          Please connect your wallet to view your portfolio
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <h1 className="text-3xl font-bold">My Portfolio</h1>

      {error && <p className="text-red-500">{error}</p>}

      {isLoading ? (
        <PortfolioSkeleton />
      ) : (
        portfolioData && (
          <>
            <PortfolioHeatmap
              tokens={portfolioData.tokens}
              totalValue={portfolioData.totalValue}
            />
            <TokenTable tokens={portfolioData.tokens} />
          </>
        )
      )}
    </div>
  );
}

export default PortfolioPage;

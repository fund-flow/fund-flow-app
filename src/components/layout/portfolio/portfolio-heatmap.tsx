"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { formatNumber } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Token {
  symbol: string;
  name: string;
  balance: number;
  value: number;
  percentage: number;
}

interface PortfolioHeatmapProps {
  tokens: Token[];
  totalValue: number;
}

export function PortfolioHeatmap({
  tokens,
  totalValue,
}: PortfolioHeatmapProps) {
  // Sort tokens by value in descending order
  const sortedTokens = [...tokens].sort((a, b) => b.value - a.value);

  // Function to determine the intensity of the color based on percentage
  const getBackgroundColor = (percentage: number) => {
    // Using a blue gradient for the heatmap
    const intensity = Math.min(255, Math.floor((percentage / 100) * 255));
    return `rgb(${intensity}, ${Math.floor(intensity * 1.5)}, 255, ${
      0.1 + percentage / 100
    })`;
  };

  // Calculate grid area size based on token value percentage
  const getGridAreaSize = (percentage: number) => {
    if (percentage > 20) return "span 3 / span 3";
    if (percentage > 10) return "span 2 / span 2";
    return "span 1 / span 1";
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Portfolio Value</h2>
        <div className="text-2xl font-bold">${formatNumber(totalValue)}</div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-1 auto-rows-fr">
        <TooltipProvider>
          {sortedTokens.map((token) => (
            <Tooltip key={token.symbol}>
              <TooltipTrigger asChild>
                <Card
                  style={{
                    backgroundColor: getBackgroundColor(token.percentage),
                    gridArea: getGridAreaSize(token.percentage),
                  }}
                  className="p-4 transition-all hover:scale-[1.02] cursor-pointer"
                >
                  <div className="h-full flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-lg">{token.symbol}</h3>
                      <p className="text-sm text-muted-foreground">{token.name}</p>
                    </div>
                    <div className="mt-4">
                      <p className="text-lg font-semibold">
                        ${formatNumber(token.value)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {token.percentage.toFixed(2)}%
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {formatNumber(token.balance)} {token.symbol}
                      </p>
                    </div>
                  </div>
                </Card>
              </TooltipTrigger>
              <TooltipContent className="p-4 space-y-2">
                <div className="space-y-1.5">
                  <h4 className="font-semibold">{token.name} ({token.symbol})</h4>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                    <span className="text-muted-foreground">Balance:</span>
                    <span className="text-right">{formatNumber(token.balance)} {token.symbol}</span>
                    <span className="text-muted-foreground">Value:</span>
                    <span className="text-right">${formatNumber(token.value)}</span>
                    <span className="text-muted-foreground">Portfolio %:</span>
                    <span className="text-right">{token.percentage.toFixed(2)}%</span>
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </div>
    </div>
  );
}

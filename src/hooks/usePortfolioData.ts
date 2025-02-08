import { useState, useEffect } from "react";
import { getTokenPrices } from "@/services/alchemy";

interface TokenData {
  symbol: string;
  name: string;
  balance: number;
  price: number;
  value: number;
  percentage: number;
}

interface PortfolioData {
  tokens: TokenData[];
  totalValue: number;
}

export function usePortfolioData(walletAddress: string | undefined, ready: boolean) {
  const [isLoading, setIsLoading] = useState(false);
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      if (!ready || !walletAddress) return;

      setIsLoading(true);
      setError(null);

      try {
        // TODO: Replace with actual API call for token balances
        // This is mock data for demonstration of balances
        const mockBalances = [
          { symbol: "ETH", name: "Ethereum", balance: 1.5 },
          { symbol: "USDC", name: "USD Coin", balance: 2500 },
          { symbol: "LINK", name: "Chainlink", balance: 100 },
          { symbol: "UNI", name: "Uniswap", balance: 50 },
          { symbol: "AAVE", name: "Aave", balance: 2 },
        ];

        // Get real-time token prices from Alchemy
        const prices = await getTokenPrices(
          mockBalances.map((token) => token.symbol)
        );

        // Calculate values and percentages
        const tokens = mockBalances.map((token) => {
          const price = prices.get(token.symbol) || 0;
          const value = token.balance * price;
          return {
            ...token,
            price,
            value,
            percentage: 0, // Will be calculated after total
          };
        });

        const totalValue = tokens.reduce((sum, token) => sum + token.value, 0);

        // Calculate percentages
        tokens.forEach((token) => {
          token.percentage = (token.value / totalValue) * 100;
        });

        setPortfolioData({ tokens, totalValue });
      } catch (err) {
        setError("Failed to fetch portfolio data. Please try again.");
        console.error("Error fetching portfolio data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPortfolioData();
  }, [walletAddress, ready]);

  return { isLoading, portfolioData, error };
}

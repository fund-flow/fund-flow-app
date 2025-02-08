import { Alchemy } from "alchemy-sdk";

const alchemy = new Alchemy({
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY!,
});

export async function getTokenPrices(symbols: string[]) {
  try {
    const response = await alchemy.prices.getTokenPriceBySymbol(symbols);
    const prices = new Map<string, number>();
    
    response.data.forEach((item) => {
      if (item.prices[0]?.value) {
        prices.set(item.symbol, parseFloat(item.prices[0].value));
      }
    });
    
    return prices;
  } catch (error) {
    console.error("Error fetching token prices:", error);
    throw error;
  }
}

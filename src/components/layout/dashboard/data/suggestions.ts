interface Suggestion {
  title: string;
  subtitle: string;
}

const suggestions: Suggestion[] = [
  {
    title: "Smart Crypto Investing",
    subtitle:
      "New to crypto? Let AI guide your investments based on your risk preferences.",
  },
  {
    title: "Portfolio Management",
    subtitle: "Analyze my investment portfolio and suggest improvements",
  },
  {
    title: "Market Analysis",
    subtitle: "Analyze the market and suggest trading strategies",
  },
];

export function getRandomSuggestions(count: number): Suggestion[] {
  return suggestions.slice(0, count);
}

export type { Suggestion };

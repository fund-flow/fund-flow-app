interface Suggestion {
  title: string;
  subtitle: string;
}

const suggestions: Suggestion[] = [
  {
    title: "Diversified Portfolio Builder",
    subtitle: "Balance your investments with AI-optimized asset allocation."
  },
  {
    title: "Risk-Based Investment Planning",
    subtitle: "Not sure about investments? Let AI match assets to your risk tolerance.",
  },
  {
    title: "Time-Horizon Based Strategy",
    subtitle: "Plan investments based on your short(1-6 months) or long-term goals(6+ months).",
  },
];

export function getRandomSuggestions(count: number): Suggestion[] {
  return suggestions.slice(0, count);
}

export type { Suggestion };

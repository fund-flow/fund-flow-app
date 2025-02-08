import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Card } from "@/components/ui/card";
import { type Suggestion } from "./data/suggestions";

interface SuggestionCardProps extends Suggestion {
  delay?: number;
  onSelect: (text: string) => void;
}

export function SuggestionCard({
  title,
  subtitle,
  delay = 0,
  onSelect,
}: SuggestionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <Card
        onClick={() => onSelect(subtitle)}
        className="group flex h-32 cursor-pointer flex-col justify-between p-4 transition-colors hover:bg-muted/50"
      >
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
        </div>
        <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
      </Card>
    </motion.div>
  );
}

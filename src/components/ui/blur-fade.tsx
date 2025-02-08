import { motion } from "framer-motion";
import { ReactNode } from "react";

interface BlurFadeProps {
  children: ReactNode;
  delay?: number;
}

export default function BlurFade({ children, delay = 0 }: BlurFadeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(10px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
}

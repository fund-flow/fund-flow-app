"use client";

import * as React from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const themes: Array<"light" | "dark" | "system"> = [
    "light",
    "dark",
    "system",
  ];
  const icons = {
    light: <Sun className="h-[1.2rem] w-[1.2rem]" />,
    dark: <Moon className="h-[1.2rem] w-[1.2rem]" />,
    system: <Monitor className="h-[1.2rem] w-[1.2rem]" />,
  };

  const toggleTheme = () => {
    const currentIndex = theme
      ? themes.indexOf(theme as "light" | "dark" | "system")
      : 0;
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Button
      variant="default"
      size="icon"
      onClick={toggleTheme}
      className="rounded-2xl"
    >
      {mounted && icons[(theme as "light" | "dark" | "system") || "system"]}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

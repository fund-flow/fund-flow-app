import { LayoutDashboard } from "lucide-react";
import config from "../../package.json";

/**
 * NAV LINKS
 */
export const navItems = [
  {
    href: "https://github.com/fund-flow",
    name: "Github",
    icon: "/icons/github.svg",
  },
];

/**
 * EXPLORE LINKS
 */

export const ExploreItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    segment: "dashboard",
    icon: LayoutDashboard,
    external: false,
  },
  // {
  //   title: "Portfolio",
  //   url: "/portfolio",
  //   segment: "portfolio",
  //   icon: PiggyBank,
  //   external: false,
  // },
] as const;

/**
 * RPC_URL
 */
export const RPC_URL = "";

/**
 * APP VERSION
 */
export const APP_VERSION = config.version;

/**
 * IS BETA
 */
export const IS_BETA = true;

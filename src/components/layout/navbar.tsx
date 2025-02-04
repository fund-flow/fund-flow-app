"use client";

import Link from "next/link";
import { navItems } from "@/lib/constants";
import NavMobile from "./navbar-mobile";
import Image from "next/image";
import React from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useLogin } from "@privy-io/react-auth";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { login } = useLogin({
    onComplete: async () => {
      router.push("/dashboard");
    },
  });

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 isolate z-10 bg-contrast/50 backdrop-filter backdrop-blur-xl shadow-sm bg-white/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <nav
          aria-label="Desktop navigation"
          className="mx-auto flex container items-center justify-between p-6 lg:!px-8 !py-4"
        >
          <div className="flex-1 hidden md:block justify-start items-center">
            <div className="flex items-center">
              <div className="flex items-center gap-8">
                {navItems.map((navItem, idx: number) => (
                  <React.Fragment key={`nav-item-${idx}`}>
                    <Button
                      variant="link"
                      onClick={() =>
                        window.open(
                          navItem.href,
                          "_blank",
                          "noopener,noreferrer"
                        )
                      }
                      className={`relative ${
                        pathname === navItem.href
                          ? "bg-purple-100/50"
                          : "bg-purple-100/30 "
                      } hover:bg-purple-100/15  transition-colors h-[48px] w-auto text-sm rounded-2xl`}
                    >
                      <span className="flex items-center gap-1 text-md !cursor-pointer font-semibold text-black">
                        <Image
                          src={navItem.icon}
                          alt={`${navItem.name} icon`}
                          width={16}
                          height={16}
                        />
                        {navItem.name}
                        {pathname === navItem.href && (
                          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent"></span>
                        )}
                      </span>
                    </Button>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center px-4">
            <Link href="/">
              <Image
                src="/assets/fund-flow-icon-no-bg.png"
                alt="fund-flow-logo"
                width={40} // Smaller logo for mobile
                height={40}
                className="hover:opacity-80 transition-opacity duration-300 md:w-50 md:h-50"
              />
            </Link>
          </div>
          <div className="flex-1 justify-end items-center hidden md:!flex gap-2">
            <Button variant="default" className="rounded-full" onClick={login}>
              Login
            </Button>
            <ThemeToggle />
          </div>
          <div className="block md:hidden ml-8">
            <NavMobile navItems={navItems} />
          </div>
        </nav>
      </motion.header>
    </>
  );
};

export default Navbar;

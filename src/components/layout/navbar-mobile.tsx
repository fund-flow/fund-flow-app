"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AlignRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useLogin } from "@privy-io/react-auth";

const NavMobile = ({
  navItems,
}: {
  navItems: Array<{ href: string; name: React.ReactNode; icon: string }>;
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const { login } = useLogin({
    onComplete: async () => {
      router.push("/dashboard");
    },
  });

  return (
    <Sheet>
      <SheetTrigger>
        <AlignRight
          className="w-6 h-6 text-foreground hover:text-foreground/80 transition-colors duration-300"
          strokeWidth={3}
        />
      </SheetTrigger>
      <SheetContent
        aria-describedby="mobile-nav"
        className="!max-w-72 flex flex-col justify-between"
      >
        <SheetHeader>
          <SheetTitle>
            <div className="flex items-center gap-3">
              <Link href="/">
                <Image
                  src="/assets/fund-flow-icon-no-bg.png"
                  alt="fund-flow-logo"
                  width={40}
                  height={40}
                  className="hover:opacity-80 transition-opacity duration-300"
                />
              </Link>
            </div>
          </SheetTitle>
          <div className="h-4" />
          <div className="flex items-center justify-center gap-4">
            {navItems.map((navItem, idx: number) => (
              <React.Fragment key={`nav-item-${idx}`}>
                <Button
                  variant="link"
                  onClick={() => router.push(navItem.href)}
                  className={`${
                    pathname === navItem.href
                      ? "bg-purple-100/50"
                      : "bg-pruple-100/30 "
                  } hover:bg-pruple-100/15  transition-colors h-[48px] w-1/2 text-sm rounded-2xl`}
                >
                  <span className="flex items-center gap-1 text-md !cursor-pointer font-semibold text-black">
                    <Image
                      src={navItem.icon}
                      alt={`${navItem.name} icon`}
                      width={16}
                      height={16}
                    />
                    {pathname === navItem.href && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent"></span>
                    )}
                  </span>
                </Button>
              </React.Fragment>
            ))}
          </div>
          <div className="h-4" />
          <div className="flex items-center justify-center gap-2">
            <Button variant="default" className="rounded-full" onClick={login}>
              Login
            </Button>
          </div>
        </SheetHeader>
        <div className="flex justify-end">
          <ThemeToggle />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default NavMobile;

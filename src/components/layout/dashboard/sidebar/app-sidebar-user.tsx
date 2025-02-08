"use client";

import { useRouter } from "next/navigation";
import { useLogout, useWallets } from "@privy-io/react-auth";

import { Github, LogOut, ChevronsUpDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Skeleton } from "@/components/ui/skeleton"; // Corrected import for Skeleton

export default function AppSidebarUser() {
  const router = useRouter();
  const { logout } = useLogout({
    onSuccess: async () => {
      router.push("/");
    },
  });
  const { wallets } = useWallets();
  const isMobile = useIsMobile();

  const isLoading = !wallets || wallets.length === 0;
  const walletAddress = wallets?.[0]?.address;
  const shortAddress = isLoading
    ? "Connect Wallet"
    : `${walletAddress.substring(0, 5)}...${walletAddress.slice(-4)}`;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              {isLoading ? (
                <Skeleton className="h-8 w-8 rounded-lg" />
              ) : (
                <div className="h-8 w-8 rounded-lg relative overflow-hidden bg-sidebar-accent">
                  {walletAddress && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={`https://api.dicebear.com/7.x/identicon/svg?seed=${walletAddress}`}
                      alt="Avatar"
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
              )}
              <div className="grid flex-1 text-left text-sm leading-tight">
                {isLoading ? (
                  <Skeleton className="h-4 w-24" />
                ) : (
                  <span className="truncate font-semibold">{shortAddress}</span>
                )}
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuGroup>
              {/* Docs */}
              <DropdownMenuItem
                onClick={() =>
                  window.open("https://github.com/fund-flow", "_blank")
                }
                className="cursor-pointer"
              >
                <Github className="mr-2 h-4 w-4" />
                Github
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout} className="cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

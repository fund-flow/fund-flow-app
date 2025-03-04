import { cookies } from "next/headers";

import { AppSidebar } from "@/components/layout/sidebar/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value !== "false";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <main className="w-full">
        <SidebarTrigger className="absolute z-50 mt-2 md:hidden" />
        {children}
      </main>
    </SidebarProvider>
  );
}

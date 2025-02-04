import React from "react";

export const dynamic = "force-static";

import LogoutButton from "@/components/ui/logout-button";

function DashboardPage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <LogoutButton />
    </div>
  );
}

export default DashboardPage;

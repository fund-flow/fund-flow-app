import React from "react";

export const dynamic = "force-static";

import LogoutButton from "@/components/ui/logout-button";

function PortfolioPage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <LogoutButton />
    </div>
  );
}

export default PortfolioPage;

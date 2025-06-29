"use client";

import { usePathname } from "next/navigation";
import { AppbarClient } from "./AppbarClient";
import { BusinessCTA } from "./BusinessCTA";

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideLayout = pathname === "/signin";

  return (
    <div className="min-w-screen min-h-screen bg-gray-50">
      {!hideLayout && <AppbarClient />}
      {children}
      {!hideLayout && <BusinessCTA />}
    </div>
  );
}

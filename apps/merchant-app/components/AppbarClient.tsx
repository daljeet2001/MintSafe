"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Appbar } from "@repo/ui/appbar2";
import { useRouter } from "next/navigation";

export function AppbarClient() {
  const session = useSession();
  const router = useRouter();

  return (
    <div>
      <Appbar
        onSignin={async () => {
          await signIn(undefined, { callbackUrl: "/dashboard" });
        }}
        onSignout={async () => {
          await signOut({ callbackUrl: "/" });
        }}
        merchant={session.data?.merchant}
      />
    </div>
  );
}

"use client";

import { useLogout } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "./button";

function LogoutButton() {
  const router = useRouter();
  const { logout } = useLogout({
    onSuccess: async () => {
      router.push("/");
    },
  });

  return <Button onClick={logout}>Logout</Button>;
}

export default LogoutButton;

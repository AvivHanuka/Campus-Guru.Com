"use clinet"

import React from "react";
import { useRouter } from "next/navigation";

export default function useModal(): [boolean, (open: boolean) => void] {
  const [open, setOpen] = React.useState(true);
  const router = useRouter();
  function close(_open: boolean) {
    setOpen(false);
    const timeout = setTimeout(() => {
      router.back();
      clearTimeout(timeout);
    }, 300);
  }

  return [open, close]
}
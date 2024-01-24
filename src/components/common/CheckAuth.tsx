"use client";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/hooks";
import { useParams, useRouter } from "next/navigation";
import { ADMIN_ROLE, MODERATOR_ROLE } from "@/typings/enums";

export default function CheckAuth({ children }: { children: React.ReactNode }) {
  const params = useParams();
  const lng: string = params?.lng as string;
  const router = useRouter();
  const auth = useAppSelector((state) => state.auth);
  const isAdmin =
    auth.user &&
    (auth.user.roles.includes(MODERATOR_ROLE) ||
      auth.user.roles.includes(ADMIN_ROLE));

  useEffect(() => {
    if (!auth.jwt) {
      setTimeout(() => {
       
        if (!isAdmin) {
          router.push(`/${lng}/login`);
        }
      }, 6000);
    }
  }, [auth]);

  if (isAdmin) {
    return children;
  }
  return (
    <div
      className='px-10 h-[70vh]'
      style={{ fontSize: "58px", textAlign: "center", marginTop: "50px" }}
    >
      Authorizing
    </div>
  );
}

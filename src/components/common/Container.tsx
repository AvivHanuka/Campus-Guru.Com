import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export default function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn("sm:container sm:mx-auto lg:px-4 ", className)}>
      {children}
    </div>
  );
}

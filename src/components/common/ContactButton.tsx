"use client";

import React from "react";
import { Button } from "@/components/ui/button";

export const ContactButton = () => {
  const launchModal: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    console.log("clicked", e);
  };
  return (
    <Button onClick={launchModal} size="lg" variant="default">
      צור קשר
    </Button>
  );
};

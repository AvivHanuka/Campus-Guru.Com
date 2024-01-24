import { ReactNode } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  icons: {
    icon: "./favicon.ico",
  },
};
export default function RootLayoutWithoutLanguageParam({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}

"use client";
import React from "react";
import ReduxPersistProvider from "@/lib/context/redux-persist-provider";
import ReactQueryProvider from "@/lib/context/react-query-provider";

export default function Main({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <ReduxPersistProvider>
        <div className='relative flex flex-col min-h-screen'>
          <ReactQueryProvider>
            <main className='flex flex-col min-h-screen'>{children}</main>
          </ReactQueryProvider>
        </div>
      </ReduxPersistProvider>
    </div>
  );
}

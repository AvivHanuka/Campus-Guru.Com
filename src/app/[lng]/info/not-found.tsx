"use client"

import {useRouter} from "next/navigation";
import React from "react";
import {Button} from "@/components/ui/button";

export default function NotFound() {
  const router = useRouter();
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout>>();

  function startTimer() {
    timeoutRef.current = setTimeout(() => router.push('/results'), 5000);
  }
  React.useEffect(() => {
    startTimer();
    return () => timeoutRef?.current && clearTimeout(timeoutRef.current);
  }, [])

  return (
    <div className="py-10">
      <h1 className="text-center font-bold text-xl">The course does not exist or has been archived.</h1>
      <p className="text-center">Oops! We could not find any information on this course. Please go back to the course search page.</p>
      <div onMouseEnter={() => clearTimeout(timeoutRef.current)} onMouseLeave={startTimer}>
        <Button onClick={router.back}>Go to results page</Button>
      </div>
    </div>
  )
}
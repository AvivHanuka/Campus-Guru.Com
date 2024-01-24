"use client";

import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { useTranslation } from "@/app/i18n/client";

export default function BackButton() {
  const params = useParams();
  const lng: string = params?.lng as string;
  const { i18n } = useTranslation(lng, "result");
  const direction = i18n.dir();

  const router = useRouter();

  return (
    <Button
      variant='ghost'
      className='border border-[#D9D9D9] rounded-lg w-10 h-10 '
      onClick={router.back}
    >
      <img
        src='/dev/back.svg'
        alt='Back'
        className={`${direction === "rtl" ? "" : "rotate-180"}`}
      />
    </Button>
  );
}

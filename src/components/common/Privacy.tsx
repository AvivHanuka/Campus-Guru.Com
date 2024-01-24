"use client";
import { useTranslation } from "@/app/i18n/client";
import { useParams } from "next/navigation";

export default function Privacy() {
  const params = useParams();
  const lng: string = params?.lng as string;
  const { t } = useTranslation(lng, "privacy");

  return (
    <>
      <div className='whitespace-break-spaces'>{t("text")}</div>
    </>
  );
}

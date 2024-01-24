import { useTranslation } from "@/app/i18n/client";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { CheckIcon } from "@radix-ui/react-icons";

export default function LanguageSwitcher() {
  return (
    <>
      {/* <LanguageSwitcherItem lang="ar" label="الفصحى" /> */}
      {/* <LanguageSwitcherItem lang="ru" label="Русский" /> */}
      <LanguageSwitcherItem lang='he' label='עברית' />
      <LanguageSwitcherItem lang='en' label='English' />
    </>
  );
}

function LanguageSwitcherItem({
  lang,
  label,
}: {
  lang: string;
  label: string;
}) {
  const params = useParams();
  const lng: string = params?.lng as string;
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const router = useRouter();

  const { i18n } = useTranslation(lng, "");

  const isCurrent = i18n.language === lang;
  function switchLanguage() {
    const newUrl =
      pathname.replace(`/${i18n.language}`, `/${lang}`) +
      "?" +
      searchParams.toString();
    router.push(newUrl);

    //i18n.changeLanguage(lang);
    // setTimeout(() => {

    // }, 75);
  }
  const isLangRTL = lang === "he" || lang === "ar";

  return (
    <DropdownMenuItem
      className='px-6 text-md cursor-pointer justify-center relative'
      role='button'
      onClick={switchLanguage}
      dir={isLangRTL ? "rtl" : "ltr"}
    >
      {isCurrent && (
        <CheckIcon
          color='green'
          className={`absolute ${isLangRTL ? "right-1.5" : "left-1.5"}`}
        />
      )}
      {label}
    </DropdownMenuItem>
  );
}

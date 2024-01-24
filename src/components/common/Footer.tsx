"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslation } from "@/app/i18n/client";
import React from "react";

export const Footer = () => {
  const params = useParams();
  const lng: string = params?.lng as string;
  const { t } = useTranslation(lng, "common");
  return (
    <>
      <footer className='bg-[#F0F1FE] mt-auto text-center'>
        <nav
          className={`flex lg:justify-between items-center container justify-center lg:flex-row flex-col lg:gap-6`}
        >
          <ul
            className={`flex font-bold justify-center flex-row-reverse flex-wrap my-2`}
          >
            {/* <FooterLink href={`/${lng}/privacy`}>
              {t("footer.menu1")}
            </FooterLink> */}
            <FooterLink href={`/${lng}/terms`}>{t("footer.menu2")}</FooterLink>
            <FooterLink href={`/${lng}/our-vision`}>
              {t("footer.menu3")}
            </FooterLink>
            <FooterLink href={`/${lng}/contact`}>
              {t("footer.menu4")}
            </FooterLink>
          </ul>
          <div className='text-md pb-6 pe-4 md:pe-6 lg:pt-6'>
            © {t("footer.text")}
          </div>
        </nav>
      </footer>
    </>
  );
};

const FooterLink = ({
  href,
  children,
}: { href: string } & React.PropsWithChildren) => {
  return (
    <li className='px-4 py-2 lg:px-6'>
      <Link href={href} className='w-full h-full text-[16px]'>
        {children} {/* פרטיות */}
      </Link>
    </li>
  );
};

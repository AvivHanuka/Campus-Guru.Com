"use client";
export const runtime = 'edge';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/app/i18n/client";
import Link from "next/link";

interface propsType {
  params: {
    lng: string;
  };
}

export default function OurVision({ params: { lng } }: propsType) {
  const { t } = useTranslation(lng, "vision");

  return (
    <>
      <div className='container md:mx-auto px-10'>
        <div className='grid md:grid-cols-2 gap-6 md:gap-10 mt-8'>
          <header className='space-y-3'>
            <h1 className='text-4xl text-center md:text-start font-bold'>
              {t("heading")}
            </h1>
            <div className='font-light xl:text-1xl lg:text-xl text-lg'>
              <p className='text-center md:text-start'>{t("description")}</p>
            </div>
          </header>
          <AspectRatio ratio={2 / 1.5}>
            <Image
              src='/dev/photos/photo-1552581234-26160f608093.avif'
              alt='People studying together on campus'
              fill
              className='mx-auto shadow rounded object-cover'
            />
          </AspectRatio>
        </div>
        <div className='md:mb-20 my-10'>
          <div className='grid px-20 sm:px-4 md:px-0 gap-10 sm:gap-8 sm:grid-cols-2 md:grid-cols-3'>
            <AspectRatio>
              <Image
                src='/dev/photos/09.39.52.png'
                className='shadow rounded object-cover'
                alt='Student studying in the library'
                fill
              />
            </AspectRatio>
            <AspectRatio>
              <Image
                src='/dev/photos/09.40.22.png'
                className='shadow rounded object-cover'
                alt='Graduation day in the academy'
                fill
              />
            </AspectRatio>
            <AspectRatio>
              <Image
                src='/dev/photos/10.02.14.png'
                className='shadow rounded object-cover'
                alt='Student standing at the campus entrance'
                fill
              />
            </AspectRatio>
          </div>
          <div className='text-center font-semibold py-10 text-xl'>
            {t("text")}
          </div>
          <div className='text-center'>
            <Button
              asChild
              className='font-semibold tracking-wide text-lg'
              size='lg'
            >
              <Link href={`/${lng}/contact`}>{t("contact")}</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

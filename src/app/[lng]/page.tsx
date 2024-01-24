"use client";
export const runtime = 'edge';
import React, { FormEvent } from "react";
import { useRouter } from "next/navigation";
import Search, { useSearch } from "@/components/common/Search";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTranslation } from "../i18n/client";
import campusHome from "/public/dev/photos/campus-home.png";
import campusHome1 from "/public/dev/photos/home-1.png";
import campusHome2 from "/public/dev/photos/home-2.png";
import campusHome3 from "/public/dev/photos/home-3.png";

interface propsType {
    params: {
        lng: string;
    };
}

export default function Home({ params: { lng } }: propsType) {
    const searchProps = useSearch(null, null);
    const router = useRouter();
    const { t } = useTranslation(lng, "home");

    function searchNow(e?: FormEvent<HTMLFormElement>) {
        e?.preventDefault();
        const { searchInputRef, value, filterBy } = searchProps;
        if (value) {
            if (filterBy === "professors") {
                router.push(`/${lng}/results?professors=${value}`);
            } else {
                router.push(`/${lng}/results?search=${value}`);
            }
        } else if (searchInputRef.current) {
            searchInputRef.current?.focus();
        }
    }

    return (
        <>
            <div className='sm:py-10 px-4 space-y-6'>
                <div className='sm:container space-y-4'>
                    <header>
                        <h1 className='text-4xl text-center font-bold'>{t("heading")}</h1>
                        <h2 className='font-light text-center text-xl md:text-2xl md:bold-4 pt-2'>
                            {t("description")}
                        </h2>
                    </header>
                    <div className='md:min-w-[600px] min-w-[100%] w-[fit-content] mx-auto'>
                        <form onSubmit={searchNow}>
                            <Search {...searchProps} />
                        </form>
                    </div>
                </div>
                <section>
                    <div>
                        {/*<div className={`absolute left-0 top-0 right-0 -z-10 bg-[#C6E0FF] bottom-[${sectionBottom}px]`}></div>*/}
                        {/*before:bg-amber-200 before:absolute before:left-0 before:right-0 before:bottom-0 before:top-0 before:-z-10*/}
                        {/*before:bg-amber-200 before:absolute before:top-0 before:left-0 before:right-0 before:h-[30%] before:-z-10*/}
                        <div className="bg-gradient-to-t from-[#AFCF6B] via-[15%] via-[#AFCF6B] to-[15%] to-[#C6E0FF] pt-12">
                            <Image
                                src={campusHome}
                                className='max-w-3xl align-middle object-contain object-bottom mx-auto pb-4 flex-1 w-full'
                                width={1954}
                                height={572}
                                sizes={"(max-width: 768px) 100vw, 768px" +
                                    "(max-width: 1024px) 100vw, 1024px" +
                                    "(max-width: 1280px) 100vw, 1280px" +
                                    "(max-width: 1536px) 100vw, 1536px" +
                                    "(max-width: 1920px) 100vw, 1920px"}
                                alt='Presentation'
                            />
                        </div>
                    </div>
                    {/*  <p className="font-light text-center text-lg md:text-xl">*/}
                    <div className='md:px-12 py-[39px]'>
                        <p className='text-balance text-center text-xl lg:text-2xl whitespace-break-spaces'>
                            {t("text")}
                        </p>
                    </div>
                </section>
                {/*<div className="grid px-20 sm:px-4 md:px-0 gap-4 sm:gap-8 sm:grid-cols-2 md:grid-cols-3">*/}
                {/*      <Image src="/photos/09.39.52.png" alt="Box" fill className="shadow rounded object-cover"/>*/}
                <div className='sm:container flex flex-col md:flex-row items-center justify-center text-center gap-6'>
                    <div className="w-[300px] inline-flex flex-col">
                        <Image
                            src={campusHome1}
                            alt='Box'
                            className='mx-auto'
                            width={200}
                            height={150}
                        />
                        <p className='text-lg lg:text-xl text-center py-4 self-center'>
                            {t("text1")}
                        </p>
                    </div>
                    <div className="w-[300px] inline-flex flex-col">
                        <Image
                            src={campusHome2}
                            alt='Box'
                            className=' mx-auto'
                            width={200}
                            height={150}
                        />
                        <p className='text-lg lg:text-xl text-center py-4 self-center'>
                            {t("text2")}
                        </p>
                    </div>
                    <div className="w-[300px] inline-flex flex-col">
                        <Image
                            src={campusHome3}
                            alt='Box'
                            className='object-contain mx-auto'
                            width={150}
                            height={50}
                        />
                        <p className='text-lg lg:text-xl text-center py-4 self-center'>
                            {t("text3")}
                        </p>
                    </div>
                </div>
                <div className='text-center pb-10 md:pb-4'>
                    <Button asChild className='px-8 font-semibold tracking-wide'>
                        <Link href={`/${lng}/results`}>{t("rate")}</Link>
                    </Button>
                </div>
            </div>
        </>
    );
}

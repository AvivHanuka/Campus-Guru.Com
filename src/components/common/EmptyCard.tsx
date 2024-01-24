import React from "react";
import { useParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "@/app/i18n/client";

export default function EmptyCard() {
  const params = useParams();
  const lng: string = params?.lng as string;
  const { t, i18n } = useTranslation(lng, "resultDetails");
  const direction = i18n.dir();
  return (
    <div>
      <div className='relative rounded-[8px] border border-[#B8BFF6] md:px-8 md:py-4 px-3 py-3 mb-2 pe-[20px]'>
        <div className='flex items-center justify-between'>
          <div className='flex-1'>
            <div className='flex items-center gap-4 mb-2'>
              <Skeleton className={`h-7 flex-[0.4] bg-blend-hard-light`} />
              {/*<h1 className="font-bold md:text-2xl text-1xl">*/}
              {/*  {props.course.courseName}*/}
              {/*</h1>*/}
              <span className='flex items-center gap-4 bg-[#EAECFA] rounded-[20px] text-[#717EF6] px-2 py-0.5 mr-3 text-[16px]'>
                <span>
                  {" "}
                  <Skeleton className='h-4 w-6 bg-blend-hard-light' />
                </span>
                &nbsp;
                <img
                  src='/dev/results/star.svg'
                  width={"100%"}
                  height={"100%"}
                  alt='Star'
                />
              </span>
            </div>
            <div className='sm:flex flex-wrap items-center'>
              <div className='flex items-center sm:w-[50%] md:mt-3 md:mb-1 mt-1 mb-1 gap-4'>
                <img
                  src='/dev/results/uni.svg'
                  width={"18px"}
                  height={"18px"}
                  alt='Star'
                />
                <span className='flex flex-1 items-center gap-1'>
                  <b>{t("institute")}: </b>&nbsp;
                  <Skeleton className='inline-block h-7 flex-[0.7] bg-blend-hard-light' />
                </span>
              </div>
              <div className='flex items-center sm:w-[50%]  md:mt-3 md:mb-1 mt-1 mb-1 gap-4'>
                <img
                  src='/dev/results/faculty.svg'
                  width={"18px"}
                  height={"18px"}
                  alt='Star'
                />
                <span className='flex flex-1 items-center gap-1'>
                  <b>{t("faculty")}: </b>&nbsp;
                  <Skeleton className='inline-block h-7 flex-[0.55] bg-blend-hard-light' />
                </span>
              </div>
            </div>
            <div className='sm:flex flex-wrap items-center'>
              <div className='flex items-center gap-4 sm:w-[50%]  md:mt-3 md:mb-1 mt-1 mb-1'>
                <img
                  src='/dev/results/professor.svg'
                  width={"18px"}
                  height={"18px"}
                  alt='Star'
                />
                <span className='mr-4'>
                  {" "}
                  <span className='flex flex-1 items-center gap-1'>
                    <b>{t("professor")}</b>&nbsp;
                    <Skeleton className='inline-block h-7 flex-[0.75] bg-blend-hard-light w-72' />
                  </span>
                </span>
              </div>
              <div className='flex items-center gap-4 sm:w-[50%]  md:mt-3 md:mb-1 mt-1 mb-1'>
                <img
                  src='/dev/results/full.svg'
                  width={"18px"}
                  height={"18px"}
                  alt='Star'
                />
                <span className='mr-4 flex items-center gap-1'>
                  {" "}
                  <b>{t("courseId")} </b>&nbsp;
                  <Skeleton className='w-14 h-7 inline-block' />
                </span>
              </div>
            </div>
          </div>
          <div>
            <img
              src='/dev/results/arrow-left.svg'
              className={`${direction === "rtl" ? "" : "rotate-180"}`}
              alt='Arrow'
            />
          </div>
        </div>
      </div>
    </div>
  );
}

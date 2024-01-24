import { ProfessorItem } from "@/types/allTypes";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslation } from "@/app/i18n/client";
type propType = {
  professor: ProfessorItem;
};
function SearchResult({ professor }: propType) {
  const params = useParams();
  const lng: string = params?.lng as string;
  const { t, i18n } = useTranslation(lng, "result");

  const direction = i18n.dir();
  return (
    <div>
      <div className='relative rounded-[8px] border border-[#B8BFF6] md:px-8 md:py-4 px-3 py-3 mb-2 pe-[20px]'>
        <div className='flex items-center justify-between'>
          <div className='flex-1'>
            <div className='flex items-center mb-2 gap-4'>
              <h1 className='font-bold md:text-2xl text-1xl'>
                {professor.name}
              </h1>
              <span className='flex items-center bg-[#EAECFA] rounded-[20px] text-[#717EF6] px-2 py-0.5 mr-3 text-[16px]'>
                <span>{professor.averageReview}</span>
                &nbsp;
                <img
                  src='/results/star.svg'
                  width={"100%"}
                  height={"100%"}
                  alt='Star'
                />
              </span>
            </div>
            <div className='sm:flex flex-wrap items-center'>
              <div className='flex items-center gap-4 sm:w-[50%] md:mt-3 md:mb-1 mt-1 mb-1'>
                <img
                  src='/results/uni.svg'
                  width={"18px"}
                  height={"18px"}
                  alt='Star'
                />
                <span className='mr-4'>
                  <b>
                    {/* מוסד לימודים: */}
                    {t("institute")}:{" "}
                  </b>
                  &nbsp;
                  <span>
                    {professor.institute}
                    {/* אוניברסיטת תל אביב */}
                  </span>
                </span>
              </div>
              <div className='flex items-center gap-4 sm:w-[50%]  md:mt-3 md:mb-1 mt-1 mb-1'>
                <img
                  src='/results/faculty.svg'
                  width={"18px"}
                  height={"18px"}
                  alt='Star'
                />
                <span className='mr-4'>
                  {" "}
                  <b>
                    {/* פקולטה:  */}
                    {t("faculty")}:{" "}
                  </b>
                  &nbsp; {professor.faculty}
                </span>
              </div>
            </div>
            <div className='sm:flex flex-wrap items-center'>
              <div className='flex items-center gap-4 sm:w-[50%]  md:mt-3 md:mb-1 mt-1 mb-1'>
                <img
                  src='/results/professor.svg'
                  width={"18px"}
                  height={"18px"}
                  alt='Star'
                />
                <span className='mr-4'>
                  {" "}
                  <b>
                    {/* מרצה:  */}
                    {t("courses")}:{" "}
                  </b>
                  &nbsp;
                  <span>
                    {professor?.courses && professor?.courses[0]?.name}{" "}
                    {professor?.courses &&
                      professor?.courses.length - 1 > 0 &&
                      `${professor?.courses.length - 1} more`}
                  </span>
                </span>
              </div>
              <div className='flex items-center gap-4 sm:w-[50%]  md:mt-3 md:mb-1 mt-1 mb-1'>
                <img
                  src='/results/full.svg'
                  width={"18px"}
                  height={"18px"}
                  alt='Star'
                />
                <span className='mr-4'>
                  {" "}
                  <b>{t("professorId")}: </b>
                  &nbsp; <span>{professor.id} </span>
                </span>
              </div>
            </div>
          </div>
          <div>
            <Link
              href={`/info?professorId=${professor.id}`}
              prefetch
              className='md:text-[14px] text-[11px]'
            >
              <img
                src='/results/arrow-left.svg'
                // className='absolute left-[20px] top-[36%]'
                alt='Arrow'
                className={`${direction === "rtl" ? "" : "rotate-180"}`}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchResult;

"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useTranslation } from "@/app/i18n/client";
import calculateCourseAverageRating from "@/functions/calculateCourseAverageReview";
import calculateProfessorAverageRating from "@/functions/calculateProfessorAverageReview";
import toFixed from "@/functions/toFixed";
type propType = {
  course?: Course;
  professor?: Professor;
  page?: number;
};
function SearchResult({ course, professor, page }: propType) {
  const params = useParams();
  const lng: string = params?.lng as string;
  const { t, i18n } = useTranslation(lng, "result");
  const direction = i18n.dir();

  let averageReview = undefined;
  let name = "";
  let institute = "";
  let faculty = "";
  let childString = "";
  let id = 0;
  if (professor) {
    if (professor.reviews?.length > 0) {
      averageReview =
        professor.reviews.reduce(
          (total, review) => total + calculateProfessorAverageRating(review),
          0
        ) / professor.reviews?.length;
    }
    name = professor.name;
    //institute=professor.institution.name;
    institute =
      professor.institution && i18n.language === "he"
        ? "אוניברסיטת תל אביב"
        : "Tel Aviv University";

    faculty = professor.faculty;
    childString =
      professor.courses && professor?.courses?.length > 0
        ? `${professor?.courses[0]?.name} ${
            professor?.courses?.length - 1 > 0
              ? `+${professor?.courses?.length - 1} more`
              : ""
          }`
        : "";
    id = professor.id;
  } else if (course) {
    if (course.reviews?.length > 0) {
      averageReview =
        course.reviews.reduce(
          (total, review) => total + calculateCourseAverageRating(review),
          0
        ) / course.reviews.length;
    }
    name = course.name;
    //institute=course.institution.name
    institute =
      course.institution && i18n.language === "he"
        ? "אוניברסיטת תל אביב"
        : "Tel Aviv University";
    faculty = course.faculty;
    childString =
      course.professors && course?.professors?.length > 0
        ? `${course?.professors[0]?.name} ${
            course?.professors?.length - 1 > 0
              ? `+${course?.professors?.length - 1} more`
              : ""
          }`
        : "";
    id = course.id;
  }

  return (
    <div>
      <div className='relative rounded-[8px] border border-[#B8BFF6] md:px-8 md:py-4 px-3 py-3 mb-2 pe-[20px]'>
        <div className='flex items-center justify-between'>
          <div className='flex-1'>
            <div className='flex items-center mb-2 gap-4'>
              <h1 className='font-bold md:text-2xl text-1xl'>{name}</h1>
              {averageReview && (
                <span className='flex items-center bg-[#EAECFA] rounded-[20px] text-[#717EF6] px-2 py-0.5 mr-3 text-[16px]'>
                  <span>{toFixed(averageReview, 1)}</span>
                  &nbsp;
                  <img
                    src='/dev/results/star.svg'
                    width={"100%"}
                    height={"100%"}
                    alt='Star'
                  />
                </span>
              )}
            </div>
            <div className='sm:flex flex-wrap items-center'>
              <div className='flex items-center gap-4 sm:w-[50%] md:mt-3 md:mb-1 mt-1 mb-1'>
                <img
                  src='/dev/results/uni.svg'
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
                  <span>{institute}</span>
                </span>
              </div>
              <div className='flex items-center gap-4 sm:w-[50%]  md:mt-3 md:mb-1 mt-1 mb-1'>
                <img
                  src='/dev/results/faculty.svg'
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
                  &nbsp; {faculty}
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
                  <b>
                    {/* מרצה:  */}
                    {professor ? t("courses") : t("professor")}:{" "}
                  </b>
                  &nbsp;
                  <span>{childString} </span>
                </span>
              </div>
              {/* <div className='flex items-center gap-4 sm:w-[50%]  md:mt-3 md:mb-1 mt-1 mb-1'>
                <img
                  src='/dev/results/full.svg'
                  width={"18px"}
                  height={"18px"}
                  alt='Star'
                />
                <span className='mr-4'>
                  {" "}
                  <b>
                    {professor ? t("professorId") : t("courseId")}:{" "}
                  </b>
                  &nbsp; <span>{id} </span>
                </span>
              </div> */}
            </div>
          </div>
          <div>
            <Link
              href={
                professor ? `/${lng}/professor/${id}` : `/${lng}/info/${id}`
              }
              prefetch
              className='md:text-[14px] text-[11px]'
            >
              <img
                src={`/dev/results/arrow-${
                  direction === "rtl" ? "left" : "right"
                }.svg`}
                // className='absolute left-[20px] top-[36%]'
                alt='Arrow'
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchResult;

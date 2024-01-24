"use client"; // This is a client component 👈🏽
// import ProfessorReview from "@/components/common/ProfessorReview";

export const runtime = "edge";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useTranslation } from "@/app/i18n/client";
import { Button } from "@/components/ui/button";
import CourseService from "@/services/course-service";
import BackButton from "@/components/common/BackButton";
import RatingLines from "@/components/common/RatingSpan";
// import ProfessorReview from "@/components/common/ProfessorReview";
import CourseReviewCard from "@/components/common/CourseReview";
import Pagination from "@/components/common/Pagination";
import ReviewCourseModal from "@/components/common/ReviewCourseModal";
import ReportCourseModal from "@/components/common/ReportCourseModal";
// import reviewService from "@/services/review-service"; todo: add review service
import Container from "@/components/common/Container";
import toFixed from "@/functions/toFixed";
import calculateProfessorAverageRating from "@/functions/calculateProfessorAverageReview";

export default function Info({
  params,
}: {
  params: { id: string; lng: string };
}) {
  const { t, i18n } = useTranslation(params.lng, "resultDetails");
  const direction = i18n.dir();
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    data: course,
    isLoading,
    error,
  } = useQuery<Course>(["course", params.id], () =>
    CourseService.getCourseById(+params.id)
  );
  // const {
  //   data: reviews,
  //   isLoading: reviewsLoading,
  //   error: reviewsError,
  // } = useQuery<CourseReview[]>(["courseReviews", params.id], () =>
  //   reviewService.getCourseReviewById(+params.id)
  // );

  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [totalItems, setTotalItems] = useState(0);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

  useEffect(() => {
    if (course && course.reviews && course.reviews.length > 0) {
      setTotalItems(course.reviews?.length || 0);
    }
  }, [course]);

  if (error) {
    return (
      <div className='py-10 '>
        <h1 className='text-center font-bold text-2xl'>
          The course does not exist or has been archived.
        </h1>
        <p className='text-center text-lg'>
          Oops! We could not find any information on this course.
          <br /> Please go back to the course search page.
        </p>
        <div className='w-full flex justify-center mt-2'>
          <Button onClick={router.back}>Go to results page</Button>
        </div>
      </div>
    );
  }
  if (isLoading || !course) {
    return (
      <div className='py-10 flex w-full justify-center'>
        <Image
          src='/dev/loader.gif'
          width={150}
          height={150}
          className='object-cover'
          alt='loading'
        />
      </div>
    );
  }
  const averageContentReview =
    course.reviews && course.reviews.length > 0
      ? course.reviews?.reduce(
          (total, item) => total + item.contentReview * 1,
          0
        ) / course.reviews.length
      : 0;
  const averageRelevanceReview =
    course.reviews && course.reviews.length > 0
      ? course.reviews.reduce(
          (total, item) => total + item.relevanceReview * 1,
          0
        ) / course.reviews.length
      : 0;

  const averageStructureReview =
    course.reviews && course.reviews.length > 0
      ? course.reviews.reduce(
          (total, item) => total + item.structureReview * 1,
          0
        ) / course.reviews.length
      : 0;

  const averageDifficultyReview =
    course.reviews && course.reviews.length > 0
      ? course.reviews.reduce(
          (total, item) => total + item.difficultyReview * 1,
          0
        ) / course.reviews.length
      : 0;

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastPost = page * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;

  return (
    <div className='px-2'>
      <ReviewCourseModal
        courseId={course.id}
        courseName={course.name}
        open={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        onSuccess={(newReview) => {
          queryClient.setQueryData<Course | undefined>(
            ["course", params.id],
            (prevData) => {
              if (prevData) {
                return {
                  ...prevData,
                  reviews: [newReview, ...prevData.reviews],
                };
              }
              return prevData;
            }
          );
        }}
      />
      <ReportCourseModal
        courseId={course.id}
        courseName={course.name}
        open={showReportModal}
        onClose={() => setShowReportModal(false)}
        onSuccess={(newReport) => console.log(newReport)}
      />

      <Container className='my-8'>
        {/* section 1 */}
        <div className='sm:flex items-center justify-between'>
          <div className='flex items-center sm:mb-0 mb-3 gap-3'>
            <BackButton />
            <h1 className='font-bold md:text-[24px]'>{course.name}</h1>
          </div>
          <div
            className={`flex items-center ${
              direction === "rtl" ? "flex-row-reverse" : ""
            } `}
          >
            <Button
              variant='default'
              className='font-light'
              onClick={() => setShowReviewModal(true)}
            >
              <span>
                {t("addReview")}
                {/* הוספת חוות דעת */}
              </span>
              &nbsp; &nbsp;
              <img src='/dev/plus.svg' alt='PLUS' />
            </Button>
            &nbsp; &nbsp;
            <Button variant='outline' onClick={() => setShowReportModal(true)}>
              {/* דיווח  */}
              {t("report")}
              &nbsp;
              <img src='/dev/report.svg' alt='report' />
            </Button>
          </div>
        </div>
        {/* section 2 */}
        <div className='mt-3'>
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
                <span>
                  {course.institution && i18n.language === "he"
                    ? "אוניברסיטת תל אביב"
                    : "Tel Aviv University"}
                  {/* {course.institution.name} */}
                </span>
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
                <b>
                  {/* פקולטה:  */}
                  {t("faculty")}:{" "}
                </b>
                &nbsp; {course.faculty}
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
                  {t("professor")}:{" "}
                </b>
                &nbsp;
                <span>
                  {course?.professors && course?.professors[0]?.name}{" "}
                  {course?.professors &&
                    course?.professors.length - 1 > 0 &&
                    `+${course?.professors.length - 1} more`}
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
              <span className='mr-4'>
                {" "}
                <b>
                  {/* נקודות זכות: */}
                  {t("courseId")}:{" "}
                </b>
                &nbsp; <span>{course.id} </span>
              </span>
            </div>
          </div>
        </div>
        {/* section 3 */}
        <div className='mt-8'>
          <div className='lg:grid grid-cols-5 gap-4'>
            <div className='col-span-4 md:mb-0 mb-8'>
              <div className='flex items-center md:mb-8 mb-4'>
                {course.tags?.map((tag, i) => (
                  <span
                    key={i}
                    className='ml-1 flex px-4 py-1 text-[13px] rounded-[50px] border border-[#E2E8F0] bg-[#F8FAFC]'
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className='md:grid grid-cols-2 gap-20'>
                <div>
                  <div className='mb-6'>
                    <div className='rating flex items-start justify-between w-[94%]'>
                      <h2 className='text-[#000] font-semibold'>
                        {t("difficultyLevel")}
                      </h2>
                      <span className='font-semibold'>
                        {toFixed(averageDifficultyReview, 1)}
                      </span>
                    </div>
                    <div className='mt-2' />
                    <RatingLines averageReview={averageDifficultyReview} />
                    <p className='text-[#000] mt-1 text-xs'>
                      {t("difficultyLevelInfo")}
                    </p>
                  </div>
                  <div className='mb-6'>
                    <div className='rating flex items-start justify-between w-[94%]'>
                      <h2 className='text-[#000] font-semibold'>
                        {t("courseStructure")}
                      </h2>
                      <span className='font-semibold'>
                        {toFixed(averageStructureReview, 1)}
                      </span>
                    </div>
                    <div className='mt-2' />
                    <RatingLines averageReview={averageStructureReview} />
                    <p className='text-[#000] mt-1 text-xs'>
                      {t("courseStructureInfo")}
                    </p>
                  </div>
                </div>
                <div>
                  <div className='mb-6'>
                    <div className='rating flex items-start justify-between w-[94%]'>
                      <h2 className='text-[#000] font-semibold'>
                        {t("courseContent")}
                      </h2>
                      <span className='font-semibold'>
                        {toFixed(averageContentReview, 1)}
                      </span>
                    </div>
                    <div className='mt-2' />
                    <RatingLines averageReview={averageContentReview} />
                    <p className='text-[#000] mt-1 text-xs'>
                      {t("courseContentInfo")}
                    </p>
                  </div>
                  <div className='mb-6'>
                    <div className='rating flex items-start justify-between w-[94%]'>
                      <h2 className='text-[#000] font-semibold'>
                        {t("degreeRelevance")}
                      </h2>
                      <span className='font-semibold'>
                        {toFixed(averageRelevanceReview, 1)}
                      </span>
                    </div>
                    <div className='mt-2' />
                    <RatingLines averageReview={averageRelevanceReview} />
                    <p className='text-[#000] mt-1 text-xs'>
                      {t("degreeRelevanceInfo")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-span-1'>
              <div className='py-4 rounded-[8px] shadow-lg average bg-[#F0F1FE] h-[100%] flex items-center justify-center flex-col text-center'>
                <div className='mb-3'>{t("average")}</div>
                <div className='flex items-center'>
                  <span className='text-[50px] mr-2 font-bold text-[#707ef6]'>
                    {toFixed(
                      (averageContentReview +
                        averageRelevanceReview +
                        averageStructureReview +
                        averageDifficultyReview) /
                        4,
                      1
                    )}
                  </span>
                  <img src='/dev/average-star.svg' alt='AVERAGE_STAR' />
                </div>
                <div className='mb-3'>
                  ({" "}
                  {t("reviews", {
                    n: totalItems,
                  })}
                  )
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr className='mt-10 mb-5' />
        {/* section 4 about course */}
        {(course.hoursPerWeek || course.description || course.id) && (
          <>
            <div className='about-course'>
              <h1 className='font-bold text-2xl mb-1'>{t("about")}</h1>
              <div className='flex mb-1'>
                {course.hoursPerWeek && (
                  <span className='mr-5 font-semibold'>
                    {t("hoursPerWeek")} {course.hoursPerWeek}
                  </span>
                )}
                {course.id && (
                  <span className='mr-5 font-semibold'>
                    {t("courseNumber")} {course.id}
                  </span>
                )}
              </div>
              <p>{course.description}</p>
            </div>
            <hr className='mt-5 mb-5' />
          </>
        )}
        {/* section 5 course professors */}
        {course?.professors && course.professors.length > 0 && (
          <>
            <div className='course-professors'>
              <h1 className='font-bold text-2xl mb-8'>
                {t("courseProfessor")}
              </h1>
              <div className='professors flex mt-4'>
                {course?.professors?.map((professor, i) => {
                  const averageReview =
                    professor.reviews.length > 0
                      ? professor.reviews.reduce(
                          (total, review) =>
                            total + calculateProfessorAverageRating(review),
                          0
                        ) / professor.reviews.length
                      : 0;
                  return (
                    <Link
                      key={i}
                      href={`/${params.lng}/professor/${professor.id}`}
                    >
                      <div className='professor cursor-pointer text-center flex flex-col justify-center items-center mr-6'>
                        <div className='w-[67px] h-[69px]  bg-[#D1D5FC] rounded-[8px] shadow-lg  text-center flex justify-center flex-col py-2 px-3'>
                          <div className='rating text-[26px] font-light'>
                            {averageReview ? toFixed(averageReview, 1) : 0}
                          </div>
                        </div>
                        <div className='mt-2'>{professor.name}</div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
            <hr className='mt-8 mb-5' />
          </>
        )}
        {/* section 6 professor reviews */}
        {course.reviews && course.reviews.length > 0 && (
          <div className='mb-8'>
            <div className='sm:flex items-center justify-between mb-3'>
              <h1 className='font-bold text-2xl'>{t("courseReviews")}</h1>
              <button
                onClick={() => setShowReviewModal(true)}
                className='py-1 text-white bg-[#3F51F3BD] font-light rounded-[8px] text-md px-4 flex items-center'
              >
                <span>{t("AddRating")}</span>
                &nbsp; &nbsp;
                <img src='/dev/plus.svg' alt='PLUS' />
              </button>
            </div>
            <div className='sm:flex items-center justify-between mb-1'>
              <div>
                <select className='min-w-[190px] h-[40px] px-3 text-sm text-[#475568] border border-[#E2E8F0] rounded-[8px] focus:outline-none'>
                  <option value=''>All rates</option>
                </select>
              </div>
              {totalPages > 0 && (
                <div>
                  <small className='text-[#94A3B7]'>
                    {t("paginationInfo", {
                      itemPerPage: itemsPerPage,
                      page: page,
                      totalPages: totalPages,
                    })}
                  </small>
                </div>
              )}
            </div>
            {course.reviews && (
              <div className='mt-4'>
                {course.reviews
                  .slice(indexOfFirstPost, indexOfLastPost)
                  .map((review, i) => (
                    <CourseReviewCard key={i} review={review} />
                  ))}
              </div>
            )}
            {totalPages > 1 && (
              <div className='mt-6'>
                <Pagination
                  itemsPerPage={itemsPerPage}
                  currentPage={page}
                  totalPages={totalPages}
                  onPageChange={(newPage) => {
                    if (newPage >= 1 && newPage <= totalPages) {
                      setPage(newPage);
                    }
                  }}
                />
              </div>
            )}
          </div>
        )}
        {/* <hr className='mt-8 mb-5' /> */}
        {/* section 7 recommended courses */}
        {/* <div className="recommended-courses">
          <h1 className="font-bold text-2xl mb-3">Recommended for you</h1>
          <p className="mb-2">
            Additional courses rated by students from the Developmental
            Psychology I course
          </p>
          <SearchResult />
          <SearchResult />
          <SearchResult />
        </div> */}
      </Container>
    </div>
  );
}

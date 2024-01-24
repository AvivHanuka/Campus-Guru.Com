"use client"; // This is a client component 👈🏽
// import ProfessorReview from "@/components/common/ProfessorReview";

export const runtime = "edge";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useTranslation } from "@/app/i18n/client";
import { Button } from "@/components/ui/button";
import ProfessorService from "@/services/professor-service";
import BackButton from "@/components/common/BackButton";
import RatingLines from "@/components/common/RatingSpan";
import ProfessorReviewCard from "@/components/common/ProfessorReview";
import Pagination from "@/components/common/Pagination";
import ReviewProfessorModal from "@/components/common/ReviewProfessorModal";
import ReportProfessorModal from "@/components/common/ReportProfessorModal";
import reviewService from "@/services/review-service";
import Container from "@/components/common/Container";
import toFixed from "@/functions/toFixed";
import SearchResult from "@/components/common/SearchResult";

export default function Info({
  params,
}: {
  params: { id: string; lng: string };
}) {
  const { t, i18n } = useTranslation(params.lng, "professor");
  const direction = i18n.dir();
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    data: professor,
    isLoading,
    error,
  } = useQuery<Professor>(["professor", params.id], () =>
    ProfessorService.getProfessorById(+params.id)
  );
  // const {
  //   data: reviews,
  //   isLoading: reviewsLoading,
  //   error: reviewsError,
  // } = useQuery<ProfessorReview[]>(["professorReviews", params.id], () =>
  //   reviewService.getProfessorReviewById(+params.id)
  // );

  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [totalItems, setTotalItems] = useState(0);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

  useEffect(() => {
    if (professor) {
      setTotalItems(professor.reviews?.length || 0);
    }
  }, [professor]);

  if (error) {
    return (
      <div className='py-10 px-1'>
        <h1 className='text-center font-bold text-2xl'>
          Professor data does not exist or has been archived.
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
  if (isLoading || !professor)
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

  const interpersonalRelationshipsReview =
    professor.reviews && professor.reviews.length > 0
      ? professor.reviews?.reduce(
          (total, item) => total + item.interpersonalRelationshipsReview * 1,
          0
        ) / professor.reviews.length
      : 0;
  const proficiencyReview =
    professor.reviews && professor.reviews.length > 0
      ? professor.reviews.reduce(
          (total, item) => total + item.proficiencyReview * 1,
          0
        ) / professor.reviews.length
      : 0;

  const teachingMethodReview =
    professor.reviews && professor.reviews.length > 0
      ? professor.reviews.reduce(
          (total, item) => total + item.teachingMethodReview * 1,
          0
        ) / professor.reviews.length
      : 0;

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastPost = page * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;

  return (
    <div className='px-2'>
      <ReviewProfessorModal
        professorId={professor.id}
        professorName={professor.name}
        open={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        onSuccess={(newReview) => {
          queryClient.setQueryData<Professor | undefined>(
            ["professor", params.id],
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
      <ReportProfessorModal
        professorId={professor.id}
        professorName={professor.name}
        open={showReportModal}
        onClose={() => setShowReportModal(false)}
        onSuccess={(newReport) => console.log(newReport)}
      />

      <Container className='my-8'>
        {/* section 1 */}
        <div className='sm:flex items-center justify-between'>
          <div className='flex items-center sm:mb-0 mb-3 gap-3'>
            <BackButton />
            <h1 className='font-bold md:text-[24px]'>{professor.name}</h1>
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
                  {/* {professor.institution.name} */}
                  {professor.institution && i18n.language === "he"
                    ? "אוניברסיטת תל אביב"
                    : "Tel Aviv University"}
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
                &nbsp; {professor.faculty}
              </span>
            </div>
          </div>
        </div>
        {/* section 3 */}
        <div className='mt-8'>
          <div className='lg:grid grid-cols-5 gap-4'>
            <div className='col-span-4 md:mb-0 mb-8'>
              <div className='flex items-center md:mb-8 mb-4'>
                {professor.tags?.map((tag, i) => (
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
                      <h2 className='text-[#000]'>
                        {t("interpersonalRelationships")}
                      </h2>
                      <span className='font-semibold'>
                        {toFixed(interpersonalRelationshipsReview, 1)}
                      </span>
                    </div>
                    <div className='mt-2' />
                    <RatingLines
                      averageReview={interpersonalRelationshipsReview}
                    />
                  </div>
                  <div className='mb-6'>
                    <div className='rating flex items-start justify-between w-[94%]'>
                      <h2 className='text-[#000]'>
                        {t("professionalKnowledge")}
                      </h2>
                      <span className='font-semibold'>
                        {toFixed(proficiencyReview, 1)}
                      </span>
                    </div>
                    <div className='mt-2' />
                    <RatingLines averageReview={proficiencyReview} />
                  </div>
                </div>
                <div>
                  <div className='mb-6'>
                    <div className='rating flex items-start justify-between w-[94%]'>
                      <h2 className='text-[#000]'>{t("teachingMethod")}</h2>
                      <span className='font-semibold'>
                        {toFixed(teachingMethodReview, 1)}
                      </span>
                    </div>
                    <div className='mt-2' />
                    <RatingLines averageReview={teachingMethodReview} />
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
                      (interpersonalRelationshipsReview +
                        proficiencyReview +
                        teachingMethodReview) /
                        3,
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

        {professor?.courses && professor.courses.length > 0 && (
          <>
            <hr className='mt-10 mb-5' />
            {/* more courses */}
            <div className='mt-3'>
              <h1 className='font-bold text-2xl mb-8'>{t("moreCourses")}</h1>
              {professor.courses.map((course, index) => (
                <SearchResult key={index} course={course} />
              ))}
            </div>
          </>
        )}
        {/* section 5 course professors */}
        {/* {data?.professors && data.professors.length > 0 && (
          <>
            <div className='course-professors'>
              <h1 className='font-bold text-2xl mb-8'>
                {t("professor.courseProfessor")}
              </h1>
              <div className='professors flex mt-4'>
                {data?.professors?.map((professor, i) => (
                  <div
                    key={i}
                    className='professor text-center flex flex-col justify-center items-center mr-6'
                  >
                    <div className='w-[67px] h-[69px]  bg-[#D1D5FC] rounded-[8px] shadow-lg  text-center flex justify-center flex-col py-2 px-3'>
                      <div className='rating text-[26px] font-light'>
                        {professor.averageReview
                          ? toFixed(professor.averageReview, 1)
                          : 0}
                      </div>
                    </div>
                    <div className='mt-2'>{professor.name}</div>
                  </div>
                ))}
              </div>
            </div>
            <hr className='mt-8 mb-5' />
          </>
        )} */}
        {/* section 6 professor reviews */}
        {professor.reviews && professor.reviews.length > 0 && (
          <div className='mb-8'>
            <div className='sm:flex items-center justify-between mb-3'>
              <h1 className='font-bold text-2xl'>{t("professorReviews")}</h1>
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
            {professor.reviews && (
              <div className='mt-4'>
                {professor.reviews
                  .slice(indexOfFirstPost, indexOfLastPost)
                  .map((review, i) => (
                    <ProfessorReviewCard key={i} review={review} />
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

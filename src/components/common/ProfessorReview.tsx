"use client";
import Moment from "react-moment";
import { toast } from "react-hot-toast";
import RatingLines from "./RatingSpan";
import { useTranslation } from "@/app/i18n/client";
import reviewService from "@/services/review-service";
import { useState } from "react";
import { useQueryClient } from "react-query";
import { useParams } from "next/navigation";
import calculateProfessorAverageRating from "@/functions/calculateProfessorAverageReview";
// import { useAppSelector } from "@/hooks";
interface proptypes {
  review: ProfessorReview;
}
function ProfessorReview({ review }: proptypes) {
  const params = useParams();
  const lng: string = params?.lng as string;
  const { t } = useTranslation(lng, "professor");
  // const auth = useAppSelector((state) => state.auth); // todo: add auth

  const queryClient = useQueryClient();

  const [loading, setLoading] = useState(false);

  const upVoteHandler = (review: ProfessorReview) => {
    setLoading(true);
    reviewService
      .upVoteProfessorReview(Number(review.id))
      .then((response: any) => {
        const upvoted: Votes = response.data?.upvoted;
        const downvoted: boolean = response?.data?.downvoted === 1;
        queryClient.setQueryData<Professor | undefined>(
          ["professor", params.id],
          (prevData) => {
            if (prevData) {
              return {
                ...prevData,
                reviews: prevData.reviews.map((item) => {
                  if (item.id === review.id) {
                    return {
                      ...item,
                      upVotes:
                        upvoted && upvoted.userId
                          ? item.upVotes
                            ? [...item.upVotes, upvoted]
                            : [upvoted]
                          : item.upVotes,
                      downVotes:
                        downvoted && item.downVotes
                          ? item.downVotes.filter(
                              (v) => v.userId !== upvoted.userId
                            )
                          : item.downVotes,
                    };
                  }
                  return item;
                }),
              };
            }
            return prevData;
          }
        );
        toast.success("Upvoted successfully");
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);

        toast.error("Error occurred while updating");
      });
  };

  const downVoteHandler = (review: ProfessorReview) => {
    setLoading(true);
    reviewService
      .downVoteProfessorReview(Number(review.id))
      .then((response: any) => {
        const upvoted: boolean = response.data?.upvoted;
        const downvoted: Votes = response.data?.downvoted;
        queryClient.setQueryData<Professor | undefined>(
          ["professor", params.id],
          (prevData) => {
            if (prevData) {
              return {
                ...prevData,
                reviews: prevData.reviews.map((item) => {
                  if (item.id === review.id) {
                    return {
                      ...item,
                      upVotes:
                        upvoted && item.upVotes
                          ? item.upVotes.filter(
                              (v) => v.userId !== downvoted.userId
                            )
                          : item.upVotes,

                      downVotes:
                        downvoted && downvoted.userId
                          ? item.downVotes
                            ? [...item.downVotes, downvoted]
                            : [downvoted]
                          : item.downVotes,
                    };
                  }
                  return item;
                }),
              };
            }
            return prevData;
          }
        );
        toast.success("Down voted successfully");
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);

        toast.error("Error occurred while updating");
      });
  };
  return (
    <div className='rounded-[10px] bg-[#F9F9FF] md:py-5 md:px-6 px-4 py-4 mb-2'>
      <div className='md:flex justify-between items-center mb-4'>
        <div className='flex items-center'>
          <div className='reviewer-name text-light text-[#000]'>
            {review.author}
          </div>
          <div className='text-[#94A3B7] text-[13px] ml-2'>
            <Moment format='MMM YYYY'>{review.creationTimestamp}</Moment>
          </div>
          <span className='flex items-center bg-[#EAECFA] rounded-[20px] text-[#717EF6] px-4 py-1 ml-3 text-[16px]'>
            <span>{calculateProfessorAverageRating(review).toFixed(1)}</span>
            &nbsp;
            <img
              src='/dev/results/star.svg'
              width={"100%"}
              height={"100%"}
              alt='Star'
            />
          </span>
        </div>
        <div className='flex items-center'>
          <div className='good-review flex mr-6 cursor-pointer'>
            <span className='text-[20px] relative top-[5px]  mr-3'>
              {review.downVotes?.length}
            </span>
            <img
              src='/dev/review-bad.svg'
              className='relative top-[9px] w-[22px]  cursor-pointer'
              alt='bad-review'
              onClick={() => {
                if (!loading) {
                  downVoteHandler(review);
                }
              }}
            />
          </div>
          <div className='good-review flex items-end cursor-pointer'>
            <span className='text-[20px] relative top-[7px] mr-3'>
              {review.upVotes?.length}
            </span>
            <img
              src='/dev/review-good.svg'
              className='w-[22px] cursor-pointer'
              alt='good-review'
              onClick={() => {
                if (!loading) {
                  upVoteHandler(review);
                }
              }}
            />
          </div>
        </div>
      </div>
      <p>{review.comment}</p>
      <div className='grid md:grid-cols-2 grid-cols-1 gap-4 mt-5'>
        <div className='flex col-span-1 flex-col md:flex-row  items-center gap-2 mb-5'>
          <div className='w-full md:w-[20%]'>
            {t("interpersonalRelationships")}
          </div>
          <div className='flex-1 w-full md-w-unset '>
            <RatingLines
              averageReview={review.interpersonalRelationshipsReview}
            />
          </div>
        </div>
        <div className='flex col-span-1 flex-col md:flex-row  items-center gap-2 mb-5'>
          <div className='w-full md:w-[20%]'>{t("proficiency")}</div>
          <div className='flex-1 w-full md-w-unset '>
            <RatingLines averageReview={review.proficiencyReview} />
          </div>
        </div>
        <div className='flex col-span-1 flex-col md:flex-row  items-center gap-2 mb-5'>
          <div className='w-full md:w-[20%]'>{t("teachingMethod")}</div>
          <div className='flex-1 w-full md-w-unset '>
            <RatingLines averageReview={review.teachingMethodReview} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfessorReview;

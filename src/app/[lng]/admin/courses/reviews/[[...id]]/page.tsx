"use client";

export const runtime = "edge";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/ui/navbar";
import { Table } from "@/components/ui/table";
import reviewService from "@/services/review-service";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function CourseReviews() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [courseReviews, setCourseReviews] = useState<CourseReview[]>([]);

  useEffect(() => {
    reviewService
      .getCourseReviewById(Number(id))
      .then((response) => setCourseReviews(response));
  }, [id]);

  const renderCourseReviewsTBody = (courseReviews: CourseReview[]) => {
    return (
      <tbody className='divide-y divide-gray-200 bg-white'>
        {courseReviews.map((review) => {
          return (
            <tr key={review.id}>
              <td className='tw-table-td text-center border-r-0'>
                {review.id}
              </td>
              <td className='tw-table-td text-center'>{review.course_id}</td>
              <td className='tw-table-td text-center'>{review.author}</td>
              <td className='tw-table-td text-center'>{review.comment}</td>
              <td className='tw-table-td text-center'>
                {review.structureReview}
              </td>
              <td className='tw-table-td text-center'>
                {review.contentReview}
              </td>
              <td className='tw-table-td text-center'>
                {review.difficultyReview}
              </td>
              <td className='tw-table-td text-center'>
                {review.relevanceReview}
              </td>
              <td className='tw-table-td text-center'>
                {review.averageReview}
              </td>
              <td className='tw-table-td text-center'>
                {review.upVotes ? review.upVotes.length : 0}
              </td>
              <td className='tw-table-td text-center'>
                {review.downVotes ? review.downVotes.length : 0}
              </td>
            </tr>
          );
        })}
      </tbody>
    );
  };

  return (
    <div className='px-10 h-[70vh]'>
      <Navbar />
      <div className='sm:flex sm:items-center text-base my-5'>
        <div className='sm:flex-auto'>
          <h1 className=' font-semibold leading-6 text-gray-900 text-2xl'>
            Manage Course Reviews
          </h1>
        </div>
        <div className='mt-4 sm:mt-0 flex justify-evenly gap-3 flex-col lg:flex-row'>
          <Link href={`/admin/courses`}>
            <Button className='inline-flex items-center bg-indigo-600'>
              <ArrowLeftIcon className='w-5 h-5 mr-2 text-white' />
              <span className='mr-2 text-white'>Go Back</span>
            </Button>
          </Link>
        </div>
      </div>
      <div
        className={clsx(
          "mt-6 flow-root overflow-hidden border-slate-300 rounded-lg",
          courseReviews.length > 0 && "border"
        )}
      >
        <div className='-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
            {courseReviews.length > 0 ? (
              <div>
                <Table
                  headers={[
                    "Id",
                    "Course Id",
                    "Author",
                    "Comment",
                    "Structure Review",
                    "Content Review",
                    "Difficulty Review",
                    "Relevance Review",
                    "Average Review",
                    "Upvotes",
                    "Downvotes",
                  ]}
                  items={courseReviews}
                  renderComponent={renderCourseReviewsTBody}
                />
              </div>
            ) : (
              <div className='text-center'>No course reviews found</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

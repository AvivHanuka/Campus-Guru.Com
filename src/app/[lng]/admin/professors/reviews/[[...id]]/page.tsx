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

export default function ProfessorReviews() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [professorReviews, setProfessorReviews] = useState<ProfessorReview[]>(
    []
  );

  useEffect(() => {
    reviewService
      .getProfessorReviewById(Number(id))
      .then((response) => setProfessorReviews(response));
  }, [id]);

  const renderProfessorReviewsTBody = (professorReviews: ProfessorReview[]) => {
    return (
      <tbody className='divide-y divide-gray-200 bg-white'>
        {professorReviews.map((review) => {
          return (
            <tr key={review.id}>
              <td className='tw-table-td text-center border-r-0'>
                {review.id}
              </td>
              <td className='tw-table-td text-center'>{review.professor_id}</td>
              <td className='tw-table-td text-center'>{review.author}</td>
              <td className='tw-table-td text-center'>{review.comment}</td>
              <td className='tw-table-td text-center'>
                {review.interpersonalRelationshipsReview}
              </td>
              <td className='tw-table-td text-center'>
                {review.proficiencyReview}
              </td>
              <td className='tw-table-td text-center'>
                {review.teachingMethodReview}
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
            Manage Professor Reviews
          </h1>
        </div>
        <div className='mt-4 sm:mt-0 flex justify-evenly gap-3 flex-col lg:flex-row'>
          <Link href={`/admin/professors`}>
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
          professorReviews.length > 0 && "border"
        )}
      >
        <div className='-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
            {professorReviews.length > 0 ? (
              <div>
                <Table
                  headers={[
                    "Id",
                    "Professor Id",
                    "Author",
                    "Comment",
                    "Interpersonal Relationships Review",
                    "Proficiency Review",
                    "Teaching Method Review",
                    "Average Review",
                    "Upvotes",
                    "Downvotes",
                  ]}
                  items={professorReviews}
                  renderComponent={renderProfessorReviewsTBody}
                />
              </div>
            ) : (
              <div className='text-center'>No professor reviews found</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

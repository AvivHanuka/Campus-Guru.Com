import React, { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

import { useMutation } from "react-query";
import {
  Dialog,
  DialogContent,
  // DialogDescription,
  // DialogFooter,
  // DialogHeader,
  // DialogTitle,

  // DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { useAppSelector } from "@/hooks";
import { useTranslation } from "@/app/i18n/client";
import ReviewInput from "./ReviewInput";
import reviewService from "@/services/review-service";
import toFixed from "@/functions/toFixed";
import LoginModal from "@/app/[lng]/login/modal";
import { AxiosError } from "axios";

interface proptypes {
  professorId: number;
  professorName: string;
  open: boolean;
  onClose: () => void;
  onSuccess: (review: ProfessorReview) => void;
}
export default function ReviewCourseModal({
  professorId,
  professorName,
  open,
  onClose,
  onSuccess,
}: proptypes) {
  const params = useParams();
  const lng: string = params?.lng as string;
  const { t } = useTranslation(lng, "common");
  const auth = useAppSelector((state) => state.auth);

  const initialData = {
    professor_id: professorId,
    author: "",
    comment: "",
    interpersonalRelationshipsReview: NaN,
    proficiencyReview: NaN,
    teachingMethodReview: NaN,
  };

  const [data, setData] = useState(initialData);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const { mutate, isLoading, isError, error } = useMutation(
    reviewService.createProfessorReview,
    {
      onSuccess: (newReview) => {
        onSuccess({
          ...newReview,
          upVotes: [],
          downVotes: [],
        });
        onClose();
      },
    }
  );

  const validate = (): boolean => {
    if (
      !data.professor_id ||
      !data.author ||
      isNaN(data.interpersonalRelationshipsReview) ||
      isNaN(data.proficiencyReview) ||
      isNaN(data.teachingMethodReview)
    ) {
      return false;
    }
    return true;
  };

  const submitHandler = () => {
    const enabled = validate();
    if (!enabled) {
      return;
    }
    if (!auth || !auth.jwt) {
      setLoginModalOpen(true);
      return;
    }
    mutate({
      ...data,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <LoginModal
        open={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onSuccess={(authResponse) => {
          setLoginModalOpen(false);
        }}
      />
      <DialogContent
        className='md:px-7 xs:px-1  gap-0 sm:max-w-100 min-w-[50%] lg:min-w-[60%] md:min-w-[80%] sm:min-w-[95%] xs:min-w-[100%] w-full md:w-fit dialogContent'
        style={{ overflowY: "auto" }}
      >
        {" "}
        <div className='flex flex-col'>
          {/* heading */}
          <h1 className='md:text-2xl xs:text-lg mt-4 '>
            {t("professorDialog.heading")} <strong>{professorName}</strong>
          </h1>
          {/* author input */}
          <div className='mt-3 w-[50%]'>
            <Input
              type='search'
              className='ps-6 h-[56px]'
              placeholder={t("professorDialog.authorNamePlaceholder")}
              //  "חיפוש לפי מוסד אקדמאי, מרצה, קורס..."
              value={data.author}
              aria-label={t("professorDialog.authorNamePlaceholder")}
              onChange={(e) => {
                setData({
                  ...data,
                  author: e.currentTarget.value,
                });
              }}
            />
          </div>
          {/* label for rate */}
          <h1 className='text-lg font-bold mt-5'>
            {t("professorDialog.rate")}
          </h1>
          {/* ratings */}
          <div className='flex flex-wrap  md:flex-row xs:flex-col gap-[40px] mt-2'>
            <ReviewInput
              label={t("professorDialog.interpersonalRelationships")}
              tooltip=''
              value={data.interpersonalRelationshipsReview}
              onChange={(val) =>
                setData({
                  ...data,
                  interpersonalRelationshipsReview: val,
                })
              }
            />
            <ReviewInput
              label={t("professorDialog.professionalKnowledge")}
              tooltip=''
              value={data.proficiencyReview}
              onChange={(val) =>
                setData({
                  ...data,
                  proficiencyReview: val,
                })
              }
            />
          </div>
          <div className='flex flex-wrap md:flex-row xs:flex-col gap-[40px] mt-4'>
            <ReviewInput
              label={t("professorDialog.teachingMethod")}
              tooltip=''
              value={data.teachingMethodReview}
              onChange={(val) =>
                setData({
                  ...data,
                  teachingMethodReview: val,
                })
              }
            />
          </div>
          {/* open review */}
          <div className='mt-10'>
            <h1 className='text-lg mt-1 font-bold '>
              {t("professorDialog.openReview")}
            </h1>
            <Textarea
              className='ps-8 pt-4 mt-3 text-foreground bg-input rounded-lg  border-none focus:outline-none placeholder:text-muted-foreground focus-visible:outline-none transition focus-visible:ring-2 focus-visible:ring-ring'
              rows={4}
              placeholder={t("professorDialog.commentPlaceholder")}
              value={data.comment}
              aria-label={t("professorDialog.commentPlaceholder")}
              onChange={(e) => {
                setData({
                  ...data,
                  comment: e.currentTarget.value,
                });
              }}
            />
          </div>
          {isError && error instanceof AxiosError && (
            <div className='mt-2'>
              <p className='font-bold text-red-600'>
                {error.response?.data?.error || "Semething went wrong"}
              </p>
            </div>
          )}
          {/* submit */}
          <div className='block md:flex flex-wrap md:flex-row xs:flex-col gap-2 mt-5'>
            <div className='flex-1'>
              <div className='flex items-center gap-2'>
                <Input
                  type='checkbox'
                  id='terms-checkbox'
                  style={{ border: "0.538px solid #C4C4C4" }}
                  className='w-6 h-6 rounded '
                  checked={termsAccepted}
                  onChange={(e) => {
                    setTermsAccepted(e.target.checked);
                  }}
                />
                <label htmlFor='terms-checkbox' className='font-bold'>
                  {t("professorDialog.terms")}
                </label>
              </div>
            </div>
            <div className='flex-1  xs:w-100 mt-5 md:mt-0'>
              {/* submit and cancel */}
              <div className='flex items-center justify-end gap-2'>
                <Button
                  variant='default'
                  className='font-light px-8 flex gap-2'
                  disabled={!validate() || !termsAccepted || isLoading}
                  onClick={submitHandler}
                >
                  {isLoading && (
                    <Image
                      src='/dev/loader.gif'
                      width={15}
                      height={15}
                      className='object-cover'
                      alt='loading'
                    />
                  )}
                  {t("professorDialog.post")}
                </Button>
                <Button
                  variant='outline'
                  className='border-0 shadow-none px-8'
                  onClick={() => {
                    setData(initialData);
                    onClose();
                  }}
                >
                  {t("professorDialog.cancel")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

"use client";

export const runtime = 'edge';
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import * as yup from "yup";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import relationsService from "@/services/relation-service";

const schema = yup.object().shape({
  course_id: yup
    .number()
    .transform((val) => (isNaN(val) ? undefined : val))
    .required("Course id is required"),
  professor_id: yup
    .number()
    .transform((val) => (isNaN(val) ? undefined : val))
    .required("Professor id is required"),
});

export default function CreateOrUpdateRelation() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const relationId = searchParams.get("id");
  const isNewRelation = !relationId;

  const [_relation, setRelation] = useState<Relation>();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });

  useEffect(() => {
    if (relationId) {
      relationsService
        .getRelationById(Number(relationId))
        .then((response) => {
          reset({ ...response });
          setRelation(response);
        })
        .catch(() => toast("Something went wrong. Please try again!"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [relationId]);

  const handleFormSubmit = async (data: any) => {
    console.log("DA", data);
    
    if (isNewRelation) {
      relationsService
        .createRelation(data)
        .then(() => {
          toast.success("Relation added successfully");
          router.push("/admin/relations");
        })
        .catch((error) => toast.error(error.response.data.error));
    } else {
      delete data.id;
      relationsService
        .updateRelation(data, Number(relationId))
        .then(() => {
          toast.success("Relation updated successfully");
          router.push("/admin/relations");
        })
        .catch((error) => toast.error(error.response.data.error));
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="sm:flex sm:items-centertext-base mb-3 px-8">
        <div className="sm:flex-auto mt-2">
          <h1 className=" font-semibold leading-6 text-gray-900 text-2xl">
            {isNewRelation ? "Add New Relation" : "Update Relation"}
          </h1>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 flex justify-evenly gap-2 sm:grid-cols-2">
          <Link href={"/admin/relations"}>
            <Button className="inline-flex items-center bg-white text-indigo-600 border border-gray-200">
              Cancel
            </Button>
          </Link>
          <Button
            type="submit"
            className="inline-flex items-center bg-indigo-600"
          >
            {isNewRelation ? "Add Relation" : "Update Relation"}
          </Button>
        </div>
      </div>
      <div className="flex px-8 justify-evenly flex-col-reverse xl:flex-row md:space-x-0 xl:space-x-10">
        <div className="flex flex-col flex-1 space-y-4">
          <div className="mt-3">
            <div className="overflow-hidden border border-gray-300 sm:rounded-md flex flex-col flex-1">
              <div className="bg-white px-4 py-5 sm:p-6">
                <div className="space-y-4 mb-3">
                  <div>
                    <label className="block mr-2 mb-1 text-base font-medium text-gray-700">
                      Course Id
                    </label>
                    <Input
                      type="number"
                      id="CourseId"
                      autoComplete="CourseId"
                      register={register}
                      name="course_id"
                      errors={errors}
                      autoCapitalize="false"
                      placeholder="Enter course id"
                    />
                  </div>
                  <div>
                    <label className="block mr-2 mb-1 text-base font-medium text-gray-700">
                      Professor Id
                    </label>
                    <Input
                      type="number"
                      id="ProfessorId"
                      autoComplete="ProfessorId"
                      register={register}
                      name="professor_id"
                      errors={errors}
                      autoCapitalize="false"
                      placeholder="Enter professor id"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

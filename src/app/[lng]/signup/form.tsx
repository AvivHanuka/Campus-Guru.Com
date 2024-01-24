"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/app/i18n/client";
import { useAppSelector } from "@/hooks";
import authService from "@/services/auth-service";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import Image from "next/image";

interface propsType {
  modal?: Boolean;
  onLoginClick?: () => void;
  onSuccess?: () => void;
}
export default function Form({
  modal = false,
  onLoginClick,
  onSuccess,
}: propsType) {
  const params = useParams();
  const lng = params?.lng as string || "en";
  const { t } = useTranslation(lng, "signup");
  const token = useAppSelector((state) => state.auth.jwt);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (token) {
      router.push(`/${lng}/`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const schema = yup.object<User>().shape({
    firstName: yup.string().required(t("firstNameRequired")),
    lastName: yup.string().required(t("lastNameRequired")),
    username: yup.string().required(t("usernameRequired")),
    email: yup.string().required(t("emailRequired")),
    password: yup.string().required(t("passwordRequired")),
  });

  const handleSignup = (
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string
  ) => {
    setLoading(true);
    authService
      .signup(firstName, lastName, username, email, password)
      .then((_res) => {
        // todo: handle success signup
        toast.success(t("signupSuccess"));
        if (modal && onSuccess) {
          onSuccess();
        } else {
          router.push(`/${lng}/login`);
        }
        setLoading(false);
      })
      .catch(() => {
        toast.error(t("signupFail"));
        setLoading(false);
      });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });

  const handleFormSubmit = (data: any) => {
    handleSignup(
      data.firstName,
      data.lastName,
      data.username,
      data.email,
      data.password
    );
  };
  return (
    <>
      <h2 className='text-2xl font-bold text-center'>{t("heading")}</h2>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className='min-w-[100%] my-2'
      >
        <div className='space-y-1 flex md:flex-row sm:flex-col gap-2'>
          <div className='flex-1'>
            <label htmlFor='firstName'>{t("firstName")}</label>
            <Input
              type='text'
              name='firstName'
              register={register}
              errors={errors}
            />
          </div>
          <div className='flex-1'>
            <label htmlFor='lastName'>{t("lastName")}</label>
            <Input
              type='text'
              name='lastName'
              register={register}
              errors={errors}
            />
          </div>
        </div>
        <div className='space-y-1 my-4'>
          <label htmlFor='username'>{t("username")}</label>
          <Input
            type='text'
            name='username'
            register={register}
            errors={errors}
          />
        </div>
        <div className='space-y-1 my-4'>
          <label htmlFor='email'>{t("email")}</label>
          <Input type='text' name='email' register={register} errors={errors} />
        </div>
        <div className='space-y-1 my-4'>
          <label htmlFor='password'>{t("password")}</label>
          <Input
            type='password'
            name='password'
            register={register}
            errors={errors}
          />
        </div>
        <Button className='w-full flex items-center gap-2' disabled={loading}>
          {loading && (
            <Image
              src='/dev/loader.gif'
              width={15}
              height={15}
              className='object-cover'
              alt='loading'
            />
          )}
          {t("signup")}
        </Button>
      </form>
      {/* <h2 className='text-lg mt-4 text-center'>{t("signInWith")}</h2> */}
      {modal ? (
        <>
          <h2 className='text-lg mt-4 text-center'>
            {t("already")}
            <span
              onClick={onLoginClick}
              className='text-blue-500 cursor-pointer'
            >
              {" "}
              {t("signIn")}
            </span>
          </h2>
        </>
      ) : (
        <>
          <h2 className='text-lg mt-4 text-center'>
            {t("already")}{" "}
            <Link href={`/${lng}/login`} className='text-blue-500'>
              {" "}
              {t("signIn")}
            </Link>
          </h2>
        </>
      )}
    </>
  );
}

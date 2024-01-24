"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/app/i18n/client";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { login } from "@/slices/auth";
import { ADMIN_ROLE, MODERATOR_ROLE } from "@/typings/enums";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import SignupModal from "../signup/modal";
interface propsType {
  modal?: Boolean;
  onSuccess?: (auth: AuthState) => void;
}
export default function Form({ modal = false, onSuccess }: propsType) {
  const params = useParams();
  const lng: string = params?.lng as string;
  const { t } = useTranslation(lng, "login");
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.jwt);
  const router = useRouter();
  const [signupModalOpen, setSignupModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      router.push(`/${lng}/`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const schema = yup.object<User>().shape({
    email: yup.string().required(t("emailRequired")),
    password: yup.string().required(t("passwordRequired")),
  });

  const handleLogin = (email: string, password: string) => {
    setLoading(true);
    dispatch(login({ email, password }))
      .unwrap()
      .then((res: AuthState) => {
        toast.success(t("loginSuccess"));
        if (
          res.user.roles &&
          (res.user.roles.includes(MODERATOR_ROLE) ||
            res.user.roles.includes(ADMIN_ROLE))
        ) {
          router.push(`/${lng}/admin`);
        } else {
          if (modal && onSuccess) {
            onSuccess(res);
          } else {
            router.push(`/${lng}/`);
          }
        }
        setLoading(false);
      })
      .catch(() => {
        toast.error(t("loginFail"));
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
    handleLogin(data.email, data.password);
  };
  return (
    <>
      <SignupModal
        open={signupModalOpen}
        onClose={() => setSignupModalOpen(false)}
        onSuccess={() => setSignupModalOpen(false)}
      />
      <h2 className='text-2xl font-bold text-center'>{t("heading")}</h2>
      {modal && <p className=' text-center'>{t("description")}</p>}
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className='min-w-[100%] my-2'
      >
        <div className='space-y-1'>
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
        <Button className='w-full flex items-center gap-2'>
          {loading && (
            <Image
              src='/dev/loader.gif'
              width={15}
              height={15}
              className='object-cover'
              alt='loading'
            />
          )}
          {t("login")}
        </Button>
      </form>
      {/* <h2 className='text-lg mt-4 text-center'>{t("signInWith")}</h2>
      <div className='mt-2 w-100'>
        <Google />
      </div> */}
      {modal ? (
        <>
          <h2 className='text-lg mt-4 text-center'>
            {t("noAccount")}
            <span
              onClick={() => setSignupModalOpen(true)}
              className='text-blue-500 cursor-pointer'
            >
              {" "}
              {t("signUp")}
            </span>
          </h2>
        </>
      ) : (
        <>
          <h2 className='text-lg mt-4 text-center'>
            {t("noAccount")}{" "}
            <Link href={`/${lng}/signup`} className='text-blue-500'>
              {" "}
              {t("signUp")}
            </Link>
          </h2>
        </>
      )}
    </>
  );
}

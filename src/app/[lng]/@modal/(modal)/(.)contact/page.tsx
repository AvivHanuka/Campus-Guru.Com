"use client";
export const runtime = 'edge';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  // DialogTrigger
} from "@/components/ui/dialog";
import React from "react";
import useModal from "@/lib/hooks/useModal";
import { useTranslation } from "@/app/i18n/client";

interface propsType {
  params: {
    lng: string;
  };
}

export default function ContactModal({ params: { lng } }: propsType) {
  const { t } = useTranslation(lng, "contact");

  const [open, close] = useModal();

  return (
    <Dialog open={open} onOpenChange={close} defaultOpen>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>{t("title")}</DialogTitle>
          <DialogDescription>{t("description")}</DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <label htmlFor='name' className='text-right'>
              {t("nameLabel")}
            </label>
            <Input
              id='name'
              defaultValue='Pedro Duarte'
              className='col-span-3'
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <label htmlFor='username' className='text-right'>
              {t("usernameLabel")}
            </label>
            <Input
              id='username'
              defaultValue='@peduarte'
              className='col-span-3'
            />
          </div>
        </div>
        <DialogFooter>
          <Button type='submit'> {t("saveChanges")}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

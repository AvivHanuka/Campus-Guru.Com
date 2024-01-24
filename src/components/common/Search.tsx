"use client";

import React, { useState, useRef } from "react";
import SearchIcon from "@/components/icons/SearchIcon.svg";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import ClearIcon from "@/components/icons/ClearIcon.svg";

import * as Select from "@radix-ui/react-select";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
import { useTranslation } from "@/app/i18n/client";
import { useParams } from "next/navigation";
export default function Search({
  value,
  setValue,
  filterBy,
  setFilterBy,
  searchInputRef,
}: SearchProps) {
  const params = useParams();
  const lng: string = params?.lng as string;
  const { t, i18n } = useTranslation(lng, "home");
  return (
    <>
      <div className={`flex gap-2 items-center`}>
        <div className='relative flex-1'>
          <Image
            className={`absolute ${
              i18n.dir() === "rtl" ? "right" : "left"
            }-0 top-1/2 -translate-y-1/2 ms-3`}
            src={SearchIcon}
            alt='Search Icon'
            width='20'
            height='20'
          />
          <Input
            type='search'
            className='p-2 ps-10'
            placeholder={t("searchPlaceholder")}
            //  "חיפוש לפי מוסד אקדמאי, מרצה, קורס..."
            value={value}
            // aria-label="Search by academic faculty, professor or course"
            aria-label='חפש מוסד אקדמאי, מרצה או קורס'
            onChange={(e) => {
              setValue(e.currentTarget.value);
            }}
            ref={searchInputRef}
          />

          {value.trim() && (
            <button
              type='button'
              onClick={() => setValue("")}
              className={`absolute ${
                i18n.dir() === "ltr" ? "right-0" : "left-0"
              } top-1/2 -translate-y-1/2 h-full me-2.5 opacity-60 hover:opacity-80 transition-opacity delay-75`}
              aria-label='Clear Search'
            >
              <Image src={ClearIcon} alt='Clear Search' />
            </button>
          )}
        </div>
        <Button type='submit' className='px-8' size='lg'>
          {/* חפש/י */}
          {t("search")}
        </Button>
      </div>
      <div className='flex items-center'>
        <select
          className=' border-none bg-transparent  focus:outline-none'
          style={{
            border: "none",
            backgroundColor: "transparent",
            outline: "none",
            /* Other styles */
          }}
          value={filterBy}
          onChange={(e) => setFilterBy(e.target.value)}
          id='search-input'
          /* Other props */
        >
          {/* Options */}
          <option value='courses'>{t("filterByCourses")}</option>
          <option value='professors'>{t("filterByProfessors")}</option>
        </select>
      </div>
      {/* <Select.Root
        defaultValue='courses'
        value={filterBy}
        onValueChange={(newVal) => setFilterBy(newVal)}
        //className='appearance-none border-none bg-transparent cursor-pointer pt-1 focus-visible:outline-none outline-none focus:outline-none  focus-visible:ring-2 focus-visible:ring-ring'
      >
        <Select.Trigger
          className='inline-flex items-center justify-center text-[13px] h-[35px] gap-[5px] bg-transparent  outline-none'
          aria-label='Food'
        >
          <Select.Value
            placeholder={`Filter by ${
              filterBy === "professors" ? "professors" : "courses"
            }`}
          >
            {`Filter by ${
              filterBy === "professors" ? "professors" : "courses"
            }`}
          </Select.Value>
          <Select.Icon className='text-violet11'>
            <ChevronDownIcon />
          </Select.Icon>
        </Select.Trigger>
       
        <Select.Content
          style={{ zIndex: 10 }}
          className='overflow-hidden bg-white px-3 py-2 rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]'
        >
          <Select.Item
            value='courses'
            className='text-[13px] cursor-pointer outline-none border-none'
          >
            Filter By Courses
          </Select.Item>
          <Select.Item
            value='professors'
            className='text-[13px] mt-1 cursor-pointer  outline-none border-none'
          >
            Filter By Professors
          </Select.Item>
        </Select.Content>
      </Select.Root> */}
    </>
  );
}

export function useSearch(
  initialValue: string | null,
  initialFilter: string | null
) {
  const [value, setValue] = useState(initialValue || "");
  const [filterBy, setFilterBy] = useState(initialFilter || "courses");
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  return { value, setValue, filterBy, setFilterBy, searchInputRef };
}

type SearchProps = ReturnType<typeof useSearch>;

"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "./Container";
import { useTranslation } from "@/app/i18n/client";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HamburgerMenuIcon, LockOpen1Icon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import GlobeAltIcon from "@/components/icons/GlobeAltIcon";
import { DropdownMenuSubTrigger } from "@radix-ui/react-dropdown-menu";
import { logOut } from "@/slices/auth";
import { useAppSelector, useAppDispatch } from "@/hooks";

export const Header = () => {
  const params = useParams();
  const dispatch = useAppDispatch();

  const lng: string = params?.lng as string;
  const token = useAppSelector((state) => state.auth.jwt);
  const { t, i18n } = useTranslation(lng, "common");
  const direction = i18n.dir();
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <Container>
        <header className='sm:container sm:mx-auto px-4 '>
          <div
            className={`flex items-center justify-between py-3 ${
              direction === "rtl" ? "flex-row-reverse" : ""
            }`}
          >
            <div>
              <Link href={`/${lng}`} className='flex items-center gap-2 h-10'>
                <div className='relative w-10 h-10'>
                  <Image
                    src='/dev/campus-guru-logo.svg'
                    fill
                    sizes='100vw'
                    alt='Campus Guru Logo'
                    priority
                  />
                </div>
                <div className='relative w-40 h-10'>
                  <Image
                    src='/dev/campus-guru-title.png'
                    fill
                    sizes='100vw'
                    alt='Campus Guru Logo'
                    priority
                  />
                </div>
              </Link>
            </div>
            <div className='md:hidden'>
              <DropdownMenu
                open={open}
                onOpenChange={() => setOpen(true)}
                dir={i18n.dir()}
              >
                <DropdownMenuTrigger className='p-2.5' asChild>
                  <Button size='icon' variant='ghost'>
                    <HamburgerMenuIcon className='w-5 h-5 text-accent-foreground' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align={i18n.dir() === "rtl" ? "start" : "end"}
                  className='md:hidden'
                  ref={ref}
                >
                  <DropdownMenuItem className='text-md p-0'>
                    <HeaderLink path={`/${lng}`} onClick={() => setOpen(false)}>
                      {t("header.menu2")}
                    </HeaderLink>
                  </DropdownMenuItem>
                  <DropdownMenuItem className='text-md p-0'>
                    <HeaderLink
                      path={`/${lng}/our-vision`}
                      onClick={() => setOpen(false)}
                    >
                      {t("header.menu1")}
                    </HeaderLink>
                  </DropdownMenuItem>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger
                      className={"w-full text-md"}
                      asChild
                    >
                      <Button
                        variant='ghost'
                        className='flex gap-3 justify-between'
                      >
                        {t("language.text")}
                        <div className='RightSlot'>
                          <GlobeAltIcon className='text-primary opacity-50 group-hover:opacity-75 hover:opacity-75 transition-opacity' />
                        </div>
                      </Button>
                      {/*</div>*/}
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent className='min-w-fit'>
                      <LanguageSwitcher/>
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                  {token ? (
                    <DropdownMenuItem className='text-md p-0'>
                      <div
                        style={{ cursor: "pointer" }}
                        className='px-4 py-2 tracking-wide whitespace-nowrap w-full justify-start'
                        onClick={() => {
                          dispatch(logOut());

                          setOpen(false);
                        }}
                      >
                        {t("header.logout")}
                      </div>
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem className='text-md p-0'>
                      <HeaderLink
                        path={`/${lng}/login`}
                        onClick={() => setOpen(false)}
                      >
                        {t("header.login")}
                      </HeaderLink>
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <nav className='hidden md:block'>
              <ul className='flex align-center'>
                <li>
                  <HeaderLink className='px-2.5 py-5' path={`/${lng}`}>
                    {t("header.menu2")}
                  </HeaderLink>
                </li>
                <li>
                  <HeaderLink
                    className='px-2.5 py-5'
                    path={`/${lng}/our-vision`}
                  >
                    {t("header.menu1")}
                  </HeaderLink>
                </li>
                <li className={cn(i18n.dir() === "ltr" && "-order-1")}>
                  <DropdownMenu>
                    <DropdownMenuTrigger className='px-5 py-2'>
                      <GlobeAltIcon className='text-primary opacity-50 group-hover:opacity-75 hover:opacity-75 transition-opacity' />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='min-w-fit' align='end'>
                      <LanguageSwitcher />
                    </DropdownMenuContent>
                  </DropdownMenu>
                </li>
                {token ? (
                  <li>
                    <div
                      style={{ cursor: "pointer" }}
                      className='px-5 py-3'
                      // className='px-4 py-2 tracking-wide whitespace-nowrap w-full justify-start'
                      onClick={() => {
                        dispatch(logOut());
                      }}
                    >
                      <LockOpen1Icon className='text-primary opacity-50 group-hover:opacity-75 hover:opacity-75 transition-opacity' />
                    </div>
                  </li>
                ) : (
                  <li>
                    <HeaderLink className='px-2.5 py-5' path={`/${lng}/login`}>
                      {t("header.login")}
                    </HeaderLink>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </header>
      </Container>
    </>
  );
};

const HeaderLink = ({
  path,
  children,
  className,
  onClick,
}: {
  path: string;
  className?: string;
  onClick?: () => void;
} & React.PropsWithChildren) => {
  const pathname = usePathname();

  return (
    <Button
      variant='ghost'
      asChild
      className={cn(
        pathname === path ? "font-bold" : "tracking-wide",
        "whitespace-nowrap w-full justify-start",
        className
      )}
      onClick={onClick}
    >
      <Link href={path}>{children}</Link>
    </Button>
  );
};

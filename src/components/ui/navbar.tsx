import { useEffect, useState } from "react";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const [active, setActive] = useState("Users");
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.includes("professors")) {
      setActive("Professors");
    } else if (pathname.includes("courses")) {
      setActive("Courses");
    } else if (pathname.includes("relations")) {
      setActive("Relations");
    }
  }, [pathname]);
  return (
    <Disclosure as='nav' className='bg-white shadow'>
      {({ open }) => (
        <>
          <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
            <div className='flex h-16 Wjustify-between'>
              <div className='flex justify-center w-full'>
                <div className='hidden sm:ml-6 sm:flex sm:gap-x-8'>
                  <Link
                    href='/admin'
                    onClick={() => setActive("Users")}
                    className={clsx(
                      "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium",
                      active === "Users"
                        ? "border-indigo-500 text-gray-900"
                        : "border-transparent text-gray-500"
                    )}
                  >
                    Users
                  </Link>
                  <Link
                    href='/admin/courses'
                    onClick={() => setActive("Courses")}
                    className={clsx(
                      "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium",
                      active === "Courses"
                        ? "border-indigo-500 text-gray-900"
                        : "border-transparent text-gray-500"
                    )}
                  >
                    Courses
                  </Link>
                  <Link
                    href='/admin/professors'
                    onClick={() => setActive("Professors")}
                    className={clsx(
                      "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium",
                      active === "Professors"
                        ? "border-indigo-500 text-gray-900"
                        : "border-transparent text-gray-500"
                    )}
                  >
                    Professors
                  </Link>
                  <Link
                    href='/admin/relations'
                    onClick={() => setActive("Relations")}
                    className={clsx(
                      "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium",
                      active === "Relations"
                        ? "border-indigo-500 text-gray-900"
                        : "border-transparent text-gray-500"
                    )}
                  >
                    Relations
                  </Link>
                </div>
              </div>

              <div className='-mr-2 flex items-center sm:hidden'>
                {/* Mobile menu button */}
                <Disclosure.Button className='relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'>
                  <span className='absolute -inset-0.5' />
                  <span className='sr-only'>Open main menu</span>
                  {open ? (
                    <XMarkIcon className='block h-6 w-6' aria-hidden='true' />
                  ) : (
                    <Bars3Icon className='block h-6 w-6' aria-hidden='true' />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className='sm:hidden'>
            <div className='space-y-1 pb-3 pt-2'>
              <Disclosure.Button
                as='a'
                href='/admin'
                className='block border-l-4 border-indigo-500 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-indigo-700'
              >
                Users
              </Disclosure.Button>
              <Disclosure.Button
                as='a'
                href='/admin/courses'
                className='block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700'
              >
                Courses
              </Disclosure.Button>
              <Disclosure.Button
                as='a'
                href='/admin/professors'
                className='block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700'
              >
                Professors
              </Disclosure.Button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

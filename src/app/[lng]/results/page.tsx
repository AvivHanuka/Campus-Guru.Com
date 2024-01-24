"use client";
export const runtime = "edge";

import React, { useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useQuery, useQueryClient } from "react-query";
import CourseService from "@/services/course-service";
import Search, { useSearch } from "@/components/common/Search";
import { Button } from "@/components/ui/button";
import SearchResult from "@/components/common/SearchResult";
import Pagination from "@/components/common/Pagination";
import EmptyCard from "@/components/common/EmptyCard";
import { useTranslation } from "@/app/i18n/client";
import Container from "@/components/common/Container";
import professorService from "@/services/professor-service";

interface propsType {
  params: {
    lng: string;
  };
}
export default function ResultsPage({ params: { lng } }: propsType) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const path = usePathname();
  const params = useSearchParams();

  const professorParam = params.get("professors");
  const courseParam = params.get("search");

  const [searchQuery, setSearchQuery] = React.useState<string | null>(
    professorParam ? professorParam : courseParam
  );

  const searchProps = useSearch(
    searchQuery,
    professorParam ? "professors" : "courses"
  );
  const [filterBy, setFilterBy] = useState(searchProps.filterBy);

  const [isFiltering, setIsFiltering] = React.useState<boolean>(!!searchQuery);
  const resultsRef = React.useRef<HTMLDivElement>(null);
  const {
    data: courses,
    isLoading,
    isError: error,
  } = useQuery<Course[]>("courses", CourseService.getCourses);
  const {
    data: professors,
    /*   isLoading: professorLoading,
    isError: professorerror,*/
  } = useQuery<Professor[]>("professors", professorService.getProfessors);

  const [results, setResults] = React.useState<Course[] | Professor[]>([]);

  const [page, setPage] = React.useState(1);
  const [itemsPerPage] = React.useState(5);
  const [totalItems, setTotalItems] = React.useState(0);
  const { t } = useTranslation(lng, "result");
  function updateSearchQuery(value: string | null) {
    if (value?.trim()) {
      setIsFiltering(true);
      setPage(1);
      setSearchQuery(value.trim());
      if (params.get("professors")) {
        router.push(`/${lng}/results?professors=${value?.trim()}`);
      } else {
        router.push(`/${lng}/results?search=${value?.trim()}`);
      }
      setIsFiltering(false);
    } else {
      setSearchQuery(null);
      router.push(`/${lng}/results`);
    }
  }
  function submitSearch(e?: React.FormEvent<HTMLFormElement>) {
    e?.preventDefault();
    updateSearchQuery(searchProps.value || null);
    setTimeout(() => {
      searchProps.searchInputRef.current?.focus();
    }, 0);
  }
  React.useEffect(() => {
    const pageParam = params.get("page");

    if (pageParam && Number.isInteger(parseInt(pageParam))) {
      setPage(parseInt(pageParam));
    }
  }, []);
  React.useEffect(() => {
    if (searchQuery) {
      if (filterBy === "professors") {
        let filteredProfessors = queryClient.getQueryData([
          "professors",
          searchQuery,
        ]) as Professor[];

        if (!filteredProfessors) {
          filteredProfessors = professors?.filter((pro) => {
            return pro.name
              .toLowerCase()
              .includes(searchQuery.toLowerCase() || "");
          }) as Professor[];
          queryClient.setQueryData(
            ["professors", searchQuery],
            filteredProfessors
          );
        }

        setResults(filteredProfessors || []);
        setTotalItems(filteredProfessors ? filteredProfessors?.length : 0);
        setIsFiltering(false);
      } else {
        let filteredCourses = queryClient.getQueryData([
          "courses",
          searchQuery,
        ]) as Course[];
        if (!filteredCourses) {
          filteredCourses = courses?.filter((course) => {
            return course.name
              .toLowerCase()
              .includes(searchQuery.toLowerCase() || "");
          }) as Course[];
          queryClient.setQueryData(["courses", searchQuery], filteredCourses);
        }

        setResults(filteredCourses || []);
        setTotalItems(filteredCourses ? filteredCourses?.length : 0);
        setIsFiltering(false);
      }
    } else {
      setResults([]);
      setTotalItems(0);
    }
    // eslint-disable-next-line
  }, [searchQuery, filterBy, professors, courses, queryClient]);

  React.useEffect(() => {
    if (searchProps.filterBy !== filterBy) {
      if (searchProps.filterBy === "professors") {
        router.push(`/${lng}/results?professors=${searchQuery?.trim()}`);
      } else {
        router.push(`/${lng}/results?search=${searchQuery?.trim()}`);
      }
      setFilterBy(searchProps.filterBy);
    }
  }, [searchProps.filterBy]);
  const indexOfLastPost = page * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const renderLoading = [0, 1, 2, 3].map((_, i) => (
    <EmptyCard key={`skeleton_${i}`} />
  ));

  if (isLoading)
    return <Container className='py-10'>{renderLoading}</Container>;
  if (error)
    return (
      <Container className='py-10'>
        <h1 className='text-2xl text-red-500 text-center'>
          Something Went wrong
        </h1>
      </Container>
    );

  const currentPageResults = results?.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <>
      <div className='relative' ref={resultsRef}>
        <Container>
          <div className='md:mx-auto md:w-10/12 md:px-[unset] px-7 md:container pb-10'>
            <div className='sticky top-0 z-10 pt-2 pb-3 bg-gradient-to-b from-white from-[87.5%] via-[97.5%] via-[#ffffff50]'>
              <div className='font-bold md:text-2xl mb-2 h-7 whitespace-nowrap'>
                {searchQuery !== null && (
                  <>
                    {isFiltering ? (
                      <p>
                        {t("searchingFor", {
                          search: searchQuery,
                        })}
                      </p>
                    ) : results?.length > 0 ? (
                      <p>
                        {t("results", {
                          n: results?.length,
                          search: searchQuery,
                        })}
                      </p>
                    ) : (
                      <p>
                        {t("noresult", {
                          search: searchQuery,
                        })}
                      </p>
                    )}
                  </>
                )}
              </div>
              <div className='space-y-2 pb-4'>
                <form onSubmit={submitSearch}>
                  <Search {...searchProps} />
                </form>
                <hr />
                <Button variant='outline' className='px-6'>
                  {t("filter")}
                </Button>
                {totalItems > 0 && (
                  <p className='text-gray-60'>
                    {t("paginationInfo", {
                      itemPerPage: currentPageResults?.length,
                      page: page,
                      totalPages: totalPages,
                    })}
                  </p>
                )}
              </div>
            </div>
            {searchQuery !== null && results?.length > 0 ? (
              currentPageResults?.length ? (
                currentPageResults.map((item, index) => (
                  <SearchResult
                    key={index}
                    professor={
                      filterBy === "professors"
                        ? (item as Professor)
                        : undefined
                    }
                    course={
                      filterBy === "courses" ? (item as Course) : undefined
                    }
                  />
                ))
              ) : null
            ) : (
              <p className='text-center	font-bold'>
                {t("noresult", {
                  search: searchQuery,
                })}
              </p>
            )}
          </div>
          {totalPages > 1 && results !== null && results?.length > 0 && (
            <div className='mt-6 mb-6'>
              <Pagination
                itemsPerPage={itemsPerPage}
                currentPage={page}
                totalPages={totalPages}
                onPageChange={(newPage) => {
                  if (newPage >= 1 && newPage <= totalPages) {
                    setPage(newPage);
                    // window.history.replaceState(
                    //   null,
                    //   "",
                    //   `${path}?search=${searchQuery}&page=${newPage}`
                    // );
                    router.push(
                      `${path}?${
                        searchProps.filterBy === "professors"
                          ? "professors"
                          : "search"
                      }=${searchQuery}&page=${newPage}`
                    );
                    resultsRef.current?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }
                }}
              />
            </div>
          )}
        </Container>
      </div>
    </>
  );
}

"use client";

import React from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import CourseService from "@/services/course-service";
import professorService from "@/services/professor-service";
const ReactQueryProvider = ({ children }: React.PropsWithChildren) => {
  const [client] = React.useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 1000 * 60,
          refetchOnWindowFocus: false,
          retry: false,
        },
      },
    })
  );
  return (
    <QueryClientProvider client={client}>
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
      <PrefetchCourses>{children}</PrefetchCourses>
    </QueryClientProvider>
  );
};

export default ReactQueryProvider;

const PrefetchCourses = ({ children }: React.PropsWithChildren) => {
  const isDevelopment = process.env.NODE_ENV === "development";
  useQuery("courses", CourseService.getCourses, { enabled: !isDevelopment });
  useQuery("professors", professorService.getProfessors, { enabled: !isDevelopment });
  return <>{children}</>;
};

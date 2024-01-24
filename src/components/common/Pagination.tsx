"use client";
import React, { useEffect, useState } from "react";

interface propType {
  itemsPerPage: number;
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: propType) => {
  const [page, setPage] = useState(currentPage);

  useEffect(() => {
    setPage(currentPage);
  }, [currentPage]);

  const renderPageButton = (pageNumber: number, label: string | number) => (
    <button
      className={`flex items-center justify-center py-2 mx-1 ${
        page === pageNumber
          ? "bg-[#D1D5FC] text-black"
          : "bg-white text-black border hover:bg-[#D1D5FC]"
      } border`}
      style={{
        width: "27px",
        height: "27px",
        fontSize: "12px",
        borderRadius: "50%",
      }}
      onClick={() => onPageChange(pageNumber)}
    >
      {label}
    </button>
  );

  const ellipsis = (
    <button
      className='flex items-center justify-center py-2 mx-1 text-black border'
      style={{
        width: "27px",
        height: "27px",
        fontSize: "12px",
        borderRadius: "50%",
      }}
      disabled
    >
      ...
    </button>
  );
  return (
    <div className='flex justify-center mt-4'>
      <nav className='inline-flex'>
        {totalPages <= 6 ? (
          [...Array(totalPages)].map((p, i) => renderPageButton(i + 1, i + 1))
        ) : (
          <>
            {/* Render first page, current page, current - 1, and current + 1. */}

            {renderPageButton(1, 1)}
            {page > 3 && ellipsis}
            {page > 2 && renderPageButton(page - 1, page - 1)}
            {page > 1 && renderPageButton(page, page)}
            {page < totalPages && renderPageButton(page + 1, page + 1)}

            {page < totalPages - 2 && ellipsis}
            {totalPages - page > 1 && renderPageButton(totalPages, totalPages)}
          </>
        )}
      </nav>
    </div>
  );
};

export default Pagination;

import React from "react";

const RatingLines = ({ averageReview }: { averageReview: number }) => {
  const spans = [];

  for (let i = 1; i <= 5; i++) {
    let spanStyle = {
      borderRadius: "inherit",
      backgroundColor: "#3F51F35E",
      width:
        i <= Math.floor(averageReview)
          ? "100%"
          : i > Math.ceil(averageReview)
          ? "0%"
          : `${(averageReview - Math.floor(averageReview)) * 100}%`,
    };

    let spanStyle1 = {
      borderRadius: "inherit",
      backgroundColor: "#E2E8F0",
      width:
        i <= Math.floor(averageReview)
          ? "0%"
          : i > Math.ceil(averageReview)
          ? "100%"
          : `${(1 - (averageReview - Math.floor(averageReview))) * 100}%`,
    };

    spans.push(
      <span
        key={i}
        className={`block h-[8px] w-[20%] relative mr-2 ${
          i === 1 ? "rounded-tl-sm rounded-bl-sm" : ""
        } ${i === 5 ? "rounded-tr-sm rounded-br-sm" : ""}`}
        //style={spanStyle}
        style={{ boxSizing: "border-box" }}
      >
        <span
          className='absolute left-0 h-[100%] bg-background'
          style={spanStyle}
        ></span>
        <span className='absolute right-0 h-[100%]' style={spanStyle1}></span>
      </span>
    );
  }

  return <div className='rating-lines flex items-center'>{spans}</div>;
};

export default RatingLines;

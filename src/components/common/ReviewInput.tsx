import React from "react";

interface proptype {
  label: string;
  tooltip: string;
  value: number;
  onChange: (newValue: number) => void;
}
export default function ReviewInput({
  label,
  tooltip,
  value,
  onChange,
}: proptype) {
  return (
    <div>
      <div className='flex'>
        <h1
          className='text-lg'
          style={{ lineHeight: "22px", whiteSpace: "break-spaces" }}
        >
          {label}
        </h1>
      </div>
      <div className='flex gap-1 mt-1'>
        {[1, 2, 3, 4, 5].map((num, i) => (
          <div
            key={i}
            className={`flex items-center justify-center w-[40px] h-[40px] cursor-pointer rounded-[10px]  ${
              value === num
                ? "bg-[#717EF6] text-white"
                : "bg-[#F0F1FE] text-black"
            }`}
            style={{ border: "0.538px solid #C4C4C4" }}
            onClick={() => onChange(num)}
          >
            {num}
          </div>
        ))}
      </div>
    </div>
  );
}

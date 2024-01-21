/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

interface Props {
  className: any;
}

export const ArrowUpIcon = ({ className }: Props): JSX.Element => {
  return (
    <svg
      className={`${className}`}
      fill="none"
      height="20"
      viewBox="0 0 20 20"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.39998 7.45833L8.83331 12.8917C9.47498 13.5333 10.525 13.5333 11.1666 12.8917L16.6 7.45833"
        stroke="#0A0A0A"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="1.5"
      />
      <g opacity="0" />
    </svg>
  );
};

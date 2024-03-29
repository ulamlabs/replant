import { IconProps } from '.';

export const ArrowLeftIcon: React.FC<IconProps> = ({
  svgClassName,
  pathClassName,
}) => {
  return (
    <svg
      width='19'
      height='13'
      viewBox='0 0 19 13'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={svgClassName}
    >
      <g clipPath='url(#clip0_25_199)'>
        <path
          d='M1.31818 6H17.6818C17.8988 6 18.1069 6.05268 18.2604 6.14645C18.4138 6.24021 18.5 6.36739 18.5 6.5C18.5 6.63261 18.4138 6.75979 18.2604 6.85355C18.1069 6.94732 17.8988 7 17.6818 7H1.31818C1.10119 7 0.893079 6.94732 0.73964 6.85355C0.586201 6.75979 0.5 6.63261 0.5 6.5C0.5 6.36739 0.586201 6.24021 0.73964 6.14645C0.893079 6.05268 1.10119 6 1.31818 6Z'
          fill='#000000'
          className={pathClassName}
        />
        <path
          d='M1.85888 6.5L6.52426 11.4746C6.62988 11.5872 6.68922 11.74 6.68922 11.8993C6.68922 12.0586 6.62988 12.2114 6.52426 12.3241C6.41863 12.4367 6.27538 12.5 6.12601 12.5C5.97663 12.5 5.83338 12.4367 5.72776 12.3241L0.665255 6.92475C0.612872 6.86902 0.571311 6.80282 0.542954 6.72993C0.514597 6.65705 0.5 6.57891 0.5 6.5C0.5 6.42109 0.514597 6.34295 0.542954 6.27007C0.571311 6.19718 0.612872 6.13098 0.665255 6.07525L5.72776 0.675936C5.83338 0.563286 5.97663 0.5 6.12601 0.5C6.27538 0.5 6.41863 0.563286 6.52426 0.675936C6.62988 0.788585 6.68922 0.941371 6.68922 1.10068C6.68922 1.25999 6.62988 1.41278 6.52426 1.52543L1.85888 6.5Z'
          fill='#000000'
          className={pathClassName}
        />
      </g>
      <defs>
        <clipPath id='clip0_25_199'>
          <rect
            width='18'
            height='12'
            fill='white'
            transform='translate(0.5 0.5)'
          />
        </clipPath>
      </defs>
    </svg>
  );
};

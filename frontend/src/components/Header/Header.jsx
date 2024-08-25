import React from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const history = useNavigate();
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#30270D] px-10 py-3 bg-black">
      <div className="flex items-center gap-4 text-[#FFFFFF]">
        <div className="size-4">
          <svg
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_6_330)">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M24 0.757355L47.2426 24L24 47.2426L0.757355 24L24 0.757355ZM21 35.7574V12.2426L9.24264 24L21 35.7574Z"
                fill="currentColor"
              ></path>
            </g>
            <defs>
              <clipPath id="clip0_6_330">
                <rect width="48" height="48" fill="white"></rect>
              </clipPath>
            </defs>
          </svg>
        </div>
        <h2 className="text-[#FFFFFF] text-lg font-bold leading-tight tracking-[-0.015em]">
          BrilliantAI
        </h2>
      </div>
      <div className="flex flex-1 justify-end gap-8">
        <div className="flex items-center gap-9">
          <a
            className="text-[#FFFFFF] text-sm font-medium leading-normal"
            href="#"
          >
            Overview
          </a>
          <a
            className="text-[#FFFFFF] text-sm font-medium leading-normal"
            href="#"
          >
            Documentation
          </a>
          <a
            className="text-[#FFFFFF] text-sm font-medium leading-normal"
            href="#"
          >
            API Reference
          </a>
          <a
            className="text-[#FFFFFF] text-sm font-medium leading-normal"
            href="#"
          >
            Examples
          </a>
          <a
            className="text-[#FFFFFF] text-sm font-medium leading-normal"
            href="#"
          >
            Playground
          </a>
        </div>
        <button
          className="flex w-[65px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-gray-200 text-[#FFFFFF] text-sm font-bold leading-normal tracking-[0.015em]"
          onClick={() => history("/")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            id="back-arrow"
          >
            <g>
              <path d="M13.83 19a1 1 0 0 1-.78-.37l-4.83-6a1 1 0 0 1 0-1.27l5-6a1 1 0 0 1 1.54 1.28L10.29 12l4.32 5.36a1 1 0 0 1-.78 1.64z"></path>
            </g>
          </svg>
        </button>
      </div>
    </header>
  );
}

export default Header;

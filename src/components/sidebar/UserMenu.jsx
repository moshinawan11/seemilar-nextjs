"use client";

import { useState } from "react";
import Image from "next/image";
import ArrowDown from "@/icons/arrow-down-icon.svg";
import ThemeIcon from "@/icons/theme-icon.svg"; 

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full">
      {/* Trigger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 border border-[#E2E2E4] rounded-lg px-3 py-2 w-full"
      >
        <Image
          src="/images/user-image.png"
          alt="user"
          width={24}
          height={24}
          className="rounded-full"
        />
        <span className="text-base font-semibold text-[#110C22]">Heavy User</span>
        <ArrowDown className="ml-auto" />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-12 left-0 w-60 bg-white border border-[#F3F3F4] rounded-xl shadow-[0px_8px_12px_6px_rgba(0,0,0,0.15),0px_4px_4px_rgba(0,0,0,0.3)] py-2 z-50">
          <ul className="flex flex-col text-sm font-medium text-[#4F4B5C]">
            <li className="px-4 py-2 hover:bg-[#F8F8F8] rounded-md cursor-pointer">
              Account
            </li>
            <li className="px-4 py-2 hover:bg-[#F8F8F8] rounded-md cursor-pointer">
              Settings
            </li>
            <li className="px-4 py-2 hover:bg-[#F8F8F8] rounded-md cursor-pointer">
              Plan
            </li>
            <li className="px-4 py-2 hover:bg-[#F8F8F8] rounded-md cursor-pointer">
              Billing
            </li>
            <li className="px-4 py-2 hover:bg-[#F8F8F8] rounded-md cursor-pointer">
              Team Admin
            </li>
            <li className="px-4 py-2 flex justify-between items-center hover:bg-[#F8F8F8] rounded-md cursor-pointer">
              Theme <ThemeIcon className="w-4 h-4" />
            </li>

            {/* Divider */}
            <hr className="my-2 border-[#DFDFDF]" />

            <li className="px-4 py-2 hover:bg-[#F8F8F8] rounded-md cursor-pointer">
              Sign Out
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

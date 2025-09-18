"use client";

import Image from "next/image";
import GlobeIcon from "@/icons/global.svg";
import ArrowDownIcon from "@/icons/arrow-down-icon.svg";

export default function AuthHeader() {
  return (
    <header className="flex items-center justify-between px-6 h-[68px] border-b border-[#F5F5F5]">
      {/* Logo */}
      <div className="flex items-center">
        <Image
          src="/icons/site-logo.svg"
          alt="Seemilar Logo"
          width={151}
          height={35}
        />
      </div>

      {/* Language selector */}
      <div className="flex items-center gap-1 text-sm font-medium text-[#7C7C8A] cursor-pointer">
        <GlobeIcon className="h-[18px] w-[18px]" />
        <span className="text-[15px] tracking-[-0.03em]">English</span>
        <ArrowDownIcon className="h-[12px] w-[14px]" />
      </div>
    </header>
  );
}

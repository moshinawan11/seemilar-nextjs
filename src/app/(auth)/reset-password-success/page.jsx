"use client";

import Link from "next/link";
import Button from "@/components/ui/Button";
import { useModal } from "@/context/ModalContext";

export default function ResetPasswordSuccessPage() {
  const { openModal } = useModal();
  return (

    <section className="flex flex-col items-center justify-center flex-1 px-4">
      {/* Checkmark Circle */}
      <div className="w-[90px] h-[90px] flex items-center justify-center rounded-full border-4 border-[#0BAA60] mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 text-[#0BAA60]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={3}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      {/* Title */}
      <h1 className="text-[21px] font-medium text-black mb-3 tracking-[-0.03em]">
        Password Changed!
      </h1>

      {/* Subtext */}
      <p className="text-sm text-black/50 mb-6 tracking-[-0.03em] text-center">
        Your Password has been changed successfully
      </p>

      {/* Button */}
      <Button className="w-[255px]" onClick={() => openModal("selectProject")}>Back to login page</Button>
    </section>
  );
}

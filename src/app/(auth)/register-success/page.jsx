"use client";

import Link from "next/link";
import Button from "@/components/ui/Button";

export default function RegisterSuccessPage() {
  return (
    <section className="flex flex-col items-center justify-center flex-1 px-4">
      {/* ✅ Checkmark Circle */}
      <div className="w-[90px] h-[90px] flex items-center justify-center rounded-full border-4 border-[#0BAA60] mb-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-[#0BAA60]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={3}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      {/* Title */}
      <h1 className="text-[30px] font-semibold text-[#110C22] mb-3 tracking-[-0.03em] text-center">
        Thank you for Registration
      </h1>

      {/* Subtext */}
      <p className="text-[17px] text-[#5D5D5D] mb-8 tracking-[-0.03em] text-center">
        Your account has been successfully created.
      </p>

      {/* Button */}
      <Button className="w-44" as={Link} href="/login">
        Login
      </Button>
    </section>
  );
}

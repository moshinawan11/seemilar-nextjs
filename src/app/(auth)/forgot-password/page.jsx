"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      alert("Please enter your email address.");
      return;
    }
    // 🔀 For now just redirect with email
    router.push(`/forgot-password-confirm?email=${encodeURIComponent(email)}`);
  };

  return (

      <section className="flex flex-col items-center justify-center flex-1 px-4">
        <h1 className="text-[30px] font-semibold text-[#110C22] mb-2 tracking-[-0.03em]">
          FIND PASSWORD
        </h1>
        <p className="text-sm text-[#5D5D5D] mb-10">
          Password reset instructions will be sent to your email address
        </p>

        <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col gap-5">
          <div>
            <label htmlFor="email" className="block text-sm text-[#676472] mb-3">
              Your email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 px-4 py-3 border border-[#D9D8DC] rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-purple"
            />
          </div>

          <Button type="submit">Submit</Button>
        </form>

        <p className="text-sm text-[#5D5D5D] mt-10">
          New to here?{" "}
          <Link href="/register" className="underline text-primary-purple">
            Create account
          </Link>
        </p>
      </section>
  );
}

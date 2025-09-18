"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import GoogleIcon from "@/icons/google-icon.svg";
import EyeSlashIcon from "@/icons/eye-slash-icon.svg";
import EyeIcon from "@/icons/eye-icon.svg";
import Button from "@/components/ui/Button";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);

  const handleCaptcha = (token) => {
    setCaptchaToken(token);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!captchaToken) {
      alert("Please verify that you are not a robot.");
      return;
    }
    // proceed with login API call here
    console.log("Captcha OK:", captchaToken);
  };

  return (
    <section className="flex flex-col items-center justify-center flex-1 px-4">
      <h1 className="text-[30px] font-semibold text-[#110C22] mb-2 tracking-[-0.03em]">
        Welcome to Seemilar.
      </h1>
      <p className="text-sm text-[#4F4B5C] mb-10 tracking-[-0.01em]">
        New to here?{" "}
        <Link href="/" className="text-primary-purple underline">
          Create account
        </Link>
      </p>

      <form
        className="w-full max-w-md flex flex-col gap-5"
        onSubmit={handleSubmit}
      >
        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm text-[#676472] mb-3">
            Your email address
          </label>
          <input
            id="email"
            type="email"
            className="w-full h-12 px-4 py-3 text-base tracking-[-0.01em] border border-[#D9D8DC] rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-purple"
          />
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm text-[#676472] mb-3">
            Your password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              className="w-full h-12 px-4 py-3 text-base tracking-[-0.01em] border border-[#D9D8DC] rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-purple"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeIcon className="h-6 w-6" /> : <EyeSlashIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Stay logged in */}
        <label
          htmlFor="remember"
          className="flex items-center gap-2 cursor-pointer select-none"
        >
          <input id="remember" type="checkbox" className="peer hidden" />
          <span className="h-5 w-5 flex items-center justify-center rounded-md border border-[#D9D8DC] peer-checked:bg-[#7357FF] peer-checked:border-[#7357FF] transition">
            <svg
              className="hidden w-3 h-3 text-white peer-checked:block"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </span>
          <span className="text-sm font-semibold text-[#676472] tracking-[-0.01em]">
            Stay logged in
          </span>
        </label>

        {/* ✅ Google reCAPTCHA */}
        <ReCAPTCHA
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
          onChange={handleCaptcha}
          className="w-full"
        />

        {/* Login button */}
        <Button type="submit">Log in</Button>

        {/* Forgot password */}
        <div className="text-center">
          <Link href="/forgot-password" className="text-sm text-[#676472] tracking-[-0.01em]">
            Forgot your <span className="underline">Password?</span>
          </Link>
        </div>

        {/* Google login */}
        <div className="flex flex-col gap-3">
          <span className="text-base text-[#4F4B5C] tracking-[-0.01em]">
            Or Log in with
          </span>
          <button
            type="button"
            className="w-full flex items-center justify-center border border-black/10 rounded-xl h-12 space-x-3"
          >
            <GoogleIcon width={26} height={26} />
            <span className="text-base text-[#110C22] tracking-[-0.01em]">
              Login with Google
            </span>
          </button>
        </div>
      </form>

      <p className="text-sm tracking-[-0.01em] text-[#8D8A95] text-center mt-8 w-[90%] max-w-md">
        By logging in, I agree to the <span className="text-[#110C22]">Terms of service</span> and{" "}
        <span className="text-[#110C22]">Privacy policy.</span>
      </p>
      <p className="text-sm text-[#8D8A95] mt-6 tracking-[-0.03em]">© Seemilar AI</p>
    </section>
  );
}

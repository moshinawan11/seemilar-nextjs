"use client";

export default function ForgotPasswordConfirmPage({ searchParams }) {
  const email = searchParams.email || "you@example.com";

  return (

      <section className="flex flex-col items-center justify-center flex-1 px-4">
        <div className="w-[90px] h-[90px] flex items-center justify-center rounded-full bg-[#F7F7F7] mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-[#ABABAB]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path d="M3 8l9 6 9-6" />
            <rect x="3" y="5" width="18" height="14" rx="2" />
          </svg>
        </div>

        <h1 className="text-[21px] font-medium text-black mb-3 tracking-[-0.03em]">
          Check your email
        </h1>
        <p className="text-sm text-black/50 mb-2 text-center max-w-sm">
          We’ve sent you an email with a link to reset your password
        </p>
        <a
          href={`mailto:${email}`}
          className="text-[17px] text-[#0084FF] underline mt-2 tracking-[-0.01em]"
        >
          {email}
        </a>
      </section>
  );
}

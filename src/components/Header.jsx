"use client";

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="border-b h-[68px] flex items-center">
      <div className="container flex items-center justify-between">
        <Link href="/" className="font-semibold">
          Next Tailwind Boilerplate
        </Link>
        <nav className="flex items-center gap-3">
          <Link href="/" className="text-sm underline-offset-4 hover:underline">
            Home
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

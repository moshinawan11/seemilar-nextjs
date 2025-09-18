"use client";

import { useState } from "react";
import SidebarItem from "./SidebarItem";
import SidebarDropdown from "./SidebarDropdown";
import SidebarNotification from "./SidebarNotification";
import UserMenu from "./UserMenu";

// Icons
import BellIcon from "@/icons/notification-icon.svg";
import TrashIcon from "@/icons/trash-icon.svg";
import SearchIcon from "@/icons/search-icon.svg";
import FolderIcon from "@/icons/private-space-icon.svg";
import BookmarksIcon from "@/icons/bookmarks-icon.svg";
import FavoritesIcon from "@/icons/favorites-icon.svg";
import LabelIcon from "@/icons/label-icon.svg";
import UnassignedIcon from "@/icons/unassigned-icon.svg";
import ShareIcon from "@/icons/share-icon.svg";
import AddIcon from "@/icons/add-icon.svg";
import CollapseIcon from "@/icons/collapse-icon.svg";

export default function Sidebar() {
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`${
        collapsed ? "w-[80px]" : "w-[312px]"
      } h-screen border-r border-[#E2E2E4] flex flex-col justify-between bg-white transition-all duration-300`}
    >
      {/* Top Section */}
      <div className="flex flex-col gap-6 flex-1 overflow-y-auto no-scrollbar px-4 py-5">
        {/* Profile + Actions */}
        <div className="flex items-center justify-between gap-4 relative">
          {!collapsed && <UserMenu />}

                    {/* Notifications */}
          {!collapsed && (
            <button
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className="relative"
            >
              <BellIcon className="w-6 h-6 text-[#4F4B5C]" />
              <span className="absolute -top-1 w-3 h-3 bg-[#8B75FF] border-2 border-white rounded-full"></span>
            </button>
          )}

          {/* Collapse Sidebar */}
          <button
            onClick={() => setCollapsed(!collapsed)}
          >
            <CollapseIcon
              className={`text-[#4F4B5C] transition-transform ${
                collapsed ? "rotate-180" : ""
              }`}
            />
          </button>

          {isNotifOpen && !collapsed && (
            <div className="fixed top-32 left-[260px] z-50">
              <SidebarNotification />
            </div>
          )}
        </div>

        {/* Add Item Button */}
        {!collapsed && (
          <button className="w-full flex items-center justify-center gap-2 bg-[#F1EEFF] text-primary-purple py-2 rounded-lg font-semibold text-base">
            <AddIcon /> Add Item
          </button>
        )}

        {/* Navigation */}
        <nav className="flex flex-col gap-2 border-b border-[#ECECED] pb-4">
          <SidebarItem icon={<SearchIcon />} label="Search" collapsed={collapsed} />
          <SidebarItem icon={<UnassignedIcon />} label="Unassigned Items" collapsed={collapsed} />
          <SidebarItem icon={<BookmarksIcon />} label="Bookmarks" collapsed={collapsed} />
          <SidebarItem icon={<FavoritesIcon />} label="Favorites" collapsed={collapsed} />
          <SidebarItem icon={<LabelIcon />} label="Labels" collapsed={collapsed} />
        </nav>

        {/* Spaces */}
        {!collapsed && (
          <>
            <SidebarDropdown
              title="Private Space"
              items={["My Space 1", "My Space 2", "My Space 3"]}
            />
            <SidebarDropdown
              title="Team Space"
              items={["Team Space 1", "Team Space 2", "Team Space 3", "Team Space 4"]}
            />
          </>
        )}

        {/* Trash */}
        <SidebarItem icon={<TrashIcon />} label="Trash" collapsed={collapsed} />
      </div>

      {/* Bottom CTA */}
      {!collapsed && (
        <div className="bg-gradient-to-r from-[#F56A00] via-[#7357FF] to-[#348BE8] flex gap-3 items-center justify-center rounded-lg px-4 py-4 text-white text-center text-sm font-medium mx-4 mb-4">
          <ShareIcon /> Share with Team members <br /> & Expand your Ideas!
        </div>
      )}
    </aside>
  );
}

"use client";

import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import { usePathname } from "next/navigation";
import AuthHeader from "@/components/auth/AuthHeader";
import { ModalProvider } from "@/context/ModalContext";
import Sidebar from "@/components/sidebar/Sidebar"; // <-- import sidebar

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isAuthRoute =
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/forgot-password") ||
    pathname.startsWith("/forgot-password-confirm") ||
    pathname.startsWith("/reset-password") ||
    pathname.startsWith("/reset-password-success");

  return (
    <html lang="en" className={`${inter.variable}`} suppressHydrationWarning>
      <body className="min-h-dvh antialiased font-sans">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex flex-col min-h-screen bg-white">
            {isAuthRoute ? <AuthHeader /> : <Header />}
            <ModalProvider>
              {isAuthRoute ? (
                // For auth pages → full width
                <main className="flex-1 flex flex-col">{children}</main>
              ) : (
                // For all other pages → sidebar + content
                <div className="flex flex-1">
                  <Sidebar />
                  <main className="flex-1 flex flex-col">{children}</main>
                </div>
              )}
            </ModalProvider>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import Button from "@/components/ui/Button";

export default function HomePage() {
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Next.js + Tailwind Boilerplate (JS)</h1>
      <p className="text-neutral-600 dark:text-neutral-300">
        A minimal, production-ready starter. Edit <code className="px-1 rounded bg-gray-100 dark:bg-gray-800">src/app/page.js</code> to get started.
      </p>
      <div className="flex items-center gap-3">
        <Button><Link href="https://nextjs.org/docs">Next.js Docs</Link></Button>
        <Button variant="secondary"><Link href="https://tailwindcss.com/docs">Tailwind Docs</Link></Button>
        <ThemeToggle />
      </div>
    </section>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import GoogleIcon from "@/icons/google-icon.svg";
import EyeIcon from "@/icons/eye-icon.svg";
import EyeSlashIcon from "@/icons/eye-slash-icon.svg";
import TooltipIcon from "@/icons/tooltip-icon.svg";
import TickIcon from "@/icons/tick-icon.svg";
import CrossIcon from "@/icons/cross-icon.svg";
import WarningIcon from "@/icons/warning-icon.svg"; // ← reuse for caps lock
import Button from "@/components/ui/Button";
import { useModal } from "@/context/ModalContext";

// ✅ Validation rules
const rules = {
    length: {
        test: (v) => v.length >= 8,
        label: "At least 8 characters",
    },
    lowercase: {
        test: (v) => /[a-z]/.test(v),
        label: "At least 1 Lowercase",
    },
    number: {
        test: (v) => /\d/.test(v),
        label: "At least 1 number",
    },
    uppercase: {
        test: (v) => /[A-Z]/.test(v),
        label: "At least 1 Uppercase",
    },
};

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [emailTouched, setEmailTouched] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const [password, setPassword] = useState("");
    const [showValidations, setShowValidations] = useState(false);
    const [capsLock, setCapsLock] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);

    const { openModal } = useModal();

    const isEmailValid = /^\S+@\S+\.\S+$/.test(email);

    useEffect(() => {
        const handleKey = (e) => {
            if (typeof e.getModifierState === "function") {
                setCapsLock(e.getModifierState("CapsLock"));
            }
        };
        window.addEventListener("keydown", handleKey);
        window.addEventListener("keyup", handleKey);
        return () => {
            window.removeEventListener("keydown", handleKey);
            window.removeEventListener("keyup", handleKey);
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isEmailValid) {
            setEmailTouched(true);
            return;
        }
        openModal("verifyEmail", { email });
    };

    return (
        <section className="flex flex-col items-center justify-center flex-1 px-4">
            {/* Title */}
            <h1 className="text-[30px] font-semibold text-[#110C22] tracking-[-0.03em] mb-2">
                Create Account
            </h1>

            {/* Login link */}
            <p className="text-sm text-[#4F4B5C] mb-10 tracking-[-0.01em]">
                Already have an account?{" "}
                <Link href="/login" className="text-primary-purple underline">
                    Log in
                </Link>
            </p>

            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md flex flex-col gap-5"
            >
                {/* Google Register */}
                <button
                    type="button"
                    className="flex items-center justify-center border border-[#D9D8DC] rounded-xl h-12 gap-3"
                >
                    <GoogleIcon width={26} height={26} />
                    <span className="text-base text-[#110C22] tracking-[-0.03em]">
                        Create with Google
                    </span>
                </button>
                <div className="flex justify-center">
                    <span className="text-sm text-[#4F4B5C]">Or</span>
                </div>

                {/* Divider */}
                <span className="w-full border-t border-[#C6C5CA]" />

                {/* Email */}
                <div className="relative">
                    <label htmlFor="email" className="block text-sm text-[#676472] mb-3">
                        Your email address
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={() => setEmailTouched(true)}
                        required
                        className={`w-full h-12 px-4 py-3 text-base tracking-[-0.01em] rounded-xl focus:outline-none focus:ring-2 ${emailTouched && !isEmailValid
                            ? "border border-[#F03D3D] focus:ring-[#F03D3D]"
                            : "border border-[#D9D8DC] focus:ring-primary-purple"
                            }`}
                    />
                    {/* Error message */}
                    {emailTouched && !isEmailValid && (
                        <p className="mt-1 text-[13px] text-[#F03D3D] flex items-center gap-1">
                            <WarningIcon className="text-[#F03D3D]" />
                            Please type valid email address
                        </p>
                    )}
                </div>

                {/* Password with tooltip */}
                <div className="relative">
                    <label htmlFor="password" className="block text-sm text-[#676472] mb-3">
                        New password
                    </label>
                    <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setShowValidations(e.target.value.length > 0);
                        }}
                        onFocus={() => {
                            setPasswordFocused(true);
                            if (password.length > 0) setShowValidations(true);
                        }}
                        onBlur={() => {
                            setPasswordFocused(false);      // we don't reset capsLock; render is gated by focus
                            if (!password) setShowValidations(false);
                            setShowTooltip(false);
                        }}
                        className="w-full h-12 px-4 py-3 text-base tracking-[-0.01em] border border-[#D9D8DC] rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-purple"
                    />


                    {/* Icons */}
                    <div className="absolute right-3 top-11 flex gap-2">
                        <button
                            type="button"
                            onClick={() => setShowTooltip(!showTooltip)}
                            className="text-[#8D8A95]"
                        >
                            <TooltipIcon
                                className={`w-5 h-5 ${showTooltip ? "text-[#8D8A95]" : "text-[#C6C5CA]"
                                    }`}
                            />
                        </button>
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="text-[#8D8A95]"
                        >
                            {showPassword ? (
                                <EyeIcon className="h-6 w-6" />
                            ) : (
                                <EyeSlashIcon className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                    {/* Tooltip */}
                    {showTooltip && (
                        <div className="absolute left-[calc(100%+10px)] top-8 w-56 bg-[#2E293D] text-white text-xs rounded-xl shadow-lg p-3">
                            <ol className="list-disc pl-4 space-y-1">
                                <li>Contains at least one special symbol</li>
                                <li>Contains at least one uppercase letter</li>
                                <li>Contains 3 or more numbers</li>
                                <li>At least 8 characters</li>
                            </ol>
                        </div>
                    )}

                    {/* Caps Lock warning — shows ONLY when focused AND caps is on */}
                    {passwordFocused && capsLock && (
                        <p className="mt-2 text-[13px] text-[#676472] flex items-center gap-1">
                            <WarningIcon className="text-[#676472]" />
                            Caps Lock is on
                        </p>
                    )}

                    {/* Validation rules */}
                    {showValidations && (
                        <div className="mt-2 space-y-1 text-sm">
                            {Object.entries(rules).map(([key, rule]) => {
                                const valid = rule.test(password);
                                return (
                                    <div
                                        key={key}
                                        className={`flex items-center gap-2 ${valid ? "text-[#0BAA60]" : "text-[#F03D3D]"
                                            }`}
                                    >
                                        {valid ? <TickIcon /> : <CrossIcon />} {rule.label}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Confirm Password */}
                <div className="relative">
                    <label
                        htmlFor="confirm-password"
                        className="block text-sm text-[#676472] mb-3"
                    >
                        Confirm password
                    </label>
                    <input
                        id="confirm-password"
                        type={showConfirmPassword ? "text" : "password"}
                        required
                        className="w-full h-12 px-4 py-3 text-base tracking-[-0.01em] border border-[#D9D8DC] rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-purple"
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-11 text-[#8D8A95]"
                    >
                        {showConfirmPassword ? (
                            <EyeIcon className="h-6 w-6" />
                        ) : (
                            <EyeSlashIcon className="h-6 w-6" />
                        )}
                    </button>
                </div>

                {/* Submit */}
                <Button type="submit">Create</Button>
            </form>
        </section>
    );
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
    "./src/app/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      container: { center: true, padding: "1rem", screens: { "2xl": "1280px" } },
      colors: {
        primary: {
          purple: "#8B75FF",
          purpleDark: "#7a66e6",
          light: "#F1EEFF",  
        },
        gray: {
          dark: "#110C22",   
          medium: "#4F4B5C",  
          light: "#8D8A95", 
          border: "#E2E2E4",  
          divider: "#ECECED", 
        },
        accent: {
          orange: "#F56A00",
          blue: "#348BE8",
        },
      },
      fontSize: {
        sm: ["13px", { lineHeight: "20px", letterSpacing: "-0.03em" }],
        base: ["15px", { lineHeight: "24px", letterSpacing: "-0.03em" }],
        lg: ["16px", { lineHeight: "24px", letterSpacing: "-0.01em" }],
        xl: ["30px", { lineHeight: "36px", letterSpacing: "-0.03em" }],
      },
      boxShadow: {
        dropdown: "0px 8px 12px 6px rgba(0, 0, 0, 0.15), 0px 4px 4px rgba(0, 0, 0, 0.3)",
        notification: "0px 20px 24px rgba(0, 0, 0, 0.1)",
      },
      borderRadius: {
        xl: "12px",
        "2xl": "16px",
      },
    },
  },
  plugins: [],
};

seemilar-nextjs/
├─ .husky/
│  └─ pre-commit
├─ .next/
│  ├─ cache/
│  │  ├─ images/
│  │  │  ├─ DAxmQDwRSeBfLGJyif7aUteHzLXd5tXUs-q2kJmLAvs=/
│  │  │  │  └─ 60.1758082872437.okSeLCyFIRUh2urNU5WLvhZTBb7r4+NMWQwracAmLoE=.avif
│  │  │  └─ LsRHXCVj+fw8YQaJZJtcADuEWBMFzeVcV2MT4bP0gAM=/
│  │  │     └─ 60.1758018488318.okSeLCyFIRUh2urNU5WLvhZTBb7r4+NMWQwracAmLoE=.avif
│  │  ├─ swc/
│  │  │  └─ plugins/
│  │  │     └─ v7_windows_x86_64_0.106.15/
│  │  └─ webpack/
│  │     ├─ client-development/
│  │     │  ├─ 0.pack.gz
│  │     │  ├─ 1.pack.gz
│  │     │  ├─ 10.pack.gz
│  │     │  ├─ 11.pack.gz
│  │     │  ├─ 12.pack.gz
│  │     │  ├─ 13.pack.gz
│  │     │  ├─ 14.pack.gz
│  │     │  ├─ 15.pack.gz
│  │     │  ├─ 16.pack.gz
│  │     │  ├─ 17.pack.gz
│  │     │  ├─ 18.pack.gz
│  │     │  ├─ 19.pack.gz
│  │     │  ├─ 2.pack.gz
│  │     │  ├─ 20.pack.gz
│  │     │  ├─ 21.pack.gz
│  │     │  ├─ 22.pack.gz
│  │     │  ├─ 23.pack.gz
│  │     │  ├─ 3.pack.gz
│  │     │  ├─ 4.pack.gz
│  │     │  ├─ 5.pack.gz
│  │     │  ├─ 6.pack.gz
│  │     │  ├─ 7.pack.gz
│  │     │  ├─ 8.pack.gz
│  │     │  ├─ 9.pack.gz
│  │     │  ├─ index.pack.gz
│  │     │  └─ index.pack.gz.old
│  │     ├─ client-development-fallback/
│  │     │  ├─ 0.pack.gz
│  │     │  ├─ index.pack.gz
│  │     │  └─ index.pack.gz.old
│  │     └─ server-development/
│  │        ├─ 0.pack.gz
│  │        ├─ 1.pack.gz
│  │        ├─ 10.pack.gz
│  │        ├─ 11.pack.gz
│  │        ├─ 12.pack.gz
│  │        ├─ 13.pack.gz
│  │        ├─ 14.pack.gz
│  │        ├─ 2.pack.gz
│  │        ├─ 3.pack.gz
│  │        ├─ 4.pack.gz
│  │        ├─ 5.pack.gz
│  │        ├─ 6.pack.gz
│  │        ├─ 7.pack.gz
│  │        ├─ 8.pack.gz
│  │        ├─ 9.pack.gz
│  │        ├─ index.pack.gz
│  │        └─ index.pack.gz.old
│  ├─ server/
│  │  ├─ app/
│  │  │  ├─ _not-found/
│  │  │  │  ├─ page_client-reference-manifest.js
│  │  │  │  └─ page.js
│  │  │  ├─ (auth)/
│  │  │  │  ├─ reset-password/
│  │  │  │  │  ├─ page_client-reference-manifest.js
│  │  │  │  │  └─ page.js
│  │  │  │  └─ reset-password-success/
│  │  │  │     ├─ page_client-reference-manifest.js
│  │  │  │     └─ page.js
│  │  │  ├─ page_client-reference-manifest.js
│  │  │  └─ page.js
│  │  ├─ vendor-chunks/
│  │  │  ├─ @swc.js
│  │  │  ├─ clsx.js
│  │  │  ├─ framer-motion.js
│  │  │  ├─ motion-dom.js
│  │  │  ├─ motion-utils.js
│  │  │  ├─ next-themes.js
│  │  │  ├─ next.js
│  │  │  └─ react.js
│  │  ├─ app-paths-manifest.json
│  │  ├─ interception-route-rewrite-manifest.js
│  │  ├─ middleware-build-manifest.js
│  │  ├─ middleware-manifest.json
│  │  ├─ middleware-react-loadable-manifest.js
│  │  ├─ next-font-manifest.js
│  │  ├─ next-font-manifest.json
│  │  ├─ pages-manifest.json
│  │  ├─ server-reference-manifest.js
│  │  ├─ server-reference-manifest.json
│  │  └─ webpack-runtime.js
│  ├─ static/
│  │  ├─ chunks/
│  │  │  ├─ app/
│  │  │  │  ├─ _not-found/
│  │  │  │  │  └─ page.js
│  │  │  │  ├─ (auth)/
│  │  │  │  │  ├─ reset-password/
│  │  │  │  │  │  └─ page.js
│  │  │  │  │  └─ reset-password-success/
│  │  │  │  │     └─ page.js
│  │  │  │  ├─ layout.js
│  │  │  │  └─ page.js
│  │  │  ├─ app-pages-internals.js
│  │  │  ├─ main-app.js
│  │  │  ├─ polyfills.js
│  │  │  └─ webpack.js
│  │  ├─ css/
│  │  │  └─ app/
│  │  │     └─ layout.css
│  │  ├─ development/
│  │  │  ├─ _buildManifest.js
│  │  │  └─ _ssgManifest.js
│  │  ├─ media/
│  │  │  ├─ 19cfc7226ec3afaa-s.woff2
│  │  │  ├─ 21350d82a1f187e9-s.woff2
│  │  │  ├─ 8e9860b6e62d6359-s.woff2
│  │  │  ├─ ba9851c3c22cd980-s.woff2
│  │  │  ├─ c5fe6dc8356a8c31-s.woff2
│  │  │  ├─ df0a9ae256c0569c-s.woff2
│  │  │  └─ e4af272ccee01ff0-s.p.woff2
│  │  └─ webpack/
│  │     ├─ app/
│  │     │  ├─ (auth)/
│  │     │  │  ├─ reset-password/
│  │     │  │  │  ├─ page.08196333c3dc3499.hot-update.js
│  │     │  │  │  ├─ page.08bd65bb695a6099.hot-update.js
│  │     │  │  │  ├─ page.0929075639cbafd4.hot-update.js
│  │     │  │  │  ├─ page.0b2caae176bf0e68.hot-update.js
│  │     │  │  │  ├─ page.0bca8c1c8af40eb7.hot-update.js
│  │     │  │  │  ├─ page.0d268d7160c53ace.hot-update.js
│  │     │  │  │  ├─ page.0da8dc03d4a4a010.hot-update.js
│  │     │  │  │  ├─ page.0e87a999a9654d85.hot-update.js
│  │     │  │  │  ├─ page.10737be76d6afae5.hot-update.js
│  │     │  │  │  ├─ page.116c2d62c784d49a.hot-update.js
│  │     │  │  │  ├─ page.15ab552679916ed1.hot-update.js
│  │     │  │  │  ├─ page.19aeb8b8f822e1d8.hot-update.js
│  │     │  │  │  ├─ page.1c2704107ea022d5.hot-update.js
│  │     │  │  │  ├─ page.1c6e8097c90e96b7.hot-update.js
│  │     │  │  │  ├─ page.299979e7fbe4e261.hot-update.js
│  │     │  │  │  ├─ page.2e96a0cf5d09e6ba.hot-update.js
│  │     │  │  │  ├─ page.300f0d3361a82dc7.hot-update.js
│  │     │  │  │  ├─ page.3105d08667693058.hot-update.js
│  │     │  │  │  ├─ page.310f0daa60fd59d6.hot-update.js
│  │     │  │  │  ├─ page.389a4f5698a7d9b4.hot-update.js
│  │     │  │  │  ├─ page.3c9ae801e9781b2b.hot-update.js
│  │     │  │  │  ├─ page.40521e1efbcc526f.hot-update.js
│  │     │  │  │  ├─ page.407e8eb594ed4928.hot-update.js
│  │     │  │  │  ├─ page.415033b578e6d1f6.hot-update.js
│  │     │  │  │  ├─ page.4197decaed114e27.hot-update.js
│  │     │  │  │  ├─ page.44d49dbc47d05714.hot-update.js
│  │     │  │  │  ├─ page.465dba859e01d54a.hot-update.js
│  │     │  │  │  ├─ page.47cda231a65c1c69.hot-update.js
│  │     │  │  │  ├─ page.47d4c7882a8172ea.hot-update.js
│  │     │  │  │  ├─ page.48ada5c9ec6d0ccc.hot-update.js
│  │     │  │  │  ├─ page.4e7534af1dd7e97e.hot-update.js
│  │     │  │  │  ├─ page.5356a5b2a2b0ea7f.hot-update.js
│  │     │  │  │  ├─ page.57ef879249f3b8eb.hot-update.js
│  │     │  │  │  ├─ page.5816e02041159d66.hot-update.js
│  │     │  │  │  ├─ page.5e25a5f288de1699.hot-update.js
│  │     │  │  │  ├─ page.5f25026bf0819ae0.hot-update.js
│  │     │  │  │  ├─ page.61866d0eebcc8ba2.hot-update.js
│  │     │  │  │  ├─ page.6456de29ad0ed70c.hot-update.js
│  │     │  │  │  ├─ page.747861be19a53f80.hot-update.js
│  │     │  │  │  ├─ page.77d6f4aaee832389.hot-update.js
│  │     │  │  │  ├─ page.7846f08c466f489e.hot-update.js
│  │     │  │  │  ├─ page.786a102d9bd97514.hot-update.js
│  │     │  │  │  ├─ page.79b867af12cf7448.hot-update.js
│  │     │  │  │  ├─ page.7ffb6f17e361d6a3.hot-update.js
│  │     │  │  │  ├─ page.8a32f899f1b663f1.hot-update.js
│  │     │  │  │  ├─ page.8aafc3d137435cd7.hot-update.js
│  │     │  │  │  ├─ page.93c7f8f00468599a.hot-update.js
│  │     │  │  │  ├─ page.951fe4ccb12d8715.hot-update.js
│  │     │  │  │  ├─ page.960e35216d858a9e.hot-update.js
│  │     │  │  │  ├─ page.98492333c19b9310.hot-update.js
│  │     │  │  │  ├─ page.9e03a76042cdc3b8.hot-update.js
│  │     │  │  │  ├─ page.a66ad9b87ce67747.hot-update.js
│  │     │  │  │  ├─ page.a8639101b9e0a26b.hot-update.js
│  │     │  │  │  ├─ page.aa2da53414336f6a.hot-update.js
│  │     │  │  │  ├─ page.aa52d92d45fa76a1.hot-update.js
│  │     │  │  │  ├─ page.aa9c8172bed99e4d.hot-update.js
│  │     │  │  │  ├─ page.aafd485a5a0a124a.hot-update.js
│  │     │  │  │  ├─ page.aedf7468eb4a2560.hot-update.js
│  │     │  │  │  ├─ page.b1649a2f9e49d8f8.hot-update.js
│  │     │  │  │  ├─ page.b470ae1db5ef3260.hot-update.js
│  │     │  │  │  ├─ page.bd586ab3c3df967c.hot-update.js
│  │     │  │  │  ├─ page.c6b3274827e9b320.hot-update.js
│  │     │  │  │  ├─ page.ce1e497962163f41.hot-update.js
│  │     │  │  │  ├─ page.ced1d8bf5878734d.hot-update.js
│  │     │  │  │  ├─ page.d022e2fcc21a72ae.hot-update.js
│  │     │  │  │  ├─ page.d2afb8065c0df55b.hot-update.js
│  │     │  │  │  ├─ page.d7e49116f8ab01fa.hot-update.js
│  │     │  │  │  ├─ page.d8f6cc18a80f44f5.hot-update.js
│  │     │  │  │  ├─ page.dccfcfcc2904af83.hot-update.js
│  │     │  │  │  ├─ page.ec508c480a705ba8.hot-update.js
│  │     │  │  │  ├─ page.edce56164623b559.hot-update.js
│  │     │  │  │  ├─ page.f369cc77d5e4e1d5.hot-update.js
│  │     │  │  │  ├─ page.f48df984df7abb3f.hot-update.js
│  │     │  │  │  ├─ page.f5a703a113ac7cf0.hot-update.js
│  │     │  │  │  ├─ page.f5da721fd6e5e6d1.hot-update.js
│  │     │  │  │  └─ page.f6e440f7a15b4e93.hot-update.js
│  │     │  │  └─ reset-password-success/
│  │     │  │     ├─ page.08196333c3dc3499.hot-update.js
│  │     │  │     ├─ page.08bd65bb695a6099.hot-update.js
│  │     │  │     ├─ page.0929075639cbafd4.hot-update.js
│  │     │  │     ├─ page.0b2caae176bf0e68.hot-update.js
│  │     │  │     ├─ page.0bca8c1c8af40eb7.hot-update.js
│  │     │  │     ├─ page.0d268d7160c53ace.hot-update.js
│  │     │  │     ├─ page.0da8dc03d4a4a010.hot-update.js
│  │     │  │     ├─ page.0e87a999a9654d85.hot-update.js
│  │     │  │     ├─ page.10737be76d6afae5.hot-update.js
│  │     │  │     ├─ page.116c2d62c784d49a.hot-update.js
│  │     │  │     ├─ page.15ab552679916ed1.hot-update.js
│  │     │  │     ├─ page.19aeb8b8f822e1d8.hot-update.js
│  │     │  │     ├─ page.1c2704107ea022d5.hot-update.js
│  │     │  │     ├─ page.1c6e8097c90e96b7.hot-update.js
│  │     │  │     ├─ page.299979e7fbe4e261.hot-update.js
│  │     │  │     ├─ page.2e96a0cf5d09e6ba.hot-update.js
│  │     │  │     ├─ page.300f0d3361a82dc7.hot-update.js
│  │     │  │     ├─ page.3105d08667693058.hot-update.js
│  │     │  │     ├─ page.310f0daa60fd59d6.hot-update.js
│  │     │  │     ├─ page.389a4f5698a7d9b4.hot-update.js
│  │     │  │     ├─ page.3c9ae801e9781b2b.hot-update.js
│  │     │  │     ├─ page.40521e1efbcc526f.hot-update.js
│  │     │  │     ├─ page.407e8eb594ed4928.hot-update.js
│  │     │  │     ├─ page.415033b578e6d1f6.hot-update.js
│  │     │  │     ├─ page.4197decaed114e27.hot-update.js
│  │     │  │     ├─ page.44d49dbc47d05714.hot-update.js
│  │     │  │     ├─ page.465dba859e01d54a.hot-update.js
│  │     │  │     ├─ page.47cda231a65c1c69.hot-update.js
│  │     │  │     ├─ page.47d4c7882a8172ea.hot-update.js
│  │     │  │     ├─ page.48ada5c9ec6d0ccc.hot-update.js
│  │     │  │     ├─ page.4e7534af1dd7e97e.hot-update.js
│  │     │  │     ├─ page.5356a5b2a2b0ea7f.hot-update.js
│  │     │  │     ├─ page.5708f2bb36945139.hot-update.js
│  │     │  │     ├─ page.57ef879249f3b8eb.hot-update.js
│  │     │  │     ├─ page.5816e02041159d66.hot-update.js
│  │     │  │     ├─ page.5e25a5f288de1699.hot-update.js
│  │     │  │     ├─ page.5f25026bf0819ae0.hot-update.js
│  │     │  │     ├─ page.61866d0eebcc8ba2.hot-update.js
│  │     │  │     ├─ page.6456de29ad0ed70c.hot-update.js
│  │     │  │     ├─ page.747861be19a53f80.hot-update.js
│  │     │  │     ├─ page.77d6f4aaee832389.hot-update.js
│  │     │  │     ├─ page.7846f08c466f489e.hot-update.js
│  │     │  │     ├─ page.786a102d9bd97514.hot-update.js
│  │     │  │     ├─ page.79b867af12cf7448.hot-update.js
│  │     │  │     ├─ page.7ffb6f17e361d6a3.hot-update.js
│  │     │  │     ├─ page.8a32f899f1b663f1.hot-update.js
│  │     │  │     ├─ page.8aafc3d137435cd7.hot-update.js
│  │     │  │     ├─ page.93c7f8f00468599a.hot-update.js
│  │     │  │     ├─ page.951fe4ccb12d8715.hot-update.js
│  │     │  │     ├─ page.960e35216d858a9e.hot-update.js
│  │     │  │     ├─ page.98492333c19b9310.hot-update.js
│  │     │  │     ├─ page.9e03a76042cdc3b8.hot-update.js
│  │     │  │     ├─ page.a66ad9b87ce67747.hot-update.js
│  │     │  │     ├─ page.a8639101b9e0a26b.hot-update.js
│  │     │  │     ├─ page.aa2da53414336f6a.hot-update.js
│  │     │  │     ├─ page.aa52d92d45fa76a1.hot-update.js
│  │     │  │     ├─ page.aa9c8172bed99e4d.hot-update.js
│  │     │  │     ├─ page.aafd485a5a0a124a.hot-update.js
│  │     │  │     ├─ page.aedf7468eb4a2560.hot-update.js
│  │     │  │     ├─ page.b1649a2f9e49d8f8.hot-update.js
│  │     │  │     ├─ page.b470ae1db5ef3260.hot-update.js
│  │     │  │     ├─ page.bd586ab3c3df967c.hot-update.js
│  │     │  │     ├─ page.c6b3274827e9b320.hot-update.js
│  │     │  │     ├─ page.ce1e497962163f41.hot-update.js
│  │     │  │     ├─ page.ced1d8bf5878734d.hot-update.js
│  │     │  │     ├─ page.d022e2fcc21a72ae.hot-update.js
│  │     │  │     ├─ page.d2afb8065c0df55b.hot-update.js
│  │     │  │     ├─ page.d7e49116f8ab01fa.hot-update.js
│  │     │  │     ├─ page.d8f6cc18a80f44f5.hot-update.js
│  │     │  │     ├─ page.dccfcfcc2904af83.hot-update.js
│  │     │  │     ├─ page.ec508c480a705ba8.hot-update.js
│  │     │  │     ├─ page.edce56164623b559.hot-update.js
│  │     │  │     ├─ page.f369cc77d5e4e1d5.hot-update.js
│  │     │  │     ├─ page.f48df984df7abb3f.hot-update.js
│  │     │  │     ├─ page.f5a703a113ac7cf0.hot-update.js
│  │     │  │     ├─ page.f5da721fd6e5e6d1.hot-update.js
│  │     │  │     └─ page.f6e440f7a15b4e93.hot-update.js
│  │     │  ├─ layout.08196333c3dc3499.hot-update.js
│  │     │  ├─ layout.08bd65bb695a6099.hot-update.js
│  │     │  ├─ layout.0929075639cbafd4.hot-update.js
│  │     │  ├─ layout.0b2caae176bf0e68.hot-update.js
│  │     │  ├─ layout.0bca8c1c8af40eb7.hot-update.js
│  │     │  ├─ layout.0d268d7160c53ace.hot-update.js
│  │     │  ├─ layout.0da8dc03d4a4a010.hot-update.js
│  │     │  ├─ layout.0e87a999a9654d85.hot-update.js
│  │     │  ├─ layout.10737be76d6afae5.hot-update.js
│  │     │  ├─ layout.116c2d62c784d49a.hot-update.js
│  │     │  ├─ layout.15ab552679916ed1.hot-update.js
│  │     │  ├─ layout.19aeb8b8f822e1d8.hot-update.js
│  │     │  ├─ layout.1c2704107ea022d5.hot-update.js
│  │     │  ├─ layout.1c6e8097c90e96b7.hot-update.js
│  │     │  ├─ layout.2735a95d96af9d00.hot-update.js
│  │     │  ├─ layout.299979e7fbe4e261.hot-update.js
│  │     │  ├─ layout.2da36a355af038ab.hot-update.js
│  │     │  ├─ layout.2e96a0cf5d09e6ba.hot-update.js
│  │     │  ├─ layout.300f0d3361a82dc7.hot-update.js
│  │     │  ├─ layout.3105d08667693058.hot-update.js
│  │     │  ├─ layout.310f0daa60fd59d6.hot-update.js
│  │     │  ├─ layout.389a4f5698a7d9b4.hot-update.js
│  │     │  ├─ layout.3c9ae801e9781b2b.hot-update.js
│  │     │  ├─ layout.40521e1efbcc526f.hot-update.js
│  │     │  ├─ layout.407e8eb594ed4928.hot-update.js
│  │     │  ├─ layout.415033b578e6d1f6.hot-update.js
│  │     │  ├─ layout.4197decaed114e27.hot-update.js
│  │     │  ├─ layout.44d49dbc47d05714.hot-update.js
│  │     │  ├─ layout.465dba859e01d54a.hot-update.js
│  │     │  ├─ layout.47cda231a65c1c69.hot-update.js
│  │     │  ├─ layout.47d4c7882a8172ea.hot-update.js
│  │     │  ├─ layout.48ada5c9ec6d0ccc.hot-update.js
│  │     │  ├─ layout.4e7534af1dd7e97e.hot-update.js
│  │     │  ├─ layout.52b4f12c6e86dc67.hot-update.js
│  │     │  ├─ layout.5356a5b2a2b0ea7f.hot-update.js
│  │     │  ├─ layout.5708f2bb36945139.hot-update.js
│  │     │  ├─ layout.57ef879249f3b8eb.hot-update.js
│  │     │  ├─ layout.5816e02041159d66.hot-update.js
│  │     │  ├─ layout.5e25a5f288de1699.hot-update.js
│  │     │  ├─ layout.5f25026bf0819ae0.hot-update.js
│  │     │  ├─ layout.61866d0eebcc8ba2.hot-update.js
│  │     │  ├─ layout.6456de29ad0ed70c.hot-update.js
│  │     │  ├─ layout.747861be19a53f80.hot-update.js
│  │     │  ├─ layout.77d6f4aaee832389.hot-update.js
│  │     │  ├─ layout.7846f08c466f489e.hot-update.js
│  │     │  ├─ layout.786a102d9bd97514.hot-update.js
│  │     │  ├─ layout.79b867af12cf7448.hot-update.js
│  │     │  ├─ layout.7ffb6f17e361d6a3.hot-update.js
│  │     │  ├─ layout.8a32f899f1b663f1.hot-update.js
│  │     │  ├─ layout.8aafc3d137435cd7.hot-update.js
│  │     │  ├─ layout.93c7f8f00468599a.hot-update.js
│  │     │  ├─ layout.951fe4ccb12d8715.hot-update.js
│  │     │  ├─ layout.960e35216d858a9e.hot-update.js
│  │     │  ├─ layout.98492333c19b9310.hot-update.js
│  │     │  ├─ layout.9e03a76042cdc3b8.hot-update.js
│  │     │  ├─ layout.a66ad9b87ce67747.hot-update.js
│  │     │  ├─ layout.a8639101b9e0a26b.hot-update.js
│  │     │  ├─ layout.aa2da53414336f6a.hot-update.js
│  │     │  ├─ layout.aa52d92d45fa76a1.hot-update.js
│  │     │  ├─ layout.aa9c8172bed99e4d.hot-update.js
│  │     │  ├─ layout.aafd485a5a0a124a.hot-update.js
│  │     │  ├─ layout.aedf7468eb4a2560.hot-update.js
│  │     │  ├─ layout.b1649a2f9e49d8f8.hot-update.js
│  │     │  ├─ layout.b470ae1db5ef3260.hot-update.js
│  │     │  ├─ layout.bd586ab3c3df967c.hot-update.js
│  │     │  ├─ layout.c26881ad43408282.hot-update.js
│  │     │  ├─ layout.c6b3274827e9b320.hot-update.js
│  │     │  ├─ layout.ca6bcba61e07fa86.hot-update.js
│  │     │  ├─ layout.ce1e497962163f41.hot-update.js
│  │     │  ├─ layout.ced1d8bf5878734d.hot-update.js
│  │     │  ├─ layout.d022e2fcc21a72ae.hot-update.js
│  │     │  ├─ layout.d2afb8065c0df55b.hot-update.js
│  │     │  ├─ layout.d7e49116f8ab01fa.hot-update.js
│  │     │  ├─ layout.d8f6cc18a80f44f5.hot-update.js
│  │     │  ├─ layout.dccfcfcc2904af83.hot-update.js
│  │     │  ├─ layout.ec508c480a705ba8.hot-update.js
│  │     │  ├─ layout.edce56164623b559.hot-update.js
│  │     │  ├─ layout.f00e26ccf569ae84.hot-update.js
│  │     │  ├─ layout.f369cc77d5e4e1d5.hot-update.js
│  │     │  ├─ layout.f48df984df7abb3f.hot-update.js
│  │     │  ├─ layout.f5a703a113ac7cf0.hot-update.js
│  │     │  ├─ layout.f5da721fd6e5e6d1.hot-update.js
│  │     │  ├─ layout.f6e440f7a15b4e93.hot-update.js
│  │     │  └─ layout.fbb949c74c79fa30.hot-update.js
│  │     ├─ 06ae156f1229b57c.webpack.hot-update.json
│  │     ├─ 08196333c3dc3499.webpack.hot-update.json
│  │     ├─ 08bd65bb695a6099.webpack.hot-update.json
│  │     ├─ 0929075639cbafd4.webpack.hot-update.json
│  │     ├─ 0b2caae176bf0e68.webpack.hot-update.json
│  │     ├─ 0bca8c1c8af40eb7.webpack.hot-update.json
│  │     ├─ 0d268d7160c53ace.webpack.hot-update.json
│  │     ├─ 0da8dc03d4a4a010.webpack.hot-update.json
│  │     ├─ 0e87a999a9654d85.webpack.hot-update.json
│  │     ├─ 10737be76d6afae5.webpack.hot-update.json
│  │     ├─ 116c2d62c784d49a.webpack.hot-update.json
│  │     ├─ 15ab552679916ed1.webpack.hot-update.json
│  │     ├─ 19aeb8b8f822e1d8.webpack.hot-update.json
│  │     ├─ 1c2704107ea022d5.webpack.hot-update.json
│  │     ├─ 1c6e8097c90e96b7.webpack.hot-update.json
│  │     ├─ 2735a95d96af9d00.webpack.hot-update.json
│  │     ├─ 299979e7fbe4e261.webpack.hot-update.json
│  │     ├─ 2da36a355af038ab.webpack.hot-update.json
│  │     ├─ 2e96a0cf5d09e6ba.webpack.hot-update.json
│  │     ├─ 300f0d3361a82dc7.webpack.hot-update.json
│  │     ├─ 3105d08667693058.webpack.hot-update.json
│  │     ├─ 310f0daa60fd59d6.webpack.hot-update.json
│  │     ├─ 389a4f5698a7d9b4.webpack.hot-update.json
│  │     ├─ 3c9ae801e9781b2b.webpack.hot-update.json
│  │     ├─ 40521e1efbcc526f.webpack.hot-update.json
│  │     ├─ 407e8eb594ed4928.webpack.hot-update.json
│  │     ├─ 415033b578e6d1f6.webpack.hot-update.json
│  │     ├─ 4197decaed114e27.webpack.hot-update.json
│  │     ├─ 44d49dbc47d05714.webpack.hot-update.json
│  │     ├─ 465dba859e01d54a.webpack.hot-update.json
│  │     ├─ 47cda231a65c1c69.webpack.hot-update.json
│  │     ├─ 47d4c7882a8172ea.webpack.hot-update.json
│  │     ├─ 48ada5c9ec6d0ccc.webpack.hot-update.json
│  │     ├─ 4e7534af1dd7e97e.webpack.hot-update.json
│  │     ├─ 52b4f12c6e86dc67.webpack.hot-update.json
│  │     ├─ 5356a5b2a2b0ea7f.webpack.hot-update.json
│  │     ├─ 5708f2bb36945139.webpack.hot-update.json
│  │     ├─ 57ef879249f3b8eb.webpack.hot-update.json
│  │     ├─ 5816e02041159d66.webpack.hot-update.json
│  │     ├─ 5e25a5f288de1699.webpack.hot-update.json
│  │     ├─ 5f25026bf0819ae0.webpack.hot-update.json
│  │     ├─ 61866d0eebcc8ba2.webpack.hot-update.json
│  │     ├─ 633457081244afec._.hot-update.json
│  │     ├─ 6456de29ad0ed70c.webpack.hot-update.json
│  │     ├─ 747861be19a53f80.webpack.hot-update.json
│  │     ├─ 77d6f4aaee832389.webpack.hot-update.json
│  │     ├─ 7846f08c466f489e.webpack.hot-update.json
│  │     ├─ 786a102d9bd97514.webpack.hot-update.json
│  │     ├─ 79b867af12cf7448.webpack.hot-update.json
│  │     ├─ 7ffb6f17e361d6a3.webpack.hot-update.json
│  │     ├─ 8a32f899f1b663f1.webpack.hot-update.json
│  │     ├─ 8aafc3d137435cd7.webpack.hot-update.json
│  │     ├─ 93c7f8f00468599a.webpack.hot-update.json
│  │     ├─ 951fe4ccb12d8715.webpack.hot-update.json
│  │     ├─ 960e35216d858a9e.webpack.hot-update.json
│  │     ├─ 98492333c19b9310.webpack.hot-update.json
│  │     ├─ 9a49132f0d30a0de.webpack.hot-update.json
│  │     ├─ 9e03a76042cdc3b8.webpack.hot-update.json
│  │     ├─ 9fbc0474771b0c7d.webpack.hot-update.json
│  │     ├─ a66ad9b87ce67747.webpack.hot-update.json
│  │     ├─ a8639101b9e0a26b.webpack.hot-update.json
│  │     ├─ aa2da53414336f6a.webpack.hot-update.json
│  │     ├─ aa52d92d45fa76a1.webpack.hot-update.json
│  │     ├─ aa9c8172bed99e4d.webpack.hot-update.json
│  │     ├─ aac05908225e1b81.webpack.hot-update.json
│  │     ├─ aafd485a5a0a124a.webpack.hot-update.json
│  │     ├─ aedf7468eb4a2560.webpack.hot-update.json
│  │     ├─ b1649a2f9e49d8f8.webpack.hot-update.json
│  │     ├─ b470ae1db5ef3260.webpack.hot-update.json
│  │     ├─ bd586ab3c3df967c.webpack.hot-update.json
│  │     ├─ c26881ad43408282.webpack.hot-update.json
│  │     ├─ c6b3274827e9b320.webpack.hot-update.json
│  │     ├─ ca6bcba61e07fa86.webpack.hot-update.json
│  │     ├─ ce1e497962163f41.webpack.hot-update.json
│  │     ├─ ced1d8bf5878734d.webpack.hot-update.json
│  │     ├─ d022e2fcc21a72ae.webpack.hot-update.json
│  │     ├─ d2afb8065c0df55b.webpack.hot-update.json
│  │     ├─ d7e49116f8ab01fa.webpack.hot-update.json
│  │     ├─ d8f6cc18a80f44f5.webpack.hot-update.json
│  │     ├─ dccfcfcc2904af83.webpack.hot-update.json
│  │     ├─ ec508c480a705ba8.webpack.hot-update.json
│  │     ├─ edce56164623b559.webpack.hot-update.json
│  │     ├─ f00e26ccf569ae84.webpack.hot-update.json
│  │     ├─ f369cc77d5e4e1d5.webpack.hot-update.json
│  │     ├─ f48df984df7abb3f.webpack.hot-update.json
│  │     ├─ f5a703a113ac7cf0.webpack.hot-update.json
│  │     ├─ f5da721fd6e5e6d1.webpack.hot-update.json
│  │     ├─ f6e440f7a15b4e93.webpack.hot-update.json
│  │     ├─ fbb949c74c79fa30.webpack.hot-update.json
│  │     ├─ webpack.06ae156f1229b57c.hot-update.js
│  │     ├─ webpack.08196333c3dc3499.hot-update.js
│  │     ├─ webpack.08bd65bb695a6099.hot-update.js
│  │     ├─ webpack.0929075639cbafd4.hot-update.js
│  │     ├─ webpack.0b2caae176bf0e68.hot-update.js
│  │     ├─ webpack.0bca8c1c8af40eb7.hot-update.js
│  │     ├─ webpack.0d268d7160c53ace.hot-update.js
│  │     ├─ webpack.0da8dc03d4a4a010.hot-update.js
│  │     ├─ webpack.0e87a999a9654d85.hot-update.js
│  │     ├─ webpack.10737be76d6afae5.hot-update.js
│  │     ├─ webpack.116c2d62c784d49a.hot-update.js
│  │     ├─ webpack.15ab552679916ed1.hot-update.js
│  │     ├─ webpack.19aeb8b8f822e1d8.hot-update.js
│  │     ├─ webpack.1c2704107ea022d5.hot-update.js
│  │     ├─ webpack.1c6e8097c90e96b7.hot-update.js
│  │     ├─ webpack.2735a95d96af9d00.hot-update.js
│  │     ├─ webpack.299979e7fbe4e261.hot-update.js
│  │     ├─ webpack.2da36a355af038ab.hot-update.js
│  │     ├─ webpack.2e96a0cf5d09e6ba.hot-update.js
│  │     ├─ webpack.300f0d3361a82dc7.hot-update.js
│  │     ├─ webpack.3105d08667693058.hot-update.js
│  │     ├─ webpack.310f0daa60fd59d6.hot-update.js
│  │     ├─ webpack.389a4f5698a7d9b4.hot-update.js
│  │     ├─ webpack.3c9ae801e9781b2b.hot-update.js
│  │     ├─ webpack.40521e1efbcc526f.hot-update.js
│  │     ├─ webpack.407e8eb594ed4928.hot-update.js
│  │     ├─ webpack.415033b578e6d1f6.hot-update.js
│  │     ├─ webpack.4197decaed114e27.hot-update.js
│  │     ├─ webpack.44d49dbc47d05714.hot-update.js
│  │     ├─ webpack.465dba859e01d54a.hot-update.js
│  │     ├─ webpack.47cda231a65c1c69.hot-update.js
│  │     ├─ webpack.47d4c7882a8172ea.hot-update.js
│  │     ├─ webpack.48ada5c9ec6d0ccc.hot-update.js
│  │     ├─ webpack.4e7534af1dd7e97e.hot-update.js
│  │     ├─ webpack.52b4f12c6e86dc67.hot-update.js
│  │     ├─ webpack.5356a5b2a2b0ea7f.hot-update.js
│  │     ├─ webpack.5708f2bb36945139.hot-update.js
│  │     ├─ webpack.57ef879249f3b8eb.hot-update.js
│  │     ├─ webpack.5816e02041159d66.hot-update.js
│  │     ├─ webpack.5e25a5f288de1699.hot-update.js
│  │     ├─ webpack.5f25026bf0819ae0.hot-update.js
│  │     ├─ webpack.61866d0eebcc8ba2.hot-update.js
│  │     ├─ webpack.6456de29ad0ed70c.hot-update.js
│  │     ├─ webpack.747861be19a53f80.hot-update.js
│  │     ├─ webpack.77d6f4aaee832389.hot-update.js
│  │     ├─ webpack.7846f08c466f489e.hot-update.js
│  │     ├─ webpack.786a102d9bd97514.hot-update.js
│  │     ├─ webpack.79b867af12cf7448.hot-update.js
│  │     ├─ webpack.7ffb6f17e361d6a3.hot-update.js
│  │     ├─ webpack.8a32f899f1b663f1.hot-update.js
│  │     ├─ webpack.8aafc3d137435cd7.hot-update.js
│  │     ├─ webpack.93c7f8f00468599a.hot-update.js
│  │     ├─ webpack.951fe4ccb12d8715.hot-update.js
│  │     ├─ webpack.960e35216d858a9e.hot-update.js
│  │     ├─ webpack.98492333c19b9310.hot-update.js
│  │     ├─ webpack.9a49132f0d30a0de.hot-update.js
│  │     ├─ webpack.9e03a76042cdc3b8.hot-update.js
│  │     ├─ webpack.9fbc0474771b0c7d.hot-update.js
│  │     ├─ webpack.a66ad9b87ce67747.hot-update.js
│  │     ├─ webpack.a8639101b9e0a26b.hot-update.js
│  │     ├─ webpack.aa2da53414336f6a.hot-update.js
│  │     ├─ webpack.aa52d92d45fa76a1.hot-update.js
│  │     ├─ webpack.aa9c8172bed99e4d.hot-update.js
│  │     ├─ webpack.aac05908225e1b81.hot-update.js
│  │     ├─ webpack.aafd485a5a0a124a.hot-update.js
│  │     ├─ webpack.aedf7468eb4a2560.hot-update.js
│  │     ├─ webpack.b1649a2f9e49d8f8.hot-update.js
│  │     ├─ webpack.b470ae1db5ef3260.hot-update.js
│  │     ├─ webpack.bd586ab3c3df967c.hot-update.js
│  │     ├─ webpack.c26881ad43408282.hot-update.js
│  │     ├─ webpack.c6b3274827e9b320.hot-update.js
│  │     ├─ webpack.ca6bcba61e07fa86.hot-update.js
│  │     ├─ webpack.ce1e497962163f41.hot-update.js
│  │     ├─ webpack.ced1d8bf5878734d.hot-update.js
│  │     ├─ webpack.d022e2fcc21a72ae.hot-update.js
│  │     ├─ webpack.d2afb8065c0df55b.hot-update.js
│  │     ├─ webpack.d7e49116f8ab01fa.hot-update.js
│  │     ├─ webpack.d8f6cc18a80f44f5.hot-update.js
│  │     ├─ webpack.dccfcfcc2904af83.hot-update.js
│  │     ├─ webpack.ec508c480a705ba8.hot-update.js
│  │     ├─ webpack.edce56164623b559.hot-update.js
│  │     ├─ webpack.f00e26ccf569ae84.hot-update.js
│  │     ├─ webpack.f369cc77d5e4e1d5.hot-update.js
│  │     ├─ webpack.f48df984df7abb3f.hot-update.js
│  │     ├─ webpack.f5a703a113ac7cf0.hot-update.js
│  │     ├─ webpack.f5da721fd6e5e6d1.hot-update.js
│  │     ├─ webpack.f6e440f7a15b4e93.hot-update.js
│  │     └─ webpack.fbb949c74c79fa30.hot-update.js
│  ├─ types/
│  │  ├─ app/
│  │  │  ├─ (auth)/
│  │  │  │  ├─ reset-password/
│  │  │  │  │  └─ page.ts
│  │  │  │  └─ reset-password-success/
│  │  │  │     └─ page.ts
│  │  │  ├─ layout.ts
│  │  │  └─ page.ts
│  │  └─ package.json
│  ├─ app-build-manifest.json
│  ├─ build-manifest.json
│  ├─ package.json
│  ├─ react-loadable-manifest.json
│  └─ trace
├─ public/
│  ├─ icons/
│  │  └─ site-logo.svg
│  ├─ images/
│  │  ├─ user-image.png
│  │  ├─ user-image2.svg
│  │  ├─ user-image3.svg
│  │  ├─ user-image4.svg
│  │  ├─ user-image5.svg
│  │  └─ user-image6.svg
│  ├─ locales/
│  │  ├─ en/
│  │  │  └─ common.json
│  │  └─ ko/
│  │     └─ common.json
│  └─ favicon.svg
├─ src/
│  ├─ app/
│  │  ├─ (auth)/
│  │  │  ├─ forgot-password/
│  │  │  │  └─ page.jsx
│  │  │  ├─ forgot-password-confirm/
│  │  │  │  └─ page.jsx
│  │  │  ├─ login/
│  │  │  │  └─ page.jsx
│  │  │  ├─ register/
│  │  │  │  └─ page.jsx
│  │  │  ├─ register-success/
│  │  │  │  └─ page.jsx
│  │  │  ├─ reset-password/
│  │  │  │  └─ page.jsx
│  │  │  └─ reset-password-success/
│  │  │     └─ page.jsx
│  │  ├─ globals.css
│  │  ├─ layout.jsx
│  │  └─ page.jsx
│  ├─ components/
│  │  ├─ auth/
│  │  │  └─ AuthHeader.jsx
│  │  ├─ modals/
│  │  │  ├─ AddMoreInfoModal.jsx
│  │  │  ├─ BaseModal.jsx
│  │  │  ├─ SearchModal.jsx
│  │  │  ├─ SelectProjectModal.jsx
│  │  │  ├─ UploadModal.jsx
│  │  │  └─ VerifyEmailModal.jsx
│  │  ├─ sidebar/
│  │  │  ├─ Sidebar.jsx
│  │  │  ├─ SidebarDropdown.jsx
│  │  │  ├─ SidebarItem.jsx
│  │  │  ├─ SidebarNotification.jsx
│  │  │  └─ UserMenu.jsx
│  │  ├─ ui/
│  │  │  └─ Button.jsx
│  │  ├─ Header.jsx
│  │  └─ ThemeToggle.jsx
│  ├─ context/
│  │  └─ ModalContext.jsx
│  └─ icons/
│     ├─ add-icon.svg
│     ├─ arrow-down-icon.svg
│     ├─ arrow-down-icon2.svg
│     ├─ arrow-right-icon.svg
│     ├─ bookmarks-icon.svg
│     ├─ collapse-icon.svg
│     ├─ cross-icon.svg
│     ├─ cross-icon2.svg
│     ├─ date-icon.svg
│     ├─ dropdown-icon.svg
│     ├─ eye-icon.svg
│     ├─ eye-slash-icon.svg
│     ├─ favorites-icon.svg
│     ├─ file-icon.svg
│     ├─ global.svg
│     ├─ google-icon.svg
│     ├─ label-icon.svg
│     ├─ mail-icon.svg
│     ├─ notification-icon.svg
│     ├─ private-space-icon.svg
│     ├─ retry-icon.svg
│     ├─ search-icon.svg
│     ├─ share-icon.svg
│     ├─ team-space-icon.svg
│     ├─ theme-icon.svg
│     ├─ tick-icon.svg
│     ├─ tooltip-icon.svg
│     ├─ trash-icon.svg
│     ├─ trash-icon2.svg
│     ├─ unassigned-icon.svg
│     ├─ upload-icon.svg
│     ├─ users-icon.svg
│     └─ warning-icon.svg
├─ .env.local
├─ .eslintrc.json
├─ .gitignore
├─ .nvmrc
├─ .prettierignore
├─ .prettierrc
├─ file-tree.md
├─ jsconfig.json
├─ next.config.mjs
├─ package-lock.json
├─ package.json
├─ postcss.config.js
├─ README.md
└─ tailwind.config.js
<div style="width: 100%; height: 100%; padding-left: 18px; padding-right: 18px; padding-top: 10px; padding-bottom: 10px; background: white; overflow: hidden; flex-direction: column; justify-content: flex-start; align-items: flex-start; display: inline-flex">
    <div style="align-self: stretch; padding-top: 10px; padding-bottom: 10px; padding-left: 10px; padding-right: 5px; background: white; overflow: hidden; justify-content: flex-start; align-items: center; gap: 10px; display: inline-flex">
        <div style="justify-content: flex-start; align-items: center; gap: 10px; display: flex">
            <div style="justify-content: center; display: flex; flex-direction: column; color: #110C22; font-size: 27px; font-family: Inter; font-weight: 700; line-height: 40px; word-wrap: break-word">Unassigned Items</div>
        </div>
    </div>
    <div style="width: 1618px; position: relative; border-bottom: 1px #C5C5C5 solid; justify-content: space-between; align-items: center; display: inline-flex">
        <div style="width: 1618px; height: 0px; left: 0px; top: 60px; position: absolute; border: 1px rgba(192, 192, 192, 0) solid"></div>
        <div style="padding-left: 10px; padding-right: 10px; background: rgba(255, 255, 255, 0); overflow: hidden; justify-content: flex-start; align-items: flex-end; gap: 20px; display: flex">
            <div style="overflow: hidden; justify-content: flex-start; align-items: center; gap: 12px; display: flex">
                <div style="justify-content: center; align-items: center; gap: 10px; display: flex">
                    <div style="width: 6px; height: 6px; opacity: 0.96; background: #3E3E3E; border-radius: 1px"></div>
                    <div style="width: 6px; height: 13px; opacity: 0.96; background: #3E3E3E; border-radius: 1px"></div>
                    <div style="width: 13px; height: 6px; opacity: 0.96; background: #3E3E3E; border-radius: 1px"></div>
                    <div style="width: 13px; height: 13px; opacity: 0.96; background: #3E3E3E; border-radius: 1px"></div>
                    <div style="padding-top: 12px; padding-bottom: 12px; overflow: hidden; justify-content: center; align-items: center; gap: 10px; display: flex">
                        <div data-bullet="false" data-copyable="false" data-editable="false" data-hierarchy="primary" style="overflow: hidden; flex-direction: column; justify-content: center; align-items: center; gap: 10px; display: inline-flex">
                            <div style="justify-content: center; display: flex; flex-direction: column; color: rgba(0, 0, 0, 0.85); font-size: 14px; font-family: Roboto; font-weight: 400; line-height: 22px; word-wrap: break-word">Table View</div>
                        </div>
                    </div>
                </div>
            </div>
            <div style="overflow: hidden; justify-content: flex-start; align-items: center; gap: 12px; display: flex">
                <div style="justify-content: center; align-items: center; gap: 10px; display: flex">
                    <div style="width: 20px; height: 13px; opacity: 0.96; background: #464646; border-radius: 1px"></div>
                    <div style="width: 20px; height: 4px; opacity: 0.96; background: #464646; border-radius: 1px"></div>
                    <div style="padding-top: 12px; padding-bottom: 12px; overflow: hidden; justify-content: center; align-items: center; gap: 10px; display: flex">
                        <div data-bullet="false" data-copyable="false" data-editable="false" data-hierarchy="primary" style="overflow: hidden; flex-direction: column; justify-content: center; align-items: center; gap: 10px; display: inline-flex">
                            <div style="justify-content: center; display: flex; flex-direction: column; color: rgba(0, 0, 0, 0.85); font-size: 14px; font-family: Roboto; font-weight: 400; line-height: 22px; word-wrap: break-word">Feed View</div>
                        </div>
                    </div>
                </div>
            </div>
            <div style="overflow: hidden; flex-direction: column; justify-content: flex-end; align-items: center; display: inline-flex">
                <div style="position: relative; justify-content: center; align-items: center; gap: 10px; display: inline-flex">
                    <div style="width: 6px; height: 6px; opacity: 0.96; background: #8F7AFF; border-radius: 1px"></div>
                    <div style="width: 6px; height: 6px; opacity: 0.96; background: #8F7AFF; border-radius: 1px"></div>
                    <div style="width: 6px; height: 6px; opacity: 0.96; background: #8F7AFF; border-radius: 1px"></div>
                    <div style="width: 6px; height: 6px; opacity: 0.96; background: #8F7AFF; border-radius: 1px"></div>
                    <div style="width: 6px; height: 6px; opacity: 0.96; background: #8F7AFF; border-radius: 1px"></div>
                    <div style="width: 6px; height: 6px; opacity: 0.96; background: #8F7AFF; border-radius: 1px"></div>
                    <div style="width: 6px; height: 6px; opacity: 0.96; background: #8F7AFF; border-radius: 1px"></div>
                    <div style="width: 6px; height: 6px; opacity: 0.96; background: #8F7AFF; border-radius: 1px"></div>
                    <div style="width: 6px; height: 6px; opacity: 0.96; background: #8F7AFF; border-radius: 1px"></div>
                    <div style="padding-top: 12px; padding-bottom: 12px; overflow: hidden; justify-content: center; align-items: center; gap: 10px; display: flex">
                        <div data-bullet="false" data-copyable="false" data-editable="false" data-hierarchy="primary" style="overflow: hidden; flex-direction: column; justify-content: center; align-items: flex-start; display: inline-flex">
                            <div style="justify-content: center; display: flex; flex-direction: column; color: var(--color-blue-73, #8B75FF); font-size: 14px; font-family: Roboto; font-weight: 400; line-height: 22px; word-wrap: break-word">Gallery View</div>
                        </div>
                    </div>
                    <div style="width: 107px; height: 0px; left: 0px; top: 46px; position: absolute; border: 2px var(--color-blue-73, #8B75FF) solid"></div>
                </div>
            </div>
        </div>
        <div style="padding-top: 10px; padding-bottom: 10px; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 10px; display: inline-flex">
            <div style="align-self: stretch; height: 40px; padding-left: 10px; background: #0156D0; overflow: hidden; border-radius: 8px; justify-content: center; align-items: center; display: inline-flex">
                <div style="height: 32px; padding-left: 10px; padding-right: 10px; padding-top: 6px; padding-bottom: 6px; justify-content: center; align-items: center; gap: 8px; display: flex">
                    <div style="justify-content: flex-start; align-items: center; gap: 5px; display: flex">
                        <div style="text-align: center; justify-content: center; display: flex; flex-direction: column; color: white; font-size: 14px; font-family: Roboto; font-weight: 500; line-height: 20px; letter-spacing: 0.10px; word-wrap: break-word">Select Items</div>
                    </div>
                    <div style="width: 14px; height: 0px; transform: rotate(90deg); transform-origin: top left; outline: 1px rgba(255, 255, 255, 0.50) solid; outline-offset: -0.50px"></div>
                    <div data-property-1="down" style="width: 18px; height: 18px; position: relative">
                        <div style="width: 18px; height: 18px; left: 0px; top: 0px; position: absolute">
                            <div style="width: 7.50px; height: 3.75px; left: 5.25px; top: 7.50px; position: absolute; background: rgba(255, 255, 255, 0.50)"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div style="width: 1618px; padding-top: 10px; padding-bottom: 15px; padding-left: 10px; padding-right: 10px; justify-content: space-between; align-items: center; display: inline-flex">
        <div style="height: 30px; justify-content: flex-start; align-items: flex-start; gap: 15px; display: flex">
            <div style="justify-content: flex-start; align-items: center; gap: 10px; display: flex">
                <div style="width: 370px; height: 32px; padding-left: 12px; padding-right: 12px; padding-top: 8px; padding-bottom: 8px; opacity: 0.96; background: white; overflow: hidden; border-radius: 8px; outline: 1px #D9D8DC solid; outline-offset: -1px; justify-content: flex-start; align-items: center; gap: 8px; display: flex">
                    <div style="width: 14px; height: 14px; position: relative">
                        <div style="width: 11.08px; height: 11.08px; left: 1.17px; top: 1.17px; position: absolute; outline: 1.50px #8E9295 solid; outline-offset: -0.75px"></div>
                        <div style="width: 1.17px; height: 1.17px; left: 11.67px; top: 11.67px; position: absolute; outline: 1.50px #8E9295 solid; outline-offset: -0.75px"></div>
                        <div style="width: 14px; height: 14px; left: 0px; top: 0px; position: absolute; opacity: 0; border: 1px #8E9295 solid"></div>
                    </div>
                    <div style="width: 47px; justify-content: center; display: flex; flex-direction: column; color: #C6C5CA; font-size: 13px; font-family: Inter; font-weight: 500; line-height: 24px; word-wrap: break-word">Search</div>
                </div>
                <div style="width: 1px; height: 20px; opacity: 0.96; background: #ECECED"></div>
            </div>
            <div style="justify-content: flex-start; align-items: center; gap: 8px; display: flex">
                <div style="height: 32px; background: #F3F1FD; overflow: hidden; border-radius: 8px; outline: 1px #8F7AFF solid; outline-offset: -1px; justify-content: center; align-items: center; display: flex">
                    <div style="height: 32px; padding-left: 8px; padding-right: 8px; padding-top: 6px; padding-bottom: 6px; justify-content: center; align-items: center; gap: 8px; display: flex">
                        <div style="justify-content: flex-start; align-items: center; gap: 3px; display: flex">
                            <div data-property-1="access_time" style="width: 24px; height: 24px; position: relative">
                                <div style="width: 24px; height: 24px; left: 0px; top: 0px; position: absolute; overflow: hidden">
                                    <div style="width: 24px; height: 24px; left: 0px; top: 0px; position: absolute"></div>
                                    <div style="width: 20px; height: 20px; left: 2px; top: 2px; position: absolute; background: #8F7AFF"></div>
                                </div>
                            </div>
                            <div style="text-align: center; justify-content: center; display: flex; flex-direction: column; color: #8F7AFF; font-size: 13px; font-family: Arial; font-weight: 700; line-height: 20px; letter-spacing: 0.10px; word-wrap: break-word">07/10/2025</div>
                        </div>
                        <div data-property-1="down" style="width: 18px; height: 18px; position: relative">
                            <div style="width: 18px; height: 18px; left: 0px; top: 0px; position: absolute">
                                <div style="width: 7.50px; height: 3.75px; left: 5.25px; top: 7.50px; position: absolute; background: #8F7AFF"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style="height: 32px; background: #FDFDFD; overflow: hidden; border-radius: 8px; outline: 1px #8F7AFF solid; outline-offset: -1px; justify-content: center; align-items: center; display: flex">
                    <div style="height: 32px; padding-left: 8px; padding-right: 8px; padding-top: 6px; padding-bottom: 6px; justify-content: center; align-items: center; gap: 8px; display: flex">
                        <div style="justify-content: flex-start; align-items: center; gap: 3px; display: flex">
                            <div style="width: 23px; height: 23px; padding: 2px; justify-content: center; align-items: center; gap: 10px; display: flex">
                                <div style="flex: 1 1 0; align-self: stretch; background: #8F7AFF"></div>
                            </div>
                            <div style="text-align: center; justify-content: center; display: flex; flex-direction: column; color: #8F7AFF; font-size: 14px; font-family: Roboto; font-weight: 500; line-height: 20px; letter-spacing: 0.10px; word-wrap: break-word">Label</div>
                        </div>
                        <div data-property-1="down" style="width: 18px; height: 18px; position: relative">
                            <div style="width: 18px; height: 18px; left: 0px; top: 0px; position: absolute">
                                <div style="width: 7.50px; height: 3.75px; left: 5.25px; top: 7.50px; position: absolute; background: #8F7AFF"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style="height: 32px; background: #FDFDFD; overflow: hidden; border-radius: 8px; outline: 1px #8F7AFF solid; outline-offset: -1px; justify-content: center; align-items: center; display: flex">
                    <div style="height: 32px; padding-left: 10px; padding-right: 10px; padding-top: 6px; padding-bottom: 6px; justify-content: center; align-items: center; gap: 8px; display: flex">
                        <div style="justify-content: flex-start; align-items: center; gap: 3px; display: flex">
                            <div style="text-align: center; justify-content: center; display: flex; flex-direction: column; color: #8F7AFF; font-size: 14px; font-family: Roboto; font-weight: 500; line-height: 20px; letter-spacing: 0.10px; word-wrap: break-word">Input type</div>
                        </div>
                        <div data-property-1="down" style="width: 18px; height: 18px; position: relative">
                            <div style="width: 18px; height: 18px; left: 0px; top: 0px; position: absolute">
                                <div style="width: 7.50px; height: 3.75px; left: 5.25px; top: 7.50px; position: absolute; background: #8F7AFF"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style="height: 32px; background: #FDFDFD; overflow: hidden; border-radius: 8px; outline: 1px #8F7AFF solid; outline-offset: -1px; justify-content: center; align-items: center; display: flex">
                    <div style="height: 32px; padding-left: 10px; padding-right: 10px; padding-top: 6px; padding-bottom: 6px; justify-content: center; align-items: center; gap: 8px; display: flex">
                        <div style="justify-content: flex-start; align-items: center; gap: 3px; display: flex">
                            <div style="text-align: center; justify-content: center; display: flex; flex-direction: column; color: #8F7AFF; font-size: 14px; font-family: Roboto; font-weight: 500; line-height: 20px; letter-spacing: 0.10px; word-wrap: break-word">Data type</div>
                        </div>
                        <div data-property-1="down" style="width: 18px; height: 18px; position: relative">
                            <div style="width: 18px; height: 18px; left: 0px; top: 0px; position: absolute">
                                <div style="width: 7.50px; height: 3.75px; left: 5.25px; top: 7.50px; position: absolute; background: #8F7AFF"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div style="flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 8px; display: inline-flex">
            <div style="justify-content: flex-start; align-items: center; gap: 7px; display: inline-flex">
                <div style="width: 93px; height: 36px; background: #F3F1FD; overflow: hidden; justify-content: center; align-items: center; display: flex">
                    <div style="height: 32px; padding-top: 6px; padding-bottom: 6px; padding-left: 8px; padding-right: 6px; justify-content: center; align-items: center; gap: 8px; display: flex">
                        <div style="justify-content: flex-start; align-items: center; gap: 3px; display: flex">
                            <div style="text-align: center; justify-content: center; display: flex; flex-direction: column; color: #8B75FF; font-size: 14px; font-family: Roboto; font-weight: 500; line-height: 20px; letter-spacing: 0.10px; word-wrap: break-word">Oldest</div>
                        </div>
                        <div style="width: 20px; height: 20px; position: relative; transform: rotate(-90deg); transform-origin: top left; overflow: hidden">
                            <div style="width: 10px; height: 13.33px; left: 5px; top: 3.33px; position: absolute; background: #8B75FF"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div style="align-self: stretch; height: 996px; padding: 30px; background: #F8F8F8; border-radius: 16px; outline: 1px #D9D8DC solid; outline-offset: -1px; flex-direction: column; justify-content: flex-start; align-items: center; gap: 10px; display: flex">
        <div style="align-self: stretch; flex: 1 1 0; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 10px; display: flex">
            <div style="align-self: stretch; flex: 1 1 0; overflow: hidden; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 10px; display: flex">
                <div style="align-self: stretch; height: 1038px; justify-content: center; align-items: flex-start; gap: 35px; display: inline-flex; flex-wrap: wrap; align-content: flex-start">
                    <div style="width: 324.90px; height: 324.90px; position: relative; background: var(--Grays-Gray, #8E8E93)">
                        <div style="width: 324.90px; height: 324.90px; left: 0px; top: 0px; position: absolute; background: #16181B"></div>
                        <div style="width: 70px; height: 46px; left: 15.35px; top: 265.10px; position: absolute; flex-direction: column; justify-content: center; align-items: flex-start; display: inline-flex">
                            <div style="width: 70px; height: 0px; left: 0px; top: 46.50px; position: absolute; border: 1px rgba(0, 0, 0, 0.06) solid"></div>
                            <div style="overflow: hidden; flex-direction: column; justify-content: center; align-items: flex-start; gap: 3px; display: flex">
                                <div style="overflow: hidden; justify-content: flex-start; align-items: center; gap: 12px; display: inline-flex">
                                    <div style="justify-content: center; align-items: center; gap: 7px; display: flex">
                                        <div style="width: 20px; height: 20px; position: relative; overflow: hidden">
                                            <div style="width: 18.33px; height: 12.50px; left: 0.83px; top: 3.75px; position: absolute; background: white"></div>
                                        </div>
                                        <div style="overflow: hidden; justify-content: center; align-items: center; gap: 10px; display: flex">
                                            <div style="overflow: hidden; flex-direction: column; justify-content: center; align-items: center; gap: 10px; display: inline-flex">
                                                <div style="justify-content: center; display: flex; flex-direction: column; color: rgba(255, 255, 255, 0.85); font-size: 16px; font-family: Inter; font-weight: 600; line-height: 22.40px; word-wrap: break-word">21.5K</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div style="overflow: hidden; justify-content: flex-start; align-items: center; gap: 12px; display: inline-flex">
                                    <div style="justify-content: center; align-items: center; gap: 7px; display: flex">
                                        <div style="width: 20px; height: 20px; position: relative; overflow: hidden">
                                            <div style="width: 16.67px; height: 15.29px; left: 1.67px; top: 2.50px; position: absolute; background: white"></div>
                                        </div>
                                        <div style="overflow: hidden; justify-content: center; align-items: center; gap: 10px; display: flex">
                                            <div style="overflow: hidden; flex-direction: column; justify-content: center; align-items: center; gap: 10px; display: inline-flex">
                                                <div style="justify-content: center; display: flex; flex-direction: column; color: rgba(255, 255, 255, 0.85); font-size: 16px; font-family: Inter; font-weight: 600; line-height: 22.40px; word-wrap: break-word">8K</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style="width: 37px; height: 93px; left: 269px; top: 215px; position: absolute; flex-direction: column; justify-content: center; align-items: flex-end; gap: 10px; display: inline-flex">
                            <div style="width: 26px; height: 26px; position: relative; overflow: hidden; border-radius: 3px">
                                <div style="width: 19.50px; height: 13px; left: 3.25px; top: 6.50px; position: absolute; background: white"></div>
                            </div>
                            <div style="justify-content: flex-start; align-items: center; gap: 5px; display: inline-flex">
                                <div style="color: white; font-size: 12px; font-family: Inter; font-weight: 500; word-wrap: break-word">4</div>
                                <div style="width: 19px; height: 17.19px; background: white; outline: 0.50px white solid; outline-offset: -0.25px"></div>
                            </div>
                            <div style="justify-content: flex-start; align-items: center; gap: 5px; display: inline-flex">
                                <div style="color: white; font-size: 12px; font-family: Inter; font-weight: 500; word-wrap: break-word">2</div>
                                <div style="padding-top: 2px; padding-bottom: 2px; overflow: hidden; justify-content: flex-start; align-items: flex-start; display: flex">
                                    <div style="width: 20px; height: 19px; background: white"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style="width: 285px; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 13px; display: inline-flex">
                        <div style="justify-content: flex-start; align-items: center; gap: 14px; display: inline-flex">
                            <div style="width: 65px; height: 31px; justify-content: flex-start; align-items: center; gap: 5px; display: flex">
                                <div style="width: 31px; height: 31px; position: relative; overflow: hidden">
                                    <div style="width: 23.88px; height: 23.88px; left: 3.56px; top: 3.56px; position: absolute; background: white"></div>
                                </div>
                                <div style="width: 28.50px; height: 28.50px; position: relative; overflow: hidden">
                                    <div style="left: 0.31px; top: 2.70px; position: absolute; background-image: url(https://placehold.co/24x24); justify-content: flex-start; align-items: center; gap: 240px; display: inline-flex">
                                        <div style="width: 24px; height: 24px; position: relative"></div>
                                    </div>
                                </div>
                            </div>
                            <div style="justify-content: center; display: flex; flex-direction: column; color: rgba(255, 255, 255, 0.85); font-size: 16px; font-family: Inter; font-weight: 600; line-height: 22.40px; word-wrap: break-word">Title of Contents ...</div>
                        </div>
                        <div style="width: 285px; height: 100px; color: var(--Grays-Gray, #8E8E93); font-size: 18.24px; font-family: Roboto; font-weight: 400; line-height: 25.08px; word-wrap: break-word">#vegan When our week gets busy, it can be challenging to get creative with your tasty plant-based meal option</div>
                    </div>
                    <div style="width: 324.90px; height: 324.90px; position: relative; background: var(--Grays-Gray, #8E8E93)">
                        <div style="width: 324.90px; height: 324.90px; left: 0px; top: 0px; position: absolute; background: #16181B"></div>
                        <div style="width: 24px; height: 24px; left: 15.45px; top: 15.10px; position: absolute; overflow: hidden">
                            <div style="width: 18.49px; height: 18.49px; left: 2.76px; top: 2.76px; position: absolute; background: white"></div>
                        </div>
                        <div style="left: 50.45px; top: 16.10px; position: absolute; justify-content: center; display: flex; flex-direction: column; color: rgba(255, 255, 255, 0.85); font-size: 16px; font-family: Inter; font-weight: 600; line-height: 22.40px; word-wrap: break-word">This is Title of Contents ...</div>
                        <div style="width: 37px; height: 93px; left: 269px; top: 206px; position: absolute; flex-direction: column; justify-content: center; align-items: flex-end; gap: 10px; display: inline-flex">
                            <div style="width: 26px; height: 26px; position: relative; overflow: hidden; border-radius: 3px">
                                <div style="width: 19.50px; height: 13px; left: 3.25px; top: 6.50px; position: absolute; background: white"></div>
                            </div>
                            <div style="justify-content: flex-start; align-items: center; gap: 5px; display: inline-flex">
                                <div style="color: white; font-size: 12px; font-family: Inter; font-weight: 500; word-wrap: break-word">4</div>
                                <div style="width: 19px; height: 17.19px; background: white; outline: 0.50px white solid; outline-offset: -0.25px"></div>
                            </div>
                            <div style="justify-content: flex-start; align-items: center; gap: 5px; display: inline-flex">
                                <div style="color: white; font-size: 12px; font-family: Inter; font-weight: 500; word-wrap: break-word">2</div>
                                <div style="padding-top: 2px; padding-bottom: 2px; overflow: hidden; justify-content: flex-start; align-items: flex-start; display: flex">
                                    <div style="width: 20px; height: 19px; background: white"></div>
                                </div>
                            </div>
                        </div>
                        <div style="width: 286px; height: 100px; left: 20px; top: 54px; position: absolute; color: var(--Grays-Gray, #8E8E93); font-size: 18.24px; font-family: Roboto; font-weight: 400; line-height: 25.08px; word-wrap: break-word">Description text: #vegan When our week gets busy, it can be challenging to get creative with your tasty plant-based meal option</div>
                    </div>
                    <div style="width: 324.90px; height: 324.90px; position: relative; background: var(--Grays-Gray, #8E8E93); outline: 1.14px white solid; outline-offset: -1.14px">
                        <img style="width: 324.90px; height: 324.90px; left: 0px; top: 0px; position: absolute; background: #C4C4C4" src="https://placehold.co/325x325" />
                        <div style="width: 324.90px; height: 68.40px; left: 0px; top: 0px; position: absolute; background: linear-gradient(180deg, rgba(58.44, 58.44, 58.44, 0.30) 0%, rgba(196, 196, 196, 0) 100%)"></div>
                        <div style="width: 70px; height: 46px; left: 17.45px; top: 261px; position: absolute; flex-direction: column; justify-content: center; align-items: flex-start; display: inline-flex">
                            <div style="position: relative; flex-direction: column; justify-content: center; align-items: flex-start; gap: 10px; display: flex">
                                <div style="width: 70px; height: 0px; left: 0px; top: 47px; position: absolute; border: 1px rgba(0, 0, 0, 0.06) solid"></div>
                                <div style="overflow: hidden; flex-direction: column; justify-content: center; align-items: flex-start; gap: 3px; display: flex">
                                    <div style="overflow: hidden; justify-content: flex-start; align-items: center; gap: 12px; display: inline-flex">
                                        <div style="justify-content: center; align-items: center; gap: 7px; display: flex">
                                            <div style="width: 20px; height: 20px; position: relative; overflow: hidden">
                                                <div style="width: 18.33px; height: 12.50px; left: 0.83px; top: 3.75px; position: absolute; background: white"></div>
                                            </div>
                                            <div style="overflow: hidden; justify-content: center; align-items: center; gap: 10px; display: flex">
                                                <div style="overflow: hidden; flex-direction: column; justify-content: center; align-items: center; gap: 10px; display: inline-flex">
                                                    <div style="justify-content: center; display: flex; flex-direction: column; color: rgba(255, 255, 255, 0.85); font-size: 16px; font-family: Inter; font-weight: 600; line-height: 22.40px; word-wrap: break-word">21.5K</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div style="overflow: hidden; justify-content: flex-start; align-items: center; gap: 12px; display: inline-flex">
                                        <div style="justify-content: center; align-items: center; gap: 7px; display: flex">
                                            <div style="width: 20px; height: 20px; position: relative; overflow: hidden">
                                                <div style="width: 16.67px; height: 15.29px; left: 1.67px; top: 2.50px; position: absolute; background: white"></div>
                                            </div>
                                            <div style="overflow: hidden; justify-content: center; align-items: center; gap: 10px; display: flex">
                                                <div style="overflow: hidden; flex-direction: column; justify-content: center; align-items: center; gap: 10px; display: inline-flex">
                                                    <div style="justify-content: center; display: flex; flex-direction: column; color: rgba(255, 255, 255, 0.85); font-size: 16px; font-family: Inter; font-weight: 600; line-height: 22.40px; word-wrap: break-word">8K</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style="width: 25px; height: 25px; left: 315px; top: 36px; position: absolute; transform: rotate(180deg); transform-origin: top left; overflow: hidden">
                            <div style="width: 20.83px; height: 20.83px; left: 2.08px; top: 2.08px; position: absolute; background: white"></div>
                        </div>
                        <div style="left: 17.45px; top: 13px; position: absolute; justify-content: flex-start; align-items: center; gap: 7px; display: inline-flex">
                            <div style="width: 23px; height: 24px; border-radius: 5px; justify-content: center; align-items: center; gap: 10px; display: flex">
                                <div data-size="20" style="flex: 1 1 0; align-self: stretch; position: relative; opacity: 0.96">
                                    <div style="width: 17.25px; height: 18px; left: 2.88px; top: 3px; position: absolute; outline: 2.50px white solid; outline-offset: -1.25px"></div>
                                </div>
                            </div>
                            <div style="justify-content: center; display: flex; flex-direction: column; color: rgba(255, 255, 255, 0.85); font-size: 16px; font-family: Inter; font-weight: 600; line-height: 22.40px; word-wrap: break-word">Samsung09284128394.png</div>
                        </div>
                        <div style="width: 37px; height: 93px; left: 271px; top: 206px; position: absolute; flex-direction: column; justify-content: center; align-items: flex-end; gap: 10px; display: inline-flex">
                            <div style="width: 26px; height: 26px; position: relative; overflow: hidden; border-radius: 3px">
                                <div style="width: 19.50px; height: 13px; left: 3.25px; top: 6.50px; position: absolute; background: white"></div>
                            </div>
                            <div style="justify-content: flex-start; align-items: center; gap: 5px; display: inline-flex">
                                <div style="color: white; font-size: 12px; font-family: Inter; font-weight: 500; word-wrap: break-word">4</div>
                                <div style="width: 19px; height: 17.19px; background: white; outline: 0.50px white solid; outline-offset: -0.25px"></div>
                            </div>
                            <div style="justify-content: flex-start; align-items: center; gap: 5px; display: inline-flex">
                                <div style="color: white; font-size: 12px; font-family: Inter; font-weight: 500; word-wrap: break-word">2</div>
                                <div style="padding-top: 2px; padding-bottom: 2px; overflow: hidden; justify-content: flex-start; align-items: flex-start; display: flex">
                                    <div style="width: 20px; height: 19px; background: white"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style="width: 324.90px; height: 324.90px; position: relative; background: var(--Grays-Gray, #8E8E93)">
                        <img style="width: 324.90px; height: 324.90px; left: 0px; top: 0px; position: absolute; background: #C4C4C4" src="https://placehold.co/325x325" />
                        <div style="width: 324.90px; height: 68.40px; left: 0px; top: 0px; position: absolute; background: linear-gradient(180deg, rgba(58.44, 58.44, 58.44, 0.30) 0%, rgba(196, 196, 196, 0) 100%)"></div>
                        <div style="width: 34.20px; height: 34.20px; left: 281.58px; top: 9.12px; position: absolute; overflow: hidden">
                            <div style="width: 4.76px; height: 8.07px; left: 26.02px; top: 8.88px; position: absolute; background: white"></div>
                            <div style="width: 4.76px; height: 8.07px; left: 26.02px; top: 16.93px; position: absolute; background: white"></div>
                        </div>
                        <div style="left: 14px; top: 12px; position: absolute; justify-content: flex-start; align-items: center; gap: 9px; display: inline-flex">
                            <div style="justify-content: flex-start; align-items: center; gap: 5px; display: flex">
                                <div style="width: 31px; height: 31px; position: relative; overflow: hidden">
                                    <div style="width: 23.88px; height: 23.88px; left: 3.56px; top: 3.56px; position: absolute; background: white"></div>
                                </div>
                                <div style="width: 29px; height: 28px; position: relative; overflow: hidden">
                                    <div style="width: 28.94px; height: 27.83px; left: 0px; top: 0.06px; position: absolute; background: #1778F2"></div>
                                    <div style="width: 29px; height: 28px; left: 0px; top: 0px; position: absolute; background: white; border-radius: 9999px"></div>
                                    <div style="width: 29px; height: 28px; left: 0px; top: 0px; position: absolute; background: #1778F2"></div>
                                </div>
                            </div>
                            <div style="justify-content: center; display: flex; flex-direction: column; color: rgba(255, 255, 255, 0.85); font-size: 16px; font-family: Inter; font-weight: 600; line-height: 22.40px; word-wrap: break-word">Title of Contents ...</div>
                        </div>
                        <div style="width: 70px; height: 46px; left: 17.45px; top: 264px; position: absolute; flex-direction: column; justify-content: center; align-items: flex-start; display: inline-flex">
                            <div style="position: relative; flex-direction: column; justify-content: center; align-items: flex-start; gap: 10px; display: flex">
                                <div style="width: 70px; height: 0px; left: 0px; top: 47px; position: absolute; border: 1px rgba(0, 0, 0, 0.06) solid"></div>
                                <div style="overflow: hidden; flex-direction: column; justify-content: center; align-items: flex-start; gap: 3px; display: flex">
                                    <div style="overflow: hidden; justify-content: flex-start; align-items: center; gap: 12px; display: inline-flex">
                                        <div style="justify-content: center; align-items: center; gap: 7px; display: flex">
                                            <div style="width: 20px; height: 20px; position: relative; overflow: hidden">
                                                <div style="width: 18.33px; height: 12.50px; left: 0.83px; top: 3.75px; position: absolute; background: white"></div>
                                            </div>
                                            <div style="overflow: hidden; justify-content: center; align-items: center; gap: 10px; display: flex">
                                                <div style="overflow: hidden; flex-direction: column; justify-content: center; align-items: center; gap: 10px; display: inline-flex">
                                                    <div style="justify-content: center; display: flex; flex-direction: column; color: rgba(255, 255, 255, 0.85); font-size: 16px; font-family: Inter; font-weight: 600; line-height: 22.40px; word-wrap: break-word">21.5K</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div style="overflow: hidden; justify-content: flex-start; align-items: center; gap: 12px; display: inline-flex">
                                        <div style="justify-content: center; align-items: center; gap: 7px; display: flex">
                                            <div style="width: 20px; height: 20px; position: relative; overflow: hidden">
                                                <div style="width: 16.67px; height: 15.29px; left: 1.67px; top: 2.50px; position: absolute; background: white"></div>
                                            </div>
                                            <div style="overflow: hidden; justify-content: center; align-items: center; gap: 10px; display: flex">
                                                <div style="overflow: hidden; flex-direction: column; justify-content: center; align-items: center; gap: 10px; display: inline-flex">
                                                    <div style="justify-content: center; display: flex; flex-direction: column; color: rgba(255, 255, 255, 0.85); font-size: 16px; font-family: Inter; font-weight: 600; line-height: 22.40px; word-wrap: break-word">8K</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style="width: 37px; height: 93px; left: 268px; top: 215px; position: absolute; flex-direction: column; justify-content: center; align-items: flex-end; gap: 10px; display: inline-flex">
                            <div style="width: 22px; height: 22px; position: relative; overflow: hidden; border-radius: 3px">
                                <div style="width: 16.50px; height: 11px; left: 2.75px; top: 5.50px; position: absolute; background: white"></div>
                            </div>
                            <div style="justify-content: flex-start; align-items: center; gap: 5px; display: inline-flex">
                                <div style="color: white; font-size: 12px; font-family: Inter; font-weight: 500; word-wrap: break-word">4</div>
                                <div style="width: 19px; height: 17.19px; background: white; outline: 0.50px white solid; outline-offset: -0.25px"></div>
                            </div>
                            <div style="justify-content: flex-start; align-items: center; gap: 5px; display: inline-flex">
                                <div style="color: white; font-size: 12px; font-family: Inter; font-weight: 500; word-wrap: break-word">2</div>
                                <div style="padding-top: 2px; padding-bottom: 2px; overflow: hidden; justify-content: flex-start; align-items: flex-start; display: flex">
                                    <div style="width: 20px; height: 19px; background: white"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style="width: 324.90px; height: 324.90px; position: relative; background: var(--Grays-Gray, #8E8E93); outline: 1.14px white solid; outline-offset: -1.14px">
                        <img style="width: 324.90px; height: 324.90px; left: 0px; top: 0px; position: absolute; background: #C4C4C4" src="https://placehold.co/325x325" />
                        <div style="width: 324.90px; height: 68.40px; left: 0px; top: 0px; position: absolute; background: linear-gradient(180deg, rgba(58.44, 58.44, 58.44, 0.30) 0%, rgba(196, 196, 196, 0) 100%)"></div>
                        <div style="width: 70px; height: 47px; left: 18.55px; top: 260.50px; position: absolute; overflow: hidden; flex-direction: column; justify-content: center; align-items: flex-start; gap: 3px; display: inline-flex">
                            <div style="overflow: hidden; justify-content: flex-start; align-items: center; gap: 12px; display: inline-flex">
                                <div style="justify-content: center; align-items: center; gap: 7px; display: flex">
                                    <div style="width: 20px; height: 20px; position: relative; overflow: hidden">
                                        <div style="width: 18.33px; height: 12.50px; left: 0.83px; top: 3.75px; position: absolute; background: white"></div>
                                    </div>
                                    <div style="overflow: hidden; justify-content: center; align-items: center; gap: 10px; display: flex">
                                        <div style="overflow: hidden; flex-direction: column; justify-content: center; align-items: center; gap: 10px; display: inline-flex">
                                            <div style="justify-content: center; display: flex; flex-direction: column; color: rgba(255, 255, 255, 0.85); font-size: 16px; font-family: Inter; font-weight: 600; line-height: 22.40px; word-wrap: break-word">21.5K</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style="overflow: hidden; justify-content: flex-start; align-items: center; gap: 12px; display: inline-flex">
                                <div style="justify-content: center; align-items: center; gap: 7px; display: flex">
                                    <div style="width: 20px; height: 20px; position: relative; overflow: hidden">
                                        <div style="width: 16.67px; height: 15.29px; left: 1.67px; top: 2.50px; position: absolute; background: white"></div>
                                    </div>
                                    <div style="overflow: hidden; justify-content: center; align-items: center; gap: 10px; display: flex">
                                        <div style="overflow: hidden; flex-direction: column; justify-content: center; align-items: center; gap: 10px; display: inline-flex">
                                            <div style="justify-content: center; display: flex; flex-direction: column; color: rgba(255, 255, 255, 0.85); font-size: 16px; font-family: Inter; font-weight: 600; line-height: 22.40px; word-wrap: break-word">8K</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style="width: 37px; height: 93px; left: 272.35px; top: 219.10px; position: absolute; flex-direction: column; justify-content: center; align-items: flex-end; gap: 10px; display: inline-flex">
                            <div style="width: 22px; height: 22px; position: relative; overflow: hidden; border-radius: 3px">
                                <div style="width: 16.50px; height: 11px; left: 2.75px; top: 5.50px; position: absolute; background: white"></div>
                            </div>
                            <div style="justify-content: flex-start; align-items: center; gap: 5px; display: inline-flex">
                                <div style="color: white; font-size: 12px; font-family: Inter; font-weight: 500; word-wrap: break-word">4</div>
                                <div style="width: 19px; height: 17.19px; background: white; outline: 0.50px white solid; outline-offset: -0.25px"></div>
                            </div>
                            <div style="justify-content: flex-start; align-items: center; gap: 5px; display: inline-flex">
                                <div style="color: white; font-size: 12px; font-family: Inter; font-weight: 500; word-wrap: break-word">2</div>
                                <div style="padding-top: 2px; padding-bottom: 2px; overflow: hidden; justify-content: flex-start; align-items: flex-start; display: flex">
                                    <div style="width: 20px; height: 19px; background: white"></div>
                                </div>
                            </div>
                        </div>
                        <div style="width: 222px; height: 31px; left: 18.25px; top: 18.10px; position: absolute; justify-content: flex-start; align-items: center; gap: 9px; display: inline-flex">
                            <div style="justify-content: flex-start; align-items: center; gap: 5px; display: flex">
                                <div style="width: 31px; height: 31px; position: relative; overflow: hidden">
                                    <div style="width: 23.88px; height: 23.88px; left: 3.56px; top: 3.56px; position: absolute; background: white"></div>
                                </div>
                                <div style="width: 29px; height: 28px; position: relative; overflow: hidden">
                                    <div style="width: 28.94px; height: 27.83px; left: 0px; top: 0.06px; position: absolute; background: #1778F2"></div>
                                    <div style="width: 29px; height: 28px; left: 0px; top: 0px; position: absolute; background: white; border-radius: 9999px"></div>
                                    <div style="width: 29px; height: 28px; left: 0px; top: 0px; position: absolute; background: #1778F2"></div>
                                </div>
                            </div>
                            <div style="justify-content: center; display: flex; flex-direction: column; color: rgba(255, 255, 255, 0.85); font-size: 16px; font-family: Inter; font-weight: 600; line-height: 22.40px; word-wrap: break-word">Title of Contents ...</div>
                        </div>
                        <div style="width: 285px; left: 16.25px; top: 58.10px; position: absolute; color: white; font-size: 18.24px; font-family: Roboto; font-weight: 400; line-height: 25.08px; word-wrap: break-word">#vegan When our week gets busy...</div>
                    </div>
                    <div style="width: 324.90px; height: 324.90px; position: relative; background: var(--Grays-Gray, #8E8E93); outline: 1.14px white solid; outline-offset: -1.14px">
                        <img style="width: 324.90px; height: 324.90px; left: 0px; top: 0px; position: absolute; background: #C4C4C4" src="https://placehold.co/325x325" />
                        <div style="width: 324.90px; height: 68.40px; left: 0px; top: 0px; position: absolute; background: linear-gradient(180deg, rgba(58.44, 58.44, 58.44, 0.30) 0%, rgba(196, 196, 196, 0) 100%)"></div>
                        <div style="width: 28.50px; height: 28.50px; left: 11.40px; top: 279.30px; position: absolute"></div>
                        <div style="width: 285px; left: 14.45px; top: 14.10px; position: absolute; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 13px; display: inline-flex">
                            <div style="justify-content: flex-start; align-items: center; gap: 14px; display: inline-flex">
                                <div style="width: 65px; height: 31px; justify-content: flex-start; align-items: center; gap: 5px; display: flex">
                                    <div style="width: 31px; height: 31px; position: relative; overflow: hidden">
                                        <div style="width: 23.88px; height: 23.88px; left: 3.56px; top: 3.56px; position: absolute; background: white"></div>
                                    </div>
                                    <img style="width: 24px; height: 24px" src="https://placehold.co/24x24" />
                                </div>
                                <div style="justify-content: center; display: flex; flex-direction: column; color: rgba(255, 255, 255, 0.85); font-size: 16px; font-family: Inter; font-weight: 600; line-height: 22.40px; word-wrap: break-word">Title of Contents ...</div>
                            </div>
                            <div style="width: 285px; color: white; font-size: 18.24px; font-family: Roboto; font-weight: 400; line-height: 25.08px; word-wrap: break-word">#vegan When our week gets busy...</div>
                        </div>
                        <div style="width: 70px; height: 47px; left: 19.45px; top: 260.10px; position: absolute; overflow: hidden; flex-direction: column; justify-content: center; align-items: flex-start; gap: 3px; display: inline-flex">
                            <div style="overflow: hidden; justify-content: flex-start; align-items: center; gap: 12px; display: inline-flex">
                                <div style="justify-content: center; align-items: center; gap: 7px; display: flex">
                                    <div style="width: 20px; height: 20px; position: relative; overflow: hidden">
                                        <div style="width: 18.33px; height: 12.50px; left: 0.83px; top: 3.75px; position: absolute; background: white"></div>
                                    </div>
                                    <div style="overflow: hidden; justify-content: center; align-items: center; gap: 10px; display: flex">
                                        <div style="overflow: hidden; flex-direction: column; justify-content: center; align-items: center; gap: 10px; display: inline-flex">
                                            <div style="justify-content: center; display: flex; flex-direction: column; color: rgba(255, 255, 255, 0.85); font-size: 16px; font-family: Inter; font-weight: 600; line-height: 22.40px; word-wrap: break-word">21.5K</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style="overflow: hidden; justify-content: flex-start; align-items: center; gap: 12px; display: inline-flex">
                                <div style="justify-content: center; align-items: center; gap: 7px; display: flex">
                                    <div style="width: 20px; height: 20px; position: relative; overflow: hidden">
                                        <div style="width: 16.67px; height: 15.29px; left: 1.67px; top: 2.50px; position: absolute; background: white"></div>
                                    </div>
                                    <div style="overflow: hidden; justify-content: center; align-items: center; gap: 10px; display: flex">
                                        <div style="overflow: hidden; flex-direction: column; justify-content: center; align-items: center; gap: 10px; display: inline-flex">
                                            <div style="justify-content: center; display: flex; flex-direction: column; color: rgba(255, 255, 255, 0.85); font-size: 16px; font-family: Inter; font-weight: 600; line-height: 22.40px; word-wrap: break-word">8K</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style="width: 25px; height: 25px; left: 313.45px; top: 43.10px; position: absolute; transform: rotate(180deg); transform-origin: top left; overflow: hidden">
                            <div style="width: 20.83px; height: 20.83px; left: 2.08px; top: 2.08px; position: absolute; background: white"></div>
                        </div>
                        <div style="width: 37px; height: 93px; left: 269.45px; top: 219.10px; position: absolute; flex-direction: column; justify-content: center; align-items: flex-end; gap: 10px; display: inline-flex">
                            <div style="width: 22px; height: 22px; position: relative; overflow: hidden; border-radius: 3px">
                                <div style="width: 16.50px; height: 11px; left: 2.75px; top: 5.50px; position: absolute; background: white"></div>
                            </div>
                            <div style="justify-content: flex-start; align-items: center; gap: 5px; display: inline-flex">
                                <div style="color: white; font-size: 12px; font-family: Inter; font-weight: 500; word-wrap: break-word">4</div>
                                <div style="width: 19px; height: 17.19px; background: white; outline: 0.50px white solid; outline-offset: -0.25px"></div>
                            </div>
                            <div style="justify-content: flex-start; align-items: center; gap: 5px; display: inline-flex">
                                <div style="color: white; font-size: 12px; font-family: Inter; font-weight: 500; word-wrap: break-word">2</div>
                                <div style="padding-top: 2px; padding-bottom: 2px; overflow: hidden; justify-content: flex-start; align-items: flex-start; display: flex">
                                    <div style="width: 20px; height: 19px; background: white"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style="width: 324.90px; height: 324.90px; position: relative; background: var(--Grays-Gray, #8E8E93); outline: 1.14px white solid; outline-offset: -1.14px">
                        <img style="width: 324.90px; height: 324.90px; left: 0px; top: 0px; position: absolute; background: #C4C4C4" src="https://placehold.co/325x325" />
                        <div style="width: 324.90px; height: 68.40px; left: 0px; top: 0px; position: absolute; background: linear-gradient(180deg, rgba(58.44, 58.44, 58.44, 0.30) 0%, rgba(196, 196, 196, 0) 100%)"></div>
                        <div style="width: 227px; height: 31px; left: 13.55px; top: 18.10px; position: absolute; justify-content: flex-start; align-items: center; gap: 14px; display: inline-flex">
                            <div style="width: 65px; height: 31px; justify-content: flex-start; align-items: center; gap: 5px; display: flex">
                                <div style="width: 31px; height: 31px; position: relative; overflow: hidden">
                                    <div style="width: 23.88px; height: 23.88px; left: 3.56px; top: 3.56px; position: absolute; background: white"></div>
                                </div>
                                <img style="width: 24px; height: 24px" src="https://placehold.co/24x24" />
                            </div>
                            <div style="justify-content: center; display: flex; flex-direction: column; color: rgba(255, 255, 255, 0.85); font-size: 16px; font-family: Inter; font-weight: 600; line-height: 22.40px; word-wrap: break-word">Title of Contents ...</div>
                        </div>
                        <div style="width: 70px; height: 47px; left: 11.55px; top: 260.10px; position: absolute; overflow: hidden; flex-direction: column; justify-content: center; align-items: flex-start; gap: 3px; display: inline-flex">
                            <div style="overflow: hidden; justify-content: flex-start; align-items: center; gap: 12px; display: inline-flex">
                                <div style="justify-content: center; align-items: center; gap: 7px; display: flex">
                                    <div style="width: 20px; height: 20px; position: relative; overflow: hidden">
                                        <div style="width: 18.33px; height: 12.50px; left: 0.83px; top: 3.75px; position: absolute; background: white"></div>
                                    </div>
                                    <div style="overflow: hidden; justify-content: center; align-items: center; gap: 10px; display: flex">
                                        <div style="overflow: hidden; flex-direction: column; justify-content: center; align-items: center; gap: 10px; display: inline-flex">
                                            <div style="justify-content: center; display: flex; flex-direction: column; color: rgba(255, 255, 255, 0.85); font-size: 16px; font-family: Inter; font-weight: 600; line-height: 22.40px; word-wrap: break-word">21.5K</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style="overflow: hidden; justify-content: flex-start; align-items: center; gap: 12px; display: inline-flex">
                                <div style="justify-content: center; align-items: center; gap: 7px; display: flex">
                                    <div style="width: 20px; height: 20px; position: relative; overflow: hidden">
                                        <div style="width: 16.67px; height: 15.29px; left: 1.67px; top: 2.50px; position: absolute; background: white"></div>
                                    </div>
                                    <div style="overflow: hidden; justify-content: center; align-items: center; gap: 10px; display: flex">
                                        <div style="overflow: hidden; flex-direction: column; justify-content: center; align-items: center; gap: 10px; display: inline-flex">
                                            <div style="justify-content: center; display: flex; flex-direction: column; color: rgba(255, 255, 255, 0.85); font-size: 16px; font-family: Inter; font-weight: 600; line-height: 22.40px; word-wrap: break-word">8K</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style="width: 34.20px; height: 34.20px; left: 277.55px; top: 15.10px; position: absolute; overflow: hidden">
                            <div style="width: 4.76px; height: 8.07px; left: 26.02px; top: 8.88px; position: absolute; background: white"></div>
                            <div style="width: 4.76px; height: 8.07px; left: 26.02px; top: 16.93px; position: absolute; background: white"></div>
                        </div>
                        <div style="width: 37px; height: 93px; left: 268px; top: 219.10px; position: absolute; flex-direction: column; justify-content: center; align-items: flex-end; gap: 10px; display: inline-flex">
                            <div style="width: 22px; height: 22px; position: relative; overflow: hidden; border-radius: 3px">
                                <div style="width: 16.50px; height: 11px; left: 2.75px; top: 5.50px; position: absolute; background: white"></div>
                            </div>
                            <div style="justify-content: flex-start; align-items: center; gap: 5px; display: inline-flex">
                                <div style="color: white; font-size: 12px; font-family: Inter; font-weight: 500; word-wrap: break-word">4</div>
                                <div style="width: 19px; height: 17.19px; background: white; outline: 0.50px white solid; outline-offset: -0.25px"></div>
                            </div>
                            <div style="justify-content: flex-start; align-items: center; gap: 5px; display: inline-flex">
                                <div style="color: white; font-size: 12px; font-family: Inter; font-weight: 500; word-wrap: break-word">2</div>
                                <div style="padding-top: 2px; padding-bottom: 2px; overflow: hidden; justify-content: flex-start; align-items: flex-start; display: flex">
                                    <div style="width: 20px; height: 19px; background: white"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style="width: 324.90px; height: 324.90px; position: relative; background: var(--Grays-Gray, #8E8E93)">
                        <div style="width: 324.90px; height: 324.90px; left: 0px; top: 0px; position: absolute; background: #16181B"></div>
                        <div style="width: 70px; height: 46px; left: 15.35px; top: 265.10px; position: absolute; flex-direction: column; justify-content: center; align-items: flex-start; display: inline-flex">
                            <div style="width: 70px; height: 0px; left: 0px; top: 46.50px; position: absolute; border: 1px rgba(0, 0, 0, 0.06) solid"></div>
                            <div style="overflow: hidden; flex-direction: column; justify-content: center; align-items: flex-start; gap: 3px; display: flex">
                                <div style="overflow: hidden; justify-content: flex-start; align-items: center; gap: 12px; display: inline-flex">
                                    <div style="justify-content: center; align-items: center; gap: 7px; display: flex">
                                        <div style="width: 20px; height: 20px; position: relative; overflow: hidden">
                                            <div style="width: 18.33px; height: 12.50px; left: 0.83px; top: 3.75px; position: absolute; background: white"></div>
                                        </div>
                                        <div style="overflow: hidden; justify-content: center; align-items: center; gap: 10px; display: flex">
                                            <div style="overflow: hidden; flex-direction: column; justify-content: center; align-items: center; gap: 10px; display: inline-flex">
                                                <div style="justify-content: center; display: flex; flex-direction: column; color: rgba(255, 255, 255, 0.85); font-size: 16px; font-family: Inter; font-weight: 600; line-height: 22.40px; word-wrap: break-word">21.5K</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div style="overflow: hidden; justify-content: flex-start; align-items: center; gap: 12px; display: inline-flex">
                                    <div style="justify-content: center; align-items: center; gap: 7px; display: flex">
                                        <div style="width: 20px; height: 20px; position: relative; overflow: hidden">
                                            <div style="width: 16.67px; height: 15.29px; left: 1.67px; top: 2.50px; position: absolute; background: white"></div>
                                        </div>
                                        <div style="overflow: hidden; justify-content: center; align-items: center; gap: 10px; display: flex">
                                            <div style="overflow: hidden; flex-direction: column; justify-content: center; align-items: center; gap: 10px; display: inline-flex">
                                                <div style="justify-content: center; display: flex; flex-direction: column; color: rgba(255, 255, 255, 0.85); font-size: 16px; font-family: Inter; font-weight: 600; line-height: 22.40px; word-wrap: break-word">8K</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style="width: 37px; height: 93px; left: 269px; top: 215px; position: absolute; flex-direction: column; justify-content: center; align-items: flex-end; gap: 10px; display: inline-flex">
                            <div style="width: 26px; height: 26px; position: relative; overflow: hidden; border-radius: 3px">
                                <div style="width: 19.50px; height: 13px; left: 3.25px; top: 6.50px; position: absolute; background: white"></div>
                            </div>
                            <div style="justify-content: flex-start; align-items: center; gap: 5px; display: inline-flex">
                                <div style="color: white; font-size: 12px; font-family: Inter; font-weight: 500; word-wrap: break-word">4</div>
                                <div style="width: 19px; height: 17.19px; background: white; outline: 0.50px white solid; outline-offset: -0.25px"></div>
                            </div>
                            <div style="justify-content: flex-start; align-items: center; gap: 5px; display: inline-flex">
                                <div style="color: white; font-size: 12px; font-family: Inter; font-weight: 500; word-wrap: break-word">2</div>
                                <div style="padding-top: 2px; padding-bottom: 2px; overflow: hidden; justify-content: flex-start; align-items: flex-start; display: flex">
                                    <div style="width: 20px; height: 19px; background: white"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style="width: 285px; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 13px; display: inline-flex">
                        <div style="justify-content: flex-start; align-items: center; gap: 14px; display: inline-flex">
                            <div style="width: 65px; height: 31px; justify-content: flex-start; align-items: center; gap: 5px; display: flex">
                                <div style="width: 31px; height: 31px; position: relative; overflow: hidden">
                                    <div style="width: 23.88px; height: 23.88px; left: 3.56px; top: 3.56px; position: absolute; background: white"></div>
                                </div>
                                <div style="width: 28.50px; height: 28.50px; position: relative; overflow: hidden">
                                    <div style="left: 0.31px; top: 2.70px; position: absolute; background-image: url(https://placehold.co/24x24); justify-content: flex-start; align-items: center; gap: 240px; display: inline-flex">
                                        <div style="width: 24px; height: 24px; position: relative"></div>
                                    </div>
                                </div>
                            </div>
                            <div style="justify-content: center; display: flex; flex-direction: column; color: rgba(255, 255, 255, 0.85); font-size: 16px; font-family: Inter; font-weight: 600; line-height: 22.40px; word-wrap: break-word">Title of Contents ...</div>
                        </div>
                        <div style="width: 285px; height: 100px; color: var(--Grays-Gray, #8E8E93); font-size: 18.24px; font-family: Roboto; font-weight: 400; line-height: 25.08px; word-wrap: break-word">#vegan When our week gets busy, it can be challenging to get creative with your tasty plant-based meal option</div>
                    </div>
                    <div style="width: 324.90px; height: 324.90px; position: relative; background: var(--Grays-Gray, #8E8E93)">
                        <div style="width: 324.90px; height: 324.90px; left: 0px; top: 0px; position: absolute; background: #16181B"></div>
                        <div style="width: 24px; height: 24px; left: 15.45px; top: 15.10px; position: absolute; overflow: hidden">
                            <div style="width: 18.49px; height: 18.49px; left: 2.76px; top: 2.76px; position: absolute; background: white"></div>
                        </div>
                        <div style="left: 50.45px; top: 16.10px; position: absolute; justify-content: center; display: flex; flex-direction: column; color: rgba(255, 255, 255, 0.85); font-size: 16px; font-family: Inter; font-weight: 600; line-height: 22.40px; word-wrap: break-word">This is Title of Contents ...</div>
                        <div style="width: 37px; height: 93px; left: 269px; top: 206px; position: absolute; flex-direction: column; justify-content: center; align-items: flex-end; gap: 10px; display: inline-flex">
                            <div style="width: 26px; height: 26px; position: relative; overflow: hidden; border-radius: 3px">
                                <div style="width: 19.50px; height: 13px; left: 3.25px; top: 6.50px; position: absolute; background: white"></div>
                            </div>
                            <div style="justify-content: flex-start; align-items: center; gap: 5px; display: inline-flex">
                                <div style="color: white; font-size: 12px; font-family: Inter; font-weight: 500; word-wrap: break-word">4</div>
                                <div style="width: 19px; height: 17.19px; background: white; outline: 0.50px white solid; outline-offset: -0.25px"></div>
                            </div>
                            <div style="justify-content: flex-start; align-items: center; gap: 5px; display: inline-flex">
                                <div style="color: white; font-size: 12px; font-family: Inter; font-weight: 500; word-wrap: break-word">2</div>
                                <div style="padding-top: 2px; padding-bottom: 2px; overflow: hidden; justify-content: flex-start; align-items: flex-start; display: flex">
                                    <div style="width: 20px; height: 19px; background: white"></div>
                                </div>
                            </div>
                        </div>
                        <div style="width: 286px; height: 100px; left: 20px; top: 54px; position: absolute; color: var(--Grays-Gray, #8E8E93); font-size: 18.24px; font-family: Roboto; font-weight: 400; line-height: 25.08px; word-wrap: break-word">Description text: #vegan When our week gets busy, it can be challenging to get creative with your tasty plant-based meal option</div>
                    </div>
                    <div style="width: 324.90px; height: 324.90px; position: relative; background: var(--Grays-Gray, #8E8E93)">
                        <div style="width: 324.90px; height: 324.90px; left: 0px; top: 0px; position: absolute; background: #16181B"></div>
                        <div style="width: 28.50px; height: 28.50px; left: 11.40px; top: 15.10px; position: absolute; overflow: hidden">
                            <div style="left: 0.31px; top: 2.70px; position: absolute; background-image: url(https://placehold.co/24x24); justify-content: flex-start; align-items: center; gap: 240px; display: inline-flex">
                                <div style="width: 24px; height: 24px; position: relative"></div>
                            </div>
                        </div>
                        <div style="width: 70px; height: 46px; left: 15.35px; top: 265.10px; position: absolute; flex-direction: column; justify-content: center; align-items: flex-start; display: inline-flex">
                            <div style="width: 70px; height: 0px; left: 0px; top: 46.50px; position: absolute; border: 1px rgba(0, 0, 0, 0.06) solid"></div>
                            <div style="overflow: hidden; flex-direction: column; justify-content: center; align-items: flex-start; gap: 3px; display: flex">
                                <div style="overflow: hidden; justify-content: flex-start; align-items: center; gap: 12px; display: inline-flex">
                                    <div style="justify-content: center; align-items: center; gap: 7px; display: flex">
                                        <div style="width: 20px; height: 20px; position: relative; overflow: hidden">
                                            <div style="width: 18.33px; height: 12.50px; left: 0.83px; top: 3.75px; position: absolute; background: white"></div>
                                        </div>
                                        <div style="overflow: hidden; justify-content: center; align-items: center; gap: 10px; display: flex">
                                            <div style="overflow: hidden; flex-direction: column; justify-content: center; align-items: center; gap: 10px; display: inline-flex">
                                                <div style="justify-content: center; display: flex; flex-direction: column; color: rgba(255, 255, 255, 0.85); font-size: 16px; font-family: Inter; font-weight: 600; line-height: 22.40px; word-wrap: break-word">21.5K</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div style="overflow: hidden; justify-content: flex-start; align-items: center; gap: 12px; display: inline-flex">
                                    <div style="justify-content: center; align-items: center; gap: 7px; display: flex">
                                        <div style="width: 20px; height: 20px; position: relative; overflow: hidden">
                                            <div style="width: 16.67px; height: 15.29px; left: 1.67px; top: 2.50px; position: absolute; background: white"></div>
                                        </div>
                                        <div style="overflow: hidden; justify-content: center; align-items: center; gap: 10px; display: flex">
                                            <div style="overflow: hidden; flex-direction: column; justify-content: center; align-items: center; gap: 10px; display: inline-flex">
                                                <div style="justify-content: center; display: flex; flex-direction: column; color: rgba(255, 255, 255, 0.85); font-size: 16px; font-family: Inter; font-weight: 600; line-height: 22.40px; word-wrap: break-word">8K</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style="left: 42.35px; top: 18.10px; position: absolute; justify-content: center; display: flex; flex-direction: column; color: rgba(255, 255, 255, 0.85); font-size: 16px; font-family: Inter; font-weight: 600; line-height: 22.40px; word-wrap: break-word">This is Title of Contents ...</div>
                    </div>
                    <div style="width: 267.90px; height: 100.32px; text-align: center; color: var(--Grays-Gray, #8E8E93); font-size: 18.24px; font-family: Roboto; font-weight: 400; line-height: 25.08px; word-wrap: break-word">#vegan When our week gets busy, it can be challenging to get creative with your tasty plant-based meal option</div>
                    <div style="width: 267.90px; height: 25.08px; text-align: center; color: var(--Grays-Gray, #8E8E93); font-size: 18.24px; font-family: Roboto; font-weight: 400; line-height: 25.08px; word-wrap: break-word">15 May, 2020</div>
                    <div style="width: 324.90px; height: 324.90px; position: relative; background: var(--Grays-Gray, #8E8E93)">
                        <div style="width: 324.90px; height: 324.90px; left: 0px; top: 0px; position: absolute; background: #16181B"></div>
                        <div style="width: 70px; height: 46px; left: 15.35px; top: 265.10px; position: absolute; flex-direction: column; justify-content: center; align-items: flex-start; display: inline-flex">
                            <div style="width: 70px; height: 0px; left: 0px; top: 46.50px; position: absolute; border: 1px rgba(0, 0, 0, 0.06) solid"></div>
                            <div style="overflow: hidden; flex-direction: column; justify-content: center; align-items: flex-start; gap: 3px; display: flex">
                                <div style="overflow: hidden; justify-content: flex-start; align-items: center; gap: 12px; display: inline-flex">
                                    <div style="justify-content: center; align-items: center; gap: 7px; display: flex">
                                        <div style="width: 20px; height: 20px; position: relative; overflow: hidden">
                                            <div style="width: 18.33px; height: 12.50px; left: 0.83px; top: 3.75px; position: absolute; background: white"></div>
                                        </div>
                                        <div style="overflow: hidden; justify-content: center; align-items: center; gap: 10px; display: flex">
                                            <div style="overflow: hidden; flex-direction: column; justify-content: center; align-items: center; gap: 10px; display: inline-flex">
                                                <div style="justify-content: center; display: flex; flex-direction: column; color: rgba(255, 255, 255, 0.85); font-size: 16px; font-family: Inter; font-weight: 600; line-height: 22.40px; word-wrap: break-word">21.5K</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div style="overflow: hidden; justify-content: flex-start; align-items: center; gap: 12px; display: inline-flex">
                                    <div style="justify-content: center; align-items: center; gap: 7px; display: flex">
                                        <div style="width: 20px; height: 20px; position: relative; overflow: hidden">
                                            <div style="width: 16.67px; height: 15.29px; left: 1.67px; top: 2.50px; position: absolute; background: white"></div>
                                        </div>
                                        <div style="overflow: hidden; justify-content: center; align-items: center; gap: 10px; display: flex">
                                            <div style="overflow: hidden; flex-direction: column; justify-content: center; align-items: center; gap: 10px; display: inline-flex">
                                                <div style="justify-content: center; display: flex; flex-direction: column; color: rgba(255, 255, 255, 0.85); font-size: 16px; font-family: Inter; font-weight: 600; line-height: 22.40px; word-wrap: break-word">8K</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style="width: 24px; height: 24px; left: 15.45px; top: 15.10px; position: absolute; overflow: hidden">
                            <div style="width: 18.49px; height: 18.49px; left: 2.76px; top: 2.76px; position: absolute; background: white"></div>
                        </div>
                        <div style="left: 50.45px; top: 16.10px; position: absolute; justify-content: center; display: flex; flex-direction: column; color: rgba(255, 255, 255, 0.85); font-size: 16px; font-family: Inter; font-weight: 600; line-height: 22.40px; word-wrap: break-word">This is Title of Contents ...</div>
                        <div style="width: 20px; height: 20px; left: 288.45px; top: 290.10px; position: absolute; overflow: hidden">
                            <div style="width: 15.83px; height: 16.67px; left: 2.08px; top: 2.08px; position: absolute; background: white"></div>
                        </div>
                    </div>
                    <div style="width: 324.90px; height: 324.90px; position: relative; background: var(--Grays-Gray, #8E8E93); outline: 1.14px white solid; outline-offset: -1.14px">
                        <img style="width: 324.90px; height: 324.90px; left: 0px; top: 0px; position: absolute; background: #C4C4C4" src="https://placehold.co/325x325" />
                        <div style="width: 324.90px; height: 68.40px; left: 0px; top: 0px; position: absolute; background: linear-gradient(180deg, rgba(58.44, 58.44, 58.44, 0.30) 0%, rgba(196, 196, 196, 0) 100%)"></div>
                        <div style="width: 28.50px; height: 28.50px; left: 11.40px; top: 279.30px; position: absolute; overflow: hidden">
                            <img style="width: 24px; height: 24px; left: 0.03px; top: 2.37px; position: absolute" src="https://placehold.co/24x24" />
                        </div>
                        <div style="width: 34.20px; height: 34.20px; left: 281.58px; top: 9.12px; position: absolute; overflow: hidden">
                            <div style="width: 4.76px; height: 8.07px; left: 26.02px; top: 8.88px; position: absolute; background: white"></div>
                            <div style="width: 4.76px; height: 8.07px; left: 26.02px; top: 16.93px; position: absolute; background: white"></div>
                        </div>
                        <div style="width: 227px; height: 31px; left: 22.25px; top: 16.20px; position: absolute; justify-content: flex-start; align-items: center; gap: 14px; display: inline-flex">
                            <div style="width: 65px; height: 31px; justify-content: flex-start; align-items: center; gap: 5px; display: flex">
                                <div style="width: 31px; height: 31px; position: relative; overflow: hidden">
                                    <div style="width: 23.88px; height: 23.88px; left: 3.56px; top: 3.56px; position: absolute; background: white"></div>
                                </div>
                                <img style="width: 24px; height: 24px" src="https://placehold.co/24x24" />
                            </div>
                            <div style="justify-content: center; display: flex; flex-direction: column; color: rgba(255, 255, 255, 0.85); font-size: 16px; font-family: Inter; font-weight: 600; line-height: 22.40px; word-wrap: break-word">Title of Contents ...</div>
                        </div>
                    </div>
                    <div style="width: 324.90px; height: 324.90px; position: relative; background: var(--Grays-Gray, #8E8E93); outline: 1.14px white solid; outline-offset: -1.14px">
                        <img style="width: 324.90px; height: 324.90px; left: 0px; top: 0px; position: absolute; background: #C4C4C4" src="https://placehold.co/325x325" />
                        <div style="width: 324.90px; height: 68.40px; left: 0px; top: 0px; position: absolute; background: linear-gradient(180deg, rgba(58.44, 58.44, 58.44, 0.30) 0%, rgba(196, 196, 196, 0) 100%)"></div>
                        <div style="width: 28.50px; height: 28.50px; left: 11.40px; top: 279.30px; position: absolute; overflow: hidden">
                            <div style="width: 28.44px; height: 28.32px; left: 0px; top: 0.06px; position: absolute; background: #1778F2"></div>
                            <div style="width: 28.50px; height: 28.50px; left: 0px; top: 0px; position: absolute; background: white; border-radius: 9999px"></div>
                            <div style="width: 28.50px; height: 28.50px; left: 0px; top: 0px; position: absolute; background: #1778F2"></div>
                        </div>
                        <div style="width: 34.20px; height: 34.20px; left: 281.58px; top: 9.12px; position: absolute; overflow: hidden">
                            <div style="width: 4.76px; height: 8.07px; left: 26.02px; top: 8.88px; position: absolute; background: white"></div>
                            <div style="width: 4.76px; height: 8.07px; left: 26.02px; top: 16.93px; position: absolute; background: white"></div>
                        </div>
                        <div style="width: 227px; height: 31px; left: 25.35px; top: 16.20px; position: absolute; justify-content: flex-start; align-items: center; gap: 14px; display: inline-flex">
                            <div style="width: 65px; height: 31px; justify-content: flex-start; align-items: center; gap: 5px; display: flex">
                                <div style="width: 31px; height: 31px; position: relative; overflow: hidden">
                                    <div style="width: 23.88px; height: 23.88px; left: 3.56px; top: 3.56px; position: absolute; background: white"></div>
                                </div>
                                <img style="width: 24px; height: 24px" src="https://placehold.co/24x24" />
                            </div>
                            <div style="justify-content: center; display: flex; flex-direction: column; color: rgba(255, 255, 255, 0.85); font-size: 16px; font-family: Inter; font-weight: 600; line-height: 22.40px; word-wrap: break-word">Title of Contents ...</div>
                        </div>
                    </div>
                    <div style="width: 324.90px; height: 324.90px; position: relative; background: var(--Grays-Gray, #8E8E93); outline: 1.14px white solid; outline-offset: -1.14px">
                        <img style="width: 324.90px; height: 324.90px; left: 0px; top: 0px; position: absolute; background: #C4C4C4" src="https://placehold.co/325x325" />
                        <div style="width: 324.90px; height: 68.40px; left: 0px; top: 0px; position: absolute; background: linear-gradient(180deg, rgba(58.44, 58.44, 58.44, 0.30) 0%, rgba(196, 196, 196, 0) 100%)"></div>
                        <div style="width: 28.50px; height: 28.50px; left: 11.40px; top: 279.30px; position: absolute; overflow: hidden">
                            <div style="width: 28.44px; height: 28.32px; left: 0px; top: 0.06px; position: absolute; background: #1778F2"></div>
                            <div style="width: 28.50px; height: 28.50px; left: 0px; top: 0px; position: absolute; background: white; border-radius: 9999px"></div>
                            <div style="width: 28.50px; height: 28.50px; left: 0px; top: 0px; position: absolute; background: #1778F2"></div>
                        </div>
                        <div style="width: 34.20px; height: 34.20px; left: 281.58px; top: 9.12px; position: absolute; overflow: hidden">
                            <div style="width: 4.76px; height: 8.07px; left: 26.02px; top: 8.88px; position: absolute; background: white"></div>
                            <div style="width: 4.76px; height: 8.07px; left: 26.02px; top: 16.93px; position: absolute; background: white"></div>
                        </div>
                        <div style="width: 227px; height: 31px; left: 11.45px; top: 16.20px; position: absolute; justify-content: flex-start; align-items: center; gap: 14px; display: inline-flex">
                            <div style="width: 65px; height: 31px; justify-content: flex-start; align-items: center; gap: 5px; display: flex">
                                <div style="width: 31px; height: 31px; position: relative; overflow: hidden">
                                    <div style="width: 23.88px; height: 23.88px; left: 3.56px; top: 3.56px; position: absolute; background: white"></div>
                                </div>
                                <img style="width: 24px; height: 24px" src="https://placehold.co/24x24" />
                            </div>
                            <div style="justify-content: center; display: flex; flex-direction: column; color: rgba(255, 255, 255, 0.85); font-size: 16px; font-family: Inter; font-weight: 600; line-height: 22.40px; word-wrap: break-word">Title of Contents ...</div>
                        </div>
                    </div>
                    <div style="width: 324.90px; height: 324.90px; position: relative; background: var(--Grays-Gray, #8E8E93); outline: 1.14px white solid; outline-offset: -1.14px">
                        <img style="width: 324.90px; height: 324.90px; left: 0px; top: 0px; position: absolute; background: #C4C4C4" src="https://placehold.co/325x325" />
                        <div style="width: 324.90px; height: 68.40px; left: 0px; top: 0px; position: absolute; background: linear-gradient(180deg, rgba(58.44, 58.44, 58.44, 0.30) 0%, rgba(196, 196, 196, 0) 100%)"></div>
                        <div style="width: 28.50px; height: 28.50px; left: 11.40px; top: 279.30px; position: absolute; overflow: hidden">
                            <div style="width: 28.44px; height: 28.32px; left: 0px; top: 0.06px; position: absolute; background: #1778F2"></div>
                            <div style="width: 28.50px; height: 28.50px; left: 0px; top: 0px; position: absolute; background: white; border-radius: 9999px"></div>
                            <div style="width: 28.50px; height: 28.50px; left: 0px; top: 0px; position: absolute; background: #1778F2"></div>
                        </div>
                        <div style="width: 34.20px; height: 34.20px; left: 281.58px; top: 9.12px; position: absolute; overflow: hidden">
                            <div style="width: 4.76px; height: 8.07px; left: 26.02px; top: 8.88px; position: absolute; background: white"></div>
                            <div style="width: 4.76px; height: 8.07px; left: 26.02px; top: 16.93px; position: absolute; background: white"></div>
                        </div>
                        <div style="width: 248px; height: 24px; left: 11.65px; top: 14.20px; position: absolute; justify-content: flex-start; align-items: center; gap: 7px; display: inline-flex">
                            <div style="width: 23px; height: 24px; border-radius: 5px; justify-content: center; align-items: center; gap: 10px; display: flex">
                                <div data-size="20" style="flex: 1 1 0; align-self: stretch; position: relative; opacity: 0.96">
                                    <div style="width: 17.25px; height: 18px; left: 2.88px; top: 3px; position: absolute; outline: 2.50px white solid; outline-offset: -1.25px"></div>
                                </div>
                            </div>
                            <div style="justify-content: center; display: flex; flex-direction: column; color: rgba(255, 255, 255, 0.85); font-size: 16px; font-family: Inter; font-weight: 600; line-height: 22.40px; word-wrap: break-word">Samsung09284128394.png</div>
                        </div>
                    </div>
                    <div style="width: 324.90px; height: 324.90px; position: relative; background: var(--Grays-Gray, #8E8E93); outline: 1.14px white solid; outline-offset: -1.14px">
                        <img style="width: 324.90px; height: 324.90px; left: 0px; top: 0px; position: absolute; background: #C4C4C4" src="https://placehold.co/325x325" />
                        <div style="width: 324.90px; height: 68.40px; left: 0px; top: 0px; position: absolute; background: linear-gradient(180deg, rgba(58.44, 58.44, 58.44, 0.30) 0%, rgba(196, 196, 196, 0) 100%)"></div>
                        <div style="width: 28.50px; height: 28.50px; left: 11.40px; top: 279.30px; position: absolute; overflow: hidden">
                            <div style="width: 28.44px; height: 28.32px; left: 0px; top: 0.06px; position: absolute; background: #1778F2"></div>
                            <div style="width: 28.50px; height: 28.50px; left: 0px; top: 0px; position: absolute; background: white; border-radius: 9999px"></div>
                            <div style="width: 28.50px; height: 28.50px; left: 0px; top: 0px; position: absolute; background: #1778F2"></div>
                        </div>
                        <div style="width: 34.20px; height: 34.20px; left: 281.58px; top: 9.12px; position: absolute; overflow: hidden">
                            <div style="width: 4.76px; height: 8.07px; left: 26.02px; top: 8.88px; position: absolute; background: white"></div>
                            <div style="width: 4.76px; height: 8.07px; left: 26.02px; top: 16.93px; position: absolute; background: white"></div>
                        </div>
                    </div>
                    <div style="width: 324.90px; height: 324.90px; position: relative; background: var(--Grays-Gray, #8E8E93)">
                        <img style="width: 324.90px; height: 324.90px; left: 0px; top: 0px; position: absolute; background: #C4C4C4" src="https://placehold.co/325x325" />
                        <div style="width: 324.90px; height: 68.40px; left: 0px; top: 0px; position: absolute; background: linear-gradient(180deg, rgba(58.44, 58.44, 58.44, 0.30) 0%, rgba(196, 196, 196, 0) 100%)"></div>
                        <div style="width: 28.50px; height: 28.50px; left: 11.40px; top: 279.30px; position: absolute; overflow: hidden">
                            <div style="width: 28.44px; height: 28.32px; left: 0px; top: 0.06px; position: absolute; background: #1778F2"></div>
                            <div style="width: 28.50px; height: 28.50px; left: 0px; top: 0px; position: absolute; background: white; border-radius: 9999px"></div>
                            <div style="width: 28.50px; height: 28.50px; left: 0px; top: 0px; position: absolute; background: #1778F2"></div>
                        </div>
                        <div style="width: 34.20px; height: 34.20px; left: 281.58px; top: 9.12px; position: absolute; overflow: hidden">
                            <div style="width: 4.76px; height: 8.07px; left: 26.02px; top: 8.88px; position: absolute; background: white"></div>
                            <div style="width: 4.76px; height: 8.07px; left: 26.02px; top: 16.93px; position: absolute; background: white"></div>
                        </div>
                    </div>
                    <div style="width: 324.90px; height: 324.90px; position: relative; background: var(--Grays-Gray, #8E8E93); outline: 1.14px white solid; outline-offset: -1.14px">
                        <img style="width: 324.90px; height: 324.90px; left: 0px; top: 0px; position: absolute; background: #C4C4C4" src="https://placehold.co/325x325" />
                        <div style="width: 324.90px; height: 68.40px; left: 0px; top: 0px; position: absolute; background: linear-gradient(180deg, rgba(58.44, 58.44, 58.44, 0.30) 0%, rgba(196, 196, 196, 0) 100%)"></div>
                        <div style="width: 28.50px; height: 28.50px; left: 11.40px; top: 279.30px; position: absolute; overflow: hidden">
                            <div style="width: 28.44px; height: 28.32px; left: 0px; top: 0.06px; position: absolute; background: #1778F2"></div>
                            <div style="width: 28.50px; height: 28.50px; left: 0px; top: 0px; position: absolute; background: white; border-radius: 9999px"></div>
                            <div style="width: 28.50px; height: 28.50px; left: 0px; top: 0px; position: absolute; background: #1778F2"></div>
                        </div>
                        <div style="width: 34.20px; height: 34.20px; left: 281.58px; top: 9.12px; position: absolute; overflow: hidden">
                            <div style="width: 4.76px; height: 8.07px; left: 26.02px; top: 8.88px; position: absolute; background: white"></div>
                            <div style="width: 4.76px; height: 8.07px; left: 26.02px; top: 16.93px; position: absolute; background: white"></div>
                        </div>
                    </div>
                    <div style="width: 324.90px; height: 324.90px; position: relative; background: var(--Grays-Gray, #8E8E93); outline: 1.14px white solid; outline-offset: -1.14px">
                        <img style="width: 324.90px; height: 324.90px; left: 0px; top: 0px; position: absolute; background: #C4C4C4" src="https://placehold.co/325x325" />
                        <div style="width: 324.90px; height: 68.40px; left: 0px; top: 0px; position: absolute; background: linear-gradient(180deg, rgba(58.44, 58.44, 58.44, 0.30) 0%, rgba(196, 196, 196, 0) 100%)"></div>
                        <div style="width: 28.50px; height: 28.50px; left: 11.40px; top: 279.30px; position: absolute; overflow: hidden">
                            <div style="width: 28.44px; height: 28.32px; left: 0px; top: 0.06px; position: absolute; background: #1778F2"></div>
                            <div style="width: 28.50px; height: 28.50px; left: 0px; top: 0px; position: absolute; background: white; border-radius: 9999px"></div>
                            <div style="width: 28.50px; height: 28.50px; left: 0px; top: 0px; position: absolute; background: #1778F2"></div>
                        </div>
                        <div style="width: 34.20px; height: 34.20px; left: 281.58px; top: 9.12px; position: absolute; overflow: hidden">
                            <div style="width: 4.76px; height: 8.07px; left: 26.02px; top: 8.88px; position: absolute; background: white"></div>
                            <div style="width: 4.76px; height: 8.07px; left: 26.02px; top: 16.93px; position: absolute; background: white"></div>
                        </div>
                    </div>
                    <div style="width: 324.90px; height: 324.90px; position: relative; background: var(--Grays-Gray, #8E8E93); outline: 1.14px white solid; outline-offset: -1.14px">
                        <img style="width: 324.90px; height: 324.90px; left: 0px; top: 0px; position: absolute; background: #C4C4C4" src="https://placehold.co/325x325" />
                        <div style="width: 324.90px; height: 68.40px; left: 0px; top: 0px; position: absolute; background: linear-gradient(180deg, rgba(58.44, 58.44, 58.44, 0.30) 0%, rgba(196, 196, 196, 0) 100%)"></div>
                        <div style="width: 28.50px; height: 28.50px; left: 11.40px; top: 279.30px; position: absolute; overflow: hidden">
                            <div style="width: 28.44px; height: 28.32px; left: 0px; top: 0.06px; position: absolute; background: #1778F2"></div>
                            <div style="width: 28.50px; height: 28.50px; left: 0px; top: 0px; position: absolute; background: white; border-radius: 9999px"></div>
                            <div style="width: 28.50px; height: 28.50px; left: 0px; top: 0px; position: absolute; background: #1778F2"></div>
                        </div>
                        <div style="width: 34.20px; height: 34.20px; left: 281.58px; top: 9.12px; position: absolute; overflow: hidden">
                            <div style="width: 4.76px; height: 8.07px; left: 26.02px; top: 8.88px; position: absolute; background: white"></div>
                            <div style="width: 4.76px; height: 8.07px; left: 26.02px; top: 16.93px; position: absolute; background: white"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div> 




"use client";

import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import { usePathname } from "next/navigation";
import AuthHeader from "@/components/auth/AuthHeader";
import { ModalProvider } from "@/context/ModalContext";
import Sidebar from "@/components/sidebar/Sidebar";
import { useState } from "react";

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

  // 👇 state moved here
  const [collapsed, setCollapsed] = useState(false);

  return (
    <html lang="en" className={`${inter.variable}`} suppressHydrationWarning>
      <body className="min-h-dvh antialiased font-sans">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex flex-col min-h-screen bg-white">
            {isAuthRoute && <AuthHeader />}
            <ModalProvider>
              {isAuthRoute ? (
                <main className="flex-1 flex flex-col">{children}</main>
              ) : (
                <div className="flex flex-1">
                  <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
                  <main
                    className={`flex-1 flex flex-col transition-all duration-300 ${
                      collapsed ? "ml-[80px]" : "ml-[312px]"
                    }`}
                  >
                    {children}
                  </main>
                </div>
              )}
            </ModalProvider>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

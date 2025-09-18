"use client";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  return (
    <button
      aria-label="Toggle theme"
      className="rounded-xl border px-3 py-1 text-sm hover:bg-gray-50 dark:hover:bg-gray-800"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      type="button"
    >
      {isDark ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}

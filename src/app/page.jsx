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
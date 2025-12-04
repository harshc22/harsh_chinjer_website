"use client";

import { Divide as Hamburger } from "hamburger-react";
import { Moon, Sun } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";

const links = [
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#about", label: "About" },
];

const brandLabel = "HC";

function useThemePreference() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "light";
    const stored = window.localStorage.getItem("theme") as Theme | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return stored ?? (prefersDark ? "dark" : "light");
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    if (typeof window !== "undefined") {
      window.localStorage.setItem("theme", theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) => (current === "light" ? "dark" : "light"));
  };

  return { theme, toggleTheme };
}

type ThemeToggleProps = {
  theme: Theme;
  toggleTheme: () => void;
  className?: string;
};

function ThemeToggle({ theme, toggleTheme, className }: ThemeToggleProps) {
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      aria-pressed={isDark}
      onClick={toggleTheme}
      className={`group relative flex items-center justify-center rounded-full border border-[var(--panel-border)] bg-[var(--background)] px-2 py-1 text-[var(--muted)] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${className ?? ""}`}
    >
      <div className="flex items-center gap-2 text-xs font-medium">
        <span className="relative flex h-7 w-12 items-center rounded-full bg-[var(--panel)]/80 px-1">
          <span
            className={`flex h-5 w-5 items-center justify-center rounded-full bg-[var(--foreground)] text-[var(--background)] shadow-sm transition-transform duration-300 ${
              isDark ? "translate-x-5" : "translate-x-0"
            }`}
          >
            <Sun
              className={`h-3.5 w-3.5 transition-all duration-200 ${
                isDark ? "scale-0 opacity-0" : "scale-100 opacity-100"
              }`}
              strokeWidth={2}
            />
            <Moon
              className={`absolute h-3.5 w-3.5 transition-all duration-200 ${
                isDark ? "scale-100 opacity-100" : "scale-0 opacity-0"
              }`}
              strokeWidth={2}
            />
          </span>
        </span>
      </div>
    </button>
  );
}

export default function Navbar() {
  const { theme, toggleTheme } = useThemePreference();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-6 z-40 flex justify-center px-4">
      <nav className="relative flex w-full items-center gap-4 rounded-full border border-[var(--panel-border)] bg-[var(--panel)] py-1.5 px-1.5 shadow-[0_18px_60px_rgba(0,0,0,0.14)] backdrop-blur-3xl backdrop-saturate-150 md:w-[80%] md:max-w-2xl">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            aria-label="Go to home"
            className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#8be9fd]/70 focus-visible:ring-offset-transparent"
          >
            <span
              className="block rounded-full px-2 py-1 text-lg tracking-tight bg-clip-text  drop-shadow-sm transition hover:scale-120"
              style={{ fontFamily: "var(--font-pacifico)" }}
            >
              {brandLabel}
            </span>
          </Link>
        </div>

        {/* Mobile right controls */}
        <div className="ml-auto flex items-center gap-3 md:hidden">
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--panel-border)] bg-[var(--background)] text-[var(--foreground)] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <Hamburger
              label="Toggle navigation"
              toggled={open}
              toggle={setOpen}
              size={22}
              duration={0.45}
              distance="sm"
              color="currentColor"
            />
          </div>
        </div>

        {/* Desktop links */}
        <div className="hidden flex-1 items-center justify-center gap-2 text-sm font-medium text-[var(--muted)] md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 transition duration-150 hover:bg-black/5 hover:text-[var(--foreground)] text-[16px]"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          <a
            href="#contact"
            className="rounded-full border border-transparent bg-[var(--callout)] px-6 py-3 text-sm font-semibold text-[var(--callout-text)] shadow-[0_10px_30px_rgba(0,0,0,0.18)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(0,0,0,0.24)]"
          >
            Say Hello!
          </a>
        </div>

        {/* Mobile menu */}
        {open ? (
          <div className="absolute right-0 top-[120%] w-full min-w-[260px] rounded-3xl border border-[var(--panel-border)] bg-[var(--background)] p-4 shadow-[0_22px_70px_rgba(0,0,0,0.26)] backdrop-blur-2xl backdrop-saturate-150 md:hidden">
            <div className="flex flex-col gap-2 text-base font-medium text-[var(--muted)]">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-2xl px-4 py-3 transition hover:bg-black/5 hover:text-[var(--foreground)]"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between gap-3">
              <a
                href="#contact"
                className="flex-1 rounded-full border border-transparent bg-[var(--callout)] px-5 py-3 text-center text-sm font-semibold text-[var(--callout-text)] shadow-[0_10px_30px_rgba(0,0,0,0.18)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(0,0,0,0.24)]"
                onClick={() => setOpen(false)}
              >
                Say Hello!
              </a>
            </div>
          </div>
        ) : null}
      </nav>
    </header>
  );
}

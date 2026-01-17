"use client";

import { Divide as Hamburger } from "hamburger-react";
import { Moon, Sun } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, type CSSProperties } from "react";

type Theme = "light" | "dark";

const links = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
];

const brandLabel = "HC";

function useThemePreference() {
  const [theme, setTheme] = useState<Theme>("light");
  const [isThemeReady, setIsThemeReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("theme") as Theme | null;
    const datasetTheme = document.documentElement.dataset.theme as Theme | undefined;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const resolved = stored ?? datasetTheme ?? (prefersDark ? "dark" : "light");
    setTheme(resolved);
    setIsThemeReady(true);
  }, []);

  useEffect(() => {
    if (!isThemeReady) return;
    document.documentElement.dataset.theme = theme;
    if (typeof window !== "undefined") {
      window.localStorage.setItem("theme", theme);
    }
  }, [theme, isThemeReady]);

  const toggleTheme = () => {
    setTheme((current) => (current === "light" ? "dark" : "light"));
  };

  return { theme, toggleTheme };
}

type ThemeToggleProps = {
  theme: Theme;
  toggleTheme: () => void;
  className?: string;
  style?: CSSProperties;
};

function ThemeToggle({ theme, toggleTheme, className, style }: ThemeToggleProps) {
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      aria-pressed={isDark}
      onClick={toggleTheme}
      className={`group relative flex items-center justify-center rounded-full border border-[var(--panel-border)] bg-[var(--background)] px-2 py-1 text-[var(--muted)] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${className ?? ""}`}
      style={style}
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
  const [invertForAbout, setInvertForAbout] = useState(false);
  const isDark = theme === "dark";

  // Flip nav text to light tones when the dark about section sits behind it in light mode
  useEffect(() => {
    const about = document.getElementById("about");
    if (!about) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setInvertForAbout(entry.isIntersecting && !isDark);
      },
      {
        root: null,
        rootMargin: "-120px 0px -55% 0px",
        threshold: [0, 0.2],
      }
    );

    observer.observe(about);
    return () => observer.disconnect();
  }, [isDark]);

  const navTone = isDark ? "dark" : invertForAbout ? "light-on-dark" : "light";
  const navBg =
    navTone === "light-on-dark" ? "rgba(100,18,32,0.55)" : "var(--panel)";
  const navBorder =
    navTone === "light-on-dark" ? "rgba(255,255,255,0.22)" : "var(--panel-border)";
  const navText =
    navTone === "light-on-dark" ? "var(--section-surface-foreground)" : "var(--foreground)";
  const navMuted =
    navTone === "light-on-dark" ? "var(--section-surface-muted)" : "var(--muted)";

  return (
    <header className="fixed inset-x-0 top-6 z-40 flex justify-center px-4">
      <nav
        className="relative flex w-full items-center gap-4 rounded-full border py-1.5 px-1.5 shadow-[0_18px_60px_rgba(0,0,0,0.14)] backdrop-blur-3xl backdrop-saturate-150 md:w-[80%] md:max-w-2xl"
        style={{ backgroundColor: navBg, borderColor: navBorder, color: navText }}
      >
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Go to home"
            onClick={() => {
              if (window.location.hash) {
                window.history.replaceState(
                  null,
                  document.title,
                  window.location.pathname + window.location.search
                );
              }
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#8be9fd]/70 focus-visible:ring-offset-transparent"
          >
            <span
              className="block rounded-full px-2 py-1 text-lg tracking-tight bg-clip-text  drop-shadow-sm transition hover:scale-120"
              style={{ fontFamily: "var(--font-pacifico)" }}
            >
              {brandLabel}
            </span>
          </button>
        </div>

        {/* Mobile right controls */}
        <div className="ml-auto flex items-center gap-3 md:hidden">
          <ThemeToggle
            theme={theme}
            toggleTheme={toggleTheme}
            style={{ borderColor: navBorder, backgroundColor: navBg, color: navMuted }}
          />
          <div
            className="flex h-11 w-11 items-center justify-center rounded-full border text-[var(--foreground)] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            style={{ borderColor: navBorder, backgroundColor: navBg, color: navText }}
          >
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
        <div
          className="hidden flex-1 items-center justify-center gap-2 text-sm font-medium md:flex"
          style={{ color: navMuted }}
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`rounded-full px-4 py-2 text-[16px] transition duration-150 ${
                navTone === "light-on-dark"
                  ? "hover:bg-white/10 hover:text-white"
                  : "hover:bg-black/5 hover:text-[var(--foreground)]"
              }`}
              style={{ color: navMuted }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle
            theme={theme}
            toggleTheme={toggleTheme}
            style={{ borderColor: navBorder, backgroundColor: navBg, color: navMuted }}
          />
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

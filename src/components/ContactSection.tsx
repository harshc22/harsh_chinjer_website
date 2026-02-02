"use client";

import { useRef, useState, type CSSProperties, type FormEvent } from "react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa6";

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/harshchinjer/",
    icon: FaLinkedin,
  },
  {
    label: "GitHub",
    href: "https://github.com/harshc22",
    icon: FaGithub,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/harshchinjer/",
    icon: FaInstagram,
  },
];

const formspreeEndpoint = "https://formspree.io/f/xreeeabz";

export function ContactSection() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const honeypot = formData.get("_gotcha");
    if (typeof honeypot === "string" && honeypot.length > 0) return;

    setStatus("sending");
    try {
      const response = await fetch(formspreeEndpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      if (!response.ok) {
        setStatus("error");
        return;
      }

      formRef.current?.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      // --curve-overlap matches Projects to tuck under; --curve-radius keeps spacing consistent at the seam.
      style={
        {
          "--curve-overlap": "clamp(18px, 3vw, 36px)",
          "--curve-radius": "clamp(28px, 5vw, 56px)",
        } as CSSProperties
      }
      className="relative z-0 -mt-[var(--curve-overlap)] overflow-hidden rounded-t-[32px] bg-[var(--section-surface)] px-4 pb-12 pt-[calc(3.5rem+var(--curve-overlap))] text-[var(--section-surface-foreground)] shadow-[0_-22px_60px_rgba(0,0,0,0.18)] md:px-10"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col items-center gap-4 text-center">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--section-surface-border)] bg-white/5 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--section-surface-muted)]">
            Connect
          </span>
          <p className="max-w-2xl text-base text-[var(--section-surface-muted)] sm:text-lg">
            Enough about me. I want to hear about you!
          </p>
          <p className="max-w-2xl text-base text-[var(--section-surface-muted)] sm:text-lg">
            Have a question? Want to work together? Just want to chat?
          </p>

        </div>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mx-auto max-w-2xl rounded-3xl border border-[var(--section-surface-border)] bg-white/5 p-6 shadow-[0_18px_50px_rgba(0,0,0,0.25)] backdrop-blur-sm"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm font-semibold text-[var(--section-surface-muted)]">
              <span className="sr-only">Your name</span>
              Name
              <input
                type="text"
                name="name"
                autoComplete="name"
                placeholder="Your name"
                className="w-full rounded-2xl border border-[var(--section-surface-border)] bg-white/10 px-4 py-3 text-sm text-[var(--section-surface-foreground)] outline-none transition focus:border-[rgba(255,255,255,0.5)]"
                required
              />
            </label>
            <label className="flex flex-col gap-2 text-sm font-semibold text-[var(--section-surface-muted)]">
              <span className="sr-only">Your email</span>
              Email
              <input
                type="email"
                name="email"
                autoComplete="email"
                placeholder="you@example.com"
                className="w-full rounded-2xl border border-[var(--section-surface-border)] bg-white/10 px-4 py-3 text-sm text-[var(--section-surface-foreground)] outline-none transition focus:border-[rgba(255,255,255,0.5)]"
                required
              />
            </label>
          </div>

          <label className="mt-4 flex flex-col gap-2 text-sm font-semibold text-[var(--section-surface-muted)]">
            <span className="sr-only">Your message</span>
            Message
            <textarea
              name="message"
              rows={6}
              placeholder="Tell me about your yourself."
              className="w-full rounded-2xl border border-[var(--section-surface-border)] bg-white/10 px-4 py-3 text-sm text-[var(--section-surface-foreground)] outline-none transition focus:border-[rgba(255,255,255,0.5)]"
              required
            />
          </label>

          <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />
          <input type="hidden" name="_subject" value="New portfolio inquiry" />

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="submit"
              disabled={status === "sending"}
              className="rounded-full bg-[var(--section-surface-foreground)] px-6 py-3 text-sm font-semibold text-[var(--section-surface)] shadow-[0_12px_34px_rgba(0,0,0,0.2)] transition hover:-translate-y-0.5"
            >
              {status === "sending" ? "Sending..." : "Send message"}
            </button>
            <span className="text-sm text-[var(--section-surface-muted)]">
              {status === "sent"
                ? "Thanks! Your message has been sent."
                : status === "error"
                ? "Something went wrong. Please try again."
                : null}
            </span>
          </div>
        </form>

        <div className="mt-12 flex flex-col items-center gap-4 border-t border-[var(--section-surface-border)] pt-6 text-center">
          <div className="flex flex-wrap justify-center gap-3">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[var(--section-surface-border)] bg-white/10 text-[var(--section-surface-muted)] transition hover:-translate-y-0.5 hover:text-[var(--section-surface-foreground)]"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
          <p className="text-sm text-[var(--section-surface-muted)]">
            harshchinjer@gmail.com
          </p>
          <p className="text-xs text-[var(--section-surface-muted)]">
            © {new Date().getFullYear()} Harsh Chinjer. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
}

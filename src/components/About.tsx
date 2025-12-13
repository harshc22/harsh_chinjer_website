import Image from "next/image";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa6";
import portrait from "../images/about1.jpg";

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

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative -mt-6 overflow-hidden bg-[var(--section-surface)] pt-10 pb-16 sm:-mt-8 sm:pt-12 sm:pb-20 text-[var(--section-surface-foreground)]"
    >

      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center gap-12 px-6 md:flex-row md:items-center md:gap-16">
        {/* Text */}
        <div className="flex-1 space-y-6">
          <div className="space-y-5 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--section-surface-border)] bg-white/5 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--section-surface-muted)]">
              <span>About</span>
              
            </div>

            <h3 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Building clean, considered software with a bit of personality.
            </h3>

            <p className="text-base leading-relaxed text-[var(--section-surface-muted)] sm:text-lg">
              I&apos;m a software developer focused on designing and building web
              experiences that feel calm, fast, and intentional. I like taking
              ideas from rough sketches to something polished that people
              actually enjoy using.
            </p>

            <p className="text-base leading-relaxed text-[var(--section-surface-muted)] sm:text-lg">
              Right now I&apos;m working mostly with{" "}
              <span className="font-medium text-[var(--section-surface-foreground)]">
                Next.js, React, and TypeScript
              </span>{" "}
              — exploring animation, micro-interactions, and layouts that feel
              modern without being loud.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-3">
              {/* Blog / long-form CTA */}
              <a
                href="/blog"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--section-surface-border)] bg-white/10 px-5 py-2 text-sm font-semibold text-[var(--section-surface-foreground)] shadow-[0_10px_30px_rgba(0,0,0,0.2)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(0,0,0,0.26)]"
              >
                <span>Visit my blog</span>
              </a>

              {/* Social icon buttons */}
              <div className="flex items-center gap-2">
                {socialLinks.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--section-surface-border)] bg-white/8 text-[var(--section-surface-muted)] shadow-[0_8px_25px_rgba(0,0,0,0.2)] transition hover:-translate-y-0.5 hover:text-[var(--section-surface-foreground)] hover:shadow-[0_14px_35px_rgba(0,0,0,0.26)]"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Circular portrait */}
        <div className="flex flex-1 justify-center md:justify-end">
          <div className="relative">
            <div className="absolute inset-0 scale-110 rounded-full bg-[radial-gradient(circle,_rgba(255,255,255,0.12),_transparent_60%)] blur-2xl" />
            <div className="relative h-52 w-52 overflow-hidden rounded-full border border-[var(--section-surface-border)] bg-white/10 shadow-[0_22px_60px_rgba(0,0,0,0.5)] sm:h-80 sm:w-80 lg:h-120 lg:w-120">
              <Image
                src={portrait}
                alt="Portrait of Harsh Chinjer"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

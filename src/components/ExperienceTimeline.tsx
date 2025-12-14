"use client";

import { motion, type Variants } from "framer-motion";

type Internship = {
  role: string;
  company: string;
  location?: string;
  period: string;
  summary: string;
  highlights?: string[];
  tech?: string[];
};

const internships: Internship[] = [
  {
    role: "Software Engineering Intern",
    company: "Company One",
    location: "Remote",
    period: "Summer 2024",
    summary:
      "Worked on the core web experience, shipping features to thousands of users.",
    highlights: [
      "Implemented a new onboarding flow that reduced drop-off.",
      "Collaborated with designers and PMs on rapid experiments.",
    ],
    tech: ["TypeScript", "React", "Node.js"],
  },
  {
    role: "Backend Developer Intern",
    company: "Company Two",
    location: "Toronto, ON",
    period: "2023",
    summary:
      "Focused on APIs and performance, helping stabilize internal services.",
    highlights: [
      "Optimized a critical endpoint, cutting response times by 40%.",
      "Improved monitoring with new logs and metrics.",
    ],
    tech: ["Go", "PostgreSQL", "Docker"],
  },
];

const easing: [number, number, number, number] = [0.16, 1, 0.3, 1];

const containerVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easing },
  },
} satisfies Variants;

const itemVariants = (i: number) =>
  ({
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 0.08 * i, duration: 0.4, ease: easing },
    },
  }) satisfies Variants;

export function InternshipTimeline() {
  return (
    <section
      id="internships"
      className="relative -mt-10 overflow-hidden rounded-t-[32px] bg-[var(--background)] shadow-[0_-22px_60px_rgba(0,0,0,0.14)] mx-auto max-w-6xl px-4 md:px-10 pt-14 pb-16 md:pt-18 md:pb-20"
    >
      <div className="mb-10 flex items-center justify-between gap-4">
        <h2 className="text-3xl md:text-4xl font-semibold text-[var(--foreground)]">
          Internships
        </h2>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        variants={containerVariants}
        className="relative"
      >
        {/* vertical line */}
        <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-red-500/70 via-red-500/20 to-transparent md:left-1/2 md:-translate-x-1/2" />

        <div className="space-y-10">
          {internships.map((item, i) => (
            <motion.article
              key={`${item.company}-${i}`}
              variants={itemVariants(i)}
              className={`
                relative flex gap-6 md:gap-10
                ${i % 2 === 0 ? "md:flex-row-reverse" : ""}
              `}
            >
              {/* timeline dot */}
              <div className="relative z-10 mt-2 md:mt-0 md:absolute md:top-4 md:left-1/2 md:-translate-x-1/2">
                <div className="h-3 w-3 rounded-full bg-red-500 shadow-[0_0_0_6px_rgba(248,113,113,0.25)]" />
              </div>

              {/* left / right meta (period, location) */}
              <div
                className={`
                  hidden md:flex md:w-1/2 md:flex-col 
                  ${i % 2 === 0 ? "items-start pr-10" : "items-end pl-10"}
                `}
              >
                <span className="text-sm font-medium uppercase tracking-[0.18em] text-[var(--muted)]">
                  {item.period}
                </span>
                {item.location && (
                  <span className="mt-2 text-sm text-[var(--muted)]">
                    {item.location}
                  </span>
                )}
              </div>

              {/* content card */}
              <div
                className={`
                  w-full md:w-1/2
                  ${i % 2 === 0 ? "md:pr-10" : "md:pl-10"}
                `}
              >
                <div className="rounded-2xl border border-[var(--panel-border)] bg-[var(--panel)]/90 shadow-xl shadow-black/5 backdrop-blur-sm p-5 sm:p-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-lg sm:text-xl font-semibold text-[var(--foreground)]">
                      {item.role}
                    </h3>
                    <span className="text-sm font-medium text-red-500">
                      {item.company}
                    </span>
                  </div>

                  {/* mobile period */}
                  <div className="mt-1 text-xs text-[var(--muted)] md:hidden">
                    {item.period}
                    {item.location ? ` · ${item.location}` : null}
                  </div>

                  <p className="mt-3 text-sm sm:text-[15px] text-[var(--muted)] leading-relaxed">
                    {item.summary}
                  </p>

                  {item.highlights && (
                    <ul className="mt-3 space-y-1.5 text-sm text-[var(--muted)]">
                      {item.highlights.map((h, idx) => (
                        <li key={idx} className="flex gap-2">
                          <span className="mt-[6px] h-1 w-3 rounded-full bg-red-400/70" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {item.tech && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-[var(--panel-border)] bg-[var(--background)]/70 px-3 py-1 text-xs font-medium text-[var(--muted)]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

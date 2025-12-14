"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { experiences } from "@/data/experience";

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

export function ExperienceTimeline() {
  return (
    <section
      id="experience"
      className="relative -mt-10 overflow-hidden rounded-t-[32px] bg-[var(--background)] shadow-[0_-22px_60px_rgba(0,0,0,0.14)] mx-auto max-w-6xl px-4 md:px-10 pt-14 pb-16 md:pt-18 md:pb-20"
    >
      <div className="mb-10 flex flex-col gap-3">
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--panel-border)] bg-[var(--background)]/70 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
          Experience
        </span>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        variants={containerVariants}
        className="relative"
      >
        {/* vertical line */}
        <div className="absolute left-[0.375rem] top-0 h-full w-px bg-[linear-gradient(180deg,rgba(100,18,32,0.7)_0%,rgba(100,18,32,0.6)_45%,rgba(100,18,32,0.4)_75%,transparent_100%)] md:left-1/2 md:-translate-x-1/2" />

        <div className="space-y-10">
          {experiences.map((item, i) => (
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
                <div className="h-3 w-3 rounded-full bg-[var(--title)] shadow-[0_0_0_6px_rgba(100,18,32,0.18)]" />
              </div>

              {/* left / right meta (period, location) */}
              <div
                className={`
                  hidden md:flex md:w-1/2 md:flex-col 
                  ${i % 2 === 0 ? "items-start pr-10" : "items-end pl-10"}
                `}
              >
                <span className="text-sm font-medium uppercase tracking-[0.18em] text-[var(--muted)]">
                  {item.start} – {item.end}
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
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-4">
                      {item.logo && (
                        <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-[var(--panel-border)] bg-[var(--background)] shadow-sm">
                          <Image
                            src={item.logo}
                            alt={`${item.company} logo`}
                            width={64}
                            height={64}
                            draggable={false}
                            className="h-full w-full object-cover select-none"
                          />
                        </div>
                      )}
                      <div>
                        <h3 className="text-lg sm:text-xl font-semibold text-[var(--foreground)]">
                          {item.role}
                        </h3>
                        <div className="mt-1 text-sm font-semibold text-[var(--title)]">
                          {item.company}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* mobile period */}
                  <div className="mt-1 text-xs text-[var(--muted)] md:hidden">
                    {item.start} – {item.end}
                    {item.location ? ` · ${item.location}` : null}
                  </div>

                  <p className="mt-3 text-sm sm:text-[15px] text-[var(--muted)] leading-relaxed">
                    {item.summary}
                  </p>

                  {item.highlights && item.highlights.length > 0 && (
                    <ul className="mt-3 space-y-1.5 text-sm text-[var(--muted)]">
                      {item.highlights.map((h, idx) => (
                        <li key={idx} className="flex gap-2">
                          <span className="mt-[6px] h-1 w-3 rounded-full bg-[rgba(100,18,32,0.7)]" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {item.tags && item.tags.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.tags.map((t) => (
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

"use client";

import Image from "next/image";
import type { KeyboardEvent } from "react";
import { motion, type Variants } from "framer-motion";
import { FaGithub, FaArrowUpRightFromSquare } from "react-icons/fa6";

import { projects } from "@/data/projects";

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

function ScreenshotPlaceholder() {
  return (
    <div className="relative h-56 w-full overflow-hidden rounded-2xl border border-[var(--panel-border)] bg-[radial-gradient(circle_at_top,_rgba(100,18,32,0.25),_rgba(15,23,42,0.3))]">
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.08)_0%,transparent_45%,rgba(255,255,255,0.04)_100%)]" />
    </div>
  );
}

function ScreenshotStrip({ shots }: { shots: string[] }) {
  if (shots.length <= 1) return null;

  return (
    <div className="mt-3 grid grid-cols-3 gap-3">
      {shots.slice(1, 4).map((shot, index) => (
        <div
          key={`${shot}-${index}`}
          className="relative h-20 overflow-hidden rounded-xl border border-[var(--panel-border)]"
        >
          <Image
            src={shot}
            alt="Project screenshot"
            fill
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}

export function ProjectsSection() {
  const featured = projects.find((project) => project.featured) ?? projects[0];
  const rest = projects.filter((project) => project !== featured);
  const openLiveLink = (link?: string) => {
    if (!link) return;
    window.open(link, "_blank", "noopener,noreferrer");
  };
  const handleKeyActivate = (event: KeyboardEvent, link?: string) => {
    if (!link) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openLiveLink(link);
    }
  };

  return (
    <section
      id="projects"
      className="relative mx-auto max-w-6xl px-4 pb-20 pt-10 md:px-10"
    >
      <div className="mb-10 flex flex-col gap-4">
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--panel-border)] bg-[var(--background)]/70 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
          Projects
        </span>
        <p className="max-w-2xl text-base text-[var(--muted)] sm:text-lg">
          A snapshot of focused builds with clear impact, thoughtful UX, and clean
          engineering foundations.
        </p>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        variants={containerVariants}
        className="space-y-12"
      >
        {featured && (
          <motion.article
            variants={itemVariants(0)}
            className="rounded-3xl border border-[var(--panel-border)] bg-[var(--panel)]/90 p-6 shadow-xl shadow-black/10 backdrop-blur-sm"
          >
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
              <div className="flex-1">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="inline-flex items-center rounded-full border border-[var(--panel-border)] bg-[var(--background)]/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                      Featured
                    </span>
                    <h3 className="mt-3 text-2xl font-semibold text-[var(--foreground)]">
                      {featured.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    {featured.github && (
                      <a
                        href={featured.github}
                        aria-label="GitHub"
                        onClick={(event) => event.stopPropagation()}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--panel-border)] bg-[var(--background)]/70 text-[var(--muted)] transition hover:-translate-y-0.5 hover:text-[var(--foreground)]"
                      >
                        <FaGithub className="h-4 w-4" />
                      </a>
                    )}
                    {featured.live && (
                      <a
                        href={featured.live}
                        aria-label="Live demo"
                        onClick={(event) => event.stopPropagation()}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--panel-border)] bg-[var(--background)]/70 text-[var(--muted)] transition hover:-translate-y-0.5 hover:text-[var(--foreground)]"
                      >
                        <FaArrowUpRightFromSquare className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
                <p className="mt-4 text-base leading-relaxed text-[var(--muted)] sm:text-lg">
                  {featured.summary}
                </p>

                {featured.bullets && featured.bullets.length > 0 && (
                  <ul className="mt-4 space-y-2 text-base text-[var(--muted)]">
                    {featured.bullets.map((bullet, index) => (
                      <li key={`${bullet}-${index}`} className="flex gap-2">
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[rgba(100,18,32,0.7)]" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {featured.tags && featured.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {featured.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-[rgba(100,18,32,0.7)] bg-[rgba(100,18,32,0.15)] px-3 py-1 text-xs font-semibold text-[var(--title)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="w-full lg:w-[46%]">
                {featured.screenshots && featured.screenshots.length > 0 ? (
                  <div>
                    <div
                      className={`relative h-56 w-full overflow-hidden rounded-2xl border border-[var(--panel-border)] sm:h-64 md:h-72 lg:h-80 ${
                        featured.live ? "cursor-pointer transition hover:-translate-y-0.5" : ""
                      }`}
                      onClick={() => openLiveLink(featured.live)}
                      onKeyDown={(event) => handleKeyActivate(event, featured.live)}
                      role={featured.live ? "link" : undefined}
                      tabIndex={featured.live ? 0 : undefined}
                    >
                      <Image
                        src={featured.screenshots[0]}
                        alt={`${featured.title} screenshot`}
                        fill
                        className="object-contain bg-[var(--background)]/70"
                      />
                    </div>
                    <ScreenshotStrip shots={featured.screenshots} />
                  </div>
                ) : (
                  <ScreenshotPlaceholder />
                )}
              </div>
            </div>
          </motion.article>
        )}

        {rest.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2">
            {rest.map((project, i) => (
              <motion.article
                key={project.title}
                variants={itemVariants(i + 1)}
                className="rounded-3xl border border-[var(--panel-border)] bg-[var(--panel)]/90 p-6 shadow-lg shadow-black/10 backdrop-blur-sm"
              >
                {project.screenshots && project.screenshots.length > 0 ? (
                  <div
                    className={`relative h-48 w-full overflow-hidden rounded-2xl border border-[var(--panel-border)] sm:h-56 md:h-64 ${
                      project.live ? "cursor-pointer transition hover:-translate-y-0.5" : ""
                    }`}
                    onClick={() => openLiveLink(project.live)}
                    onKeyDown={(event) => handleKeyActivate(event, project.live)}
                    role={project.live ? "link" : undefined}
                    tabIndex={project.live ? 0 : undefined}
                  >
                    <Image
                      src={project.screenshots[0]}
                      alt={`${project.title} screenshot`}
                      fill
                      className="object-contain bg-[var(--background)]/70"
                    />
                  </div>
                ) : (
                  <ScreenshotPlaceholder />
                )}

                <div className="mt-5 flex items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold text-[var(--foreground)]">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    {project.github && (
                      <a
                        href={project.github}
                        aria-label="GitHub"
                        onClick={(event) => event.stopPropagation()}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--panel-border)] bg-[var(--background)]/70 text-[var(--muted)] transition hover:-translate-y-0.5 hover:text-[var(--foreground)]"
                      >
                        <FaGithub className="h-4 w-4" />
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        aria-label="Live demo"
                        onClick={(event) => event.stopPropagation()}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--panel-border)] bg-[var(--background)]/70 text-[var(--muted)] transition hover:-translate-y-0.5 hover:text-[var(--foreground)]"
                      >
                        <FaArrowUpRightFromSquare className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>

                <p className="mt-3 text-base leading-relaxed text-[var(--muted)]">
                  {project.summary}
                </p>

                {project.bullets && project.bullets.length > 0 && (
                  <ul className="mt-4 space-y-2 text-base text-[var(--muted)]">
                    {project.bullets.map((bullet, index) => (
                      <li key={`${bullet}-${index}`} className="flex gap-2">
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[rgba(100,18,32,0.7)]" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {project.tags && project.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-[rgba(100,18,32,0.7)] bg-[rgba(100,18,32,0.15)] px-3 py-1 text-xs font-semibold text-[var(--title)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </motion.article>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
}

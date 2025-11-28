"use client";

import { motion } from "framer-motion";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

import { experiences } from "@/data/experience";

const cardVariant = (index: number) => ({
  hidden: { y: 24, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.4, delay: 0.05 * index, ease: "easeOut" },
  },
});

export function ExperienceTimeline() {
  return (
    <section
      id="experience"
      className="mx-auto max-w-5xl px-4 md:px-8 py-16 md:py-20"
    >
      <div className="mb-10 flex items-center justify-between gap-4">
        <h2 className="text-3xl md:text-4xl font-semibold text-[var(--foreground)]">
          Experience
        </h2>
      </div>

      <VerticalTimeline lineColor="var(--panel-border)">
        {experiences.map((item, idx) => (
          <VerticalTimelineElement
            key={`${item.company}-${item.role}-${idx}`}
            contentStyle={{
              background: "var(--panel)",
              color: "var(--foreground)",
              border: "1px solid var(--panel-border)",
              boxShadow: "0 16px 40px rgba(0,0,0,0.12)",
            }}
            contentArrowStyle={{ borderRight: "7px solid var(--panel-border)" }}
            date={`${item.start} — ${item.end}`}
            dateClassName="text-[var(--muted)] font-medium"
            iconStyle={{
              background: "var(--callout)",
              color: "var(--callout-text)",
              boxShadow: "none",
            }}
            icon={<span className="text-xs font-bold">●</span>}
          >
            <motion.div
              variants={cardVariant(idx)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <div>
                  <h3 className="text-xl font-semibold">{item.role}</h3>
                  <div className="text-[var(--muted)]">
                    <span className="font-medium text-[var(--foreground)]">
                      {item.company}
                    </span>
                    {item.location ? ` • ${item.location}` : ""}
                  </div>
                </div>
                <div className="text-sm font-medium text-[var(--muted)]">
                  {item.start} — {item.end}
                </div>
              </div>

              {item.summary ? (
                <p className="mt-3 text-[var(--muted)] leading-relaxed">
                  {item.summary}
                </p>
              ) : null}

              {item.highlights?.length ? (
                <ul className="mt-3 space-y-2 text-[var(--muted)]">
                  {item.highlights.map((point, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--foreground)]/70" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              ) : null}

              {item.tags?.length ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[var(--panel-border)] bg-[var(--background)] px-3 py-1 text-xs font-semibold text-[var(--muted)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}

              {item.link ? (
                <a
                  href={item.link}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--foreground)] hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  View work →
                </a>
              ) : null}
            </motion.div>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </section>
  );
}

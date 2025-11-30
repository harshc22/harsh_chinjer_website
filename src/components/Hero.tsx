"use client";

import { motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";

import polaroid1 from "../images/polaroid1.jpg";
import polaroid2 from "../images/polaroid2.jpg";
import polaroid3 from "../images/polaroid3.jpg";

type Polaroid = {
  src: StaticImageData;
  alt: string;
  rotation?: string;
};

const polaroids: Polaroid[] = [
  {
    src: polaroid1,
    alt: "Graduation day portrait",
    rotation: "-rotate-6",
  },
  {
    src: polaroid2,
    alt: "Iron ring ceremony",
    rotation: "rotate-3",
  },
  {
    src: polaroid3,
    alt: "Graduation ceremony",
    rotation: "-rotate-2",
  },
];

function PolaroidCard({
  src,
  alt,
  rotation,
}: {
  src: StaticImageData;
  alt: string;
  rotation?: string;
}) {
  return (
    <div
      className={`
        bg-[var(--panel)] shadow-xl border border-[var(--panel-border)]
        p-3 w-56 sm:w-64
        transform ${rotation ?? ""} hover:-translate-y-2 transition-transform duration-300
      `}
    >
      <div className="relative w-full h-64 overflow-hidden">
        <Image src={src} alt={alt} fill className="object-cover" />
      </div>
      <div className="mt-3 flex items-center justify-center gap-1 text-[var(--muted)]">
        <span className="h-2 w-2 rounded-full bg-current/60" />
        <span className="h-2 w-2 rounded-full bg-current/80" />
        <span className="h-2 w-2 rounded-full bg-current" />
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] mt-25">
      {/* Polaroid strip */}
      <section className="relative overflow-hidden pt-16 pb-10">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 px-4 md:px-8">
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {polaroids.map((p, i) => (
              <PolaroidCard key={i} {...p} />
            ))}
          </div>
        </div>
      </section>

      {/* Signature + titles */}
      <section className="relative overflow-hidden pt-6 pb-6">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-5">
            <motion.h2
              className="text-5xl sm:text-6xl md:text-8xl text-[var(--title)] border-b-2"
              style={{ fontFamily: "var(--font-pacifico)" }}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              Harsh Chinjer
            </motion.h2>

            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-[var(--foreground)]"
              style={{ fontFamily: "var(--font-serif-display)" }}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            >
              Software Developer
            </motion.h1>
          </div>
        </div>
      </section>
    </main>
  );
}

"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function SectionTransition() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const waveY = useTransform(scrollYProgress, [0, 1], [14, -8]);
  const glowY = useTransform(scrollYProgress, [0, 1], [6, 20]);
  const gradientOpacity = useTransform(scrollYProgress, [0, 1], [0.8, 1]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="relative h-28 w-full overflow-hidden sm:h-36 md:h-44"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-[var(--background)] via-[var(--background)] to-[var(--section-surface)]"
        style={{ opacity: gradientOpacity }}
      />

      <motion.div
        className="absolute inset-x-10 bottom-3 h-16 rounded-full bg-white/35 blur-3xl mix-blend-screen"
        style={{ y: glowY }}
      />

      <motion.svg
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 h-[140%] w-full text-[var(--section-surface)]"
        style={{ y: waveY }}
      >
        <path
          fill="currentColor"
          d="M0,96L80,122.7C160,149,320,203,480,208C640,213,800,171,960,149.3C1120,128,1280,128,1360,128L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
        />
      </motion.svg>
    </div>
  );
}

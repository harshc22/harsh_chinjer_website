"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function SectionTransition() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });


  return (
    <div
      ref={ref}
      aria-hidden
      className="relative h-28 w-full overflow-hidden sm:h-36 md:h-44"
    >



      <motion.svg
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 h-[140%] w-full text-[var(--section-surface)]"
      >
        <path
          fill="currentColor"
          d="M0,96L80,122.7C160,149,320,203,480,208C640,213,800,171,960,149.3C1120,128,1280,128,1360,128L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
        />
      </motion.svg>
    </div>
  );
}

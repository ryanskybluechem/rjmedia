"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import TransitionLink from "./TransitionLink";

const tools = [
  "Illustrator", "Photoshop", "Final Cut", "Canon", "Mac",
  "HTML", "JavaScript", "CSS", "Framer", "Supabase", "Klaviyo", "Claude", "Excel", "Sheets",
  "Building Signs", "Paper Prints",
];

export default function Stack() {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-100px" });

  return (
    <section ref={ref} className="relative z-10 px-6 md:px-12 py-32">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex items-end justify-between mb-16"
        >
          <div>
            <span className="text-[11px] tracking-[0.3em] uppercase text-[#39FF14] font-['Space_Mono',monospace]">
              Tools & Stack
            </span>
            <h2 className="mt-4 text-4xl md:text-5xl font-bold tracking-[-0.03em] leading-[1.1]">
              If it can be automated,<br />
              <span className="text-[#39FF14] neon-text">it should be.</span>
            </h2>
          </div>
          <TransitionLink
            href="/stack"
            className="hidden md:flex items-center gap-3 text-sm tracking-[0.15em] uppercase text-[#888] hover:text-[#39FF14] transition-colors duration-300"
          >
            View All
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
          </TransitionLink>
        </motion.div>

        <div className="flex flex-wrap gap-3">
          {tools.map((tool, i) => (
            <motion.span
              key={tool}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.04 }}
              className="text-sm tracking-[0.1em] uppercase px-5 py-3 border border-[#222] text-[#888] hover:border-[#39FF14]/40 hover:text-[#F5F5F5] transition-all duration-500"
            >
              {tool}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}

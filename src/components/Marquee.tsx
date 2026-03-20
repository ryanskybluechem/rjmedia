"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Marquee() {
  const ref = useRef(null);
  const inView = useInView(ref);

  const items = [
    "Web Design",
    "Email Marketing",
    "Brand Strategy",
    "Creative Direction",
    "Photography",
    "SEO",
    "Content Creation",
    "Data Management",
    "E-Commerce",
    "UI/UX",
  ];

  const row = items.map((item, i) => (
    <span key={i} className="flex items-center gap-8 mx-8">
      <span className="text-2xl md:text-7xl font-bold tracking-[-0.03em] text-[#222] hover:text-[#39FF14] transition-colors duration-500 cursor-default whitespace-nowrap">
        {item}
      </span>
      <span className="w-2 h-2 md:w-3 md:h-3 bg-[#39FF14]/30 rotate-45 flex-shrink-0" />
    </span>
  ));

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 1 }}
      className="relative z-10 py-20 border-y border-[#1a1a1a] overflow-hidden"
    >
      <div className="marquee-track flex">
        {row}
        {row}
      </div>
    </motion.section>
  );
}

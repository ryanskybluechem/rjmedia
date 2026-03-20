"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Logo from "./Logo";

export default function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-50px" });

  return (
    <footer ref={ref} className="relative z-10 px-6 md:px-12 py-20 border-t border-[#1a1a1a]">
      <div className="max-w-[1400px] mx-auto">
        {/* Big CTA */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-7xl lg:text-8xl font-bold tracking-[-0.04em] leading-[0.95]">
            <span className="text-[#555]">Ready to</span><br />
            <span className="text-[#F5F5F5]">build something</span><br />
            <span className="text-[#39FF14] neon-text">insane?</span>
          </h2>
          <div className="mt-10">
            <a
              href="mailto:mountainchurch@icloud.com"
              className="magnetic-btn inline-flex items-center gap-3 border border-[#39FF14] text-[#39FF14] px-12 py-5 text-sm tracking-[0.2em] uppercase font-semibold"
            >
              <span>Start a Project</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </a>
          </div>
        </motion.div>

        {/* Bottom row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pt-10 border-t border-[#1a1a1a]"
        >
          <div className="flex items-center gap-4">
            <Logo className="w-8 h-8 text-[#39FF14]" />
            <span className="text-sm text-[#555]">
              © {new Date().getFullYear()} RJ Media
            </span>
          </div>

          <div className="flex items-center gap-8">
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#333]">
              Salt Lake City, UT
            </span>
            <span className="w-[1px] h-4 bg-[#222]" />
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#333]">
              Available Worldwide
            </span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

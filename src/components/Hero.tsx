"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import TransitionLink from "./TransitionLink";

export default function Hero() {
  const { scrollY } = useScroll();
  const scrollIndicatorY = useTransform(scrollY, [0, 100], [0, 80]);
  const scrollIndicatorOpacity = useTransform(scrollY, [0, 80], [1, 0]);

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 pt-20 overflow-hidden">
      <div className="max-w-[1400px] mx-auto w-full">
        {/* Top line — invisible placeholder for ScrollLogo measurement */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-4 mb-8"
        >
          <div
            id="hero-logo-placeholder"
            className="h-10 md:h-14"
            style={{ aspectRatio: "1265 / 267.84" }}
          />
          <div className="h-[1px] flex-1 bg-gradient-to-r from-[#39FF14]/40 to-transparent" />
        </motion.div>

        {/* Main headline */}
        <div className="relative">
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-[-0.04em]"
          >
            <motion.span
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="block text-[#F5F5F5]"
            >
              No Templates.
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="block text-[#39FF14] neon-text"
            >
              No Team.
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="block text-[#F5F5F5]"
            >
              Just Build.
            </motion.span>
          </motion.h1>

          {/* Floating accent */}
          <motion.div
            initial={{ opacity: 0, scale: 0, filter: "blur(0px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(30px)" }}
            transition={{
              duration: 1.2,
              delay: 1,
              ease: [0.16, 1, 0.3, 1],
              filter: { duration: 1.5, delay: 2, ease: "easeOut" },
            }}
            className="absolute -right-4 md:right-12 top-1/2 -translate-y-1/2 w-48 h-48 md:w-72 md:h-72 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(57,255,20,0.06) 0%, rgba(57,255,20,0.02) 50%, transparent 70%)",
            }}
          />
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 md:mt-14 max-w-xl text-lg md:text-xl text-[#888] leading-relaxed font-light"
        >
          15 years of web design, marketing strategy, and creative direction.
          <span className="text-[#F5F5F5]"> Millions generated.</span>
          <span className="text-[#39FF14]"> Only shortcuts.</span>
        </motion.p>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center gap-6"
        >
          <TransitionLink
            href="/work"
            className="magnetic-btn bg-[#39FF14] text-black px-10 py-4 text-sm tracking-[0.2em] uppercase font-semibold"
          >
            <span>View Work</span>
          </TransitionLink>
          <a
            href="mailto:mountainchurch@icloud.com"
            className="magnetic-btn border border-[#39FF14] text-[#39FF14] px-8 py-4 text-sm tracking-[0.2em] uppercase font-semibold flex items-center gap-3"
          >
            <span>Start a Project</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
          </a>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 md:mt-32 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 border-t border-[#222] pt-10"
        >
          {[
            { value: "15+", label: "Years Experience" },
            { value: "50+", label: "Projects Delivered" },
            { value: "$M+", label: "Revenue Generated" },
            { value: "∞", label: "Ideas Implemented" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 + i * 0.1 }}
            >
              <div className="text-3xl md:text-4xl font-bold text-[#39FF14] neon-text font-['Space_Mono',monospace]">
                {stat.value}
              </div>
              <div className="mt-2 text-xs tracking-[0.15em] uppercase text-[#555]">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator — flush to bottom, slides off on scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 pb-4"
      >
      <motion.div
        style={{ y: scrollIndicatorY, opacity: scrollIndicatorOpacity }}
        className="flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase text-[#555]">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-[1px] h-8 bg-gradient-to-b from-[#39FF14] to-transparent"
        />
      </motion.div>
      </motion.div>
    </section>
  );
}

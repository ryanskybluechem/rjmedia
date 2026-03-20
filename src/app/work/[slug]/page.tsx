"use client";

import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import TransitionLink from "@/components/TransitionLink";
import GridTrail from "@/components/GridTrail";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { allProjects } from "@/lib/projects";
import { notFound } from "next/navigation";

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = allProjects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <GridTrail />
      <Navigation />
      <main className="relative z-10">
        <section className="px-6 md:px-12 pt-32 pb-20">
          <div className="max-w-[1000px] mx-auto">
            {/* Back link */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <TransitionLink
                href="/work"
                className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-[#555] hover:text-[#39FF14] transition-colors duration-300 mb-12"
              >
                <svg className="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
                Back to Work
              </TransitionLink>
            </motion.div>

            {/* Laptop screen frame */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mb-16"
            >
              {/* Screen */}
              <div className="rounded-t-2xl border border-[#333] border-b-0 bg-[#1a1a1a] overflow-hidden">
                {/* Top bezel with browser dots */}
                <div className="flex items-center gap-2 px-5 py-3 bg-[#1a1a1a] border-b border-[#333]/50">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                  <div className="ml-4 flex-1 h-6 rounded bg-[#111] border border-[#333]/30 flex items-center justify-center">
                    <span className="text-[9px] tracking-[0.15em] text-[#555] font-['Space_Mono',monospace]">
                      {project.slug}.com
                    </span>
                  </div>
                </div>

                {/* Screen content */}
                <div className="relative px-8 py-20 md:py-28 flex items-center justify-center bg-[#0d0d0d]">
                  {/* Scanline overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-[0.03]"
                    style={{
                      backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)",
                    }}
                  />
                  {/* Subtle grid */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-[0.02]"
                    style={{
                      backgroundImage: "linear-gradient(rgba(57,255,20,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(57,255,20,0.3) 1px, transparent 1px)",
                      backgroundSize: "20px 20px",
                    }}
                  />
                  {/* Project name */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="relative text-center"
                  >
                    <h1 className="inline text-2xl md:text-4xl lg:text-5xl font-bold tracking-[0.2em] uppercase text-[#39FF14] neon-text font-['Space_Mono',monospace]">
                      {project.title}
                    </h1>
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                      className="inline-block w-[3px] h-6 md:h-9 lg:h-11 bg-[#39FF14] ml-2 align-middle"
                    />
                  </motion.div>
                </div>
              </div>

              {/* Laptop base / hinge */}
              <div className="relative">
                <div className="h-4 bg-[#1a1a1a] border border-t-0 border-[#333] rounded-b-lg" />
                <div className="mx-auto w-1/3 h-1 bg-[#222] rounded-b" />
              </div>
            </motion.div>

            {/* Project details */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              {/* Category + Year */}
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#39FF14] font-['Space_Mono',monospace] px-3 py-1 border border-[#39FF14]/20">
                  {project.category}
                </span>
                <span className="text-[11px] text-[#555] font-['Space_Mono',monospace]">
                  {project.year}
                </span>
              </div>

              {/* Role */}
              <p className="text-xs tracking-[0.1em] uppercase text-[#555] mb-6">
                {project.role}
              </p>

              {/* Description */}
              <p className="text-[#888] text-base md:text-lg leading-relaxed mb-10 max-w-2xl">
                {project.description}
              </p>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-6 mb-10 py-6 border-y border-[#1a1a1a]">
                {project.metrics.map((metric) => (
                  <div key={metric.label}>
                    <div className="text-xl md:text-2xl font-bold text-[#39FF14] neon-text font-['Space_Mono',monospace]">
                      {metric.value}
                    </div>
                    <div className="mt-1 text-[10px] tracking-[0.15em] uppercase text-[#555]">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] tracking-[0.15em] uppercase px-3 py-1.5 border border-[#222] text-[#555]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}

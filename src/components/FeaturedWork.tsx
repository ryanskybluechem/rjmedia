"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import TransitionLink from "./TransitionLink";

const projects = [
  {
    slug: "als-com",
    title: "Al's.com",
    category: "E-Commerce / Marketing",
    description: "Five years managing the full digital operation — email flows, content creation, photography, web design, and data management. Millions in revenue generated.",
    year: "5 Years",
    metrics: "$M+ Revenue",
  },
  {
    slug: "sky-blue-chemical",
    title: "Sky Blue Chemical",
    category: "Web / Marketing",
    description: "Designed, built, and marketed the complete web presence for a chemical manufacturer. Delivered on Framer.",
    year: "1 Year",
    metrics: "Full Build",
  },
  {
    slug: "quick-and-clean",
    title: "Quick & Clean",
    category: "Web App",
    description: "Full-stack web application — designed, built, and managing the data layer. Powered by Vercel and Supabase.",
    year: "2025–Present",
    metrics: "Full Stack",
  },
];

export default function FeaturedWork() {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-100px" });

  return (
    <section ref={ref} className="relative z-10 px-6 md:px-12 py-32">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex items-end justify-between mb-20"
        >
          <div>
            <span className="text-[11px] tracking-[0.3em] uppercase text-[#39FF14] font-['Space_Mono',monospace]">
              Selected Work
            </span>
            <h2 className="mt-4 text-4xl md:text-6xl font-bold tracking-[-0.03em]">
              Case Studies
            </h2>
          </div>
          <TransitionLink
            href="/work"
            className="hidden md:flex items-center gap-3 text-sm tracking-[0.15em] uppercase text-[#888] hover:text-[#39FF14] transition-colors duration-300"
          >
            View All
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
          </TransitionLink>
        </motion.div>

        <div className="space-y-4">
          {projects.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 60 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.15 }}
            >
              <TransitionLink href={`/work/${project.slug}`} className="group block">
                <div className="project-card border border-[#222] bg-[#111]/50 p-8 md:p-12 backdrop-blur-sm">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-[10px] tracking-[0.2em] uppercase text-[#39FF14] font-['Space_Mono',monospace] px-3 py-1 border border-[#39FF14]/20">
                          {project.category}
                        </span>
                        <span className="text-[11px] text-[#555] font-['Space_Mono',monospace]">
                          {project.year}
                        </span>
                      </div>
                      <h3 className="text-3xl md:text-5xl font-bold tracking-[-0.02em] group-hover:text-[#39FF14] transition-colors duration-500">
                        {project.title}
                      </h3>
                      <p className="mt-4 text-[#888] text-sm md:text-base leading-relaxed max-w-2xl">
                        {project.description}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-4">
                      <div className="text-right">
                        <div className="text-2xl md:text-3xl font-bold text-[#39FF14] neon-text font-['Space_Mono',monospace]">
                          {project.metrics}
                        </div>
                      </div>
                      <svg
                        className="w-8 h-8 text-[#333] group-hover:text-[#39FF14] group-hover:rotate-45 transition-all duration-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                      </svg>
                    </div>
                  </div>
                </div>
              </TransitionLink>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

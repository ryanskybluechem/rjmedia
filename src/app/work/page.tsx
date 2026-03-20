"use client";

import { motion } from "framer-motion";
import TransitionLink from "@/components/TransitionLink";
import GridTrail from "@/components/GridTrail";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { allProjects } from "@/lib/projects";

export default function WorkPage() {
  return (
    <>
      <GridTrail />
      <Navigation />
      <main className="relative z-10">
        {/* Page header */}
        <section className="px-6 md:px-12 pt-32 pb-20">
          <div className="max-w-[1400px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-[11px] tracking-[0.3em] uppercase text-[#39FF14] font-['Space_Mono',monospace]">
                Portfolio
              </span>
              <h1 className="mt-4 text-5xl md:text-7xl lg:text-8xl font-bold tracking-[-0.04em]">
                The Work<span className="text-[#39FF14]">.</span>
              </h1>
              <p className="mt-6 text-[#888] text-lg md:text-xl max-w-2xl leading-relaxed">
                Decades of projects across e-commerce, B2B, SaaS, healthcare, and content.
                Every one built by hand.
              </p>
            </motion.div>

            {/* Filter line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-12 flex items-center gap-3 overflow-x-auto pb-2"
            >
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#555] whitespace-nowrap mr-2">Filter:</span>
              {["All", "E-Commerce", "Web Design", "Web App", "Data"].map((filter, i) => (
                <button
                  key={filter}
                  className={`text-[10px] tracking-[0.15em] uppercase px-4 py-2 border whitespace-nowrap transition-all duration-300 ${
                    i === 0
                      ? "border-[#39FF14] text-[#39FF14] bg-[#39FF14]/5"
                      : "border-[#222] text-[#555] hover:border-[#39FF14]/30 hover:text-[#39FF14]/60"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Projects grid */}
        <section className="px-6 md:px-12 pb-32">
          <div className="max-w-[1400px] mx-auto space-y-6">
            {allProjects.map((project, i) => (
              <motion.article
                key={project.slug}
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.2 + i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <TransitionLink href={`/work/${project.slug}`} className="group block project-card border border-[#222] bg-[#111]/50 backdrop-blur-sm overflow-hidden">
                  <div className="p-8 md:p-12">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                      <div>
                        <div className="flex flex-wrap items-center gap-3 mb-3">
                          <span className="text-[10px] tracking-[0.2em] uppercase text-[#39FF14] font-['Space_Mono',monospace] px-3 py-1 border border-[#39FF14]/20">
                            {project.category}
                          </span>
                          <span className="text-[11px] text-[#555] font-['Space_Mono',monospace]">
                            {project.year}
                          </span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold tracking-[-0.02em] group-hover:text-[#39FF14] transition-colors duration-500">
                          {project.title}
                        </h2>
                        <p className="mt-1 text-xs tracking-[0.1em] uppercase text-[#555]">
                          {project.role}
                        </p>
                      </div>
                      <svg
                        className="w-8 h-8 text-[#333] group-hover:text-[#39FF14] group-hover:rotate-45 transition-all duration-500 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                      </svg>
                    </div>

                    {/* Description */}
                    <p className="text-[#888] text-sm md:text-base leading-relaxed max-w-3xl mb-8">
                      {project.description}
                    </p>

                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-6 mb-8 py-6 border-y border-[#1a1a1a]">
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
                          className="text-[10px] tracking-[0.15em] uppercase px-3 py-1.5 border border-[#222] text-[#555] group-hover:border-[#39FF14]/20 group-hover:text-[#39FF14]/50 transition-all duration-500"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </TransitionLink>
              </motion.article>
            ))}
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}

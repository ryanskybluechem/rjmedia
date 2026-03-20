"use client";

import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import TransitionLink from "@/components/TransitionLink";
import GridTrail from "@/components/GridTrail";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { allServices } from "@/lib/services";
import { notFound } from "next/navigation";

export default function ServicePage() {
  const { slug } = useParams<{ slug: string }>();
  const service = allServices.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const headlineLines = service.headline.split("\n");

  return (
    <>
      <GridTrail />
      <Navigation />
      <main className="relative z-10">
        {/* Hero */}
        <section className="px-6 md:px-12 pt-32 pb-20">
          <div className="max-w-[1200px] mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <TransitionLink
                href="/"
                className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-[#555] hover:text-[#39FF14] transition-colors duration-300 mb-12"
              >
                <svg className="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
                Back to Home
              </TransitionLink>
            </motion.div>

            {/* Service number + title */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="text-6xl md:text-8xl font-bold text-[#39FF14]/10 font-['Space_Mono',monospace]">
                  {service.num}
                </span>
                <div className="h-[1px] flex-1 bg-gradient-to-r from-[#39FF14]/20 to-transparent" />
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-[-0.04em] mb-6">
                {headlineLines.map((line, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                    className={`block ${i === headlineLines.length - 1 ? "text-[#39FF14] neon-text" : "text-[#F5F5F5]"}`}
                  >
                    {line}
                  </motion.span>
                ))}
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="text-[#888] text-base md:text-lg leading-relaxed max-w-2xl mb-16"
            >
              {service.description}
            </motion.p>

            {/* Approach quote */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="border-l-2 border-[#39FF14]/40 pl-6 mb-20"
            >
              <p className="text-lg md:text-xl text-[#F5F5F5] font-medium italic">
                &ldquo;{service.approach}&rdquo;
              </p>
            </motion.div>

            {/* Two column grid: Capabilities + Tools */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Capabilities */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.7 }}
                className="border border-[#222] bg-[#111]/50 backdrop-blur-sm p-8 md:p-10"
              >
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#39FF14] font-['Space_Mono',monospace] mb-6 block">
                  Capabilities
                </span>
                <div className="space-y-4">
                  {service.capabilities.map((cap, i) => (
                    <motion.div
                      key={cap}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.8 + i * 0.06 }}
                      className="flex items-center gap-3 group"
                    >
                      <span className="w-1.5 h-1.5 bg-[#39FF14]/40 group-hover:bg-[#39FF14] transition-colors duration-300 rotate-45 flex-shrink-0" />
                      <span className="text-sm text-[#888] group-hover:text-[#F5F5F5] transition-colors duration-300">
                        {cap}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Tools */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.8 }}
                className="border border-[#222] bg-[#111]/50 backdrop-blur-sm p-8 md:p-10"
              >
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#39FF14] font-['Space_Mono',monospace] mb-6 block">
                  Tools
                </span>
                <div className="flex flex-wrap gap-3">
                  {service.tools.map((tool, i) => (
                    <motion.span
                      key={tool}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.9 + i * 0.05 }}
                      className="text-[10px] tracking-[0.15em] uppercase px-4 py-2 border border-[#222] text-[#555] hover:border-[#39FF14]/40 hover:text-[#F5F5F5] transition-all duration-500"
                    >
                      {tool}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}

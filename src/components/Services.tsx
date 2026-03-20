"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import TransitionLink from "./TransitionLink";

const services = [
  {
    num: "01",
    slug: "web-design-development",
    title: "Web Design & Development",
    description: "Sites that convert. No templates. No fluff. Custom-built from pixel one.",
    tags: ["Next.js", "React", "Framer", "Headless CMS"],
  },
  {
    num: "02",
    slug: "marketing-strategy",
    title: "Marketing Strategy",
    description: "Email flows, paid media, SEO, content — the full stack of growth.",
    tags: ["Email Flows", "SEO", "Paid Media", "Analytics"],
  },
  {
    num: "03",
    slug: "creative-direction",
    title: "Creative Direction",
    description: "Photography, brand identity, content creation — the visual layer that separates you from noise.",
    tags: ["Brand Identity", "Photography", "Content", "Art Direction"],
  },
  {
    num: "04",
    slug: "data-operations",
    title: "Data & Operations",
    description: "Custom tools, dashboards, and automation that turn chaos into clarity.",
    tags: ["Custom Tools", "Dashboards", "Automation", "Integration"],
  },
];

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-100px" });

  return (
    <section ref={ref} className="relative z-10 px-6 md:px-12 py-32">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <span className="text-[11px] tracking-[0.3em] uppercase text-[#39FF14] font-['Space_Mono',monospace]">
            What We Do
          </span>
          <h2 className="mt-4 text-4xl md:text-6xl font-bold tracking-[-0.03em]">
            Me, Myself<br />
            <span className="text-[#555]">& All My Apps.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4">
          {services.map((service, i) => (
            <TransitionLink
              key={service.num}
              href={`/services/${service.slug}`}
            >
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="group project-card border border-[#222] bg-[#111]/50 p-8 md:p-10 backdrop-blur-sm"
            >
              <div className="flex items-start justify-between mb-6">
                <span className="text-[11px] tracking-[0.3em] text-[#39FF14] font-['Space_Mono',monospace]">
                  {service.num}
                </span>
                <svg
                  className="w-5 h-5 text-[#333] group-hover:text-[#39FF14] group-hover:rotate-45 transition-all duration-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-semibold mb-3 group-hover:text-[#39FF14] transition-colors duration-500">
                {service.title}
              </h3>
              <p className="text-[#888] text-sm leading-relaxed mb-6">
                {service.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] tracking-[0.15em] uppercase px-3 py-1.5 border border-[#222] text-[#555] group-hover:border-[#39FF14]/30 group-hover:text-[#39FF14]/60 transition-all duration-500"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
            </TransitionLink>
          ))}
        </div>
      </div>
    </section>
  );
}

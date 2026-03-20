"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import AnimatedLogo from "./AnimatedLogo";

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-100px" });

  const bioRef = useRef(null);
  const bioInView = useInView(bioRef, { margin: "-100px" });

  return (
    <>
      {/* Professional */}
      <section ref={ref} className="relative z-10 px-6 md:px-12 py-32">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-12 gap-12 md:gap-20">
            {/* Left column */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="md:col-span-4"
            >
              <span className="text-[11px] tracking-[0.3em] uppercase text-[#39FF14] font-['Space_Mono',monospace]">
                About
              </span>
              <h2 className="mt-4 text-4xl md:text-5xl font-bold tracking-[-0.03em] leading-[1.1]">
                Not an agency.<br />
                <span className="text-[#555]">Something better.</span>
              </h2>
            </motion.div>

            {/* Right column */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="md:col-span-8"
            >
              <div className="space-y-6 text-[#888] text-base md:text-lg leading-relaxed">
                <p>
                  Ryan has spent <span className="text-[#F5F5F5] font-medium">15 years</span> in the trenches of web and marketing —
                  not managing from a distance, but building, designing, and shipping the work himself.
                </p>
                <p>
                  As <span className="text-[#F5F5F5] font-medium">Lead Designer & Web Marketing Manager at Al&apos;s.com</span> for five years,
                  he built and ran the full digital operation — email flows generating millions in revenue,
                  content creation, photography, web design, and data management. Not a department.
                  <span className="text-[#39FF14]"> One person, full stack.</span>
                </p>
                <p>
                  Now he builds for clients who want that same intensity — brands that need someone who
                  understands the entire pipeline from pixel to profit, and doesn&apos;t outsource the thinking.
                </p>
              </div>

              {/* Skill grid */}
              <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  "Web Design",
                  "Email Marketing",
                  "SEO Strategy",
                  "Photography",
                  "Content Creation",
                  "Data Management",
                  "Brand Identity",
                  "E-Commerce",
                  "Creative Direction",
                ].map((skill, i) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + i * 0.05 }}
                    className="flex items-center gap-3 group"
                  >
                    <span className="w-1.5 h-1.5 bg-[#39FF14]/40 group-hover:bg-[#39FF14] transition-colors duration-300 rotate-45 flex-shrink-0" />
                    <span className="text-sm text-[#888] group-hover:text-[#F5F5F5] transition-colors duration-300">
                      {skill}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Personal / Off the Clock */}
      <section ref={bioRef} className="relative z-10 px-6 md:px-12 py-32 border-t border-[#1a1a1a]">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-12 gap-12 md:gap-20">
            {/* Left column */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={bioInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="md:col-span-4"
            >
              <AnimatedLogo
                className="h-16 md:h-20 text-[#39FF14] mb-6"
                animate={bioInView}
              />
              <span className="text-[11px] tracking-[0.3em] uppercase text-[#39FF14] font-['Space_Mono',monospace]">
                Off the Clock
              </span>
              <h2 className="mt-4 text-4xl md:text-5xl font-bold tracking-[-0.03em] leading-[1.1]">
                Still building.<br />
                <span className="text-[#555]">Just different things.</span>
              </h2>
            </motion.div>

            {/* Right column */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={bioInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="md:col-span-8"
            >
              <div className="space-y-6 text-[#888] text-base md:text-lg leading-relaxed">
                <p>
                  When the screens go dark, you&apos;ll find Ryan somewhere in the mountains —
                  solo hiking, sitting by a lake, or deep in a book about something most people
                  would call <span className="text-[#F5F5F5] font-medium">weird</span>. Meditation,
                  esoterica, breathwork, the kind of rabbit holes that don&apos;t have a bottom.
                </p>
                <p>
                  Music is non-negotiable. The playlist is permanently stuck somewhere between
                  <span className="text-[#F5F5F5] font-medium"> blink-182</span>,
                  <span className="text-[#F5F5F5] font-medium"> Third Eye Blind</span>, and
                  <span className="text-[#F5F5F5] font-medium"> Brand New</span> — and that&apos;s not changing.
                </p>
                <p>
                  When it&apos;s time to reset, it&apos;s always <span className="text-[#F5F5F5] font-medium">San Diego</span>.
                  Everything else is
                  <span className="text-[#39FF14]"> campfires and altitude.</span>
                </p>
              </div>

              {/* Life skills */}
              <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  "Listens to Music",
                  "Goes Hiking",
                  "Reads Books",
                  "Sits Still",
                  "Stares at Mountains",
                  "Camps Alone",
                  "Asks Big Questions",
                  "Drives to San Diego",
                  "Breathes on Purpose",
                ].map((skill, i) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, y: 20 }}
                    animate={bioInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + i * 0.05 }}
                    className="flex items-center gap-3 group"
                  >
                    <span className="w-1.5 h-1.5 bg-[#39FF14]/40 group-hover:bg-[#39FF14] transition-colors duration-300 rotate-45 flex-shrink-0" />
                    <span className="text-sm text-[#888] group-hover:text-[#F5F5F5] transition-colors duration-300">
                      {skill}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Favorites */}
              <div className="mt-12 space-y-8">
                {[
                  {
                    label: "On Repeat",
                    items: ["blink-182", "Third Eye Blind", "Brand New"],
                  },
                  {
                    label: "On the Shelf",
                    items: [
                      "The Immortality Key — Brian C. Muraresku",
                      "Breath — James Nestor",
                      "The Art of Living — Thich Nhat Hanh",
                    ],
                  },
                ].map((category, ci) => (
                  <motion.div
                    key={category.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={bioInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 + ci * 0.1 }}
                  >
                    <span className="text-[10px] tracking-[0.3em] uppercase text-[#39FF14] font-['Space_Mono',monospace]">
                      {category.label}
                    </span>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {category.items.map((item) => (
                        <span
                          key={item}
                          className="text-sm tracking-[0.05em] px-4 py-2 border border-[#222] text-[#888] hover:border-[#39FF14]/40 hover:text-[#F5F5F5] transition-all duration-500"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}

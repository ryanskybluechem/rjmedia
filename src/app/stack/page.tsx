"use client";

import { motion } from "framer-motion";
import GridTrail from "@/components/GridTrail";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const tools = [
  { name: "Illustrator", category: "Design" },
  { name: "Photoshop", category: "Design" },
  { name: "Final Cut", category: "Video" },
  { name: "Canon", category: "Photo" },
  { name: "Mac", category: "Platform" },
  { name: "HTML", category: "Code" },
  { name: "JavaScript", category: "Code" },
  { name: "CSS", category: "Code" },
  { name: "Framer", category: "Platform" },
  { name: "Supabase", category: "Backend" },
  { name: "Klaviyo", category: "Marketing" },
  { name: "Claude", category: "AI" },
  { name: "Excel", category: "Data" },
  { name: "Sheets", category: "Data" },
  { name: "Building Signs", category: "Print" },
  { name: "Paper Prints", category: "Print" },
];

export default function StackPage() {
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
                Tools & Stack
              </span>
              <h1 className="mt-4 text-5xl md:text-7xl lg:text-8xl font-bold tracking-[-0.04em]">
                If it can be<br />
                automated<span className="text-[#39FF14]">,</span><br />
                <span className="text-[#39FF14] neon-text">it should be.</span>
              </h1>
              <p className="mt-8 text-[#888] text-lg md:text-xl max-w-2xl leading-relaxed">
                Tech is wizardry. These are the tools I use to design, build, shoot, edit, automate, and ship.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Tools grid */}
        <section className="px-6 md:px-12 pb-32">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {tools.map((tool, i) => (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.3 + i * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="group border border-[#222] bg-[#111]/50 backdrop-blur-sm p-8 hover:border-[#39FF14]/40 transition-all duration-500"
                >
                  <span className="block text-[9px] tracking-[0.25em] uppercase text-[#555] font-['Space_Mono',monospace] mb-3 group-hover:text-[#39FF14]/60 transition-colors duration-500">
                    {tool.category}
                  </span>
                  <span className="block text-xl font-semibold text-[#888] group-hover:text-[#F5F5F5] transition-colors duration-500">
                    {tool.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}

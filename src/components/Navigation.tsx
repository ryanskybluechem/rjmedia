"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import TransitionLink from "./TransitionLink";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoSwapped, setLogoSwapped] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Listen for logo swap event from ScrollLogo
  useEffect(() => {
    const handler = (e: Event) => {
      setLogoSwapped((e as CustomEvent).detail.swapped);
    };
    window.addEventListener("logo-swap", handler);
    return () => window.removeEventListener("logo-swap", handler);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const links = [
    { href: "/", label: "Home" },
    { href: "/work", label: "Work" },
    { href: "/stack", label: "Stack" },
    { href: "/font-tester", label: "Font Tester" },
  ];

  const showNavLogo = !isHome || logoSwapped;

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-[#0A0A0A]/95 backdrop-blur-xl" : "bg-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
          <TransitionLink
            href="/"
            id="nav-logo-target"
            className="relative z-10 w-10 h-10 flex items-center justify-center"
          >
            <div style={{ opacity: showNavLogo ? 1 : 0, transition: "opacity 0.15s ease" }}>
              <Logo className="w-10 h-10 text-[#39FF14] hover:scale-110 transition-transform duration-300" />
            </div>
          </TransitionLink>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-12">
            {links.map((link) => (
              <TransitionLink
                key={link.href}
                href={link.href}
                className={`relative text-sm tracking-[0.2em] uppercase font-medium transition-colors duration-300 ${
                  pathname === link.href
                    ? "text-[#39FF14]"
                    : "text-[#888] hover:text-[#F5F5F5]"
                }`}
              >
                {link.label}
                {pathname === link.href && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-[1px] bg-[#39FF14]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </TransitionLink>
            ))}
            <a
              href="mailto:mountainchurch@icloud.com"
              className="magnetic-btn border border-[#39FF14] text-[#39FF14] px-6 py-2.5 text-xs tracking-[0.2em] uppercase"
            >
              <span>Get in Touch</span>
            </a>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden relative z-10 w-10 h-10 flex flex-col items-center justify-center gap-1.5"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
              className="block w-6 h-[1px] bg-[#F5F5F5]"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-6 h-[1px] bg-[#F5F5F5]"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
              className="block w-6 h-[1px] bg-[#F5F5F5]"
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#0A0A0A]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-10 md:hidden"
          >
            {links.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ delay: i * 0.1 }}
              >
                <TransitionLink
                  href={link.href}
                  className={`text-3xl tracking-[0.15em] uppercase font-semibold ${
                    pathname === link.href ? "text-[#39FF14] neon-text" : "text-[#888]"
                  }`}
                >
                  {link.label}
                </TransitionLink>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ delay: 0.2 }}
            >
              <a
                href="mailto:mountainchurch@icloud.com"
                className="border border-[#39FF14] text-[#39FF14] px-8 py-3 text-sm tracking-[0.2em] uppercase"
              >
                Get in Touch
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

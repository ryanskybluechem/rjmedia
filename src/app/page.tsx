"use client";

import { motion, useScroll, useTransform, useMotionValueEvent, useSpring } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import GridTrail from "@/components/GridTrail";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Services from "@/components/Services";
import FeaturedWork from "@/components/FeaturedWork";
import About from "@/components/About";
import Stack from "@/components/Stack";
import Footer from "@/components/Footer";
function ScrollLogo() {
  const { scrollY } = useScroll();
  const [heroPos, setHeroPos] = useState({ top: 0, left: 0, width: 300, height: 64 });
  const [navPos, setNavPos] = useState({ top: 20, left: 24 });
  const [ready, setReady] = useState(false);
  const [swapped, setSwapped] = useState(false);
  const swappedRef = useRef(false);

  const NAV_SIZE = 40;
  const RATIO = 1265 / 267.84;
  const OFFSET = 368;

  useEffect(() => {
    const measure = () => {
      const heroEl = document.getElementById("hero-logo-placeholder");
      const navEl = document.getElementById("nav-logo-target");
      if (heroEl) {
        const rect = heroEl.getBoundingClientRect();
        setHeroPos({
          top: rect.top + window.scrollY,
          left: rect.left,
          width: rect.width,
          height: rect.height,
        });
      }
      if (navEl) {
        const rect = navEl.getBoundingClientRect();
        setNavPos({ top: rect.top, left: rect.left });
      }
      setReady(true);
    };
    // Must wait for nav entrance animation to fully complete (800ms + margin)
    const timer = setTimeout(measure, 1000);
    const handleResize = () => { if (ready) measure(); };
    window.addEventListener("resize", handleResize);
    return () => { clearTimeout(timer); window.removeEventListener("resize", handleResize); };
  }, [ready]);

  // Scroll phases — all GPU-composited (transform + opacity only, no layout)
  // Phase 1: 0 → 150px — letters fade, pieces slide together via translateX
  // Phase 2: 150px → scrollRange — compact mark scrolls up
  // Phase 3: last 80px — scale down + slide to nav position
  const COLLAPSE_END = 150;
  const scrollRange = Math.max(heroPos.top - navPos.top, 1);
  const scaleStart = Math.max(scrollRange - 80, 0);
  const scaleEnd = NAV_SIZE / heroPos.height;

  // Position — scrolls up with page, locks at nav top
  const top = useTransform(scrollY, (v) => Math.max(navPos.top, heroPos.top - v));
  // Left and scale — gentle approach, no hard snap
  const rawLeft = useTransform(scrollY, [scaleStart, scrollRange], [heroPos.left, navPos.left]);
  const left = useSpring(rawLeft, { stiffness: 120, damping: 28, mass: 0.5 });
  const rawScale = useTransform(scrollY, [scaleStart, scrollRange], [1, scaleEnd]);
  const scale = useSpring(rawScale, { stiffness: 120, damping: 28, mass: 0.5 });

  // SVG internal transforms — GPU-composited, no layout thrash
  // Slash (P3) gets sucked over first — light, snappy spring
  const rawSlashOffset = useTransform(scrollY, [0, COLLAPSE_END], [0, -OFFSET]);
  const slashOffset = useSpring(rawSlashOffset, {
    stiffness: 150,  // strong pull — moves first
    damping: 14,     // low damping = visible overshoot, elastic snap
    mass: 0.3,       // light = responds immediately
  });
  // Slash warps (rotates) as it moves, straightens on snap
  const rawSlashRotate = useTransform(scrollY, [0, COLLAPSE_END * 0.5, COLLAPSE_END], [0, -8, 0]);
  const slashRotate = useSpring(rawSlashRotate, { stiffness: 120, damping: 12, mass: 0.3 });

  // J bracket (P2) follows the slash — heavier, lags behind
  const rawBracketOffset = useTransform(scrollY, [0, COLLAPSE_END], [0, -OFFSET]);
  const bracketOffset = useSpring(rawBracketOffset, {
    stiffness: 80,   // weaker pull — follows the slash
    damping: 16,     // slightly more damped but still bouncy
    mass: 0.7,       // heavier = visible lag behind slash
  });
  // J bracket warps opposite direction
  const rawBracketRotate = useTransform(scrollY, [0, COLLAPSE_END * 0.5, COLLAPSE_END], [0, 6, 0]);
  const bracketRotate = useSpring(rawBracketRotate, { stiffness: 80, damping: 14, mass: 0.6 });

  // Letters fade out early and smoothly
  const rawLetterOpacity = useTransform(scrollY, [0, COLLAPSE_END * 0.4], [1, 0]);
  const letterOpacity = useSpring(rawLetterOpacity, { stiffness: 200, damping: 30 });

  // Cross-fade swap — small buffer past lock-in so springs fully settle
  const SWAP_BUFFER = 100; // extra scroll px past scrollRange before swap fires
  useMotionValueEvent(scrollY, "change", (v) => {
    if (!ready) return;
    const shouldSwap = v >= scrollRange + SWAP_BUFFER;
    if (shouldSwap !== swappedRef.current) {
      swappedRef.current = shouldSwap;
      setSwapped(shouldSwap);
      window.dispatchEvent(new CustomEvent("logo-swap", { detail: { swapped: shouldSwap } }));
    }
  });

  if (!ready) return null;

  const svgWidth = heroPos.height * RATIO;

  return (
    <motion.div
      className="fixed z-[60] pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: swapped ? 0 : 1 }}
      transition={{ duration: swapped ? 0.15 : 0.6, delay: swapped ? 0.3 : 0.2 }}
      style={{
        top,
        left,
        width: heroPos.width,
        height: heroPos.height,
        scale,
        transformOrigin: "top left",
      }}
    >
      <svg
        viewBox="0 0 1265 267.84"
        fill="currentColor"
        className="text-[#39FF14]"
        preserveAspectRatio="xMinYMid meet"
        style={{ height: "100%", width: svgWidth, willChange: "transform" }}
      >
        {/* P1: Top-left bracket — stays in place */}
        <motion.g
          initial={{ opacity: 0, x: 40, y: 40 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <polygon points="214.7 0 172.18 42.52 42.51 42.52 42.51 172.19 0 214.7 0 0 214.7 0" />
        </motion.g>

        {/* P2: J bracket — lags behind slash, warps slightly as it moves */}
        <motion.g style={{ x: bracketOffset, rotate: bracketRotate, willChange: "transform", transformOrigin: "527px 160px" }}>
          <motion.g
            initial={{ opacity: 0, x: -40, y: -40 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <polygon points="635.06 52.11 635.06 266.82 420.35 266.82 462.87 224.3 592.54 224.3 592.54 94.63 635.06 52.11" />
          </motion.g>
        </motion.g>

        {/* P3: Slash — gets sucked over first, elastic warp on movement */}
        <motion.g style={{ x: slashOffset, rotate: slashRotate, willChange: "transform", transformOrigin: "500px 133px" }}>
          <motion.g
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "500px 133px" }}
          >
            <polygon points="635.06 0 635.06 30.06 613.8 51.32 440.82 224.3 419.56 245.56 398.3 266.82 368.24 266.82 368.24 236.75 604.99 0 635.06 0" />
          </motion.g>
        </motion.g>

        {/* Letters — fade out on scroll, GPU-composited */}
        <motion.g style={{ opacity: letterOpacity, willChange: "opacity" }}>
          <polygon points="299.43 0 87.74 212.44 27.75 212.44 107.98 131.85 50.45 78.29 50.44 49.69 81.87 49.62 138 101.7 239.38 0 299.43 0" />
          <path d="M318.52,0L104.66,212.44h60.33l31.93-31.72h104.48v31.72h42.52V0h-25.4ZM301.4,138.21h-61.67l61.67-61.27v61.27Z" />
          <polygon points="510.76 0 510.76 72.85 451.83 131.78 395.95 76.68 395.95 187.66 353.43 230.18 353.43 0 378.75 0 468.24 88.26 468.24 0 510.76 0" />
          <path d="M653.22,38.63l-8.63,7.89v221.32h42.52v-31.72h104.48l31.93,31.72h60.33l-230.63-229.21ZM687.11,193.61v-61.27l61.67,61.27h-61.67Z" />
          <polygon points="968.73 41.55 968.73 268.05 926.21 268.05 926.21 110.41 839.62 202.57 700.69 64.49 699.47 41.55 732.44 41.55 838.25 141.94 936.33 41.55 968.73 41.55" />
          <polygon points="1265 268.97 1112.85 267.73 987.81 267.73 987.81 41.63 1048.66 41.63 1074.54 84.15 1030.33 84.15 1030.33 118.93 1096.3 118.93 1124.44 161.45 1030.33 161.45 1030.33 225.21 1113.11 225.21 1185.33 225.8 1127.14 138.08 1104.41 103.81 1063.16 41.63 1198.64 41.63 1244.03 84.15 1142.39 84.15 1265 268.97" />
        </motion.g>
      </svg>
    </motion.div>
  );
}

export default function Home() {
  const { scrollY } = useScroll();
  const gradientY = useTransform(scrollY, [0, 200], [0, -60]);
  const gradientOpacity = useTransform(scrollY, [0, 150], [1, 0]);

  return (
    <>
      <GridTrail />
      <Navigation />
      <ScrollLogo />
      {/* Gradient blur overlay — bottom 5% of viewport, slides up on scroll */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 z-[15] h-[5vh] pointer-events-none"
        style={{
          y: gradientY,
          opacity: gradientOpacity,
          background:
            "linear-gradient(to top, #0A0A0A 0%, rgba(10,10,10,0.6) 50%, transparent 100%)",
        }}
      />

      <main className="relative z-10">
        <Hero />

        <Marquee />
        <Services />
        <FeaturedWork />
        <About />
        <Stack />
        <Footer />
      </main>
    </>
  );
}

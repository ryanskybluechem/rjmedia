"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

interface AnimatedLogoProps {
  className?: string;
  animate?: boolean;
}

export default function AnimatedLogo({
  className = "",
  animate = false,
}: AnimatedLogoProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<0 | 1 | 2>(0); // 0=idle, 1=build, 2=expand
  const [h, setH] = useState(80);

  // Measure element height for width calculations
  useEffect(() => {
    if (ref.current) setH(ref.current.offsetHeight);
  }, []);

  useEffect(() => {
    if (animate) {
      setPhase(1);
      const t = setTimeout(() => setPhase(2), 1200);
      return () => clearTimeout(t);
    } else {
      setPhase(0);
    }
  }, [animate]);

  const RATIO = 1265 / 267.84; // expanded aspect ratio ≈ 4.72
  const compactW = h; // square
  const expandedW = h * RATIO;

  const building = phase >= 1;
  const expanding = phase >= 2;

  // How far right pieces 2 & 3 shift between compact and expanded mark
  const OFFSET = 368;

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ overflow: "hidden" }}
      animate={{ width: expanding ? expandedW : compactW }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <svg
        viewBox="0 0 1265 267.84"
        fill="currentColor"
        preserveAspectRatio="xMinYMid meet"
        style={{ height: "100%", width: expandedW }}
      >
        {/* P1: Top-left bracket — stays in place for both compact and expanded */}
        <motion.g
          initial={{ opacity: 0, transform: "translate(40, 40)" }}
          animate={
            building
              ? { opacity: 1, transform: "translate(0, 0)" }
              : { opacity: 0, transform: "translate(40, 40)" }
          }
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: "107px 107px" }}
        >
          <polygon points="214.7 0 172.18 42.52 42.51 42.52 42.51 172.19 0 214.7 0 0 214.7 0" />
        </motion.g>

        {/* P2: Bottom-right bracket — compact: translated left by OFFSET, expanded: natural position */}
        <motion.g
          initial={{ opacity: 0, transform: `translate(${-OFFSET - 40}, -40)` }}
          animate={
            expanding
              ? { opacity: 1, transform: "translate(0, 0)" }
              : building
                ? { opacity: 1, transform: `translate(${-OFFSET}, 0)` }
                : { opacity: 0, transform: `translate(${-OFFSET - 40}, -40)` }
          }
          transition={{
            duration: expanding ? 0.8 : 0.6,
            delay: expanding ? 0 : 0.15,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{ transformOrigin: "527px 160px" }}
        >
          <polygon points="635.06 52.11 635.06 266.82 420.35 266.82 462.87 224.3 592.54 224.3 592.54 94.63 635.06 52.11" />
        </motion.g>

        {/* P3: Diagonal slash — compact: translated left by OFFSET, expanded: natural position */}
        <motion.g
          initial={{
            opacity: 0,
            transform: `translate(${-OFFSET}, 0) scale(0.6)`,
          }}
          animate={
            expanding
              ? { opacity: 1, transform: "translate(0, 0) scale(1)" }
              : building
                ? { opacity: 1, transform: `translate(${-OFFSET}, 0) scale(1)` }
                : {
                    opacity: 0,
                    transform: `translate(${-OFFSET}, 0) scale(0.6)`,
                  }
          }
          transition={{
            duration: expanding ? 0.8 : 0.6,
            delay: expanding ? 0.05 : 0.3,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{ transformOrigin: "500px 133px" }}
        >
          <polygon points="635.06 0 635.06 30.06 613.8 51.32 440.82 224.3 419.56 245.56 398.3 266.82 368.24 266.82 368.24 236.75 604.99 0 635.06 0" />
        </motion.g>

        {/* Letter group 1: RN characters (between the brackets) */}
        <motion.g
          initial={{ opacity: 0, transform: "translateX(-20)" }}
          animate={
            expanding
              ? { opacity: 1, transform: "translateX(0)" }
              : { opacity: 0, transform: "translateX(-20)" }
          }
          transition={{ duration: 0.6, delay: expanding ? 0.15 : 0, ease: [0.16, 1, 0.3, 1] }}
        >
          <polygon points="299.43 0 87.74 212.44 27.75 212.44 107.98 131.85 50.45 78.29 50.44 49.69 81.87 49.62 138 101.7 239.38 0 299.43 0" />
          <path d="M318.52,0L104.66,212.44h60.33l31.93-31.72h104.48v31.72h42.52V0h-25.4ZM301.4,138.21h-61.67l61.67-61.27v61.27Z" />
          <polygon points="510.76 0 510.76 72.85 451.83 131.78 395.95 76.68 395.95 187.66 353.43 230.18 353.43 0 378.75 0 468.24 88.26 468.24 0 510.76 0" />
        </motion.g>

        {/* Letter group 2: A character */}
        <motion.g
          initial={{ opacity: 0, transform: "translateX(-20)" }}
          animate={
            expanding
              ? { opacity: 1, transform: "translateX(0)" }
              : { opacity: 0, transform: "translateX(-20)" }
          }
          transition={{ duration: 0.6, delay: expanding ? 0.25 : 0, ease: [0.16, 1, 0.3, 1] }}
        >
          <path d="M653.22,38.63l-8.63,7.89v221.32h42.52v-31.72h104.48l31.93,31.72h60.33l-230.63-229.21ZM687.11,193.61v-61.27l61.67,61.27h-61.67Z" />
        </motion.g>

        {/* Letter group 3: M character */}
        <motion.g
          initial={{ opacity: 0, transform: "translateX(-20)" }}
          animate={
            expanding
              ? { opacity: 1, transform: "translateX(0)" }
              : { opacity: 0, transform: "translateX(-20)" }
          }
          transition={{ duration: 0.6, delay: expanding ? 0.35 : 0, ease: [0.16, 1, 0.3, 1] }}
        >
          <polygon points="968.73 41.55 968.73 268.05 926.21 268.05 926.21 110.41 839.62 202.57 700.69 64.49 699.47 41.55 732.44 41.55 838.25 141.94 936.33 41.55 968.73 41.55" />
        </motion.g>

        {/* Letter group 4: E character */}
        <motion.g
          initial={{ opacity: 0, transform: "translateX(-20)" }}
          animate={
            expanding
              ? { opacity: 1, transform: "translateX(0)" }
              : { opacity: 0, transform: "translateX(-20)" }
          }
          transition={{ duration: 0.6, delay: expanding ? 0.45 : 0, ease: [0.16, 1, 0.3, 1] }}
        >
          <polygon points="1265 268.97 1112.85 267.73 987.81 267.73 987.81 41.63 1048.66 41.63 1074.54 84.15 1030.33 84.15 1030.33 118.93 1096.3 118.93 1124.44 161.45 1030.33 161.45 1030.33 225.21 1113.11 225.21 1185.33 225.8 1127.14 138.08 1104.41 103.81 1063.16 41.63 1198.64 41.63 1244.03 84.15 1142.39 84.15 1265 268.97" />
        </motion.g>
      </svg>
    </motion.div>
  );
}

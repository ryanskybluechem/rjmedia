"use client";

import { motion } from "framer-motion";

export default function BuildInLogo({ className = "" }: { className?: string }) {
  const center = 133.41;

  const pieces = [
    {
      points:
        "214.7 0 193.44 21.26 172.18 42.52 42.51 42.52 42.51 172.19 21.26 193.44 0 214.7 0 0 214.7 0",
      initialTransform: "translate(40, 40)",
      delay: 0,
    },
    {
      points:
        "266.82 52.11 266.82 266.82 52.11 266.82 94.63 224.3 224.3 224.3 224.3 94.63 266.82 52.11",
      initialTransform: "translate(-40, -40)",
      delay: 0.15,
    },
    {
      points:
        "266.82 0 266.82 30.06 245.56 51.32 72.58 224.3 51.32 245.56 30.06 266.82 0 266.82 0 236.75 236.75 0 266.82 0",
      initialTransform: `translate(${center * 0.4}, ${center * 0.4}) scale(0.6)`,
      delay: 0.3,
    },
  ];

  return (
    <svg
      viewBox="0 0 266.82 266.82"
      className={className}
      fill="currentColor"
      overflow="visible"
    >
      {pieces.map((piece, i) => (
        <motion.g
          key={i}
          initial={{ opacity: 0, transform: piece.initialTransform }}
          animate={{ opacity: 1, transform: "translate(0, 0) scale(1)" }}
          transition={{
            duration: 0.6,
            delay: piece.delay,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{ transformOrigin: `${center}px ${center}px` }}
        >
          <polygon points={piece.points} />
        </motion.g>
      ))}
    </svg>
  );
}

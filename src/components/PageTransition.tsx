"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, createContext, useContext, useCallback, useRef } from "react";

interface TransitionContextType {
  startTransition: (href: string) => void;
}

export const TransitionContext = createContext<TransitionContextType>({
  startTransition: () => {},
});

export function usePageTransition() {
  return useContext(TransitionContext);
}

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sweeping, setSweeping] = useState(false);
  const nextHrefRef = useRef<string | null>(null);
  const hasNavigatedRef = useRef(false);

  const startTransition = useCallback(
    (href: string) => {
      if (href === pathname || sweeping) return;
      nextHrefRef.current = href;
      hasNavigatedRef.current = false;
      setSweeping(true);
    },
    [pathname, sweeping]
  );

  // Navigate when the line is ~40% across
  useEffect(() => {
    if (!sweeping || hasNavigatedRef.current) return;
    const timer = setTimeout(() => {
      if (nextHrefRef.current) {
        hasNavigatedRef.current = true;
        router.push(nextHrefRef.current);
        nextHrefRef.current = null;
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [sweeping, router]);

  // Reset when new page loads
  useEffect(() => {
    setSweeping(false);
  }, [pathname]);

  return (
    <TransitionContext.Provider value={{ startTransition }}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {children}
      </motion.div>

      {/* Single neon line sweeps right */}
      <AnimatePresence>
        {sweeping && (
          <motion.div
            className="fixed inset-0 z-[200] pointer-events-none"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <motion.div
              className="absolute top-0 h-full w-[3px]"
              initial={{ left: "-3px" }}
              animate={{ left: "100%" }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              style={{
                background: "#39FF14",
                boxShadow:
                  "0 0 15px #39FF14, 0 0 30px #39FF1488, 0 0 60px #39FF1444, 0 0 100px #39FF1422",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </TransitionContext.Provider>
  );
}

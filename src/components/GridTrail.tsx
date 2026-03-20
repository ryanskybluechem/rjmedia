"use client";

import { useEffect, useRef, useCallback } from "react";

const CELL_SIZE = 50;
const NEON_COLOR = { r: 57, g: 255, b: 20 };

export default function GridTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const cellsRef = useRef<Map<string, { opacity: number; targetOpacity: number }>>(new Map());
  const rafRef = useRef<number>(0);
  const touchActiveRef = useRef(false);
  const tapBurstRef = useRef<{ x: number; y: number; time: number } | null>(null);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const cols = Math.ceil(canvas.width / CELL_SIZE) + 1;
    const rows = Math.ceil(canvas.height / CELL_SIZE) + 1;
    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;
    const now = performance.now();

    // Draw base grid
    ctx.strokeStyle = "rgba(255,255,255,0.03)";
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= cols; i++) {
      ctx.beginPath();
      ctx.moveTo(i * CELL_SIZE, 0);
      ctx.lineTo(i * CELL_SIZE, canvas.height);
      ctx.stroke();
    }
    for (let j = 0; j <= rows; j++) {
      ctx.beginPath();
      ctx.moveTo(0, j * CELL_SIZE);
      ctx.lineTo(canvas.width, j * CELL_SIZE);
      ctx.stroke();
    }

    // Pulsate effect while touch is held
    const pulseMultiplier = touchActiveRef.current
      ? 0.7 + 0.3 * Math.sin(now * 0.004)
      : 1;

    // Handle tap burst (quick tap creates a lingering pulse)
    const tapBurst = tapBurstRef.current;
    if (tapBurst) {
      const elapsed = now - tapBurst.time;
      if (elapsed < 600) {
        const burstProgress = elapsed / 600;
        const burstRadius = 80 + burstProgress * 100;
        const burstIntensity = (1 - burstProgress) * 0.8;
        const bx = tapBurst.x;
        const by = tapBurst.y;
        const cellX = Math.floor(bx / CELL_SIZE);
        const cellY = Math.floor(by / CELL_SIZE);
        const cellRadius = Math.ceil(burstRadius / CELL_SIZE);

        for (let i = cellX - cellRadius; i <= cellX + cellRadius; i++) {
          for (let j = cellY - cellRadius; j <= cellY + cellRadius; j++) {
            const cx = i * CELL_SIZE + CELL_SIZE / 2;
            const cy = j * CELL_SIZE + CELL_SIZE / 2;
            const dist = Math.sqrt((bx - cx) ** 2 + (by - cy) ** 2);

            if (dist < burstRadius) {
              const key = `${i}-${j}`;
              const intensity = (1 - dist / burstRadius) * burstIntensity;
              const cell = cellsRef.current.get(key);
              if (cell) {
                cell.targetOpacity = Math.max(cell.targetOpacity, intensity);
              } else {
                cellsRef.current.set(key, { opacity: intensity, targetOpacity: intensity });
              }
            }
          }
        }
      } else {
        tapBurstRef.current = null;
      }
    }

    // Activate cells near mouse/touch
    const radius = touchActiveRef.current ? 150 * pulseMultiplier : 150;
    const intensityBoost = touchActiveRef.current ? 0.8 : 0.6;

    if (mx > -500 && my > -500) {
      const cellX = Math.floor(mx / CELL_SIZE);
      const cellY = Math.floor(my / CELL_SIZE);
      const cellRadius = Math.ceil(radius / CELL_SIZE);

      for (let i = cellX - cellRadius; i <= cellX + cellRadius; i++) {
        for (let j = cellY - cellRadius; j <= cellY + cellRadius; j++) {
          const cx = i * CELL_SIZE + CELL_SIZE / 2;
          const cy = j * CELL_SIZE + CELL_SIZE / 2;
          const dist = Math.sqrt((mx - cx) ** 2 + (my - cy) ** 2);

          if (dist < radius) {
            const key = `${i}-${j}`;
            const intensity = (1 - dist / radius) * intensityBoost;
            const cell = cellsRef.current.get(key);
            if (cell) {
              cell.targetOpacity = Math.max(cell.targetOpacity, intensity);
            } else {
              cellsRef.current.set(key, { opacity: intensity, targetOpacity: intensity });
            }
          }
        }
      }
    }

    // Render and decay cells
    cellsRef.current.forEach((cell, key) => {
      cell.opacity += (cell.targetOpacity - cell.opacity) * 0.15;
      cell.targetOpacity *= 0.96;

      if (cell.opacity < 0.005) {
        cellsRef.current.delete(key);
        return;
      }

      const [i, j] = key.split("-").map(Number);
      const x = i * CELL_SIZE;
      const y = j * CELL_SIZE;

      // Fill
      ctx.fillStyle = `rgba(${NEON_COLOR.r}, ${NEON_COLOR.g}, ${NEON_COLOR.b}, ${cell.opacity * 0.08})`;
      ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);

      // Border glow
      ctx.strokeStyle = `rgba(${NEON_COLOR.r}, ${NEON_COLOR.g}, ${NEON_COLOR.b}, ${cell.opacity * 0.4})`;
      ctx.lineWidth = 1;
      ctx.strokeRect(x, y, CELL_SIZE, CELL_SIZE);

      // Corner dots
      const dotSize = 2 * cell.opacity;
      ctx.fillStyle = `rgba(${NEON_COLOR.r}, ${NEON_COLOR.g}, ${NEON_COLOR.b}, ${cell.opacity * 0.8})`;
      [[x, y], [x + CELL_SIZE, y], [x, y + CELL_SIZE], [x + CELL_SIZE, y + CELL_SIZE]].forEach(([dx, dy]) => {
        ctx.beginPath();
        ctx.arc(dx, dy, dotSize, 0, Math.PI * 2);
        ctx.fill();
      });
    });

    // Glow around mouse/touch
    if (mx > 0 && my > 0) {
      const glowRadius = touchActiveRef.current ? 120 * pulseMultiplier : 120;
      const glowIntensity = touchActiveRef.current ? 0.1 : 0.06;
      const gradient = ctx.createRadialGradient(mx, my, 0, mx, my, glowRadius);
      gradient.addColorStop(0, `rgba(${NEON_COLOR.r}, ${NEON_COLOR.g}, ${NEON_COLOR.b}, ${glowIntensity})`);
      gradient.addColorStop(1, "transparent");
      ctx.fillStyle = gradient;
      ctx.fillRect(mx - glowRadius, my - glowRadius, glowRadius * 2, glowRadius * 2);
    }

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      mouseRef.current = { x: touch.clientX, y: touch.clientY };
      touchActiveRef.current = true;
      // Create a tap burst at this position
      tapBurstRef.current = { x: touch.clientX, y: touch.clientY, time: performance.now() };
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      mouseRef.current = { x: touch.clientX, y: touch.clientY };
    };

    const handleTouchEnd = () => {
      touchActiveRef.current = false;
      mouseRef.current = { x: -1000, y: -1000 };
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouse);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      cancelAnimationFrame(rafRef.current);
    };
  }, [animate]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.7 }}
    />
  );
}

"use client";

import { useEffect, useRef } from "react";

const TRAIL_LENGTH = 60;
const MAX_WIDTH    = 24;
const SATURATION   = 78;

export default function MouseTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const trail: Array<{ x: number; y: number }> = [];
    let hue          = 0;
    let rafId        = 0;
    let lastMoveTime = 0;

    const onMove = (e: MouseEvent) => {
      trail.push({ x: e.clientX, y: e.clientY });
      if (trail.length > TRAIL_LENGTH) trail.shift();
      lastMoveTime = performance.now();
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Drain oldest point each frame once cursor has been idle for 100 ms
      if (trail.length > 0 && performance.now() - lastMoveTime > 100) {
        trail.shift();
      }

      if (trail.length >= 3) {
        ctx.lineCap  = "round";
        ctx.lineJoin = "round";

        // Draw smooth quadratic-bezier segments through midpoints.
        // Each segment gets its own color so the rainbow is continuous.
        for (let i = 0; i < trail.length - 2; i++) {
          const t        = (i + 1) / (trail.length - 1); // 0=tail → 1=head
          const pointHue = (hue + i * (300 / TRAIL_LENGTH)) % 360;
          const color    = `hsl(${pointHue}, ${SATURATION}%, 60%)`;

          // Midpoints for smooth catmull-rom-like curve
          const mx1 = (trail[i].x     + trail[i + 1].x) / 2;
          const my1 = (trail[i].y     + trail[i + 1].y) / 2;
          const mx2 = (trail[i + 1].x + trail[i + 2].x) / 2;
          const my2 = (trail[i + 1].y + trail[i + 2].y) / 2;

          ctx.beginPath();
          ctx.moveTo(mx1, my1);
          ctx.quadraticCurveTo(trail[i + 1].x, trail[i + 1].y, mx2, my2);

          ctx.globalAlpha  = t * 0.88;
          ctx.lineWidth    = Math.max(1, MAX_WIDTH * t);
          ctx.strokeStyle  = color;
          ctx.shadowColor  = color;
          ctx.shadowBlur   = 6;
          ctx.stroke();
        }

        // Reset shadow so it doesn't bleed into other draws
        ctx.shadowBlur  = 0;
        ctx.globalAlpha = 1;
      }

      hue   = (hue + 2) % 360;
      rafId = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("resize",    resize);
    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize",    resize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none hidden md:block"
      style={{ zIndex: 9999 }}
    />
  );
}

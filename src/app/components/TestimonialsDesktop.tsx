"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Testimonial = {
  _id: string;
  name: string;
  quote: string;
  logoSrc: string;
  logoW: number;
  logoH: number;
  desktopRotate: string;
  desktopPos: string;
  desktopBoxW: number;
  desktopBoxH: number;
};

function parseDesktopPos(s: string): { left: number; top: number } {
  const l = s.match(/left-\[(\d+(?:\.\d+)?)px\]/);
  const t = s.match(/top-\[(\d+(?:\.\d+)?)px\]/);
  return { left: l ? parseFloat(l[1]) : 0, top: t ? parseFloat(t[1]) : 0 };
}

function parseRotateDeg(s: string): number {
  const m = s.match(/rotate-\[(\d+(?:\.\d+)?)deg\]/);
  if (!m) return 0;
  return s.startsWith("-") ? -parseFloat(m[1]) : parseFloat(m[1]);
}

// Each card drifts a different distance — alternating up/down for depth
const DRIFT_Y = [-60, 40, -30, 55, -45, 25];

export default function TestimonialsDesktop({ testimonials }: { testimonials: Testimonial[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    const init = () => {
      const cards = gsap.utils.toArray<HTMLElement>(".tcard", section);
      if (!cards.length) return;

      cards.forEach((card, i) => {
        gsap.to(card, {
          y: DRIFT_Y[i % DRIFT_Y.length],
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      });
    };

    // Defer until after paint so ScrollTrigger can measure bounds
    const raf = requestAnimationFrame(init);
    return () => cancelAnimationFrame(raf);
  }, { scope: sectionRef, dependencies: [testimonials.length] });

  return (
    <div ref={sectionRef} className="hidden md:block relative h-[940px]">
      <div className="relative mx-auto h-full w-[1440px]">
        <h2 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-[family-name:var(--font-inter)] font-medium text-[198px] text-black capitalize tracking-[-0.07em] leading-[1.1] pointer-events-none select-none">
          Testimonials
        </h2>
        {testimonials.map((t, i) => {
          const pos = parseDesktopPos(t.desktopPos ?? "");
          const deg = parseRotateDeg(t.desktopRotate ?? "");
          return (
            <div
              key={t._id}
              className="tcard absolute flex items-center justify-center"
              style={{ left: pos.left, top: pos.top, width: t.desktopBoxW, height: t.desktopBoxH }}
            >
              <div className="flex-none" style={{ transform: `rotate(${deg}deg)` }}>
                <div className="w-[353px] bg-[#f1f1f1] border border-[#ddd] rounded-[4px] p-6 flex flex-col gap-4">
                  <img
                    src={t.logoSrc}
                    alt=""
                    aria-hidden="true"
                    style={{ width: t.logoW, height: t.logoH }}
                    className="shrink-0 object-contain object-left"
                  />
                  <p className="font-[family-name:var(--font-inter)] font-normal text-[18px] text-[#1f1f1f] leading-[1.3] tracking-[-0.04em]">
                    {t.quote}
                  </p>
                  <p className="font-[family-name:var(--font-inter)] font-black text-[16px] text-black uppercase tracking-[-0.04em] leading-[1.1] whitespace-nowrap">
                    {t.name}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

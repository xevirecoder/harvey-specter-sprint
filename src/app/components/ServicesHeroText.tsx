"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function ServicesHeroText() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    gsap.fromTo(
      el.querySelectorAll(".sh-line"),
      { opacity: 0, y: 32 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out", delay: 0.15 }
    );
  }, { scope: ref });

  return (
    <div ref={ref} className="flex-1 flex flex-col justify-end pb-12 md:pb-16">
      <div className="flex flex-col gap-6">

        <div className="sh-line flex items-center justify-between">
          <span className="font-[family-name:var(--font-geist-mono)] text-[14px] text-white/60 uppercase leading-[1.1]">
            [ Services ]
          </span>
          <span className="font-[family-name:var(--font-geist-mono)] text-[14px] text-white/40 leading-[1.1]">
            001
          </span>
        </div>

        <div className="sh-line h-px w-full bg-white/20" />

        <h1 className="sh-line font-[family-name:var(--font-inter)] font-medium capitalize tracking-[-0.07em] text-white leading-[0.85] text-[80px] md:text-[13.75vw]">
          What we<br />deliver.
        </h1>

        <div className="sh-line flex items-end justify-between">
          <p className="font-[family-name:var(--font-inter)] font-light italic text-[18px] md:text-[24px] text-white/70 tracking-[-0.04em] leading-[1.2]">
            Full-service creative studio<br className="md:hidden" />
            <span className="hidden md:inline"> · </span>Chicago, IL
          </p>
          <span className="font-[family-name:var(--font-geist-mono)] text-[12px] text-white/40 uppercase leading-[1.4] text-right">
            Branding · Web<br />Photo · Direction
          </span>
        </div>

      </div>
    </div>
  );
}

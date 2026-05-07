"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

type Props = {
  heading: string;
  subheading?: string;
};

export default function ContactHeroText({ heading, subheading }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    gsap.fromTo(
      el.querySelectorAll(".ch-line"),
      { opacity: 0, y: 32 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out", delay: 0.15 }
    );
  }, { scope: ref });

  return (
    <div ref={ref} className="flex-1 flex flex-col justify-end pb-12 md:pb-16">
      <div className="flex flex-col gap-6">

        <div className="ch-line flex items-center justify-between">
          <span className="font-[family-name:var(--font-geist-mono)] text-[14px] text-white/60 uppercase leading-[1.1]">
            [ Contact ]
          </span>
          <span className="font-[family-name:var(--font-geist-mono)] text-[14px] text-white/40 leading-[1.1]">
            001
          </span>
        </div>

        <div className="ch-line h-px w-full bg-white/20" />

        <h1 className="ch-line font-[family-name:var(--font-inter)] font-medium capitalize tracking-[-0.07em] text-white leading-[0.85] text-[72px] md:text-[13.75vw]">
          {heading}
        </h1>

        {subheading && (
          <div className="ch-line flex items-end justify-between">
            <p className="font-[family-name:var(--font-inter)] font-light italic text-[18px] md:text-[24px] text-white/70 tracking-[-0.04em] leading-[1.2]">
              {subheading}
            </p>
          </div>
        )}

      </div>
    </div>
  );
}

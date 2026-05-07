"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Item = { n: string; name: string; desc: string };

export default function AboutExpertise({ items }: { items: Item[] }) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    const rows = gsap.utils.toArray<HTMLElement>(".exp-row", section);
    rows.forEach((row) => {
      const line  = row.querySelector<HTMLElement>(".exp-line");
      const texts = row.querySelectorAll<HTMLElement>(".exp-text");

      gsap
        .timeline({ scrollTrigger: { trigger: row, start: "top 85%", once: true } })
        .fromTo(line, { scaleX: 0, transformOrigin: "left" }, { scaleX: 1, duration: 0.7, ease: "power2.inOut" })
        .fromTo(texts, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.07, ease: "power2.out" }, "-=0.35");
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      data-navbar-dark="true"
      className="bg-black px-4 py-16 md:px-8 md:py-[120px]"
    >
      <div className="flex flex-col gap-12">

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="font-[family-name:var(--font-geist-mono)] text-[14px] text-white uppercase leading-[1.1]">
              [ Expertise ]
            </span>
            <span className="font-[family-name:var(--font-geist-mono)] text-[14px] text-white leading-[1.1]">
              004
            </span>
          </div>
        </div>

        <div className="flex flex-col">
          {items.map(({ n, name, desc }) => (
            <div key={n} className="exp-row">
              <div className="exp-line h-px w-full bg-white/20" />
              <div className="flex flex-col gap-3 py-6 md:flex-row md:items-start md:gap-0 md:py-8">
                <span className="exp-text font-[family-name:var(--font-geist-mono)] text-[14px] text-white/40 leading-[1.1] shrink-0 md:w-[72px]">
                  {n}
                </span>
                <p className="exp-text font-[family-name:var(--font-inter)] font-bold italic text-[24px] md:text-[36px] text-white uppercase tracking-[-0.04em] leading-[1.1] shrink-0 md:w-[420px]">
                  {name}
                </p>
                <p className="exp-text font-[family-name:var(--font-inter)] text-[14px] text-white/60 leading-[1.6] tracking-[-0.02em] md:max-w-[393px] md:ml-auto md:pt-2">
                  {desc}
                </p>
              </div>
            </div>
          ))}
          <div className="h-px w-full bg-white/20" />
        </div>

      </div>
    </section>
  );
}

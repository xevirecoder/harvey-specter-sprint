"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const steps = [
  {
    n: "01",
    name: "Discovery",
    desc: "We start by listening. Deep-dive sessions uncover your brand story, audience, and objectives — giving the work a solid strategic foundation before a single pixel is placed.",
  },
  {
    n: "02",
    name: "Concept",
    desc: "Ideas are explored, challenged, and refined. We present focused creative directions — never a wall of options — so decisions stay sharp and momentum is maintained.",
  },
  {
    n: "03",
    name: "Execution",
    desc: "Design, photography, and development happen in tight collaboration. You get transparent progress at every milestone, with room to steer before anything is locked.",
  },
  {
    n: "04",
    name: "Delivery",
    desc: "Final assets are packaged for every format you need, with documentation that lets your team run independently. We stay available for the weeks after launch.",
  },
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    const rows = gsap.utils.toArray<HTMLElement>(".proc-row", section);
    rows.forEach((row) => {
      const line  = row.querySelector<HTMLElement>(".proc-line");
      const texts = row.querySelectorAll<HTMLElement>(".proc-text");

      gsap
        .timeline({ scrollTrigger: { trigger: row, start: "top 85%", once: true } })
        .fromTo(line,  { scaleX: 0, transformOrigin: "left" }, { scaleX: 1, duration: 0.7, ease: "power2.inOut" })
        .fromTo(texts, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.07, ease: "power2.out" }, "-=0.35");
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="bg-white px-4 py-16 md:px-8 md:py-[120px]"
    >
      <div className="flex flex-col gap-12">

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">
              [ Process ]
            </span>
            <span className="font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] leading-[1.1]">
              003
            </span>
          </div>
        </div>

        <div className="flex flex-col">
          {steps.map(({ n, name, desc }) => (
            <div key={n} className="proc-row">
              <div className="proc-line h-px w-full bg-[#1f1f1f]/20" />
              <div className="flex flex-col gap-3 py-6 md:flex-row md:items-start md:gap-0 md:py-8">
                <span className="proc-text font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f]/40 leading-[1.1] shrink-0 md:w-[72px]">
                  {n}
                </span>
                <p className="proc-text font-[family-name:var(--font-inter)] font-bold italic text-[24px] md:text-[36px] text-black uppercase tracking-[-0.04em] leading-[1.1] shrink-0 md:w-[420px]">
                  {name}
                </p>
                <p className="proc-text font-[family-name:var(--font-inter)] text-[14px] text-[#1f1f1f] leading-[1.6] tracking-[-0.02em] md:max-w-[393px] md:ml-auto md:pt-2">
                  {desc}
                </p>
              </div>
            </div>
          ))}
          <div className="h-px w-full bg-[#1f1f1f]/20" />
        </div>

      </div>
    </section>
  );
}

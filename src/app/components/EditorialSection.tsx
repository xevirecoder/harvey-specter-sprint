"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const line =
  "font-[family-name:var(--font-inter)] font-light text-[32px] md:text-[6.67vw] text-black uppercase tracking-[-0.08em] leading-[0.84] whitespace-nowrap";

function W({ children }: { children: React.ReactNode }) {
  return <span className="word opacity-[0.15]">{children}</span>;
}

export default function EditorialSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const words = gsap.utils.toArray<HTMLElement>(".word", sectionRef.current);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top center",
        end: "bottom center",
        scrub: true,
      },
    });

    tl.to(words, {
      opacity: 1,
      ease: "none",
      duration: 0.5,
      stagger: 0.5,
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="bg-white px-4 py-12 md:px-8 md:py-[120px]">
      <div className="flex flex-col gap-6 w-full">

        {/* [ 8+ years in industry ] + hairline */}
        <div className="flex flex-col gap-3 items-end w-full">
          <p className="font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] text-right uppercase leading-[1.1]">
            <W>[ 8+ years in industry ]</W>
          </p>
          <div className="h-px w-full bg-[#1f1f1f]" />
        </div>

        {/* Staircase typography */}
        <div className="flex flex-col gap-2 items-center md:items-start">

          {/* Line 1 */}
          <div className="flex flex-col-reverse items-center gap-3 md:flex-row md:items-start">
            <p className={`${line} whitespace-pre`}>
              <W>A</W>{" "}<W>creative</W>{" "}<W>director</W>{"   "}<W>/</W>
            </p>
            <span className="font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] leading-[1.1]">
              <W>001</W>
            </span>
          </div>

          {/* Line 2 */}
          <p className={`${line} md:w-full md:pl-[15.55%]`}>
            <W>Photographer</W>
          </p>

          {/* Line 3 */}
          <p className={`${line} md:w-full md:pl-[44.3%]`}>
            <W>Born</W>{" "}
            <W><span className="font-[family-name:var(--font-playfair)] italic">{"&"}</span></W>{" "}
            <W>raised</W>
          </p>

          {/* Line 4 */}
          <p className={line}>
            <W>on</W>{" "}<W>the</W>{" "}<W>south</W>{" "}<W>side</W>
          </p>

          {/* Line 5 */}
          <div className="flex flex-col items-center gap-3 md:block md:w-full">
            <p className={`${line} md:pl-[44%]`}>
              <W>of</W>{" "}<W>chicago.</W>{" "}
              <span className="hidden md:inline font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] tracking-normal leading-[1.1] whitespace-nowrap relative top-[26px]">
                <W>[ creative freelancer ]</W>
              </span>
            </p>
            <span className="md:hidden font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] uppercase leading-[1.1] whitespace-nowrap">
              <W>[ creative freelancer ]</W>
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}

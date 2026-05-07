"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Props = {
  nextSlug: string;
  nextTitle: string;
  nextImageUrl: string | null;
};

export default function ProjectNextNav({ nextSlug, nextTitle, nextImageUrl }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef     = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.fromTo(
      section.querySelectorAll(".pnn-in"),
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0, duration: 0.65, stagger: 0.08, ease: "power2.out",
        scrollTrigger: { trigger: section, start: "top 80%", once: true },
      }
    );
  }, { scope: sectionRef });

  const onEnter = () => gsap.to(imgRef.current, { scale: 1.06, duration: 0.7, ease: "power2.out" });
  const onLeave = () => gsap.to(imgRef.current, { scale: 1,    duration: 0.7, ease: "power2.out" });

  return (
    <section ref={sectionRef} className="bg-[#f3f3f3] px-4 py-16 md:px-8 md:py-[120px]">
      <div className="flex flex-col gap-8">

        <div className="flex flex-col gap-3">
          <div className="pnn-in flex items-center justify-between">
            <span className="font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f]/60 uppercase leading-[1.1]">
              [ Next Project ]
            </span>
          </div>
          <div className="pnn-in h-px w-full bg-[#1f1f1f]/20" />
        </div>

        <a
          href={`/projects/${nextSlug}`}
          className="group flex flex-col gap-4 md:flex-row md:items-center md:gap-10"
          onMouseEnter={onEnter}
          onMouseLeave={onLeave}
        >
          {nextImageUrl && (
            <div className="pnn-in relative w-full md:w-[320px] aspect-[4/3] overflow-hidden shrink-0">
              <img
                ref={imgRef}
                src={nextImageUrl}
                alt={nextTitle}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          )}

          <div className="pnn-in flex flex-1 items-center justify-between gap-4">
            <p className="font-[family-name:var(--font-inter)] font-medium text-[32px] md:text-[5vw] text-black uppercase tracking-[-0.05em] leading-[0.9]">
              {nextTitle}
            </p>
            <svg className="shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" width="40" height="40" viewBox="0 0 32 32" fill="none">
              <path d="M9 23L23 9M23 9H12M23 9V20" stroke="#1f1f1f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </a>

      </div>
    </section>
  );
}

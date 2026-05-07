"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

type Props = {
  title: string;
  tags: string[];
  year: number | null;
  client: string | null;
  imageUrl: string | null;
};

export default function ProjectDetailHero({ title, tags, year, client, imageUrl }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;

    gsap.fromTo(
      el.querySelectorAll(".pdh-in"),
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 0.85, stagger: 0.09, ease: "power2.out", delay: 0.1 }
    );
    gsap.fromTo(
      el.querySelector(".pdh-img"),
      { scale: 1.08 },
      { scale: 1, duration: 1.4, ease: "power2.out" }
    );
  }, { scope: ref });

  return (
    <div ref={ref} className="relative min-h-[100svh] flex flex-col">
      {/* Background image */}
      {imageUrl && (
        <div className="pdh-img absolute inset-0 overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/55" />
        </div>
      )}
      {!imageUrl && <div className="absolute inset-0 bg-black" />}

      {/* Top meta row */}
      <div className="relative z-10 flex items-center justify-between px-4 pt-6 pb-0 md:px-8 md:pt-8">
        <div className="pdh-in flex gap-2 flex-wrap">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/30 px-3 py-1 font-[family-name:var(--font-inter)] font-medium text-[12px] text-white/80 tracking-[-0.02em]"
            >
              {tag}
            </span>
          ))}
        </div>
        {(year || client) && (
          <div className="pdh-in flex items-center gap-4">
            {client && (
              <span className="font-[family-name:var(--font-geist-mono)] text-[12px] text-white/50 uppercase leading-[1.1]">
                {client}
              </span>
            )}
            {year && (
              <span className="font-[family-name:var(--font-geist-mono)] text-[12px] text-white/50 leading-[1.1]">
                {year}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Bottom title */}
      <div className="relative z-10 mt-auto px-4 pb-12 md:px-8 md:pb-16">
        <div className="pdh-in h-px w-full bg-white/20 mb-6" />
        <h1 className="pdh-in font-[family-name:var(--font-inter)] font-medium capitalize tracking-[-0.06em] text-white leading-[0.87] text-[64px] md:text-[10.5vw]">
          {title}
        </h1>
      </div>
    </div>
  );
}

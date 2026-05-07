"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

type Props = {
  title: string;
  publishedAt: string | null;
  imageUrl: string;
};

function formatDate(raw: string | null) {
  if (!raw) return null;
  return new Date(raw).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function NewsArticleHero({ title, publishedAt, imageUrl }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    gsap.fromTo(
      el.querySelectorAll(".nah-in"),
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 0.85, stagger: 0.09, ease: "power2.out", delay: 0.1 }
    );
    gsap.fromTo(
      el.querySelector(".nah-img"),
      { scale: 1.08 },
      { scale: 1, duration: 1.4, ease: "power2.out" }
    );
  }, { scope: ref });

  return (
    <div ref={ref} className="relative min-h-[100svh] flex flex-col">
      {/* Background image */}
      <div className="nah-img absolute inset-0 overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Top meta */}
      <div className="relative z-10 px-4 pt-6 md:px-8 md:pt-8">
        {publishedAt && (
          <span className="nah-in font-[family-name:var(--font-geist-mono)] text-[12px] text-white/50 uppercase leading-[1.1]">
            {formatDate(publishedAt)}
          </span>
        )}
      </div>

      {/* Bottom title */}
      <div className="relative z-10 mt-auto px-4 pb-12 md:px-8 md:pb-16">
        <div className="nah-in h-px w-full bg-white/20 mb-6" />
        <h1 className="nah-in font-[family-name:var(--font-inter)] font-medium capitalize tracking-[-0.06em] text-white leading-[0.87] text-[48px] md:text-[7.5vw]">
          {title}
        </h1>
      </div>
    </div>
  );
}

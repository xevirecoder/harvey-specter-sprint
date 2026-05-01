"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function AboutBioBox() {
  const boxRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      gsap.to(boxRef.current, {
        x: -120,
        ease: "none",
        scrollTrigger: {
          trigger: boxRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });
  }, { scope: boxRef });

  return (
    <div ref={boxRef} className="flex items-stretch gap-3 md:max-w-[300px]">
      <div className="flex flex-col justify-between shrink-0">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M16 0H0V16" stroke="#1f1f1f"/></svg>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M16 16H0V0" stroke="#1f1f1f"/></svg>
      </div>
      <p className="flex-1 font-[family-name:var(--font-inter)] text-[14px] text-[#1f1f1f] leading-[1.3] tracking-[-0.04em] py-3">
        Placeholder paragraph one. This is where you introduce yourself — your background, your passion for your craft, and what drives you creatively. Two to three sentences work best here. Placeholder paragraph two. Here you can describe your technical approach, how you collaborate with clients, or what sets your work apart from others in your field.
      </p>
      <div className="flex flex-col justify-between shrink-0">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M0 0H16V16" stroke="#1f1f1f"/></svg>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M0 16H16V0" stroke="#1f1f1f"/></svg>
      </div>
    </div>
  );
}

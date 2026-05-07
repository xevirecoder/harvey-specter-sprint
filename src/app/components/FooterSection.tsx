"use client";

import { useRef, useEffect } from "react";
import MagneticButton from "./MagneticButton";

export default function FooterSection() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const observer = new ResizeObserver(([entry]) => {
      document.documentElement.style.setProperty(
        "--footer-height",
        `${entry.contentRect.height}px`
      );
    });
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <footer
      ref={footerRef}
      data-navbar-dark="true"
      className="fixed bottom-0 left-0 right-0 z-0 bg-black px-4 pt-12 md:px-8 overflow-hidden"
    >
      {/* Top: CTA + socials + divider */}
      <div className="flex flex-col gap-6 mb-12 md:gap-12 md:mb-[120px]">

        {/* CTA + social links row */}
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">

          {/* "Have a PROJECT in mind?" + button */}
          <div className="flex flex-col gap-3 md:w-[298px]">
            <p className="font-[family-name:var(--font-inter)] font-light italic text-[24px] text-white uppercase tracking-[-0.04em] leading-[1.1]">
              Have a{" "}
              <span className="font-black not-italic">project</span>
              {" "}in mind?
            </p>
            <MagneticButton className="self-start border border-white rounded-[24px] px-4 py-3 font-[family-name:var(--font-inter)] font-medium text-[14px] text-white tracking-[-0.04em]">
              Let&apos;s talk
            </MagneticButton>
          </div>

          {/* Socials — mobile: stacked list */}
          <div className="flex flex-col gap-4 md:hidden">
            {["Facebook", "Instagram", "X.com", "LinkedIn"].map((name) => (
              <p key={name} className="font-[family-name:var(--font-inter)] text-[18px] text-white uppercase tracking-[-0.04em] leading-[1.1]">
                {name}
              </p>
            ))}
          </div>

          {/* Socials — desktop: centre column */}
          <p className="hidden md:block font-[family-name:var(--font-inter)] text-[18px] text-white uppercase tracking-[-0.04em] leading-[1.1] text-center w-[298px]">
            Facebook<br />Instagram
          </p>

          {/* Socials — desktop: right column */}
          <p className="hidden md:block font-[family-name:var(--font-inter)] text-[18px] text-white uppercase tracking-[-0.04em] leading-[1.1] text-right w-[298px]">
            X.com<br />LinkedIn
          </p>
        </div>

        {/* Horizontal rule */}
        <div className="h-px w-full bg-white" />
      </div>

      {/* Desktop */}
      <div className="hidden md:flex items-end justify-between">
        <div className="relative overflow-hidden h-[219px] flex-1 max-w-[1093px]">
          <p className="absolute left-1/2 top-[calc(50%+6px)] -translate-x-1/2 -translate-y-1/2 capitalize font-[family-name:var(--font-inter)] font-semibold text-[290px] text-white tracking-[-0.06em] leading-[0.8] whitespace-nowrap">
            H.Studio
          </p>
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[160px] w-[15px] flex items-center justify-center">
            <p className="-rotate-90 font-[family-name:var(--font-geist-mono)] text-[14px] text-white uppercase leading-[1.1] whitespace-nowrap">
              [ Coded By Claude ]
            </p>
          </div>
        </div>
        <div className="flex gap-[34px] items-center pb-8 shrink-0">
          <span className="font-[family-name:var(--font-inter)] text-[12px] text-white uppercase tracking-[-0.04em] underline leading-[1.1]">licences</span>
          <span className="font-[family-name:var(--font-inter)] text-[12px] text-white uppercase tracking-[-0.04em] underline leading-[1.1]">Privacy policy</span>
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden flex flex-col gap-4 items-center">
        <div className="flex gap-[34px] items-center">
          <span className="font-[family-name:var(--font-inter)] text-[12px] text-white uppercase tracking-[-0.04em] underline leading-[1.1]">licences</span>
          <span className="font-[family-name:var(--font-inter)] text-[12px] text-white uppercase tracking-[-0.04em] underline leading-[1.1]">Privacy policy</span>
        </div>
        <div className="w-full flex flex-col gap-3 overflow-hidden">
          <p className="font-[family-name:var(--font-geist-mono)] text-[10px] text-white uppercase leading-[1.1]">[ Coded By Claude ]</p>
          <p className="capitalize font-[family-name:var(--font-inter)] font-semibold text-[91px] text-white tracking-[-0.06em] leading-[0.8]">H.Studio</p>
        </div>
      </div>
    </footer>
  );
}

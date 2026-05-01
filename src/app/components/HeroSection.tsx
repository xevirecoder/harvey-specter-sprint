"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import HeroNav from "./HeroNav";
import MagneticButton from "./MagneticButton";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function HeroSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const imgRef      = useRef<HTMLImageElement>(null);
  const helloRef    = useRef<HTMLSpanElement>(null);
  const harveyRef   = useRef<HTMLSpanElement>(null);
  const specterRef  = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    const trigger = {
      trigger: section,
      start: "top top",
      end: "bottom top",
      scrub: 1,
      invalidateOnRefresh: true,
    };

    gsap.to(imgRef.current, {
      scale: 1.15,
      ease: "none",
      scrollTrigger: trigger,
    });

    gsap.to([helloRef.current, harveyRef.current], {
      x: () => -window.innerWidth,
      ease: "none",
      scrollTrigger: { ...trigger },
    });

    gsap.to(specterRef.current, {
      x: () => window.innerWidth,
      ease: "none",
      scrollTrigger: { ...trigger },
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative h-[847px] overflow-hidden bg-neutral-300">
      {/* Background photo */}
      <img
        ref={imgRef}
        src="/pexels-vazhnik-7562188 2.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-[50%_20%]"
      />

      {/* Frosted-glass overlay */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-[349px] bg-[rgba(217,217,217,0.01)] backdrop-blur-[10px]"
        style={{
          WebkitMaskImage: "linear-gradient(to bottom, transparent, black 45%)",
          maskImage: "linear-gradient(to bottom, transparent, black 45%)",
        }}
      />

      {/* Foreground layout */}
      <div className="relative flex h-full flex-col px-4 md:px-8 justify-between pb-6 md:pb-0 md:justify-start md:gap-[240px]">
        <HeroNav />

        {/* Hero text */}
        <div className="flex w-full shrink-0 flex-col h-[341px] justify-between md:h-auto md:justify-start">
          <div className="flex w-full flex-col items-center md:items-start">
            <span
              ref={helloRef}
              className="mb-[-15px] px-[18px] font-[family-name:var(--font-geist-mono)] text-[14px] uppercase leading-[1.1] text-white opacity-70 mix-blend-overlay inline-block"
            >
              [ Hello I&apos;m ]
            </span>
            <h1 className="mb-[-15px] w-full text-center font-[family-name:var(--font-inter)] font-medium capitalize tracking-[-0.07em] text-white mix-blend-overlay whitespace-pre-wrap leading-[0.8] text-[96px] md:text-[13.75vw] md:leading-[1.1] md:whitespace-pre">
              <span ref={harveyRef} className="inline-block">Harvey</span>
              {"   "}
              <span ref={specterRef} className="inline-block">Specter</span>
            </h1>
          </div>

          {/* Blurb */}
          <div className="flex w-full justify-center md:justify-end mt-[15px]">
            <div className="flex w-[294px] flex-col gap-[17px]">
              <p className="font-[family-name:var(--font-inter)] font-bold italic text-sm uppercase leading-[1.1] tracking-[-0.04em] text-[#1f1f1f]">
                H.Studio is a{" "}
                <span className="font-normal">full-service</span>{" "}
                creative studio creating beautiful digital experiences and
                products. We are an{" "}
                <span className="font-normal">award winning</span>{" "}
                design and art group specializing in branding, web design and
                engineering.
              </p>
              <MagneticButton className="self-start rounded-full bg-black px-4 py-3 font-[family-name:var(--font-inter)] font-medium text-sm text-white tracking-[-0.04em]">
                Let&apos;s talk
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

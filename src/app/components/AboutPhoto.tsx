"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function AboutPhoto({ src }: { src: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef   = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.to(overlayRef.current, {
      scaleX: 0,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
        end: "top 15%",
        scrub: 1,
      },
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative w-full md:w-[436px]">
      <img
        src={src}
        alt="Portrait"
        className="block w-full aspect-[436/614] object-cover"
      />
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black origin-right"
      />
    </div>
  );
}

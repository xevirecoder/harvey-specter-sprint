"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function PhotoBreakSection({ src }: { src: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef     = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    gsap.to(imgRef.current, {
      filter: "blur(0px)",
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "center center",
        scrub: true,
      },
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      data-navbar-dark="true"
      className="relative h-[565px] md:h-[900px] overflow-hidden"
    >
      <img
        ref={imgRef}
        src={src}
        alt=""
        aria-hidden="true"
        style={{ filter: "blur(20px)" }}
        className="absolute inset-0 h-full w-full object-cover object-[62%_center] md:object-[50%_30%]"
      />
    </section>
  );
}

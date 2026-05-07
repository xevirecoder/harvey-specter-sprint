"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function AboutStory({ src }: { src: string }) {
  const sectionRef  = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef  = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Photo reveal — same pattern as AboutPhoto on home
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

    // Text stagger in
    gsap.fromTo(
      section.querySelectorAll(".story-line"),
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.65,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: { trigger: section, start: "top 80%", once: true },
      }
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="story" className="bg-white px-4 py-16 md:px-8 md:py-[120px]">
      <div className="flex flex-col gap-12 md:gap-16">

        {/* Label */}
        <div className="flex flex-col gap-3">
          <div className="story-line flex items-center justify-between">
            <span className="font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">
              [ The Story ]
            </span>
            <span className="font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] leading-[1.1]">
              002
            </span>
          </div>
          <div className="story-line h-px w-full bg-[#1f1f1f]" />
        </div>

        {/* Photo + bio */}
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:gap-12 md:justify-between">

          {/* Photo with reveal overlay */}
          <div ref={containerRef} className="relative w-full md:w-[436px] shrink-0">
            <img
              src={src}
              alt="Portrait"
              className="block w-full aspect-[436/614] object-cover"
            />
            <div ref={overlayRef} className="absolute inset-0 bg-black origin-right" />
          </div>

          {/* Text */}
          <div className="flex flex-col gap-8 flex-1 md:pt-4 md:max-w-[520px]">
            <h2 className="story-line font-[family-name:var(--font-inter)] font-light text-[32px] md:text-[48px] text-black uppercase tracking-[-0.08em] leading-[0.86]">
              Born &amp; raised<br />on the south<br />side of Chicago.
            </h2>
            <div className="flex flex-col gap-5">
              <p className="story-line font-[family-name:var(--font-inter)] text-[14px] text-[#1f1f1f] leading-[1.6] tracking-[-0.02em]">
                Placeholder paragraph one. This is where you introduce yourself — your background, your
                passion for your craft, and what drives you creatively. Two to three sentences work best
                here, giving readers a clear sense of who you are and where you come from.
              </p>
              <p className="story-line font-[family-name:var(--font-inter)] text-[14px] text-[#1f1f1f] leading-[1.6] tracking-[-0.02em]">
                Placeholder paragraph two. Here you can describe your technical approach, how you
                collaborate with clients, or what sets your work apart from others in your field.
                Focus on what makes your perspective unique.
              </p>
              <p className="story-line font-[family-name:var(--font-inter)] text-[14px] text-[#1f1f1f] leading-[1.6] tracking-[-0.02em]">
                Placeholder paragraph three. This is a great place to talk about your values, your
                process, or a specific milestone that shaped your career. Keep it personal and authentic.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

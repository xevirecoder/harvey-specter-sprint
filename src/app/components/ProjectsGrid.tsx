"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type PortfolioItem = {
  _id: string;
  title: string;
  slug: string;
  tags: string[];
  imageUrl: string | null;
  year: string | null;
};

function ProjectCard({ item, index }: { item: PortfolioItem; index: number }) {
  const imgRef = useRef<HTMLImageElement>(null);

  const onEnter = () => gsap.to(imgRef.current, { scale: 1.06, duration: 0.6, ease: "power2.out" });
  const onLeave = () => gsap.to(imgRef.current, { scale: 1,    duration: 0.6, ease: "power2.out" });

  return (
    <a href={`/projects/${item.slug}`} className="pg-card flex flex-col gap-[10px] group">
      <div
        className="relative overflow-hidden aspect-[4/3] md:aspect-[3/2]"
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
      >
        {item.imageUrl ? (
          <img
            ref={imgRef}
            src={item.imageUrl}
            alt={item.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-[#e8e8e8]" />
        )}

        {/* Tags */}
        <div className="absolute bottom-4 left-4 flex gap-2 flex-wrap">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="backdrop-blur-[10px] bg-[rgba(255,255,255,0.3)] px-2 py-1 rounded-[24px] font-[family-name:var(--font-inter)] font-medium text-[12px] text-[#111] tracking-[-0.03em]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Index badge */}
        <span className="absolute top-4 left-4 font-[family-name:var(--font-geist-mono)] text-[11px] text-white/60 leading-[1]">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="flex items-center justify-between gap-4">
        <p className="font-[family-name:var(--font-inter)] font-black text-[20px] md:text-[24px] text-black uppercase tracking-[-0.04em] leading-[1.1]">
          {item.title}
        </p>
        <div className="flex items-center gap-3 shrink-0">
          {item.year && (
            <span className="font-[family-name:var(--font-geist-mono)] text-[11px] text-[#1f1f1f]/40 leading-[1]">
              {item.year}
            </span>
          )}
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
            <path
              d="M9 23L23 9M23 9H12M23 9V20"
              stroke="#1f1f1f"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </a>
  );
}

export default function ProjectsGrid({ projects }: { projects: PortfolioItem[] }) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Header elements
    gsap.fromTo(
      section.querySelectorAll(".pg-header"),
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0, duration: 0.65, stagger: 0.08, ease: "power2.out",
        scrollTrigger: { trigger: section, start: "top 80%", once: true },
      }
    );

    // Cards — stagger in pairs (desktop grid is 2-col)
    const cards = gsap.utils.toArray<HTMLElement>(".pg-card", section);
    cards.forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: "power2.out",
          delay: (i % 2) * 0.12,
          scrollTrigger: { trigger: card, start: "top 88%", once: true },
        }
      );
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="bg-white px-4 py-16 md:px-8 md:py-[120px]">
      <div className="flex flex-col gap-12">

        {/* Section header */}
        <div className="flex flex-col gap-3">
          <div className="pg-header flex items-center justify-between">
            <span className="font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">
              [ All Projects ]
            </span>
            <span className="font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] leading-[1.1]">
              002
            </span>
          </div>
          <div className="pg-header h-px w-full bg-[#1f1f1f]" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2 md:gap-y-16">
          {projects.map((project, i) => (
            <ProjectCard key={project._id} item={project} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}

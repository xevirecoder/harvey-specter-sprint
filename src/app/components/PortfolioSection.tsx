"use client";

import { useRef } from "react";
import gsap from "gsap";
import MagneticButton from "./MagneticButton";

type PortfolioItem = {
  _id: string;
  title: string;
  slug: string | null;
  tags: string[];
  imageUrl: string | null;
  desktopCardHeight: number;
};

function PortfolioCard({
  imageUrl,
  alt,
  height,
  tags,
  title,
  titleSize = "text-[36px]",
}: {
  imageUrl: string;
  alt: string;
  height: number | string;
  tags: string[];
  title: string;
  titleSize?: string;
}) {
  const imgRef = useRef<HTMLImageElement>(null);

  const onEnter = () => gsap.to(imgRef.current, { scale: 1.06, duration: 0.6, ease: "power2.out" });
  const onLeave = () => gsap.to(imgRef.current, { scale: 1,    duration: 0.6, ease: "power2.out" });

  return (
    <div className="flex flex-col gap-[10px]">
      <div
        className="relative overflow-hidden"
        style={{ height }}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
      >
        <img
          ref={imgRef}
          src={imageUrl}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute bottom-4 left-4 flex gap-3">
          {tags.map((tag) => (
            <span
              key={tag}
              className="backdrop-blur-[10px] bg-[rgba(255,255,255,0.3)] px-2 py-1 rounded-[24px] font-[family-name:var(--font-inter)] font-medium text-[14px] text-[#111] tracking-[-0.04em]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <p
          className={`font-[family-name:var(--font-inter)] font-black ${titleSize} text-black uppercase tracking-[-0.04em] leading-[1.1] whitespace-nowrap`}
        >
          {title}
        </p>
        <svg className="shrink-0" width="32" height="32" viewBox="0 0 32 32" fill="none">
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
  );
}

export default function PortfolioSection({ projects: p }: { projects: PortfolioItem[] }) {
  return (
    <section id="portfolio" className="bg-white px-4 py-12 md:px-8 md:py-20">

      {/* Mobile header */}
      <div className="md:hidden flex flex-col gap-4 mb-8">
        <p className="font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">
          [ portfolio ]
        </p>
        <div className="flex items-start justify-between">
          <h2 className="font-[family-name:var(--font-inter)] font-light text-[32px] text-black uppercase tracking-[-0.08em] leading-[0.86]">
            Selected<br />Work
          </h2>
          <span className="font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] leading-[1.1]">004</span>
        </div>
      </div>

      {/* Desktop header */}
      <div className="hidden md:flex items-start justify-between mb-[61px]">
        <div className="flex items-start gap-[10px]">
          <h2 className="font-[family-name:var(--font-inter)] font-light text-[96px] text-black uppercase tracking-[-0.08em] leading-[0.86]">
            Selected<br />Work
          </h2>
          <span className="font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] leading-[1.1]">004</span>
        </div>
        <div className="h-[110px] flex items-center justify-center w-[15px]">
          <span className="-rotate-90 font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] uppercase leading-[1.1] whitespace-nowrap">
            [ portfolio ]
          </span>
        </div>
      </div>

      {/* Mobile: stacked cards */}
      <div className="md:hidden flex flex-col gap-6">
        {p.map((project) => (
          <a key={project._id} href={project.slug ? `/projects/${project.slug}` : undefined}>
            <PortfolioCard
              imageUrl={project.imageUrl ?? ""}
              alt={project.title}
              height={390}
              tags={project.tags}
              title={project.title}
              titleSize="text-[24px]"
            />
          </a>
        ))}

        {/* Mobile CTA */}
        <div className="flex gap-3 items-stretch">
          <div className="flex flex-col justify-between shrink-0">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M16 0H0V16" stroke="#1f1f1f"/></svg>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M16 16H0V0" stroke="#1f1f1f"/></svg>
          </div>
          <div className="flex-1 flex flex-col gap-[10px] py-3">
            <p className="font-[family-name:var(--font-inter)] italic text-[14px] text-[#1f1f1f] leading-[1.3] tracking-[-0.04em]">
              Discover how my creativity transforms ideas into impactful digital experiences — schedule a call with me to get started.
            </p>
            <MagneticButton className="self-start rounded-[24px] bg-black px-4 py-3 font-[family-name:var(--font-inter)] font-medium text-[14px] text-white tracking-[-0.04em]">
              Let&apos;s talk
            </MagneticButton>
          </div>
          <div className="flex flex-col justify-between shrink-0">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M0 0H16V16" stroke="#1f1f1f"/></svg>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M0 16H16V0" stroke="#1f1f1f"/></svg>
          </div>
        </div>
      </div>

      {/* Desktop: two-column masonry */}
      <div className="hidden md:flex gap-6 items-end">

        {/* Left column */}
        <div className="flex-1 self-stretch flex flex-col justify-between min-w-0">
          <a href={p[0]?.slug ? `/projects/${p[0].slug}` : undefined}>
            <PortfolioCard
              imageUrl={p[0]?.imageUrl ?? ""}
              alt={p[0]?.title ?? ""}
              height={p[0]?.desktopCardHeight ?? 744}
              tags={p[0]?.tags ?? []}
              title={p[0]?.title ?? ""}
            />
          </a>
          <a href={p[1]?.slug ? `/projects/${p[1].slug}` : undefined}>
            <PortfolioCard
              imageUrl={p[1]?.imageUrl ?? ""}
              alt={p[1]?.title ?? ""}
              height={p[1]?.desktopCardHeight ?? 699}
              tags={p[1]?.tags ?? []}
              title={p[1]?.title ?? ""}
            />
          </a>

          {/* Desktop CTA */}
          <div className="flex gap-3 items-stretch w-[465px]">
            <div className="flex flex-col justify-between shrink-0">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M16 0H0V16" stroke="#1f1f1f"/></svg>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M16 16H0V0" stroke="#1f1f1f"/></svg>
            </div>
            <div className="flex-1 flex flex-col gap-[10px] py-3">
              <p className="font-[family-name:var(--font-inter)] italic text-[14px] text-[#1f1f1f] leading-[1.3] tracking-[-0.04em]">
                Discover how my creativity transforms ideas into impactful digital experiences — schedule a call with me to get started.
              </p>
              <MagneticButton className="self-start rounded-[24px] bg-black px-4 py-3 font-[family-name:var(--font-inter)] font-medium text-[14px] text-white tracking-[-0.04em]">
                Let&apos;s talk
              </MagneticButton>
            </div>
            <div className="flex flex-col justify-between shrink-0">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M0 0H16V16" stroke="#1f1f1f"/></svg>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M0 16H16V0" stroke="#1f1f1f"/></svg>
            </div>
          </div>
        </div>

        {/* Right column — offset top by 240px */}
        <div className="flex-1 flex flex-col gap-[117px] pt-[240px] min-w-0">
          <a href={p[2]?.slug ? `/projects/${p[2].slug}` : undefined}>
            <PortfolioCard
              imageUrl={p[2]?.imageUrl ?? ""}
              alt={p[2]?.title ?? ""}
              height={p[2]?.desktopCardHeight ?? 699}
              tags={p[2]?.tags ?? []}
              title={p[2]?.title ?? ""}
            />
          </a>
          <a href={p[3]?.slug ? `/projects/${p[3].slug}` : undefined}>
            <PortfolioCard
              imageUrl={p[3]?.imageUrl ?? ""}
              alt={p[3]?.title ?? ""}
              height={p[3]?.desktopCardHeight ?? 744}
              tags={p[3]?.tags ?? []}
              title={p[3]?.title ?? ""}
            />
          </a>
        </div>
      </div>

    </section>
  );
}

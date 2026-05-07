"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type ServiceItem = {
  _id: string;
  name: string;
  description: string;
  imageUrl: string | null;
  order: number;
};

function ServiceRow({
  item,
  index,
}: {
  item: ServiceItem;
  index: number;
}) {
  const rowRef     = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const imgRef     = useRef<HTMLImageElement>(null);
  const even       = index % 2 === 0;

  useGSAP(() => {
    const row = rowRef.current;
    if (!row) return;

    // Hairline draw + text entrance
    const line  = row.querySelector<HTMLElement>(".sdr-line");
    const texts = row.querySelectorAll<HTMLElement>(".sdr-text");

    gsap
      .timeline({ scrollTrigger: { trigger: row, start: "top 82%", once: true } })
      .fromTo(line, { scaleX: 0, transformOrigin: "left" }, { scaleX: 1, duration: 0.75, ease: "power2.inOut" })
      .fromTo(texts, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "power2.out" }, "-=0.45");

    // Image reveal overlay
    if (overlayRef.current) {
      gsap.to(overlayRef.current, {
        scaleX: 0,
        ease: "none",
        scrollTrigger: {
          trigger: row,
          start: "top 85%",
          end: "top 20%",
          scrub: 1.2,
        },
      });
    }

    // Subtle image zoom on hover
    if (imgRef.current) {
      const imgEl = imgRef.current;
      const onEnter = () => gsap.to(imgEl, { scale: 1.05, duration: 0.6, ease: "power2.out" });
      const onLeave = () => gsap.to(imgEl, { scale: 1,    duration: 0.6, ease: "power2.out" });
      imgEl.closest(".sdr-img-wrap")?.addEventListener("mouseenter", onEnter);
      imgEl.closest(".sdr-img-wrap")?.addEventListener("mouseleave", onLeave);
    }
  }, { scope: rowRef });

  const imageBlock = item.imageUrl ? (
    <div className="sdr-img-wrap relative w-full md:w-[420px] aspect-[4/3] shrink-0 overflow-hidden">
      <img
        ref={imgRef}
        src={item.imageUrl}
        alt={item.name}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div ref={overlayRef} className="absolute inset-0 bg-black origin-right" />
    </div>
  ) : null;

  const textBlock = (
    <div className="sdr-text flex flex-col gap-5 flex-1 md:pt-2">
      <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/60 leading-[1.6] tracking-[-0.02em] md:max-w-[420px]">
        {item.description}
      </p>
      <span className="font-[family-name:var(--font-geist-mono)] text-[12px] text-white/30 uppercase leading-[1.1] tracking-wide">
        View work →
      </span>
    </div>
  );

  return (
    <div ref={rowRef} className="flex flex-col gap-6 md:gap-10">
      {/* Top row: number + hairline */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="sdr-text font-[family-name:var(--font-geist-mono)] text-[14px] text-white/40 uppercase leading-[1.1]">
            {`[ 0${index + 1} ]`}
          </span>
        </div>
        <div className="sdr-line h-px w-full bg-white/20" />
      </div>

      {/* Content: alternating image / text on desktop */}
      <div className={`flex flex-col gap-8 md:flex-row md:items-start md:gap-12 ${even ? "" : "md:flex-row-reverse"}`}>
        {imageBlock}
        <div className="flex flex-col gap-4 flex-1">
          <h2 className="sdr-text font-[family-name:var(--font-inter)] font-bold italic text-[40px] md:text-[64px] text-white uppercase tracking-[-0.05em] leading-[0.9]">
            {item.name}
          </h2>
          {textBlock}
        </div>
      </div>
    </div>
  );
}

export default function ServicesDetailSection({ services }: { services: ServiceItem[] }) {
  return (
    <section className="bg-black px-4 py-16 md:px-8 md:py-[120px]">
      <div className="flex flex-col gap-16 md:gap-24">
        {services.map((service, i) => (
          <ServiceRow key={service._id} item={service} index={i} />
        ))}
      </div>
    </section>
  );
}

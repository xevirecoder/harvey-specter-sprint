"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type GalleryImage = {
  url: string | null;
  caption: string | null;
};

export default function ProjectGallery({ images }: { images: GalleryImage[] }) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    const items = gsap.utils.toArray<HTMLElement>(".pg-item", section);
    items.forEach((item) => {
      gsap.fromTo(item,
        { opacity: 0, y: 48 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: item, start: "top 88%", once: true },
        }
      );
    });
  }, { scope: sectionRef });

  if (images.length === 0) return null;

  return (
    <section ref={sectionRef} className="bg-white px-4 py-12 md:px-8 md:py-16">
      <div className="flex flex-col gap-4 md:gap-6">
        {images.map((img, i) => (
          img.url ? (
            <div key={i} className="pg-item flex flex-col gap-3">
              <div className="overflow-hidden">
                <img
                  src={img.url}
                  alt={img.caption ?? ""}
                  className="w-full object-cover"
                />
              </div>
              {img.caption && (
                <p className="font-[family-name:var(--font-geist-mono)] text-[12px] text-[#1f1f1f]/40 uppercase leading-[1.3]">
                  {img.caption}
                </p>
              )}
            </div>
          ) : null
        ))}
      </div>
    </section>
  );
}

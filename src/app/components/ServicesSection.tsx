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

export default function ServicesSection({ services }: { services: ServiceItem[] }) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const headerCount = sectionRef.current?.querySelector<HTMLElement>(".svc-header-count");
    const headerTitle = sectionRef.current?.querySelector<HTMLElement>(".svc-header-title");

    gsap.fromTo(
      [headerCount, headerTitle],
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: { trigger: headerCount, start: "top 85%", once: true },
      }
    );

    const rows = gsap.utils.toArray<HTMLElement>(".svc-row", sectionRef.current);
    rows.forEach((row) => {
      const line  = row.querySelector<HTMLElement>(".svc-line");
      const label = row.querySelector<HTMLElement>(".svc-label");
      const name  = row.querySelector<HTMLElement>(".svc-name");
      const desc  = row.querySelector<HTMLElement>(".svc-desc");
      const img   = row.querySelector<HTMLElement>(".svc-img");

      const targets = [name, desc, img].filter(Boolean) as HTMLElement[];

      gsap
        .timeline({
          scrollTrigger: { trigger: row, start: "top 85%", once: true },
        })
        .fromTo(
          line,
          { scaleX: 0, transformOrigin: "left" },
          { scaleX: 1, duration: 0.7, ease: "power2.inOut" }
        )
        .fromTo(
          label,
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
          "-=0.4"
        )
        .fromTo(
          targets,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power2.out" },
          "-=0.25"
        );
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      data-navbar-dark="true"
      className="bg-black px-4 py-12 md:px-8 md:py-20"
    >
      <div className="flex flex-col gap-8 md:gap-12">
        <p className="font-[family-name:var(--font-geist-mono)] text-[14px] text-white uppercase leading-[1.1]">
          [ services ]
        </p>
        <div className="flex items-center justify-between">
          <span className="svc-header-count font-[family-name:var(--font-inter)] font-light text-[32px] md:text-[96px] text-white uppercase tracking-[-0.08em] leading-none">
            [{services.length}]
          </span>
          <span className="svc-header-title font-[family-name:var(--font-inter)] font-light text-[32px] md:text-[96px] text-white uppercase tracking-[-0.08em] leading-none">
            Deliverables
          </span>
        </div>
        <div className="flex flex-col gap-12">
          {services.map((service, i) => (
            <div key={service._id} className="svc-row flex flex-col gap-[9px]">
              <div className="flex flex-col gap-[9px]">
                <p className="svc-label font-[family-name:var(--font-geist-mono)] text-[14px] text-white uppercase leading-[1.1]">
                  {`[ ${i + 1} ]`}
                </p>
                <div className="svc-line h-px w-full bg-white" />
              </div>
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <p className="svc-name font-[family-name:var(--font-inter)] font-bold italic text-[36px] text-white uppercase tracking-[-0.04em] leading-[1.1] whitespace-nowrap">
                  {service.name}
                </p>
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-6">
                  <p className="svc-desc font-[family-name:var(--font-inter)] text-[14px] text-white leading-[1.3] tracking-[-0.04em] md:w-[393px]">
                    {service.description}
                  </p>
                  {service.imageUrl && (
                    <div className="svc-img w-[151px] h-[151px] shrink-0 overflow-hidden">
                      <img
                        src={service.imageUrl}
                        alt=""
                        aria-hidden="true"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

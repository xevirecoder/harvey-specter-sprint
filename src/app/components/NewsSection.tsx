"use client";

import { Fragment, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type NewsItem = {
  _id: string;
  title: string;
  slug: string | null;
  description: string;
  imageUrl: string;
  link: string | null;
  publishedAt: string | null;
};

export default function NewsSection({ articles }: { articles: NewsItem[] }) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Mobile cards stagger
    const mobileCards = gsap.utils.toArray<HTMLElement>(".news-mobile-card", sectionRef.current);
    mobileCards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: { trigger: card, start: "top 88%", once: true },
          delay: i * 0.05,
        }
      );
    });

    // Desktop cards stagger
    const desktopCards = gsap.utils.toArray<HTMLElement>(".news-desktop-card", sectionRef.current);
    gsap.fromTo(
      desktopCards,
      { opacity: 0, y: 32 },
      {
        opacity: 1,
        y: 0,
        duration: 0.65,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: { trigger: desktopCards[0], start: "top 85%", once: true },
      }
    );

    // Heading
    const heading = sectionRef.current?.querySelector<HTMLElement>(".news-heading");
    if (heading) {
      gsap.fromTo(
        heading,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: { trigger: heading, start: "top 88%", once: true },
        }
      );
    }
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="bg-[#f3f3f3] px-4 py-16 md:px-8 md:py-[120px]">

      {/* Mobile */}
      <div className="md:hidden flex flex-col gap-8">
        <h2 className="news-heading font-[family-name:var(--font-inter)] font-light text-[32px] text-black uppercase tracking-[-0.08em] leading-[0.86] max-w-[280px]">
          {`Keep up with my latest news & achievements`}
        </h2>
        <div className="flex gap-4 overflow-x-auto pb-2 -mr-4">
          {articles.map((article) => (
            <a key={article._id} href={article.slug ? `/news/${article.slug}` : undefined} className="news-mobile-card shrink-0 w-[300px] flex flex-col gap-4">
              <div className="relative h-[398px] overflow-hidden shrink-0">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <p className="font-[family-name:var(--font-inter)] font-normal text-[14px] text-[#1f1f1f] leading-[1.3] tracking-[-0.04em]">
                {article.description}
              </p>
              <span className="border-b border-black flex items-center gap-[10px] py-[4px] w-fit shrink-0">
                <span className="font-[family-name:var(--font-inter)] font-medium text-[14px] text-black tracking-[-0.04em]">
                  Read more
                </span>
                <svg className="w-[18px] h-[18px] shrink-0 -rotate-90" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <path d="M9 3.75L9 14.25M9 14.25L13.5 9.75M9 14.25L4.5 9.75" stroke="black" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden md:flex items-end justify-between">
        {/* Rotated heading */}
        <div className="h-[706px] w-[110px] shrink-0 flex items-center justify-center overflow-hidden">
          <div className="-rotate-90 flex-none">
            <div className="flex flex-col font-[family-name:var(--font-inter)] font-light text-[64px] text-black uppercase tracking-[-0.08em] leading-[0.86] whitespace-nowrap">
              <span>Keep up with my latest</span>
              <span>news &amp; achievements</span>
            </div>
          </div>
        </div>
        {/* Article cards */}
        <div className="flex items-start">
          {articles.slice(0, 3).map((article, i) => (
            <Fragment key={article._id}>
              {i > 0 && <div className="self-stretch w-px bg-black mx-[15px] shrink-0" />}
              <a
                href={article.slug ? `/news/${article.slug}` : undefined}
                className={`news-desktop-card w-[353px] shrink-0 flex flex-col gap-4 ${i === 1 ? "pt-[120px]" : "h-[581px]"}`}
              >
                <div className="relative h-[469px] overflow-hidden shrink-0">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <p className="flex-1 font-[family-name:var(--font-inter)] font-normal text-[14px] text-[#1f1f1f] leading-[1.3] tracking-[-0.04em]">
                  {article.description}
                </p>
                <span className="border-b border-black flex items-center gap-[10px] py-[4px] w-fit shrink-0">
                  <span className="font-[family-name:var(--font-inter)] font-medium text-[14px] text-black tracking-[-0.04em]">
                    Read more
                  </span>
                  <svg className="w-[18px] h-[18px] shrink-0 -rotate-90" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                    <path d="M9 3.75L9 14.25M9 14.25L13.5 9.75M9 14.25L4.5 9.75" stroke="black" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </a>
            </Fragment>
          ))}
        </div>
      </div>

    </section>
  );
}

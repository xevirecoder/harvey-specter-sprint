"use client";

import { useRef } from "react";
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

function formatDate(raw: string | null) {
  if (!raw) return null;
  return new Date(raw).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function NewsArticlesGrid({ articles }: { articles: NewsItem[] }) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.fromTo(
      section.querySelectorAll(".nag-header"),
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0, duration: 0.65, stagger: 0.08, ease: "power2.out",
        scrollTrigger: { trigger: section, start: "top 80%", once: true },
      }
    );

    const cards = gsap.utils.toArray<HTMLElement>(".nag-card", section);
    cards.forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: "power2.out",
          delay: (i % 3) * 0.1,
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
          <div className="nag-header flex items-center justify-between">
            <span className="font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">
              [ All Articles ]
            </span>
            <span className="font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] leading-[1.1]">
              002
            </span>
          </div>
          <div className="nag-header h-px w-full bg-[#1f1f1f]" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-3 md:gap-y-16">
          {articles.map((article) => (
            <ArticleCard key={article._id} article={article} />
          ))}
        </div>

      </div>
    </section>
  );
}

function ArticleCard({ article }: { article: NewsItem }) {
  const imgRef = useRef<HTMLImageElement>(null);

  const onEnter = () => gsap.to(imgRef.current, { scale: 1.06, duration: 0.6, ease: "power2.out" });
  const onLeave = () => gsap.to(imgRef.current, { scale: 1,    duration: 0.6, ease: "power2.out" });

  const inner = (
    <>
      {/* Image */}
      <div
        className="relative aspect-[4/3] overflow-hidden"
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
      >
        <img
          ref={imgRef}
          src={article.imageUrl}
          alt={article.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Meta */}
      <div className="flex flex-col gap-3 flex-1">
        {article.publishedAt && (
          <span className="font-[family-name:var(--font-geist-mono)] text-[11px] text-[#1f1f1f]/40 uppercase leading-[1.3]">
            {formatDate(article.publishedAt)}
          </span>
        )}

        <h2 className="font-[family-name:var(--font-inter)] font-bold text-[20px] text-black tracking-[-0.04em] leading-[1.15]">
          {article.title}
        </h2>

        <p className="font-[family-name:var(--font-inter)] text-[14px] text-[#1f1f1f]/70 leading-[1.6] tracking-[-0.02em]">
          {article.description}
        </p>
      </div>

      {/* Read more */}
      <div className="border-b border-black flex items-center gap-[10px] py-1 w-fit group-hover:gap-3 transition-all duration-300">
        <span className="font-[family-name:var(--font-inter)] font-medium text-[14px] text-black tracking-[-0.04em]">
          Read more
        </span>
        <svg
          className="w-[16px] h-[16px] shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          viewBox="0 0 16 16" fill="none"
        >
          <path d="M3 13L13 3M13 3H6M13 3V10" stroke="black" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </>
  );

  if (article.slug) {
    return (
      <a href={`/news/${article.slug}`} className="nag-card group flex flex-col gap-5">
        {inner}
      </a>
    );
  }

  return <div className="nag-card flex flex-col gap-5">{inner}</div>;
}

import { Fragment } from "react";
import HeroSection from "./components/HeroSection";
import EditorialSection from "./components/EditorialSection";
import AboutPhoto from "./components/AboutPhoto";
import AboutBioBox from "./components/AboutBioBox";
import PhotoBreakSection from "./components/PhotoBreakSection";
import TestimonialsSlider from "./components/TestimonialsSlider";
import MagneticButton from "./components/MagneticButton";
import { sanityFetch } from "@/sanity/lib/live";
import { defineQuery } from "next-sanity";

const photoBreakUrl = "/pexels-vazhnik-7562188 3.png";
const aboutPhotoUrl = "/image 26.png";

type PortfolioItem = {
  _id: string;
  title: string;
  tags: string[];
  imageUrl: string | null;
  desktopCardHeight: number;
};

type Testimonial = {
  _id: string;
  name: string;
  quote: string;
  logoSrc: string;
  logoW: number;
  logoH: number;
  desktopRotate: string;
  desktopPos: string;
  desktopBoxW: number;
  desktopBoxH: number;
  mobileRotate: string;
};

type NewsItem = {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  link: string | null;
  publishedAt: string | null;
};

type ServiceItem = {
  _id: string;
  name: string;
  description: string;
  imageUrl: string | null;
  order: number;
};

const PORTFOLIO_QUERY = defineQuery(`
  *[_type == "portfolio"] | order(order asc) {
    _id,
    title,
    tags,
    "imageUrl": select(
      defined(coverImage.asset) => coverImage.asset->url,
      externalImageUrl
    ),
    desktopCardHeight
  }
`);

const TESTIMONIALS_QUERY = defineQuery(`
  *[_type == "testimonial"] | order(order asc) {
    _id,
    name,
    quote,
    logoSrc,
    logoW,
    logoH,
    desktopRotate,
    desktopPos,
    desktopBoxW,
    desktopBoxH,
    mobileRotate
  }
`);

const NEWS_QUERY = defineQuery(`
  *[_type == "news"] | order(order asc) {
    _id,
    title,
    description,
    imageUrl,
    link,
    publishedAt
  }
`);

const SERVICES_QUERY = defineQuery(`
  *[_type == "service"] | order(order asc) {
    _id,
    name,
    description,
    "imageUrl": select(
      defined(image.asset) => image.asset->url,
      externalImageUrl
    ),
    order
  }
`);




function parseDesktopPos(s: string): { left: number; top: number } {
  const l = s.match(/left-\[(\d+(?:\.\d+)?)px\]/);
  const t = s.match(/top-\[(\d+(?:\.\d+)?)px\]/);
  return { left: l ? parseFloat(l[1]) : 0, top: t ? parseFloat(t[1]) : 0 };
}

function parseRotateDeg(s: string): number {
  const m = s.match(/rotate-\[(\d+(?:\.\d+)?)deg\]/);
  if (!m) return 0;
  return s.startsWith('-') ? -parseFloat(m[1]) : parseFloat(m[1]);
}


export default async function Home() {
  const [{ data: portfolioProjects }, { data: testimonialDocs }, { data: newsDocs }, { data: serviceDocs }] = await Promise.all([
    sanityFetch({ query: PORTFOLIO_QUERY }),
    sanityFetch({ query: TESTIMONIALS_QUERY }),
    sanityFetch({ query: NEWS_QUERY }),
    sanityFetch({ query: SERVICES_QUERY }),
  ]);
  const p = portfolioProjects as PortfolioItem[];
  const testimonials = testimonialDocs as Testimonial[];
  const newsArticles = newsDocs as NewsItem[];
  const services = serviceDocs as ServiceItem[];
  return (
    <>
    <HeroSection />

    <EditorialSection />

    {/* ── About section ── */}
    <section id="about" className="bg-white px-4 py-12 md:px-8 md:py-20">
      <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">

        {/* Mobile: 002 sits above [ About ] */}
        <p className="font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] leading-[1.1] md:hidden">002</p>

        <p className="font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] uppercase leading-[1.1] shrink-0">
          [ About ]
        </p>

        <div className="flex flex-col gap-8 md:flex-row md:items-end md:gap-8">

          {/* Bio text with corner-bracket decoration */}
          <AboutBioBox />

          {/* 002 (desktop only) + portrait photo */}
          <div className="flex items-start gap-6 shrink-0">
            <p className="hidden md:block font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] leading-[1.1] shrink-0">002</p>
            <AboutPhoto src={aboutPhotoUrl} />
          </div>

        </div>
      </div>
    </section>

    <PhotoBreakSection src={photoBreakUrl} />

    {/* ── Services section ── */}
    <section data-navbar-dark="true" className="bg-black px-4 py-12 md:px-8 md:py-20">
      <div className="flex flex-col gap-8 md:gap-12">
        <p className="font-[family-name:var(--font-geist-mono)] text-[14px] text-white uppercase leading-[1.1]">
          [ services ]
        </p>
        <div className="flex items-center justify-between">
          <span className="font-[family-name:var(--font-inter)] font-light text-[32px] md:text-[96px] text-white uppercase tracking-[-0.08em] leading-none">
            [{services.length}]
          </span>
          <span className="font-[family-name:var(--font-inter)] font-light text-[32px] md:text-[96px] text-white uppercase tracking-[-0.08em] leading-none">
            Deliverables
          </span>
        </div>
        <div className="flex flex-col gap-12">
          {services.map((service, i) => (
            <div key={service._id} className="flex flex-col gap-[9px]">
              <div className="flex flex-col gap-[9px]">
                <p className="font-[family-name:var(--font-geist-mono)] text-[14px] text-white uppercase leading-[1.1]">
                  {`[ ${i + 1} ]`}
                </p>
                <div className="h-px w-full bg-white" />
              </div>
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <p className="font-[family-name:var(--font-inter)] font-bold italic text-[36px] text-white uppercase tracking-[-0.04em] leading-[1.1] whitespace-nowrap">
                  {service.name}
                </p>
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-6">
                  <p className="font-[family-name:var(--font-inter)] text-[14px] text-white leading-[1.3] tracking-[-0.04em] md:w-[393px]">
                    {service.description}
                  </p>
                  {service.imageUrl && (
                    <div className="w-[151px] h-[151px] shrink-0 overflow-hidden">
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

    {/* ── Selected Work / Portfolio section ── */}
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
          <div key={project._id} className="flex flex-col gap-[10px]">
            <div className="relative h-[390px] overflow-hidden">
              <img src={project.imageUrl ?? ''} alt={project.title} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute bottom-4 left-4 flex gap-3">
                {project.tags.map((tag) => (
                  <span key={tag} className="backdrop-blur-[10px] bg-[rgba(255,255,255,0.3)] px-2 py-1 rounded-[24px] font-[family-name:var(--font-inter)] font-medium text-[14px] text-[#111] tracking-[-0.04em]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-[family-name:var(--font-inter)] font-black text-[24px] text-black uppercase tracking-[-0.04em] leading-[1.1]">
                {project.title}
              </p>
              <svg className="shrink-0" width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M9 23L23 9M23 9H12M23 9V20" stroke="#1f1f1f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
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

        {/* Left column — self-stretch lets h-full resolve against the right column's height */}
        <div className="flex-1 self-stretch flex flex-col justify-between min-w-0">

          {/* Surfers Paradise */}
          <div className="flex flex-col gap-[10px]">
            <div className="relative overflow-hidden" style={{ height: p[0]?.desktopCardHeight ?? 744 }}>
              <img src={p[0]?.imageUrl ?? ''} alt={p[0]?.title ?? ''} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute bottom-4 left-4 flex gap-3">
                {(p[0]?.tags ?? []).map((tag) => (
                  <span key={tag} className="backdrop-blur-[10px] bg-[rgba(255,255,255,0.3)] px-2 py-1 rounded-[24px] font-[family-name:var(--font-inter)] font-medium text-[14px] text-[#111] tracking-[-0.04em]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-[family-name:var(--font-inter)] font-black text-[36px] text-black uppercase tracking-[-0.04em] leading-[1.1] whitespace-nowrap">
                {p[0]?.title}
              </p>
              <svg className="shrink-0" width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M9 23L23 9M23 9H12M23 9V20" stroke="#1f1f1f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          {/* Cyberpunk Caffe */}
          <div className="flex flex-col gap-[10px]">
            <div className="relative overflow-hidden" style={{ height: p[1]?.desktopCardHeight ?? 699 }}>
              <img src={p[1]?.imageUrl ?? ''} alt={p[1]?.title ?? ''} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute bottom-4 left-4 flex gap-3">
                {(p[1]?.tags ?? []).map((tag) => (
                  <span key={tag} className="backdrop-blur-[10px] bg-[rgba(255,255,255,0.3)] px-2 py-1 rounded-[24px] font-[family-name:var(--font-inter)] font-medium text-[14px] text-[#111] tracking-[-0.04em]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-[family-name:var(--font-inter)] font-black text-[36px] text-black uppercase tracking-[-0.04em] leading-[1.1] whitespace-nowrap">
                {p[1]?.title}
              </p>
              <svg className="shrink-0" width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M9 23L23 9M23 9H12M23 9V20" stroke="#1f1f1f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          {/* Desktop CTA (sits at bottom of left column) */}
          <div className="flex gap-3 items-stretch w-[465px]">
            <div className="flex flex-col justify-between shrink-0">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M16 0H0V16" stroke="#1f1f1f"/></svg>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M16 16H0V0" stroke="#1f1f1f"/></svg>
            </div>
            <div className="flex-1 flex flex-col gap-[10px] py-3">
              <p className="font-[family-name:var(--font-inter)] italic text-[14px] text-[#1f1f1f] leading-[1.3] tracking-[-0.04em]">
                Discover how my creativity transforms ideas into impactful digital experiences — schedule a call with me to get started.
              </p>
              <button className="self-start rounded-[24px] bg-black px-4 py-3 font-[family-name:var(--font-inter)] font-medium text-[14px] text-white tracking-[-0.04em]">
                Let&apos;s talk
              </button>
            </div>
            <div className="flex flex-col justify-between shrink-0">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M0 0H16V16" stroke="#1f1f1f"/></svg>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M0 16H16V0" stroke="#1f1f1f"/></svg>
            </div>
          </div>

        </div>

        {/* Right column — offset top by 240px, gap between cards */}
        <div className="flex-1 flex flex-col gap-[117px] pt-[240px] min-w-0">

          {/* Agency 976 */}
          <div className="flex flex-col gap-[10px]">
            <div className="relative overflow-hidden" style={{ height: p[2]?.desktopCardHeight ?? 699 }}>
              <img src={p[2]?.imageUrl ?? ''} alt={p[2]?.title ?? ''} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute bottom-4 left-4 flex gap-3">
                {(p[2]?.tags ?? []).map((tag) => (
                  <span key={tag} className="backdrop-blur-[10px] bg-[rgba(255,255,255,0.3)] px-2 py-1 rounded-[24px] font-[family-name:var(--font-inter)] font-medium text-[14px] text-[#111] tracking-[-0.04em]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-[family-name:var(--font-inter)] font-black text-[36px] text-black uppercase tracking-[-0.04em] leading-[1.1] whitespace-nowrap">
                {p[2]?.title}
              </p>
              <svg className="shrink-0" width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M9 23L23 9M23 9H12M23 9V20" stroke="#1f1f1f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          {/* Minimal Playground */}
          <div className="flex flex-col gap-[10px]">
            <div className="relative overflow-hidden" style={{ height: p[3]?.desktopCardHeight ?? 744 }}>
              <img src={p[3]?.imageUrl ?? ''} alt={p[3]?.title ?? ''} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute bottom-4 left-4 flex gap-3">
                {(p[3]?.tags ?? []).map((tag) => (
                  <span key={tag} className="backdrop-blur-[10px] bg-[rgba(255,255,255,0.3)] px-2 py-1 rounded-[24px] font-[family-name:var(--font-inter)] font-medium text-[14px] text-[#111] tracking-[-0.04em]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-[family-name:var(--font-inter)] font-black text-[36px] text-black uppercase tracking-[-0.04em] leading-[1.1] whitespace-nowrap">
                {p[3]?.title}
              </p>
              <svg className="shrink-0" width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M9 23L23 9M23 9H12M23 9V20" stroke="#1f1f1f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

        </div>
      </div>

    </section>

    {/* ── Testimonials section ── */}
    <section className="bg-[#fafafa] overflow-hidden">

      {/* Mobile layout */}
      <div className="md:hidden py-16 flex flex-col gap-8">
        <h2 className="px-4 text-center font-[family-name:var(--font-inter)] font-medium text-[64px] text-black capitalize tracking-[-0.07em] leading-[0.8]">
          Testimonials
        </h2>
        <TestimonialsSlider testimonials={testimonials} />
      </div>

      {/* Desktop layout — fixed 1440 design canvas; title centered, cards
          rendered after so they paint in front where they overlap. */}
      <div className="hidden md:block relative h-[940px]">
        <div className="relative mx-auto h-full w-[1440px]">
          <h2 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-[family-name:var(--font-inter)] font-medium text-[198px] text-black capitalize tracking-[-0.07em] leading-[1.1] pointer-events-none select-none">
            Testimonials
          </h2>
          {testimonials.map((t) => {
            const pos = parseDesktopPos(t.desktopPos ?? '');
            const deg = parseRotateDeg(t.desktopRotate ?? '');
            return (
              <div
                key={t._id}
                className="absolute flex items-center justify-center"
                style={{ left: pos.left, top: pos.top, width: t.desktopBoxW, height: t.desktopBoxH }}
              >
                <div className="flex-none" style={{ transform: `rotate(${deg}deg)` }}>
                  <div className="w-[353px] bg-[#f1f1f1] border border-[#ddd] rounded-[4px] p-6 flex flex-col gap-4">
                    <img
                      src={t.logoSrc}
                      alt=""
                      aria-hidden="true"
                      style={{ width: t.logoW, height: t.logoH }}
                      className="shrink-0 object-contain object-left"
                    />
                    <p className="font-[family-name:var(--font-inter)] font-normal text-[18px] text-[#1f1f1f] leading-[1.3] tracking-[-0.04em]">
                      {t.quote}
                    </p>
                    <p className="font-[family-name:var(--font-inter)] font-black text-[16px] text-black uppercase tracking-[-0.04em] leading-[1.1] whitespace-nowrap">
                      {t.name}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </section>

    {/* ── News & Achievements section ── */}
    <section className="bg-[#f3f3f3] px-4 py-16 md:px-8 md:py-[120px]">

      {/* Mobile */}
      <div className="md:hidden flex flex-col gap-8">
        <h2 className="font-[family-name:var(--font-inter)] font-light text-[32px] text-black uppercase tracking-[-0.08em] leading-[0.86] max-w-[280px]">
          {`Keep up with my latest news & achievements`}
        </h2>
        <div className="flex gap-4 overflow-x-auto pb-2 -mr-4">
          {newsArticles.map((article) => (
            <div key={article._id} className="shrink-0 w-[300px] flex flex-col gap-4">
              <div className="relative h-[398px] overflow-hidden shrink-0">
                <img src={article.imageUrl} alt={article.title} className="absolute inset-0 w-full h-full object-cover" />
              </div>
              <p className="font-[family-name:var(--font-inter)] font-normal text-[14px] text-[#1f1f1f] leading-[1.3] tracking-[-0.04em]">
                {article.description}
              </p>
              {article.link && (
                <a href={article.link} target="_blank" rel="noopener noreferrer" className="border-b border-black flex items-center gap-[10px] py-[4px] w-fit shrink-0">
                  <span className="font-[family-name:var(--font-inter)] font-medium text-[14px] text-black tracking-[-0.04em]">Read more</span>
                  <svg className="w-[18px] h-[18px] shrink-0 -rotate-90" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M9 3.75L9 14.25M9 14.25L13.5 9.75M9 14.25L4.5 9.75" stroke="black" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </a>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden md:flex items-end justify-between">
        {/* Rotated heading — two whitespace-nowrap lines inside a -rotate-90 flex-none wrapper */}
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
          {newsArticles.slice(0, 3).map((article, i) => (
            <Fragment key={article._id}>
              {i > 0 && <div className="self-stretch w-px bg-black mx-[15px] shrink-0" />}
              <div className={`w-[353px] shrink-0 flex flex-col gap-4 ${i === 1 ? 'pt-[120px]' : 'h-[581px]'}`}>
                <div className="relative h-[469px] overflow-hidden shrink-0">
                  <img src={article.imageUrl} alt={article.title} className="absolute inset-0 w-full h-full object-cover" />
                </div>
                <p className="flex-1 font-[family-name:var(--font-inter)] font-normal text-[14px] text-[#1f1f1f] leading-[1.3] tracking-[-0.04em]">{article.description}</p>
                {article.link && (
                  <a href={article.link} target="_blank" rel="noopener noreferrer" className="border-b border-black flex items-center gap-[10px] py-[4px] w-fit shrink-0">
                    <span className="font-[family-name:var(--font-inter)] font-medium text-[14px] text-black tracking-[-0.04em]">Read more</span>
                    <svg className="w-[18px] h-[18px] shrink-0 -rotate-90" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M9 3.75L9 14.25M9 14.25L13.5 9.75M9 14.25L4.5 9.75" stroke="black" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </a>
                )}
              </div>
            </Fragment>
          ))}
        </div>
      </div>

    </section>

    {/* ── Footer ── */}
    <footer data-navbar-dark="true" className="bg-black px-4 pt-12 md:px-8 overflow-hidden">

      {/* Top: CTA + socials + divider */}
      <div className="flex flex-col gap-6 mb-12 md:gap-12 md:mb-[120px]">

        {/* CTA + social links row */}
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">

          {/* "Have a PROJECT in mind?" + button */}
          <div className="flex flex-col gap-3 md:w-[298px]">
            <p className="font-[family-name:var(--font-inter)] font-light italic text-[24px] text-white uppercase tracking-[-0.04em] leading-[1.1]">
              Have a{" "}
              <span className="font-black not-italic">project</span>
              {" "}in mind?
            </p>
            <MagneticButton className="self-start border border-white rounded-[24px] px-4 py-3 font-[family-name:var(--font-inter)] font-medium text-[14px] text-white tracking-[-0.04em]">
              Let&apos;s talk
            </MagneticButton>
          </div>

          {/* Socials — mobile: stacked list */}
          <div className="flex flex-col gap-4 md:hidden">
            {["Facebook", "Instagram", "X.com", "LinkedIn"].map((name) => (
              <p key={name} className="font-[family-name:var(--font-inter)] text-[18px] text-white uppercase tracking-[-0.04em] leading-[1.1]">
                {name}
              </p>
            ))}
          </div>

          {/* Socials — desktop: centre column */}
          <p className="hidden md:block font-[family-name:var(--font-inter)] text-[18px] text-white uppercase tracking-[-0.04em] leading-[1.1] text-center w-[298px]">
            Facebook<br />Instagram
          </p>

          {/* Socials — desktop: right column */}
          <p className="hidden md:block font-[family-name:var(--font-inter)] text-[18px] text-white uppercase tracking-[-0.04em] leading-[1.1] text-right w-[298px]">
            X.com<br />LinkedIn
          </p>
        </div>

        {/* Horizontal rule */}
        <div className="h-px w-full bg-white" />
      </div>

      {/* Bottom: H.Studio + links */}

      {/* Desktop */}
      <div className="hidden md:flex items-end justify-between">
        <div className="relative overflow-hidden h-[219px] flex-1 max-w-[1093px]">
          {/* Massive wordmark — vertically + horizontally centred, clipped */}
          <p className="absolute left-1/2 top-[calc(50%+6px)] -translate-x-1/2 -translate-y-1/2 capitalize font-[family-name:var(--font-inter)] font-semibold text-[290px] text-white tracking-[-0.06em] leading-[0.8] whitespace-nowrap">
            H.Studio
          </p>
          {/* Rotated label pinned to left edge */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[160px] w-[15px] flex items-center justify-center">
            <p className="-rotate-90 font-[family-name:var(--font-geist-mono)] text-[14px] text-white uppercase leading-[1.1] whitespace-nowrap">
              [ Coded By Claude ]
            </p>
          </div>
        </div>
        <div className="flex gap-[34px] items-center pb-8 shrink-0">
          <span className="font-[family-name:var(--font-inter)] text-[12px] text-white uppercase tracking-[-0.04em] underline leading-[1.1]">licences</span>
          <span className="font-[family-name:var(--font-inter)] text-[12px] text-white uppercase tracking-[-0.04em] underline leading-[1.1]">Privacy policy</span>
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden flex flex-col gap-4 items-center">
        <div className="flex gap-[34px] items-center">
          <span className="font-[family-name:var(--font-inter)] text-[12px] text-white uppercase tracking-[-0.04em] underline leading-[1.1]">licences</span>
          <span className="font-[family-name:var(--font-inter)] text-[12px] text-white uppercase tracking-[-0.04em] underline leading-[1.1]">Privacy policy</span>
        </div>
        <div className="w-full flex flex-col gap-3 overflow-hidden">
          <p className="font-[family-name:var(--font-geist-mono)] text-[10px] text-white uppercase leading-[1.1]">[ Coded By Claude ]</p>
          <p className="capitalize font-[family-name:var(--font-inter)] font-semibold text-[91px] text-white tracking-[-0.06em] leading-[0.8]">H.Studio</p>
        </div>
      </div>

    </footer>
    </>
  );
}

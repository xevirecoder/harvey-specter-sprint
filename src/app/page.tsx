import HeroNav from "./components/HeroNav";
import { sanityFetch } from "@/sanity/lib/live";
import { defineQuery } from "next-sanity";

const heroPhotoUrl = "/pexels-vazhnik-7562188 2.png";
const photoBreakUrl = "/pexels-vazhnik-7562188 3.png";
const aboutPhotoUrl = "/image 26.png";

type PortfolioItem = {
  _id: string;
  title: string;
  tags: string[];
  imageUrl: string | null;
  desktopCardHeight: number;
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

const testimonials = [
  {
    name: "Marko Stojković",
    quote:
      "A brilliant creative partner who transformed our vision into a unique, high-impact brand identity. Their ability to craft everything from custom mascots to polished logos is truly impressive.",
    logoSrc: "https://www.figma.com/api/mcp/asset/3f9d15a0-82f2-4d6a-a17c-61ec090705fd",
    logoW: 143, logoH: 19,
    rotate: "-rotate-[6.85deg]",
    pos: "left-[102px] top-[142px]",
    boxW: 381, boxH: 295,
    mobileRotate: "-rotate-[3.5deg]",
  },
  {
    name: "Lukas Weber",
    quote:
      "Professional, precise, and incredibly fast at handling complex product visualizations and templates.",
    logoSrc: "https://www.figma.com/api/mcp/asset/0b7269d9-8a90-43ae-aa35-8e7333d14170",
    logoW: 138, logoH: 19,
    rotate: "rotate-[2.9deg]",
    pos: "left-[676px] top-[272px]",
    boxW: 362, boxH: 204,
    mobileRotate: "rotate-[2deg]",
  },
  {
    name: "Sarah Jenkins",
    quote:
      "A strategic partner who balances stunning aesthetics with high-performance UX for complex platforms. They don't just make things look good; they solve business problems through visual clarity.",
    logoSrc: "https://www.figma.com/api/mcp/asset/04f0404b-8e55-49d6-a254-c07b6b53c83a",
    logoW: 109, logoH: 31,
    rotate: "rotate-[2.23deg]",
    pos: "left-[305px] top-[553px]",
    boxW: 363, boxH: 280,
    mobileRotate: "-rotate-[2deg]",
  },
  {
    name: "Sofia Martínez",
    quote:
      "An incredibly versatile designer who delivers consistent quality across a wide range of styles and formats.",
    logoSrc: "https://www.figma.com/api/mcp/asset/3f32b9c9-103d-4496-aca2-c29d9437811b",
    logoW: 81, logoH: 36,
    rotate: "-rotate-[4.15deg]",
    pos: "left-[987px] top-[546px]",
    boxW: 367, boxH: 228,
    mobileRotate: "rotate-[2deg]",
  },
];

const newsArticles = [
  {
    imgSrc: "https://www.figma.com/api/mcp/asset/c75f27e8-8c1a-415f-b3bf-c045c6383b29",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    imgSrc: "https://www.figma.com/api/mcp/asset/ed65031c-10f1-4236-8480-7b3f3eea085f",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    imgSrc: "https://www.figma.com/api/mcp/asset/ccdf7efb-4cdd-4e18-87fd-1ba10b154b1c",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];
const newsArrowUrl = "https://www.figma.com/api/mcp/asset/f0efc48e-5a44-4bcd-ada0-525bc41bbb8d";

const services = [
  {
    number: "[ 1 ]",
    name: "Brand Discovery",
    description:
      "Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.",
    imgSrc: "/services/brand-discovery.jpg",
  },
  {
    number: "[ 2 ]",
    name: "Web Design & Dev",
    description:
      "Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.",
    imgSrc: "/services/web-design.jpg",
  },
  {
    number: "[ 3 ]",
    name: "Marketing",
    description:
      "Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.",
    imgSrc: "/services/marketing.jpg",
  },
  {
    number: "[ 4 ]",
    name: "Photography",
    description:
      "Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.",
    imgSrc: "/services/photography.jpg",
  },
];

// Shared text classes for the large editorial lines
const line =
  "font-[family-name:var(--font-inter)] font-light text-[32px] md:text-[6.67vw] text-black uppercase tracking-[-0.08em] leading-[0.84] whitespace-nowrap";

export default async function Home() {
  const { data: portfolioProjects } = await sanityFetch({ query: PORTFOLIO_QUERY });
  const p = portfolioProjects as PortfolioItem[];
  return (
    <>
    <section className="relative h-[847px] overflow-hidden bg-neutral-300">
      {/* Background photo */}
      <img
        src={heroPhotoUrl}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-[50%_20%]"
      />

      {/* Frosted-glass overlay — fades in upward via mask */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-[349px] bg-[rgba(217,217,217,0.01)] backdrop-blur-[10px]"
        style={{
          WebkitMaskImage: "linear-gradient(to bottom, transparent, black 45%)",
          maskImage: "linear-gradient(to bottom, transparent, black 45%)",
        }}
      />

      {/* Foreground layout */}
      <div className="relative flex h-full flex-col px-4 md:px-8 justify-between md:justify-start md:gap-[240px]">

        <HeroNav />

        {/* Hero text */}
        <div className="flex w-full shrink-0 flex-col pb-6 md:pb-0">
          {/* Name heading */}
          <div className="flex w-full flex-col items-center md:items-start">
            {/* Label — opacity keeps it ghostly on light photo backgrounds */}
            <span className="mb-[-15px] px-[18px] font-[family-name:var(--font-geist-mono)] text-[14px] uppercase leading-[1.1] text-white opacity-70 mix-blend-overlay">
              [ Hello I&apos;m ]
            </span>
            {/* Heading — vw-based size so it scales without wrapping on desktop */}
            <h1 className="mb-[-15px] w-full text-center font-[family-name:var(--font-inter)] font-medium capitalize tracking-[-0.07em] text-white mix-blend-overlay whitespace-pre-wrap leading-[0.8] text-[96px] md:text-[13.75vw] md:leading-[1.1] md:whitespace-pre">
              {`Harvey   Specter`}
            </h1>
          </div>

          {/* Blurb — right on desktop, centered on mobile */}
          <div className="flex w-full justify-center pt-[15px] md:justify-end">
            <div className="flex w-[294px] flex-col gap-[17px]">
              <p className="font-[family-name:var(--font-inter)] font-bold italic text-sm uppercase leading-[1.1] tracking-[-0.04em] text-[#1f1f1f]">
                H.Studio is a{" "}
                <span className="font-normal">full-service</span>{" "}
                creative studio creating beautiful digital experiences and
                products. We are an{" "}
                <span className="font-normal">award winning</span>{" "}
                design and art group specializing in branding, web design and
                engineering.
              </p>
              <button className="self-start rounded-full bg-black px-4 py-3 font-[family-name:var(--font-inter)] font-medium text-sm text-white tracking-[-0.04em]">
                Let&apos;s talk
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ── Editorial identity section ── */}
    <section className="bg-[#fafafa] px-4 py-12 md:px-8 md:py-[120px]">
      <div className="flex flex-col gap-6 w-full">

        {/* [ 8+ years in industry ] + hairline */}
        <div className="flex flex-col gap-3 items-end w-full">
          <p className="font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] text-right uppercase leading-[1.1]">
            [ 8+ years in industry ]
          </p>
          <div className="h-px w-full bg-[#1f1f1f]" />
        </div>

        {/* Staircase typography — centered on mobile, left-offset on desktop */}
        <div className="flex flex-col gap-2 items-center md:items-start">

          {/* Line 1: 001 (above on mobile, inline right on desktop) + A CREATIVE DIRECTOR / */}
          <div className="flex flex-col-reverse items-center gap-3 md:flex-row md:items-start">
            <p className={`${line} whitespace-pre`}>{`A creative director   /`}</p>
            <span className="font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] leading-[1.1]">
              001
            </span>
          </div>

          {/* Line 2: PHOTOGRAPHER — indented on desktop */}
          <p className={`${line} md:w-full md:pl-[15.55%]`}>Photographer</p>

          {/* Line 3: BORN & RAISED — Playfair italic & */}
          <p className={`${line} md:w-full md:pl-[44.3%]`}>
            {"Born "}
            <span className="font-[family-name:var(--font-playfair)] italic">{"&"}</span>
            {" raised"}
          </p>

          {/* Line 4: ON THE SOUTH SIDE — no indent */}
          <p className={line}>on the south side</p>

          {/* Line 5: OF CHICAGO. + [ CREATIVE FREELANCER ] label */}
          <div className="flex flex-col items-center gap-3 md:block md:w-full">
            <p className={`${line} md:pl-[44%]`}>
              of chicago.{" "}
              <span className="hidden md:inline font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] tracking-normal leading-[1.1] whitespace-nowrap relative top-[26px]">
                [ creative freelancer ]
              </span>
            </p>
            {/* Mobile: label below in flow */}
            <span className="md:hidden font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] uppercase leading-[1.1] whitespace-nowrap">
              [ creative freelancer ]
            </span>
          </div>

        </div>
      </div>
    </section>

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
          <div className="flex items-stretch gap-3 md:max-w-[300px]">
            <div className="flex flex-col justify-between shrink-0">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M16 0H0V16" stroke="#1f1f1f"/></svg>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M16 16H0V0" stroke="#1f1f1f"/></svg>
            </div>
            <p className="flex-1 font-[family-name:var(--font-inter)] text-[14px] text-[#1f1f1f] leading-[1.3] tracking-[-0.04em] py-3">
              Placeholder paragraph one. This is where you introduce yourself — your background, your passion for your craft, and what drives you creatively. Two to three sentences work best here. Placeholder paragraph two. Here you can describe your technical approach, how you collaborate with clients, or what sets your work apart from others in your field.
            </p>
            <div className="flex flex-col justify-between shrink-0">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M0 0H16V16" stroke="#1f1f1f"/></svg>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M0 16H16V0" stroke="#1f1f1f"/></svg>
            </div>
          </div>

          {/* 002 (desktop only) + portrait photo */}
          <div className="flex items-start gap-6 shrink-0">
            <p className="hidden md:block font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] leading-[1.1] shrink-0">002</p>
            <img
              src={aboutPhotoUrl}
              alt="Portrait"
              className="w-full md:w-[436px] aspect-[436/614] object-cover"
            />
          </div>

        </div>
      </div>
    </section>

    {/* ── Full-bleed photo break ── */}
    <section className="relative h-[565px] md:h-[900px] overflow-hidden">
      <img
        src={photoBreakUrl}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-[62%_center] md:object-[50%_30%]"
      />
    </section>

    {/* ── Services section ── */}
    <section className="bg-black px-4 py-12 md:px-8 md:py-20">
      <div className="flex flex-col gap-8 md:gap-12">
        <p className="font-[family-name:var(--font-geist-mono)] text-[14px] text-white uppercase leading-[1.1]">
          [ services ]
        </p>
        <div className="flex items-center justify-between">
          <span className="font-[family-name:var(--font-inter)] font-light text-[32px] md:text-[96px] text-white uppercase tracking-[-0.08em] leading-none">
            [4]
          </span>
          <span className="font-[family-name:var(--font-inter)] font-light text-[32px] md:text-[96px] text-white uppercase tracking-[-0.08em] leading-none">
            Deliverables
          </span>
        </div>
        <div className="flex flex-col gap-12">
          {services.map((service) => (
            <div key={service.number} className="flex flex-col gap-[9px]">
              <div className="flex flex-col gap-[9px]">
                <p className="font-[family-name:var(--font-geist-mono)] text-[14px] text-white uppercase leading-[1.1]">
                  {service.number}
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
                  <div className="w-[151px] h-[151px] shrink-0 overflow-hidden">
                    <img
                      src={service.imgSrc}
                      alt=""
                      aria-hidden="true"
                      className="w-full h-full object-cover"
                    />
                  </div>
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
        <div className="flex gap-4 overflow-x-auto px-4 pb-4 items-start">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className={`${t.mobileRotate} shrink-0 w-[260px] bg-[#f1f1f1] border border-[#ddd] rounded-[4px] p-6 flex flex-col gap-4`}
            >
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
          ))}
        </div>
      </div>

      {/* Desktop layout — fixed 1440 design canvas; title centered, cards
          rendered after so they paint in front where they overlap. */}
      <div className="hidden md:block relative h-[940px]">
        <div className="relative mx-auto h-full w-[1440px]">
          <h2 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-[family-name:var(--font-inter)] font-medium text-[198px] text-black capitalize tracking-[-0.07em] leading-[1.1] pointer-events-none select-none">
            Testimonials
          </h2>
          {testimonials.map((t) => (
            // Outer wrapper holds the rotated card's bounding box so the card
            // lands at Figma's exact coordinates regardless of text height.
            <div
              key={t.name}
              className={`absolute ${t.pos} flex items-center justify-center`}
              style={{ width: t.boxW, height: t.boxH }}
            >
              <div className={`flex-none ${t.rotate}`}>
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
          ))}
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
          {newsArticles.map((article, i) => (
            <div key={i} className="shrink-0 w-[300px] flex flex-col gap-4">
              <div className="relative h-[398px] overflow-hidden shrink-0">
                <img src={article.imgSrc} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover" />
              </div>
              <p className="font-[family-name:var(--font-inter)] font-normal text-[14px] text-[#1f1f1f] leading-[1.3] tracking-[-0.04em]">
                {article.description}
              </p>
              <div className="border-b border-black flex items-center gap-[10px] py-[4px] w-fit shrink-0">
                <span className="font-[family-name:var(--font-inter)] font-medium text-[14px] text-black tracking-[-0.04em]">Read more</span>
                <img src={newsArrowUrl} alt="" aria-hidden="true" className="w-[18px] h-[18px] shrink-0 -rotate-90" />
              </div>
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
          {/* Card 1 */}
          <div className="w-[353px] shrink-0 flex flex-col gap-4 h-[581px]">
            <div className="relative h-[469px] overflow-hidden shrink-0">
              <img src={newsArticles[0].imgSrc} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover" />
            </div>
            <p className="flex-1 font-[family-name:var(--font-inter)] font-normal text-[14px] text-[#1f1f1f] leading-[1.3] tracking-[-0.04em]">{newsArticles[0].description}</p>
            <div className="border-b border-black flex items-center gap-[10px] py-[4px] w-fit shrink-0">
              <span className="font-[family-name:var(--font-inter)] font-medium text-[14px] text-black tracking-[-0.04em]">Read more</span>
              <img src={newsArrowUrl} alt="" aria-hidden="true" className="w-[18px] h-[18px] shrink-0 -rotate-90" />
            </div>
          </div>
          {/* Separator */}
          <div className="self-stretch w-px bg-black mx-[15px] shrink-0" />
          {/* Card 2 — offset down */}
          <div className="w-[353px] shrink-0 flex flex-col gap-4 pt-[120px]">
            <div className="relative h-[469px] overflow-hidden shrink-0">
              <img src={newsArticles[1].imgSrc} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover" />
            </div>
            <p className="font-[family-name:var(--font-inter)] font-normal text-[14px] text-[#1f1f1f] leading-[1.3] tracking-[-0.04em]">{newsArticles[1].description}</p>
            <div className="border-b border-black flex items-center gap-[10px] py-[4px] w-fit shrink-0">
              <span className="font-[family-name:var(--font-inter)] font-medium text-[14px] text-black tracking-[-0.04em]">Read more</span>
              <img src={newsArrowUrl} alt="" aria-hidden="true" className="w-[18px] h-[18px] shrink-0 -rotate-90" />
            </div>
          </div>
          {/* Separator */}
          <div className="self-stretch w-px bg-black mx-[15px] shrink-0" />
          {/* Card 3 */}
          <div className="w-[353px] shrink-0 flex flex-col gap-4 h-[581px]">
            <div className="relative h-[469px] overflow-hidden shrink-0">
              <img src={newsArticles[2].imgSrc} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover" />
            </div>
            <p className="flex-1 font-[family-name:var(--font-inter)] font-normal text-[14px] text-[#1f1f1f] leading-[1.3] tracking-[-0.04em]">{newsArticles[2].description}</p>
            <div className="border-b border-black flex items-center gap-[10px] py-[4px] w-fit shrink-0">
              <span className="font-[family-name:var(--font-inter)] font-medium text-[14px] text-black tracking-[-0.04em]">Read more</span>
              <img src={newsArrowUrl} alt="" aria-hidden="true" className="w-[18px] h-[18px] shrink-0 -rotate-90" />
            </div>
          </div>
        </div>
      </div>

    </section>

    {/* ── Footer ── */}
    <footer className="bg-black px-4 pt-12 md:px-8 overflow-hidden">

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
            <button className="self-start border border-white rounded-[24px] px-4 py-3 font-[family-name:var(--font-inter)] font-medium text-[14px] text-white tracking-[-0.04em]">
              Let&apos;s talk
            </button>
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

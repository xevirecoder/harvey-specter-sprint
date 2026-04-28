import HeroNav from "./components/HeroNav";

const heroPhotoUrl = "/pexels-vazhnik-7562188 2.png";
const aboutPhotoUrl = "/image 26.png";

// Shared text classes for the large editorial lines
const line =
  "font-[family-name:var(--font-inter)] font-light text-[32px] md:text-[6.67vw] text-black uppercase tracking-[-0.08em] leading-[0.84] whitespace-nowrap";

export default function Home() {
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
    </>
  );
}

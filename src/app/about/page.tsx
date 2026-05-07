import HeroNav from "../components/HeroNav";
import FooterSection from "../components/FooterSection";
import PhotoBreakSection from "../components/PhotoBreakSection";
import AboutHeroText from "../components/AboutHeroText";
import AboutStory from "../components/AboutStory";
import AboutExpertise from "../components/AboutExpertise";

const photoBreakUrl = "/pexels-vazhnik-7562188 3.png";
const portraitUrl   = "/image 26.png";

const expertise = [
  {
    n: "01",
    name: "Creative Direction",
    desc: "Vision, concept development and art direction across brand campaigns, editorials and digital experiences.",
  },
  {
    n: "02",
    name: "Photography",
    desc: "Commercial and editorial photography with a focus on portraiture, architecture and lifestyle.",
  },
  {
    n: "03",
    name: "Brand Identity",
    desc: "From naming and strategy through to visual identity systems built to last.",
  },
  {
    n: "04",
    name: "Web Design",
    desc: "Design-led digital products and marketing sites with a strong focus on motion and experience.",
  },
  {
    n: "05",
    name: "Art Direction",
    desc: "Directing shoots, teams and creative partners to deliver cohesive, high-impact visual output.",
  },
];

const stats = [
  { value: "8+",   label: "Years in industry"   },
  { value: "50+",  label: "Clients worldwide"   },
  { value: "120+", label: "Projects delivered"  },
  { value: "3×",   label: "Award winning"       },
];

export default function About() {
  return (
    <>
      <div className="relative z-[1]" style={{ paddingBottom: "var(--footer-height, 0px)" }}>

        {/* ── Hero ── */}
        <section
          data-navbar-dark="true"
          className="relative bg-black min-h-[100svh] flex flex-col px-4 md:px-8"
        >
          <HeroNav />
          <AboutHeroText />
        </section>

        {/* ── Story ── */}
        <AboutStory src={portraitUrl} />

        {/* ── Photo break ── */}
        <PhotoBreakSection src={photoBreakUrl} />

        {/* ── Philosophy ── */}
        <section className="bg-white px-4 py-16 md:px-8 md:py-[120px]">
          <div className="flex flex-col gap-12">

            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">
                  [ Philosophy ]
                </span>
                <span className="font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] leading-[1.1]">
                  003
                </span>
              </div>
              <div className="h-px w-full bg-[#1f1f1f]" />
            </div>

            <p className="font-[family-name:var(--font-inter)] font-light text-[32px] md:text-[6.67vw] text-black uppercase tracking-[-0.08em] leading-[0.84]">
              Great design is not<br className="hidden md:block" />{" "}
              about decoration —<br className="hidden md:block" />{" "}
              it&apos;s about intention.
            </p>

            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-end md:gap-16">
              <p className="font-[family-name:var(--font-inter)] text-[14px] text-[#1f1f1f] leading-[1.5] tracking-[-0.02em] md:max-w-[393px]">
                Every project begins with listening — understanding not just the brief, but the story behind it.
                I believe the best creative work happens when strategy and aesthetics are inseparable.
              </p>
              <p className="font-[family-name:var(--font-inter)] text-[14px] text-[#1f1f1f] leading-[1.5] tracking-[-0.02em] md:max-w-[393px]">
                My approach is rooted in restraint. Removing everything that doesn&apos;t serve the work,
                until what remains is inevitable.
              </p>
            </div>

          </div>
        </section>

        {/* ── Expertise ── */}
        <AboutExpertise items={expertise} />

        {/* ── Numbers ── */}
        <section className="bg-[#f3f3f3] px-4 py-16 md:px-8 md:py-[120px]">
          <div className="flex flex-col gap-12">

            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">
                  [ In Numbers ]
                </span>
                <span className="font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] leading-[1.1]">
                  005
                </span>
              </div>
              <div className="h-px w-full bg-[#1f1f1f]" />
            </div>

            <div className="grid grid-cols-2 gap-px bg-[#1f1f1f] md:grid-cols-4">
              {stats.map(({ value, label }) => (
                <div key={label} className="flex flex-col gap-3 p-6 md:p-8 bg-[#f3f3f3]">
                  <span className="font-[family-name:var(--font-inter)] font-light text-[56px] md:text-[96px] text-black uppercase tracking-[-0.08em] leading-none">
                    {value}
                  </span>
                  <span className="font-[family-name:var(--font-geist-mono)] text-[12px] text-[#1f1f1f] uppercase leading-[1.3]">
                    {label}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </section>

      </div>

      <FooterSection />
    </>
  );
}

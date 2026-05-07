import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";
import HeroNav from "../components/HeroNav";
import FooterSection from "../components/FooterSection";
import PhotoBreakSection from "../components/PhotoBreakSection";
import ServicesHeroText from "../components/ServicesHeroText";
import ServicesDetailSection from "../components/ServicesDetailSection";
import ProcessSection from "../components/ProcessSection";
import MagneticButton from "../components/MagneticButton";

type ServiceItem = {
  _id: string;
  name: string;
  description: string;
  imageUrl: string | null;
  order: number;
};

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

const photoBreakUrl = "/pexels-vazhnik-7562188 2.png";

export default async function Services() {
  const { data: serviceDocs } = await sanityFetch({ query: SERVICES_QUERY });
  const services = serviceDocs as ServiceItem[];

  return (
    <>
      <div className="relative z-[1]" style={{ paddingBottom: "var(--footer-height, 0px)" }}>

        {/* ── Hero ── */}
        <section
          data-navbar-dark="true"
          className="relative bg-black min-h-[100svh] flex flex-col px-4 md:px-8"
        >
          <HeroNav />
          <ServicesHeroText />
        </section>

        {/* ── Services detail ── */}
        <ServicesDetailSection services={services} />

        {/* ── Photo break ── */}
        <PhotoBreakSection src={photoBreakUrl} />

        {/* ── Process ── */}
        <ProcessSection />

        {/* ── CTA panel ── */}
        <section className="bg-black px-4 py-16 md:px-8 md:py-[120px]" data-navbar-dark="true">
          <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">

            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between md:justify-start md:gap-6">
                  <span className="font-[family-name:var(--font-geist-mono)] text-[14px] text-white/60 uppercase leading-[1.1]">
                    [ Start a project ]
                  </span>
                </div>
                <div className="h-px w-full bg-white/20" />
              </div>

              <h2 className="font-[family-name:var(--font-inter)] font-light text-[48px] md:text-[6.5vw] text-white uppercase tracking-[-0.07em] leading-[0.86]">
                Ready to<br />build something<br />remarkable?
              </h2>
            </div>

            <MagneticButton className="self-start md:self-end rounded-full bg-white text-black px-6 py-4 font-[family-name:var(--font-inter)] font-medium text-sm tracking-[-0.04em]">
              Let&apos;s talk
            </MagneticButton>

          </div>
        </section>

      </div>

      <FooterSection />
    </>
  );
}

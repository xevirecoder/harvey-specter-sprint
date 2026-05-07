import HeroSection from "./components/HeroSection";
import EditorialSection from "./components/EditorialSection";
import AboutPhoto from "./components/AboutPhoto";
import AboutBioBox from "./components/AboutBioBox";
import PhotoBreakSection from "./components/PhotoBreakSection";
import TestimonialsSlider from "./components/TestimonialsSlider";
import TestimonialsDesktop from "./components/TestimonialsDesktop";
import ServicesSection from "./components/ServicesSection";
import PortfolioSection from "./components/PortfolioSection";
import NewsSection from "./components/NewsSection";
import FooterSection from "./components/FooterSection";
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
    <div className="relative z-[1]" style={{ paddingBottom: "var(--footer-height, 0px)" }}>
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

      <ServicesSection services={services} />

      <PortfolioSection projects={p} />

      {/* ── Testimonials section ── */}
      <section className="bg-[#fafafa] overflow-hidden">

        {/* Mobile layout */}
        <div className="md:hidden py-16 flex flex-col gap-8">
          <h2 className="px-4 text-center font-[family-name:var(--font-inter)] font-medium text-[64px] text-black capitalize tracking-[-0.07em] leading-[0.8]">
            Testimonials
          </h2>
          <TestimonialsSlider testimonials={testimonials} />
        </div>

        <TestimonialsDesktop testimonials={testimonials} />

      </section>

      <NewsSection articles={newsArticles} />
    </div>

    <FooterSection />
    </>
  );
}

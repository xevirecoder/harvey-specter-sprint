import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";
import HeroNav from "../components/HeroNav";
import FooterSection from "../components/FooterSection";
import NewsHeroText from "../components/NewsHeroText";
import NewsArticlesGrid from "../components/NewsArticlesGrid";
import MagneticButton from "../components/MagneticButton";

type NewsItem = {
  _id: string;
  title: string;
  slug: string | null;
  description: string;
  imageUrl: string;
  link: string | null;
  publishedAt: string | null;
};

const NEWS_QUERY = defineQuery(`
  *[_type == "news"] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    imageUrl,
    link,
    publishedAt
  }
`);

export default async function NewsPage() {
  const { data: newsDocs } = await sanityFetch({ query: NEWS_QUERY });
  const articles = newsDocs as NewsItem[];

  return (
    <>
      <div className="relative z-[1]" style={{ paddingBottom: "var(--footer-height, 0px)" }}>

        {/* ── Hero ── */}
        <section
          data-navbar-dark="true"
          className="relative bg-black min-h-[100svh] flex flex-col px-4 md:px-8"
        >
          <HeroNav />
          <NewsHeroText count={articles.length} />
        </section>

        {/* ── Articles grid ── */}
        <NewsArticlesGrid articles={articles} />

        {/* ── CTA panel ── */}
        <section className="bg-black px-4 py-16 md:px-8 md:py-[120px]" data-navbar-dark="true">
          <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">

            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <span className="font-[family-name:var(--font-geist-mono)] text-[14px] text-white/60 uppercase leading-[1.1]">
                  [ Work with us ]
                </span>
                <div className="h-px w-full bg-white/20" />
              </div>
              <h2 className="font-[family-name:var(--font-inter)] font-light text-[48px] md:text-[6.5vw] text-white uppercase tracking-[-0.07em] leading-[0.86]">
                Ready to make<br />your own<br />headlines?
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

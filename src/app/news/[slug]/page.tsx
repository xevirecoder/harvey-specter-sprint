import { notFound } from "next/navigation";
import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";
import { client } from "@/sanity/lib/client";
import HeroNav from "../../components/HeroNav";
import FooterSection from "../../components/FooterSection";
import NewsArticleHero from "../../components/NewsArticleHero";
import MagneticButton from "../../components/MagneticButton";

type BlockChild = { _type: string; text?: string; marks?: string[] };
type Block = { _type: string; _key: string; style?: string; children?: BlockChild[] };

type NewsArticle = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  imageUrl: string;
  link: string | null;
  publishedAt: string | null;
  body: Block[] | null;
};

type NavItem = { slug: string; title: string };

const ARTICLE_QUERY = defineQuery(`
  *[_type == "news" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    imageUrl,
    link,
    publishedAt,
    body
  }
`);

const ALL_SLUGS_QUERY = defineQuery(`
  *[_type == "news"] | order(order asc) {
    "slug": slug.current,
    title
  }
`);

export async function generateStaticParams() {
  const data = await client.fetch(ALL_SLUGS_QUERY);
  return (data as NavItem[])
    .filter((a) => a.slug)
    .map((a) => ({ slug: a.slug }));
}

function renderBody(body: Block[]) {
  return body.map((block) => {
    if (block._type !== "block" || !block.children) return null;

    const text = block.children.map((child) => child.text ?? "").join("");
    const style = block.style ?? "normal";

    if (style === "h2") {
      return (
        <h2 key={block._key} className="font-[family-name:var(--font-inter)] font-bold text-[28px] md:text-[36px] text-black tracking-[-0.04em] leading-[1.1] mt-10 mb-4">
          {text}
        </h2>
      );
    }
    if (style === "h3") {
      return (
        <h3 key={block._key} className="font-[family-name:var(--font-inter)] font-bold text-[22px] md:text-[28px] text-black tracking-[-0.03em] leading-[1.2] mt-8 mb-3">
          {text}
        </h3>
      );
    }
    if (style === "blockquote") {
      return (
        <blockquote key={block._key} className="border-l-2 border-black pl-6 my-6">
          <p className="font-[family-name:var(--font-inter)] font-light italic text-[20px] md:text-[24px] text-black/70 tracking-[-0.03em] leading-[1.4]">
            {text}
          </p>
        </blockquote>
      );
    }
    if (!text.trim()) return <div key={block._key} className="h-4" />;

    return (
      <p key={block._key} className="font-[family-name:var(--font-inter)] text-[16px] md:text-[18px] text-[#1f1f1f] leading-[1.7] tracking-[-0.02em]">
        {text}
      </p>
    );
  });
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [{ data: article }, { data: allSlugs }] = await Promise.all([
    sanityFetch({ query: ARTICLE_QUERY, params: { slug } }),
    sanityFetch({ query: ALL_SLUGS_QUERY }),
  ]);

  if (!article) notFound();

  const a = article as NewsArticle;
  const all = (allSlugs as NavItem[]).filter((x) => x.slug);
  const currentIdx = all.findIndex((x) => x.slug === slug);
  const next = all[(currentIdx + 1) % all.length];

  return (
    <>
      <div className="relative z-[1]" style={{ paddingBottom: "var(--footer-height, 0px)" }}>

        {/* ── Hero ── */}
        <section data-navbar-dark="true" className="relative bg-black">
          <HeroNav />
          <NewsArticleHero title={a.title} publishedAt={a.publishedAt} imageUrl={a.imageUrl} />
        </section>

        {/* ── Article body ── */}
        <section className="bg-white px-4 py-16 md:px-8 md:py-[120px]">
          <div className="flex flex-col gap-12 md:flex-row md:gap-16 md:justify-between">

            {/* Left: meta sidebar */}
            <div className="flex flex-col gap-6 shrink-0 md:w-[220px] md:pt-2">
              {a.publishedAt && (
                <div className="flex flex-col gap-1">
                  <span className="font-[family-name:var(--font-geist-mono)] text-[11px] text-[#1f1f1f]/40 uppercase leading-[1.3]">Published</span>
                  <span className="font-[family-name:var(--font-inter)] text-[14px] text-black tracking-[-0.02em]">
                    {new Date(a.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                  </span>
                </div>
              )}
              {a.link && (
                <div className="flex flex-col gap-1">
                  <span className="font-[family-name:var(--font-geist-mono)] text-[11px] text-[#1f1f1f]/40 uppercase leading-[1.3]">Source</span>
                  <a
                    href={a.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-[family-name:var(--font-inter)] text-[14px] text-black underline underline-offset-2 tracking-[-0.02em] break-all"
                  >
                    Read original
                  </a>
                </div>
              )}
            </div>

            {/* Right: content */}
            <div className="flex-1 md:max-w-[720px]">
              {/* Lead description */}
              <p className="font-[family-name:var(--font-inter)] text-[20px] md:text-[26px] text-black leading-[1.45] tracking-[-0.03em] mb-10 font-light">
                {a.description}
              </p>

              {/* Divider */}
              <div className="h-px w-full bg-[#1f1f1f]/15 mb-10" />

              {/* Body blocks */}
              {a.body && a.body.length > 0 ? (
                <div className="flex flex-col gap-5">
                  {renderBody(a.body)}
                </div>
              ) : (
                <p className="font-[family-name:var(--font-inter)] text-[16px] text-[#1f1f1f]/40 italic">
                  Full article content coming soon.
                </p>
              )}
            </div>

          </div>
        </section>

        {/* ── Next article ── */}
        {next && next.slug !== slug && (
          <section className="bg-[#f3f3f3] px-4 py-16 md:px-8 md:py-[120px]">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f]/60 uppercase leading-[1.1]">
                    [ Next Article ]
                  </span>
                </div>
                <div className="h-px w-full bg-[#1f1f1f]/20" />
              </div>
              <a
                href={`/news/${next.slug}`}
                className="group flex items-center justify-between gap-4"
              >
                <p className="font-[family-name:var(--font-inter)] font-medium text-[28px] md:text-[4.5vw] text-black uppercase tracking-[-0.05em] leading-[0.9]">
                  {next.title}
                </p>
                <svg className="shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" width="40" height="40" viewBox="0 0 32 32" fill="none">
                  <path d="M9 23L23 9M23 9H12M23 9V20" stroke="#1f1f1f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </section>
        )}

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

import { notFound } from "next/navigation";
import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";
import { client } from "@/sanity/lib/client";
import HeroNav from "../../components/HeroNav";
import FooterSection from "../../components/FooterSection";
import ProjectDetailHero from "../../components/ProjectDetailHero";
import ProjectGallery from "../../components/ProjectGallery";
import ProjectNextNav from "../../components/ProjectNextNav";
import MagneticButton from "../../components/MagneticButton";

type GalleryItem = {
  url: string | null;
  caption: string | null;
};

type Project = {
  _id: string;
  title: string;
  slug: string;
  tags: string[];
  imageUrl: string | null;
  description: string | null;
  client: string | null;
  year: number | null;
  gallery: GalleryItem[];
};

const PROJECT_QUERY = defineQuery(`
  *[_type == "portfolio" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    tags,
    "imageUrl": select(
      defined(coverImage.asset) => coverImage.asset->url,
      externalImageUrl
    ),
    description,
    client,
    year,
    "gallery": gallery[] {
      "url": select(
        defined(image.asset) => image.asset->url,
        externalUrl
      ),
      caption
    }
  }
`);

const ALL_SLUGS_QUERY = defineQuery(`
  *[_type == "portfolio"] | order(order asc) {
    "slug": slug.current,
    title,
    "imageUrl": select(
      defined(coverImage.asset) => coverImage.asset->url,
      externalImageUrl
    )
  }
`);

export async function generateStaticParams() {
  const data = await client.fetch(ALL_SLUGS_QUERY);
  return (data as { slug: string }[]).map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [{ data: project }, { data: allSlugs }] = await Promise.all([
    sanityFetch({ query: PROJECT_QUERY, params: { slug } }),
    sanityFetch({ query: ALL_SLUGS_QUERY }),
  ]);

  if (!project) notFound();

  const p = project as Project;
  const all = allSlugs as { slug: string; title: string; imageUrl: string | null }[];

  // Find next project (wraps around)
  const currentIdx = all.findIndex((x) => x.slug === slug);
  const next = all[(currentIdx + 1) % all.length];

  const gallery: GalleryItem[] = Array.isArray(p.gallery) ? p.gallery : [];

  return (
    <>
      <div className="relative z-[1]" style={{ paddingBottom: "var(--footer-height, 0px)" }}>

        {/* ── Hero ── */}
        <section data-navbar-dark="true" className="relative bg-black">
          <HeroNav />
          <ProjectDetailHero
            title={p.title}
            tags={p.tags ?? []}
            year={p.year ?? null}
            client={p.client ?? null}
            imageUrl={p.imageUrl ?? null}
          />
        </section>

        {/* ── Overview ── */}
        <section className="bg-white px-4 py-16 md:px-8 md:py-[120px]">
          <div className="flex flex-col gap-12">

            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">
                  [ Overview ]
                </span>
                {p.year && (
                  <span className="font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] leading-[1.1]">
                    {p.year}
                  </span>
                )}
              </div>
              <div className="h-px w-full bg-[#1f1f1f]" />
            </div>

            <div className="flex flex-col gap-8 md:flex-row md:justify-between md:gap-16">
              {/* Left: meta */}
              <div className="flex flex-col gap-6 shrink-0 md:w-[260px]">
                {p.client && (
                  <div className="flex flex-col gap-1">
                    <span className="font-[family-name:var(--font-geist-mono)] text-[11px] text-[#1f1f1f]/40 uppercase leading-[1.3]">
                      Client
                    </span>
                    <span className="font-[family-name:var(--font-inter)] text-[16px] text-black tracking-[-0.03em]">
                      {p.client}
                    </span>
                  </div>
                )}
                {p.tags?.length > 0 && (
                  <div className="flex flex-col gap-1">
                    <span className="font-[family-name:var(--font-geist-mono)] text-[11px] text-[#1f1f1f]/40 uppercase leading-[1.3]">
                      Services
                    </span>
                    <div className="flex flex-col gap-0.5">
                      {p.tags.map((tag) => (
                        <span key={tag} className="font-[family-name:var(--font-inter)] text-[16px] text-black tracking-[-0.03em]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right: description */}
              <div className="flex-1 md:max-w-[680px]">
                {p.description ? (
                  <p className="font-[family-name:var(--font-inter)] text-[18px] md:text-[22px] text-black leading-[1.5] tracking-[-0.03em]">
                    {p.description}
                  </p>
                ) : (
                  <p className="font-[family-name:var(--font-inter)] text-[18px] md:text-[22px] text-[#1f1f1f]/40 leading-[1.5] tracking-[-0.03em] italic">
                    Project description coming soon.
                  </p>
                )}
              </div>
            </div>

          </div>
        </section>

        {/* ── Gallery ── */}
        {gallery.length > 0 && <ProjectGallery images={gallery} />}

        {/* ── CTA panel ── */}
        <section className="bg-black px-4 py-16 md:px-8 md:py-[120px]" data-navbar-dark="true">
          <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <span className="font-[family-name:var(--font-geist-mono)] text-[14px] text-white/60 uppercase leading-[1.1]">
                  [ Start a project ]
                </span>
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

        {/* ── Next project ── */}
        {next && next.slug !== slug && (
          <ProjectNextNav
            nextSlug={next.slug}
            nextTitle={next.title}
            nextImageUrl={next.imageUrl}
          />
        )}

      </div>

      <FooterSection />
    </>
  );
}

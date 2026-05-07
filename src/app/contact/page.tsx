import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";
import HeroNav from "../components/HeroNav";
import FooterSection from "../components/FooterSection";
import ContactHeroText from "../components/ContactHeroText";
import ContactSection from "../components/ContactSection";

const CONTACT_PAGE_QUERY = defineQuery(`
  *[_type == "contactPage"][0] {
    heroHeading,
    heroSubheading,
    email,
    phone,
    location,
    availability,
    formSectionLabel,
  }
`);

export default async function Contact() {
  const { data } = await sanityFetch({ query: CONTACT_PAGE_QUERY });

  return (
    <>
      <div className="relative z-[1]" style={{ paddingBottom: "var(--footer-height, 0px)" }}>

        {/* Hero */}
        <section
          data-navbar-dark="true"
          className="relative bg-black min-h-[100svh] flex flex-col px-4 md:px-8"
        >
          <HeroNav />
          <ContactHeroText
            heading={data?.heroHeading ?? "Let’s start something."}
            subheading={data?.heroSubheading ?? undefined}
          />
        </section>

        {/* Contact info + form */}
        <ContactSection
          email={data?.email ?? "hello@h.studio"}
          phone={data?.phone ?? undefined}
          location={data?.location ?? undefined}
          availability={data?.availability ?? undefined}
          formSectionLabel={data?.formSectionLabel ?? undefined}
        />

      </div>

      <FooterSection />
    </>
  );
}

"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import MagneticButton from "./MagneticButton";

gsap.registerPlugin(useGSAP);

const navLinks: { label: string; href: string }[] = [
  { label: "About",    href: "/about"    },
  { label: "Services", href: "/services"  },
  { label: "Projects", href: "/projects"  },
  { label: "News",     href: "/news"     },
  { label: "Contact",  href: "/#contact" },
];

export default function HeroNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const fixedNavRef   = useRef<HTMLElement>(null);
  const overlayRef    = useRef<HTMLDivElement>(null);
  const menuHeaderRef = useRef<HTMLDivElement>(null);
  const menuLinksRef  = useRef<(HTMLAnchorElement | null)[]>([]);
  const menuCtaRef    = useRef<HTMLButtonElement>(null);
  const tlRef         = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const check = () => {
      const navH = fixedNavRef.current?.offsetHeight ?? 72;
      const darkSections = document.querySelectorAll("[data-navbar-dark]");
      let dark = false;
      darkSections.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < navH && r.bottom > 0) dark = true;
      });
      setIsDark(dark);
    };
    window.addEventListener("scroll", check, { passive: true });
    check();
    return () => window.removeEventListener("scroll", check);
  }, []);

  useGSAP(() => {
    if (!overlayRef.current) return;
    tlRef.current?.kill();

    const links = menuLinksRef.current.filter(Boolean) as HTMLAnchorElement[];
    const tl = gsap.timeline();
    tl.fromTo(overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: "power2.out" }
      )
      .fromTo(menuHeaderRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" },
        "-=0.25"
      )
      .fromTo(links,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.07, ease: "power2.out" },
        "-=0.2"
      )
      .fromTo(menuCtaRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" },
        "-=0.15"
      );

    tlRef.current = tl;
  }, { dependencies: [menuOpen] });

  const closeMenu = () => {
    if (tlRef.current) {
      tlRef.current.eventCallback("onReverseComplete", () => setMenuOpen(false));
      tlRef.current.reverse();
    } else {
      setMenuOpen(false);
    }
  };

  const onLinkEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget.querySelector(".nav-underline"), {
      width: "100%", duration: 0.3, ease: "power2.out",
    });
  };
  const onLinkLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget.querySelector(".nav-underline"), {
      width: 0, duration: 0.25, ease: "power2.inOut",
    });
  };

  return (
    <>
      <nav
        ref={fixedNavRef}
        className={`fixed top-0 left-0 right-0 z-50 flex shrink-0 items-center justify-between py-6 px-4 md:px-8 transition-colors duration-300 ${isDark ? "text-white" : "text-black"}`}
      >
        <a href="/" className="font-[family-name:var(--font-inter)] font-semibold text-base capitalize tracking-[-0.04em]">
          H.Studio
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-14 font-[family-name:var(--font-inter)] font-semibold text-base capitalize tracking-[-0.04em]">
          {navLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="relative pb-0.5"
              onMouseEnter={onLinkEnter}
              onMouseLeave={onLinkLeave}
            >
              {label}
              <span className="nav-underline absolute bottom-0 left-0 h-px w-0 bg-current" />
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <MagneticButton
          className={`hidden md:inline-flex items-center justify-center rounded-full px-4 py-3 font-[family-name:var(--font-inter)] font-medium text-sm tracking-[-0.04em] transition-colors duration-300 ${
            isDark ? "bg-white text-black" : "bg-black text-white"
          }`}
        >
          Let&apos;s talk
        </MagneticButton>

        {/* Mobile hamburger */}
        <button
          className="md:hidden"
          aria-label="Open navigation"
          onClick={() => setMenuOpen(true)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </button>
      </nav>

      {/* Invisible spacer — keeps the hero section's flex layout intact */}
      <div className="shrink-0 flex items-center py-6 opacity-0 pointer-events-none select-none" aria-hidden="true">
        <span className="font-[family-name:var(--font-inter)] font-semibold text-base">H.Studio</span>
      </div>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-50 flex flex-col bg-black px-4 py-6 md:hidden"
          style={{ opacity: 0 }}
        >
          <div
            ref={menuHeaderRef}
            className="flex shrink-0 items-center justify-between"
            style={{ opacity: 0 }}
          >
            <a href="/" className="font-[family-name:var(--font-inter)] font-semibold text-base capitalize tracking-[-0.04em] text-white">
              H.Studio
            </a>
            <button aria-label="Close navigation" onClick={closeMenu} className="text-white">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex flex-1 flex-col justify-center gap-8">
            {navLinks.map(({ label, href }, i) => (
              <a
                key={label}
                ref={(el) => { menuLinksRef.current[i] = el; }}
                href={href}
                onClick={closeMenu}
                className="font-[family-name:var(--font-inter)] font-light text-[48px] capitalize tracking-[-0.04em] text-white leading-none"
                style={{ opacity: 0 }}
              >
                {label}
              </a>
            ))}
          </div>

          <MagneticButton
            ref={menuCtaRef}
            className="self-start rounded-full border border-white px-4 py-3 font-[family-name:var(--font-inter)] font-medium text-sm text-white tracking-[-0.04em]"
            style={{ opacity: 0 }}
          >
            Let&apos;s talk
          </MagneticButton>
        </div>
      )}
    </>
  );
}

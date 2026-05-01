"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import MagneticButton from "./MagneticButton";

gsap.registerPlugin(useGSAP);

const navLinks = ["About", "Services", "Projects", "News", "Contact"];

export default function HeroNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  const overlayRef   = useRef<HTMLDivElement>(null);
  const menuHeaderRef = useRef<HTMLDivElement>(null);
  const menuLinksRef  = useRef<(HTMLAnchorElement | null)[]>([]);
  const menuCtaRef    = useRef<HTMLButtonElement>(null);
  const tlRef         = useRef<gsap.core.Timeline | null>(null);

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
      scaleX: 1, duration: 0.3, ease: "power2.out",
    });
  };
  const onLinkLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget.querySelector(".nav-underline"), {
      scaleX: 0, duration: 0.25, ease: "power2.inOut",
    });
  };

  return (
    <>
      <nav className="flex shrink-0 items-center justify-between py-6">
        <span className="font-[family-name:var(--font-inter)] font-semibold text-base capitalize tracking-[-0.04em] text-black">
          H.Studio
        </span>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-14 font-[family-name:var(--font-inter)] font-semibold text-base capitalize tracking-[-0.04em] text-black">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="relative pb-0.5"
              onMouseEnter={onLinkEnter}
              onMouseLeave={onLinkLeave}
            >
              {link}
              <span
                className="nav-underline absolute bottom-0 left-0 h-px w-full bg-current"
                style={{ transform: "scaleX(0)", transformOrigin: "left" }}
              />
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <MagneticButton className="hidden md:inline-flex items-center justify-center rounded-full bg-black px-4 py-3 font-[family-name:var(--font-inter)] font-medium text-sm text-white tracking-[-0.04em]">
          Let&apos;s talk
        </MagneticButton>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-black"
          aria-label="Open navigation"
          onClick={() => setMenuOpen(true)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </button>
      </nav>

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
            <span className="font-[family-name:var(--font-inter)] font-semibold text-base capitalize tracking-[-0.04em] text-white">
              H.Studio
            </span>
            <button aria-label="Close navigation" onClick={closeMenu} className="text-white">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex flex-1 flex-col justify-center gap-8">
            {navLinks.map((link, i) => (
              <a
                key={link}
                ref={(el) => { menuLinksRef.current[i] = el; }}
                href={`#${link.toLowerCase()}`}
                onClick={closeMenu}
                className="font-[family-name:var(--font-inter)] font-light text-[48px] capitalize tracking-[-0.04em] text-white leading-none"
                style={{ opacity: 0 }}
              >
                {link}
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

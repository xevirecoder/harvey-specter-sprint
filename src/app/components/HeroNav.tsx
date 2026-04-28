"use client";

import { useState } from "react";

const navLinks = ["About", "Services", "Projects", "News", "Contact"];

export default function HeroNav() {
  const [menuOpen, setMenuOpen] = useState(false);

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
              className="transition-opacity hover:opacity-60"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <button className="hidden md:inline-flex items-center justify-center rounded-full bg-black px-4 py-3 font-[family-name:var(--font-inter)] font-medium text-sm text-white tracking-[-0.04em]">
          Let&apos;s talk
        </button>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-black"
          aria-label="Open navigation"
          onClick={() => setMenuOpen(true)}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </button>
      </nav>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-black px-4 py-6 md:hidden">
          {/* Top row */}
          <div className="flex items-center justify-between shrink-0">
            <span className="font-[family-name:var(--font-inter)] font-semibold text-base capitalize tracking-[-0.04em] text-white">
              H.Studio
            </span>
            <button
              aria-label="Close navigation"
              onClick={() => setMenuOpen(false)}
              className="text-white"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Nav links */}
          <div className="flex flex-1 flex-col justify-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                className="font-[family-name:var(--font-inter)] font-light text-[48px] capitalize tracking-[-0.04em] text-white leading-none transition-opacity hover:opacity-60"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Bottom CTA */}
          <button className="self-start rounded-full border border-white px-4 py-3 font-[family-name:var(--font-inter)] font-medium text-sm text-white tracking-[-0.04em]">
            Let&apos;s talk
          </button>
        </div>
      )}
    </>
  );
}

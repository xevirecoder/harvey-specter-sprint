'use client';

import { useState } from 'react';

function parseRotateDeg(s: string): number {
  const m = s.match(/rotate-\[(\d+(?:\.\d+)?)deg\]/);
  if (!m) return 0;
  return s.startsWith('-') ? -parseFloat(m[1]) : parseFloat(m[1]);
}

type Testimonial = {
  _id: string;
  name: string;
  quote: string;
  logoSrc: string;
  logoW: number;
  logoH: number;
  desktopRotate: string;
};

export default function TestimonialsSlider({ testimonials }: { testimonials: Testimonial[] }) {
  const [current, setCurrent] = useState(0);

  return (
    <div className="flex flex-col gap-6">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {testimonials.map((t) => (
            <div key={t._id} className="shrink-0 w-full px-10 py-8">
              <div
                className="bg-[#f1f1f1] border border-[#ddd] rounded-[4px] p-6 flex flex-col gap-4"
                style={{ transform: `rotate(${parseRotateDeg(t.desktopRotate ?? '')}deg)` }}
              >
                <img
                  src={t.logoSrc}
                  alt=""
                  aria-hidden="true"
                  style={{ width: t.logoW, height: t.logoH }}
                  className="shrink-0 object-contain object-left"
                />
                <p className="font-[family-name:var(--font-inter)] font-normal text-[18px] text-[#1f1f1f] leading-[1.3] tracking-[-0.04em]">
                  {t.quote}
                </p>
                <p className="font-[family-name:var(--font-inter)] font-black text-[16px] text-black uppercase tracking-[-0.04em] leading-[1.1]">
                  {t.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center gap-2">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to testimonial ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current ? 'w-6 bg-black' : 'w-2 bg-[#ccc]'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

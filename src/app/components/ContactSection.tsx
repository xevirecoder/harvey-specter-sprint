"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Props = {
  email: string;
  phone?: string;
  location?: string;
  availability?: string;
  formSectionLabel?: string;
};

type FormState = "idle" | "sending" | "success" | "error";

export default function ContactSection({
  email,
  phone,
  location,
  availability,
  formSectionLabel = "Send a message",
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [state, setState] = useState<FormState>("idle");

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    gsap.fromTo(
      el.querySelectorAll(".cs-reveal"),
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 80%" },
      }
    );
  }, { scope: ref });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("sending");
    try {
      await new Promise((r) => setTimeout(r, 800));
      window.location.href = `mailto:${email}?subject=Project Enquiry from ${encodeURIComponent(form.name)}&body=${encodeURIComponent(form.message)}%0A%0A— ${encodeURIComponent(form.name)} (${encodeURIComponent(form.email)})`;
      setState("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setState("error");
    }
  }

  const inputClass =
    "w-full bg-transparent border-b border-[#1f1f1f] py-4 font-[family-name:var(--font-inter)] text-[14px] text-[#1f1f1f] placeholder-[#1f1f1f]/40 tracking-[-0.02em] outline-none focus:border-black transition-colors";

  return (
    <section ref={ref} className="bg-white px-4 py-16 md:px-8 md:py-[120px]">
      <div className="flex flex-col gap-12">

        {/* Section header */}
        <div className="cs-reveal flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">
              [ Get in touch ]
            </span>
            <span className="font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] leading-[1.1]">
              002
            </span>
          </div>
          <div className="h-px w-full bg-[#1f1f1f]" />
        </div>

        {/* Two-column layout */}
        <div className="flex flex-col gap-16 md:flex-row md:gap-8">

          {/* Left: contact details */}
          <div className="flex flex-col gap-10 md:w-1/2 md:max-w-[480px]">

            <div className="cs-reveal flex flex-col gap-2">
              <span className="font-[family-name:var(--font-geist-mono)] text-[11px] text-[#1f1f1f]/50 uppercase leading-[1.1] tracking-[0.08em]">
                Email
              </span>
              <a
                href={`mailto:${email}`}
                className="font-[family-name:var(--font-inter)] font-light text-[24px] md:text-[32px] text-black tracking-[-0.05em] leading-[1] hover:opacity-60 transition-opacity"
              >
                {email}
              </a>
            </div>

            {phone && (
              <div className="cs-reveal flex flex-col gap-2">
                <span className="font-[family-name:var(--font-geist-mono)] text-[11px] text-[#1f1f1f]/50 uppercase leading-[1.1] tracking-[0.08em]">
                  Phone
                </span>
                <a
                  href={`tel:${phone}`}
                  className="font-[family-name:var(--font-inter)] font-light text-[24px] md:text-[32px] text-black tracking-[-0.05em] leading-[1] hover:opacity-60 transition-opacity"
                >
                  {phone}
                </a>
              </div>
            )}

            {location && (
              <div className="cs-reveal flex flex-col gap-2">
                <span className="font-[family-name:var(--font-geist-mono)] text-[11px] text-[#1f1f1f]/50 uppercase leading-[1.1] tracking-[0.08em]">
                  Location
                </span>
                <p className="font-[family-name:var(--font-inter)] font-light text-[24px] md:text-[32px] text-black tracking-[-0.05em] leading-[1]">
                  {location}
                </p>
              </div>
            )}

            {availability && (
              <div className="cs-reveal mt-auto">
                <div className="inline-flex items-center gap-2 border border-[#1f1f1f]/20 rounded-full px-4 py-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                  <span className="font-[family-name:var(--font-geist-mono)] text-[12px] text-[#1f1f1f] uppercase leading-[1.1]">
                    {availability}
                  </span>
                </div>
              </div>
            )}

          </div>

          {/* Right: form */}
          <div className="cs-reveal flex flex-col gap-8 md:flex-1">

            <p className="font-[family-name:var(--font-inter)] font-light italic text-[18px] text-[#1f1f1f]/60 tracking-[-0.04em] leading-[1.2]">
              {formSectionLabel}
            </p>

            {state === "success" ? (
              <div className="flex flex-col gap-4 py-12">
                <p className="font-[family-name:var(--font-inter)] font-medium text-[24px] text-black tracking-[-0.04em]">
                  Message sent.
                </p>
                <p className="font-[family-name:var(--font-inter)] text-[14px] text-[#1f1f1f]/60 leading-[1.5]">
                  Your mail client should have opened. I&apos;ll get back to you shortly.
                </p>
                <button
                  onClick={() => setState("idle")}
                  className="self-start font-[family-name:var(--font-inter)] text-[14px] text-black underline underline-offset-4 mt-2"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-0">

                <input
                  required
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className={inputClass}
                />
                <input
                  required
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email address"
                  className={inputClass}
                />
                <textarea
                  required
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project"
                  rows={5}
                  className={`${inputClass} resize-none`}
                />

                {state === "error" && (
                  <p className="font-[family-name:var(--font-geist-mono)] text-[12px] text-red-500 mt-4 uppercase">
                    Something went wrong — please try again.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={state === "sending"}
                  className="self-start mt-8 border border-black rounded-[24px] px-6 py-3 font-[family-name:var(--font-inter)] font-medium text-[14px] text-black tracking-[-0.04em] hover:bg-black hover:text-white transition-colors disabled:opacity-40"
                >
                  {state === "sending" ? "Opening mail…" : "Send message →"}
                </button>

              </form>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}

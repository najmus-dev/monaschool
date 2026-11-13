"use client";

import { useGSAP } from "@gsap/react";
import { ArrowRightIcon } from "@phosphor-icons/react/ssr";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const pathways = [
  {
    step: "01",
    title: "Start your license",
    body: "63-hour sales pre-license education — classroom, livestream, or self-paced.",
    href: "/florida-real-estate?topic=get-license#courses",
    cta: "View pre-license",
    tone: "cream" as const,
  },
  {
    step: "02",
    title: "Stay current",
    body: "Post-license, 14-hour CE, Core Law, Ethics, and reactivation when you need them.",
    href: "/florida-real-estate?topic=continuing-education#courses",
    cta: "View renewals",
    tone: "cream" as const,
  },
  {
    step: "03",
    title: "Advance to broker",
    body: "Broker pre-license and post-license management education for the next stage.",
    href: "/florida-real-estate?topic=become-broker#courses",
    cta: "View broker path",
    tone: "gold" as const,
  },
] as const;

export function FloridaPathways() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      const items = gsap.utils.toArray<HTMLElement>("[data-pathway]", rootRef.current);
      gsap.set(items, { autoAlpha: 0, y: 40, rotateX: 6 });
      gsap.to(items, {
        autoAlpha: 1,
        y: 0,
        rotateX: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 78%",
          once: true,
        },
      });
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} className="bg-[#F7F3EE] pt-16 sm:pt-20 md:pt-24">
      <div className="mx-auto w-full max-w-[90rem] px-4 sm:px-6 lg:px-8">
        <div className="max-w-[40rem]">
          <div className="flex items-center gap-2.5">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
              <path d="M0 0H12L0 12V0Z" fill="#C08430" />
            </svg>
            <p className="text-[0.78rem] font-bold uppercase tracking-[0.12em] text-black">
              Your pathway
            </p>
          </div>
          <h2 className="mt-4 font-sans text-[clamp(1.85rem,3.2vw,2.45rem)] font-bold tracking-[-0.02em] text-black">
            Choose where you are in your Florida career
          </h2>
          <p className="mt-3 text-[1.05rem] leading-7 text-[#746C66]">
            Clear stages from first license through renewal and broker
            advancement — then filter the catalog to match.
          </p>
        </div>

        <ol className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5 [perspective:1200px]">
          {pathways.map((item) => {
            const gold = item.tone === "gold";
            return (
              <li key={item.step} data-pathway className="[transform-style:preserve-3d]">
                <Link
                  href={item.href}
                  className={`group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-panel)] px-6 py-8 transition-transform duration-300 hover:-translate-y-1 ${
                    gold
                      ? "bg-[#C08430] text-[#001830] shadow-[0_20px_44px_rgba(192,132,48,0.28)]"
                      : "border border-black/10 bg-white text-black shadow-[0_14px_36px_rgba(0,24,48,0.06)]"
                  }`}
                >
                  <span
                    className={`font-sans text-[0.75rem] font-bold uppercase tracking-[0.14em] ${
                      gold ? "text-[#001830]/70" : "text-[#C08430]"
                    }`}
                  >
                    Stage {item.step}
                  </span>
                  <h3 className="mt-5 font-sans text-[1.35rem] font-bold leading-snug tracking-[-0.02em]">
                    {item.title}
                  </h3>
                  <p
                    className={`mt-3 flex-1 text-[0.95rem] leading-7 ${
                      gold ? "text-[#001830]/80" : "text-[#746C66]"
                    }`}
                  >
                    {item.body}
                  </p>
                  <span className="mt-8 inline-flex items-center gap-2 text-[0.92rem] font-bold">
                    {item.cta}
                    <ArrowRightIcon
                      size={16}
                      weight="bold"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden
                    />
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

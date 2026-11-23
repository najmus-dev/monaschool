"use client";

import Image from "next/image";
import { useRef } from "react";
import { site } from "@/content/site";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

function SectionMark() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M0 0H12L0 12V0Z" fill="#C08430" />
    </svg>
  );
}

export function AboutHero() {
  const copy = site.about;
  const rootRef = useRef<HTMLElement>(null);
  useScrollReveal(rootRef, { start: "top 90%", y: 20, stagger: 0.1 });

  return (
    <section ref={rootRef} className="relative isolate overflow-hidden">
      <div className="relative min-h-[18rem] sm:min-h-[20rem] md:min-h-[22rem] lg:min-h-[24rem]">
        <Image
          src={copy.heroImage}
          alt={copy.heroImageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_28%]"
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.45)_42%,rgba(0,0,0,0.12)_72%,transparent_100%)]"
          aria-hidden
        />

        <div className="relative mx-auto flex min-h-[23rem] w-full max-w-[90rem] items-end px-4 pb-12 pt-[calc(6.25rem+4.25rem)] sm:min-h-[25rem] sm:px-6 sm:pb-14 sm:pt-[calc(6.5rem+4.75rem)] md:min-h-[28rem] lg:min-h-[31rem] lg:px-8 lg:pb-16">
          <div className="max-w-[40rem]">
            <div data-reveal className="flex items-center gap-2.5">
              <SectionMark />
              <p className="text-[0.78rem] font-bold uppercase tracking-[0.14em] text-white">
                About us
              </p>
            </div>

            <h1
              data-reveal
              className="mt-5 max-w-[16ch] font-sans text-[2rem] font-bold uppercase leading-[1.05] tracking-[-0.025em] text-white sm:text-[2.55rem] md:text-[3rem]"
            >
              {copy.heroTitle}
            </h1>

            <p
              data-reveal
              className="mt-4 max-w-[34rem] text-[0.98rem] leading-7 text-white/88 sm:text-[1.05rem] sm:leading-7"
            >
              {copy.lede}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

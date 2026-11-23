"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

function SectionMark() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M0 0H12L0 12V0Z" fill="#C08430" />
    </svg>
  );
}

export function CategoryMediaHero({
  breadcrumb,
  label,
  title,
  lede,
  image,
  imageAlt,
  imagePosition = "center 42%",
  ctaHref,
  ctaLabel,
}: {
  breadcrumb: string;
  label: string;
  title: string;
  lede: string;
  image: string;
  imageAlt: string;
  imagePosition?: string;
  ctaHref?: string;
  ctaLabel?: string;
}) {
  const rootRef = useRef<HTMLElement>(null);
  useScrollReveal(rootRef, { start: "top 90%", y: 20, stagger: 0.08 });

  return (
    <section ref={rootRef} className="relative isolate overflow-hidden">
      <div className="relative min-h-[22rem] sm:min-h-[24rem] md:min-h-[26rem] lg:min-h-[28rem]">
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: imagePosition }}
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(105deg,rgba(0,24,48,0.9)_0%,rgba(0,36,72,0.72)_36%,rgba(0,36,72,0.28)_70%,rgba(0,24,48,0.16)_100%)]"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.3)_0%,transparent_38%,rgba(0,0,0,0.38)_100%)]"
          aria-hidden
        />

        <div className="relative mx-auto flex min-h-[27rem] w-full max-w-[90rem] items-end px-4 pb-12 pt-[calc(6.25rem+4rem)] sm:min-h-[29rem] sm:px-6 sm:pb-14 sm:pt-[calc(6.5rem+4.5rem)] md:min-h-[32rem] lg:min-h-[35rem] lg:px-8 lg:pb-16">
          <div className="max-w-[42rem]">
            <nav
              data-reveal
              aria-label="Breadcrumb"
              className="text-[0.78rem] text-white/75"
            >
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link href="/" className="transition-colors hover:text-white">
                    Home
                  </Link>
                </li>
                <li aria-hidden className="text-white/40">
                  /
                </li>
                <li className="text-white">{breadcrumb}</li>
              </ol>
            </nav>

            <div data-reveal className="mt-5 flex items-center gap-2.5">
              <SectionMark />
              <p className="text-[0.78rem] font-bold uppercase tracking-[0.14em] text-white">
                {label}
              </p>
            </div>

            <h1
              data-reveal
              className="mt-4 font-sans text-[2.1rem] font-bold uppercase leading-[1.05] tracking-[-0.025em] text-white sm:text-[2.6rem] md:text-[3rem]"
            >
              {title}
            </h1>
            <p
              data-reveal
              className="mt-4 max-w-[38rem] text-[1rem] leading-7 text-white/88 sm:text-[1.05rem] sm:leading-8"
            >
              {lede}
            </p>
            {ctaHref && ctaLabel ? (
              <a
                data-reveal
                href={ctaHref}
                className="mt-7 inline-flex h-11 items-center rounded-[var(--radius-control)] bg-white px-5 text-[0.9rem] font-bold text-[#002448] transition-colors hover:bg-[#C08430] hover:text-[#001830]"
              >
                {ctaLabel}
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

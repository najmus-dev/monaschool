"use client";

import { useGSAP } from "@gsap/react";
import { ArrowRightIcon } from "@phosphor-icons/react/ssr";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const quickLinks = [
  {
    label: "Get licensed",
    href: "/florida-real-estate?topic=get-license#courses",
  },
  {
    label: "Stay current",
    href: "/florida-real-estate?topic=continuing-education#courses",
  },
  {
    label: "Become a broker",
    href: "/florida-real-estate?topic=become-broker#courses",
  },
  {
    label: "Talk to the school",
    href: "/contact?interest=course-question&path=florida-real-estate",
  },
] as const;

export function FloridaHero({
  title,
  lede,
}: {
  title: string;
  lede: string;
}) {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const copy = gsap.utils.toArray<HTMLElement>("[data-fre-hero]", rootRef.current);
      const media = rootRef.current?.querySelector<HTMLElement>("[data-fre-media]");
      const tiles = gsap.utils.toArray<HTMLElement>("[data-fre-tile]", rootRef.current);

      if (reduced) {
        gsap.set([copy, tiles], { clearProps: "all" });
        return;
      }

      gsap.set(copy, { autoAlpha: 0, y: 28 });
      gsap.set(tiles, { autoAlpha: 0, y: 36 });
      if (media) gsap.set(media, { scale: 1.08 });

      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      if (media) {
        intro.to(media, { scale: 1, duration: 1.35 }, 0);
      }
      intro
        .to(copy, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.09 }, 0.2)
        .to(tiles, { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.07 }, 0.45);

      if (media) {
        gsap.to(media, {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} className="relative isolate bg-[#001830]">
      <div className="relative min-h-[min(92vh,46rem)] overflow-hidden pt-[4.25rem]">
        <div data-fre-media className="absolute inset-0 will-change-transform">
          <Image
            src="/images/path-earn-home.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_30%]"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-[#001830]/88 via-[#001830]/62 to-[#001830]/28"
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-[#001830]/75 via-transparent to-[#001830]/35"
            aria-hidden
          />
        </div>

        <div className="relative mx-auto flex min-h-[min(78vh,38rem)] w-full max-w-[90rem] flex-col justify-end px-4 pb-28 pt-16 sm:px-6 sm:pb-32 md:pb-36 lg:px-8">
          <nav
            data-fre-hero
            aria-label="Breadcrumb"
            className="text-[0.8rem] text-white/65"
          >
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="transition-colors hover:text-white">
                  Home
                </Link>
              </li>
              <li aria-hidden className="text-white/35">
                /
              </li>
              <li className="text-white">Florida Real Estate</li>
            </ol>
          </nav>

          <div data-fre-hero className="mt-8 flex items-center gap-2.5">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
              <path d="M0 0H12L0 12V0Z" fill="#C08430" />
            </svg>
            <p className="text-[0.78rem] font-bold uppercase tracking-[0.14em] text-[#C08430]">
              Choose professional growth
            </p>
          </div>

          <h1
            data-fre-hero
            className="mt-4 max-w-[18ch] font-sans text-[clamp(2.35rem,5.5vw,4.25rem)] font-bold uppercase leading-[0.98] tracking-[-0.03em] text-white"
          >
            {title}
          </h1>

          <p
            data-fre-hero
            className="mt-5 max-w-[34rem] text-[1.05rem] leading-7 text-white/78 sm:text-[1.12rem] sm:leading-8"
          >
            {lede}
          </p>

          <div data-fre-hero className="mt-8 flex flex-wrap gap-3">
            <a
              href="#courses"
              className="inline-flex h-12 items-center gap-2 rounded-[var(--radius-control)] bg-[#C08430] px-6 text-[0.92rem] font-bold text-[#001830] transition-colors hover:bg-white"
            >
              Browse courses
              <ArrowRightIcon size={16} weight="bold" aria-hidden />
            </a>
            <Link
              href="/contact?interest=course-question&path=florida-real-estate"
              className="inline-flex h-12 items-center rounded-[var(--radius-control)] border border-white/35 bg-white/5 px-6 text-[0.92rem] font-bold text-white backdrop-blur-sm transition-colors hover:border-white hover:bg-white hover:text-[#001830]"
            >
              Ask the school
            </Link>
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto -mt-16 w-full max-w-[90rem] px-4 sm:-mt-20 sm:px-6 lg:px-8">
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {quickLinks.map((item) => (
            <li key={item.label} data-fre-tile>
              <Link
                href={item.href}
                className="group flex h-full items-center justify-between gap-3 rounded-[var(--radius-panel)] border border-white/15 bg-white/92 px-5 py-5 shadow-[0_18px_40px_rgba(0,24,48,0.18)] backdrop-blur-md transition-colors hover:border-[#C08430]/55 hover:bg-white"
              >
                <span className="font-sans text-[0.98rem] font-bold text-[#001830]">
                  {item.label}
                </span>
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#002448] text-white transition-transform duration-300 group-hover:translate-x-0.5 group-hover:bg-[#C08430] group-hover:text-[#001830]">
                  <ArrowRightIcon size={15} weight="bold" aria-hidden />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

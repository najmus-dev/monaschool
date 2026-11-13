"use client";

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

export function SimplePageHero({
  breadcrumb,
  label,
  title,
  lede,
  align = "left",
}: {
  breadcrumb: string;
  label: string;
  title: string;
  lede: string;
  align?: "left" | "center";
}) {
  const centered = align === "center";
  const rootRef = useRef<HTMLDivElement>(null);
  useScrollReveal(rootRef, { start: "top 92%", y: 18, stagger: 0.08 });

  return (
    <div ref={rootRef} className="bg-[#F7F3EE]">
      <div className="mx-auto w-full max-w-[90rem] px-4 pb-12 pt-[calc(4.25rem+2rem)] sm:px-6 md:pb-14 md:pt-[calc(4.25rem+2.5rem)] lg:px-8">
        <nav
          data-reveal
          aria-label="Breadcrumb"
          className="text-[0.8rem] text-[#746C66]"
        >
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link
                href="/"
                className="transition-colors hover:text-[#222222]"
              >
                Home
              </Link>
            </li>
            <li aria-hidden className="text-[#746C66]/50">
              /
            </li>
            <li className="text-[#222222]">{breadcrumb}</li>
          </ol>
        </nav>

        <div
          className={`mt-10 max-w-[44rem] md:mt-12 ${centered ? "mx-auto text-center" : ""}`}
        >
          <div
            data-reveal
            className={`flex items-center gap-2.5 ${centered ? "justify-center" : ""}`}
          >
            <SectionMark />
            <p className="text-[0.78rem] font-bold uppercase tracking-[0.12em] text-[#222222]">
              {label}
            </p>
          </div>
          <h1
            data-reveal
            className="mt-4 font-sans text-[2.35rem] font-bold uppercase leading-[1.05] tracking-[-0.02em] text-[#222222] sm:text-[2.9rem] md:text-[3.25rem]"
          >
            {title}
          </h1>
          <p
            data-reveal
            className={`mt-5 text-[1.05rem] leading-7 text-[#746C66] sm:text-[1.1rem] sm:leading-8 ${centered ? "mx-auto max-w-[34rem]" : "max-w-[38rem]"}`}
          >
            {lede}
          </p>
        </div>
      </div>
    </div>
  );
}

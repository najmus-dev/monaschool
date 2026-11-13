"use client";

import { useGSAP } from "@gsap/react";
import { ArrowRightIcon } from "@phosphor-icons/react/ssr";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const steps = [
  {
    id: "pre",
    title: "Complete required hours",
    body: "Match the published hour path — 63 for sales pre-license, 45 for sales post-license, 14 for later renewals, or broker hours when you advance.",
  },
  {
    id: "format",
    title: "Pick your study format",
    body: "Self-paced when your schedule shifts. Livestream or classroom when you want live instruction. Correspondence for selected CE.",
  },
  {
    id: "enroll",
    title: "Enroll on the partner site",
    body: "Open the course page for tuition and format options, then enroll on the partner site for video, exams, and payment.",
  },
  {
    id: "next",
    title: "Confirm the next DBPR step",
    body: "Use the school for course questions. Licensing decisions, fingerprints, and exams remain with DBPR and Pearson VUE.",
  },
] as const;

export function FloridaJourney() {
  const rootRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      gsap.from("[data-journey-media]", {
        autoAlpha: 0,
        x: 40,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 75%",
          once: true,
        },
      });
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} className="bg-white">
      <div className="mx-auto grid w-full max-w-[90rem] gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:items-center md:gap-14 md:py-20 lg:gap-20 lg:px-8 lg:py-24">
        <div>
          <div className="flex items-center gap-2.5">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
              <path d="M0 0H12L0 12V0Z" fill="#C08430" />
            </svg>
            <p className="text-[0.78rem] font-bold uppercase tracking-[0.12em] text-[#C08430]">
              How it works
            </p>
          </div>
          <h2 className="mt-4 font-sans text-[clamp(1.85rem,3.2vw,2.45rem)] font-bold tracking-[-0.02em] text-black">
            From course selection to enrollment
          </h2>
          <p className="mt-3 max-w-[34rem] text-[1.02rem] leading-7 text-[#746C66]">
            A short path through this site — interactive steps, then the catalog
            when you are ready to compare courses.
          </p>

          <ol className="mt-8 space-y-0 border-t border-black/10">
            {steps.map((step, index) => {
              const open = active === index;
              return (
                <li key={step.id} className="border-b border-black/10">
                  <button
                    type="button"
                    onClick={() => setActive(index)}
                    onMouseEnter={() => setActive(index)}
                    className="group flex w-full items-start gap-4 py-5 text-left"
                    aria-expanded={open}
                  >
                    <span
                      className={`mt-0.5 font-sans text-[0.85rem] font-extrabold tabular-nums tracking-[-0.02em] transition-colors ${
                        open ? "text-[#C08430]" : "text-black/35"
                      }`}
                    >
                      0{index + 1}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span
                        className={`block font-sans text-[1.08rem] font-bold tracking-[-0.01em] transition-colors ${
                          open ? "text-black" : "text-black/70 group-hover:text-black"
                        }`}
                      >
                        {step.title}
                      </span>
                      <span
                        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                          open
                            ? "grid-rows-[1fr] opacity-100"
                            : "grid-rows-[0fr] opacity-0"
                        }`}
                      >
                        <span className="overflow-hidden">
                          <span className="mt-2 block text-[0.95rem] leading-7 text-[#746C66]">
                            {step.body}
                          </span>
                        </span>
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>

          <Link
            href="#courses"
            className="mt-8 inline-flex h-12 items-center gap-2 rounded-[var(--radius-control)] bg-[#002448] px-6 text-[0.9rem] font-bold text-white transition-colors hover:bg-black"
          >
            Open the catalog
            <ArrowRightIcon size={16} weight="bold" aria-hidden />
          </Link>
        </div>

        <div
          data-journey-media
          className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-media)] sm:aspect-[5/6] md:aspect-auto md:min-h-[32rem]"
        >
          <Image
            src="/images/classroom.jpg"
            alt="Students in a professional classroom setting"
            fill
            sizes="(max-width: 768px) 100vw, 45vw"
            className="object-cover"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-[#001830]/45 via-transparent to-transparent"
            aria-hidden
          />
          <div className="absolute bottom-5 left-5 right-5 rounded-[var(--radius-panel)] border border-white/20 bg-white/92 p-5 backdrop-blur-md sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-[16rem]">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.12em] text-[#C08430]">
              Step 0{active + 1}
            </p>
            <p className="mt-2 font-sans text-[1.05rem] font-bold text-[#001830]">
              {steps[active].title}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

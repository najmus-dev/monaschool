"use client";

import { useGSAP } from "@gsap/react";
import { ArrowRightIcon } from "@phosphor-icons/react/ssr";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useRef } from "react";
import { site } from "@/content/site";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const details = [
  {
    title: "Hour paths",
    body: "63-hour sales pre-license, 45-hour post-license, 14-hour CE, reactivation, and broker hour tracks listed by course.",
  },
  {
    title: "Formats",
    body: "Self-paced, livestream, classroom, and correspondence where the course allows it.",
  },
  {
    title: "Enrollment",
    body: "Course pages explain tuition by format. Video, exams, and payment open on the partner site.",
  },
  {
    title: "School contact",
    body: `Call the office at ${site.school.phoneDisplay} before you choose a renewal or broker path.`,
  },
  {
    title: "The institute",
    body: site.school.licenseLine,
  },
] as const;

export function FloridaDetails() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      const cards = gsap.utils.toArray<HTMLElement>("[data-detail-card]", rootRef.current);
      gsap.from(cards, {
        autoAlpha: 0,
        y: 28,
        duration: 0.55,
        stagger: 0.08,
        ease: "power2.out",
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
    <section ref={rootRef} className="bg-[#F7F3EE]">
      <div className="mx-auto w-full max-w-[90rem] px-4 py-16 sm:px-6 md:py-20 lg:px-8 lg:py-24">
        <div className="max-w-[40rem]">
          <div className="flex items-center gap-2.5">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
              <path d="M0 0H12L0 12V0Z" fill="#C08430" />
            </svg>
            <p className="text-[0.78rem] font-bold uppercase tracking-[0.12em] text-[#C08430]">
              Course details
            </p>
          </div>
          <h2 className="mt-4 font-sans text-[clamp(1.85rem,3.2vw,2.45rem)] font-bold tracking-[-0.02em] text-black">
            What to expect before you enroll
          </h2>
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {details.map((item) => (
            <li
              key={item.title}
              data-detail-card
              className="rounded-[var(--radius-panel)] border border-black/8 bg-white p-6 shadow-[0_10px_28px_rgba(0,24,48,0.04)]"
            >
              <h3 className="font-sans text-[1.08rem] font-bold text-black">
                {item.title}
              </h3>
              <p className="mt-3 text-[0.94rem] leading-7 text-[#746C66]">
                {item.body}
              </p>
            </li>
          ))}

          <li
            data-detail-card
            className="flex flex-col justify-between rounded-[var(--radius-panel)] bg-[#002448] p-6 text-white shadow-[0_18px_40px_rgba(0,36,72,0.28)] sm:col-span-2 lg:col-span-1"
          >
            <div>
              <h3 className="font-sans text-[1.15rem] font-bold">
                Ready to get started?
              </h3>
              <p className="mt-3 text-[0.94rem] leading-7 text-white/75">
                Browse the catalog, open a course page, and enroll when the
                format and tuition look right.
              </p>
            </div>
            <Link
              href="#courses"
              className="mt-8 inline-flex items-center gap-2 text-[0.92rem] font-bold text-[#C08430] transition-colors hover:text-white"
            >
              Back to courses
              <ArrowRightIcon size={16} weight="bold" aria-hidden />
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}

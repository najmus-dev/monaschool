"use client";

import { useGSAP } from "@gsap/react";
import {
  ArrowRightIcon,
  ChalkboardTeacherIcon,
  DesktopIcon,
  EnvelopeSimpleIcon,
  HouseIcon,
} from "@phosphor-icons/react/ssr";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const formats = [
  {
    title: "Self-paced",
    body: "Study online on your schedule. Enroll when you are ready and confirm tuition on the partner site.",
    icon: DesktopIcon,
  },
  {
    title: "Livestream",
    body: "Live online sessions with an instructor. Request the next published dates through the school.",
    icon: ChalkboardTeacherIcon,
  },
  {
    title: "In person",
    body: "Classroom sessions at the school when dates are confirmed. Ideal for face-to-face learning.",
    icon: HouseIcon,
  },
] as const;

export function FloridaFormats() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      const cards = gsap.utils.toArray<HTMLElement>("[data-format-card]", rootRef.current);
      gsap.from(cards, {
        autoAlpha: 0,
        y: 36,
        duration: 0.65,
        stagger: 0.1,
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
    <section ref={rootRef} className="bg-[#eef2f6]">
      <div className="mx-auto w-full max-w-[90rem] px-4 py-16 sm:px-6 md:py-20 lg:px-8 lg:py-24">
        <div className="max-w-[38rem]">
          <div className="flex items-center gap-2.5">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
              <path d="M0 0H12L0 12V0Z" fill="#C08430" />
            </svg>
            <p className="text-[0.78rem] font-bold uppercase tracking-[0.12em] text-black">
              How you study
            </p>
          </div>
          <h2 className="mt-4 font-sans text-[clamp(1.85rem,3.2vw,2.45rem)] font-bold tracking-[-0.02em] text-black">
            Formats that fit professional schedules
          </h2>
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {formats.map((item) => {
            const Icon = item.icon;
            return (
              <li
                key={item.title}
                data-format-card
                className="rounded-[var(--radius-panel)] border border-black/8 bg-white p-6 shadow-[0_12px_32px_rgba(0,24,48,0.05)] transition-transform duration-300 hover:-translate-y-1"
              >
                <Icon size={28} weight="duotone" className="text-[#C08430]" aria-hidden />
                <h3 className="mt-5 font-sans text-[1.12rem] font-bold text-black">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-[0.92rem] leading-7 text-[#746C66]">
                  {item.body}
                </p>
              </li>
            );
          })}

          <li
            data-format-card
            className="flex flex-col justify-between rounded-[var(--radius-panel)] bg-[#C08430] p-6 shadow-[0_18px_40px_rgba(192,132,48,0.28)] transition-transform duration-300 hover:-translate-y-1"
          >
            <div>
              <EnvelopeSimpleIcon
                size={28}
                weight="duotone"
                className="text-[#001830]"
                aria-hidden
              />
              <h3 className="mt-5 font-sans text-[1.12rem] font-bold text-[#001830]">
                Need a recommendation?
              </h3>
              <p className="mt-2.5 text-[0.92rem] leading-7 text-[#001830]/78">
                Tell us where you are in the license cycle. We will point you to
                the matching course and format.
              </p>
            </div>
            <Link
              href="/contact?interest=course-question&path=florida-real-estate"
              className="mt-8 inline-flex items-center gap-2 text-[0.92rem] font-bold text-[#001830]"
            >
              Contact the school
              <ArrowRightIcon size={16} weight="bold" aria-hidden />
            </Link>
          </li>
        </ul>

        <p className="mt-8 max-w-[40rem] text-[0.92rem] leading-7 text-[#746C66]">
          Correspondence is available for selected continuing education. Confirm
          eligibility and course numbers before you enroll.
        </p>
      </div>
    </section>
  );
}

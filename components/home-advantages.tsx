"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function BriefcaseIcon() {
  return (
    <svg width="96" height="96" viewBox="0 0 48 48" fill="none" aria-hidden>
      <path
        d="M16 18V14.5C16 12.567 17.567 11 19.5 11H28.5C30.433 11 32 12.567 32 14.5V18"
        stroke="#002448"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <rect x="9" y="18" width="30" height="22" rx="3" fill="#002448" />
      <path
        d="M9 26H39"
        stroke="#C08430"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PeopleIcon() {
  return (
    <svg width="96" height="96" viewBox="0 0 48 48" fill="none" aria-hidden>
      <circle cx="29.5" cy="16" r="5.5" stroke="#C08430" strokeWidth="2.2" />
      <path
        d="M38.5 34.5C38.5 29.8056 34.6944 26 30 26C28.7606 26 27.5905 26.266 26.545 26.741"
        stroke="#C08430"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <circle cx="19" cy="17" r="6.5" fill="#002448" />
      <path
        d="M8 36.5C8 30.701 12.701 26 18.5 26C24.299 26 29 30.701 29 36.5"
        fill="#002448"
      />
    </svg>
  );
}

function LearningIcon() {
  return (
    <svg width="96" height="96" viewBox="0 0 48 48" fill="none" aria-hidden>
      <rect
        x="8"
        y="10"
        width="32"
        height="26"
        rx="3"
        stroke="#002448"
        strokeWidth="2.2"
      />
      <rect x="14" y="16" width="20" height="14" rx="1.5" fill="#C08430" />
      <path
        d="M18 42H30"
        stroke="#002448"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M24 36V42"
        stroke="#002448"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function GrowthIcon() {
  return (
    <svg width="96" height="96" viewBox="0 0 48 48" fill="none" aria-hidden>
      <path
        d="M10 38V28"
        stroke="#002448"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <path
        d="M19 38V22"
        stroke="#002448"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <path
        d="M28 38V16"
        stroke="#002448"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <path
        d="M35.8 8.6L37.1 12.2L40.9 12.5L37.9 15L38.9 18.7L35.8 16.7L32.7 18.7L33.7 15L30.7 12.5L34.5 12.2L35.8 8.6Z"
        fill="#C08430"
      />
    </svg>
  );
}

function SectionMark() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M0 0H12L0 12V0Z" fill="#C08430" />
    </svg>
  );
}

const advantages = [
  {
    title: "Real world training",
    body: "Build practical skills through real estate scenarios that reflect the realities of Florida licensing and practice.",
    Icon: BriefcaseIcon,
  },
  {
    title: "Personalised support",
    body: "Get clear guidance from the school when you need help choosing a course, format, or next step in your path.",
    Icon: PeopleIcon,
  },
  {
    title: "Flexible learning",
    body: "Develop capability through flexible formats designed to fit around modern work and life commitments.",
    Icon: LearningIcon,
  },
  {
    title: "Professional growth",
    body: "Build knowledge that supports your growth — from licensing through professional and international learning.",
    Icon: GrowthIcon,
  },
] as const;

export function HomeAdvantages() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      const heading = gsap.utils.toArray<HTMLElement>("[data-adv-heading]", rootRef.current);
      const cards = gsap.utils.toArray<HTMLElement>("[data-adv-card]", rootRef.current);
      const icons = gsap.utils.toArray<HTMLElement>("[data-adv-icon]", rootRef.current);

      gsap.set(heading, { autoAlpha: 0, y: 28 });
      gsap.set(cards, { autoAlpha: 0, y: 40 });
      gsap.set(icons, { autoAlpha: 0, scale: 0.55, transformOrigin: "left center" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 78%",
          once: true,
        },
      });

      tl.to(heading, {
        autoAlpha: 1,
        y: 0,
        duration: 0.55,
        stagger: 0.08,
        ease: "power2.out",
      })
        .to(
          cards,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.2",
        )
        .to(
          icons,
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.55,
            stagger: 0.1,
            ease: "back.out(1.6)",
          },
          "-=0.45",
        );
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} className="bg-[#F8F5F0]">
      <div className="mx-auto w-full max-w-[90rem] px-4 py-16 sm:px-6 md:py-20 lg:px-8 lg:py-24">
        <div data-adv-heading className="flex items-center gap-2.5">
          <SectionMark />
          <p className="text-[0.8rem] font-bold uppercase tracking-[0.12em] text-black">
            Choose REIB Institute
          </p>
        </div>

        <h2
          data-adv-heading
          className="mt-5 font-sans text-[2.15rem] font-semibold leading-[1.15] tracking-[-0.02em] text-black sm:text-[2.6rem] md:text-[2.9rem]"
        >
          A career long advantage
        </h2>

        <ul className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4 xl:gap-6">
          {advantages.map(({ title, body, Icon }) => (
            <li
              key={title}
              data-adv-card
              className="rounded-[1.5rem] bg-white px-7 pb-10 pt-8 shadow-[0_8px_30px_rgba(0,0,0,0.05)]"
            >
              <span data-adv-icon className="inline-flex scale-90 sm:scale-100">
                <Icon />
              </span>
              <h3 className="mt-6 font-sans text-[1.125rem] font-bold leading-snug text-black sm:mt-8">
                {title}
              </h3>
              <p className="mt-3 max-w-none text-[0.9375rem] font-normal leading-[1.55] text-[#555555] sm:max-w-[16.5rem]">
                {body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

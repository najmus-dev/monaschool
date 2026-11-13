"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { site } from "@/content/site";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function HomeQuestions() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      const copy = gsap.utils.toArray<HTMLElement>(
        "[data-questions-copy]",
        rootRef.current,
      );
      gsap.set(copy, { autoAlpha: 0, y: 24 });

      gsap.to(copy, {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 80%",
          once: true,
        },
      });
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} className="relative isolate overflow-hidden">
      <Image
        src="/images/leo-cussen-footer-chat-supervisor.webp"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-[center_42%]"
      />
      <div className="absolute inset-0 bg-[#001830]/55" aria-hidden />

      <div className="relative mx-auto flex min-h-[18rem] max-w-[90rem] flex-col items-center justify-center px-4 py-16 text-center sm:min-h-[24rem] sm:px-6 sm:py-20 md:min-h-[26rem] md:py-24">
        <p
          data-questions-copy
          className="max-w-[38rem] text-[1.05rem] font-medium leading-[1.65] text-white sm:text-[1.125rem] sm:leading-[1.7]"
        >
          Our team is here to help. Call the school or send a message to get the
          answers you need.
        </p>
        <div
          data-questions-copy
          className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          <a
            href={`tel:${site.school.phoneTel}`}
            className="inline-flex h-11 items-center rounded-[var(--radius-control)] bg-white px-6 text-[0.9rem] font-bold text-[#002448] transition-colors hover:bg-[#C08430]"
          >
            Call the school
          </a>
          <Link
            href="/contact?interest=course-question"
            className="inline-flex h-11 items-center rounded-[var(--radius-control)] border border-white/50 bg-transparent px-6 text-[0.9rem] font-bold text-white transition-colors hover:bg-white hover:text-[#002448]"
          >
            Send a message
          </Link>
        </div>
      </div>
    </section>
  );
}

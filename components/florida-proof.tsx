"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { site } from "@/content/site";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function FloridaProof({ courseCount }: { courseCount: number }) {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      const rows = gsap.utils.toArray<HTMLElement>("[data-proof-row]", rootRef.current);
      gsap.from(rows, {
        autoAlpha: 0,
        x: 24,
        duration: 0.55,
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

  const facts = [
    { value: `${courseCount}+`, label: "Published Florida courses" },
    { value: "4", label: "Study formats" },
    { value: "63 / 45 / 14", label: "Hour paths on the roster" },
    { value: site.school.city, label: "School city" },
  ];

  return (
    <section ref={rootRef} className="bg-[#C08430]">
      <div className="mx-auto grid w-full max-w-[90rem] gap-10 px-4 py-14 sm:px-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:items-end md:gap-16 md:py-16 lg:px-8">
        <div>
          <p className="text-[0.78rem] font-bold uppercase tracking-[0.12em] text-[#001830]/70">
            Built for Florida practice
          </p>
          <h2 className="mt-4 max-w-[18ch] font-sans text-[clamp(1.85rem,3vw,2.4rem)] font-bold tracking-[-0.02em] text-[#001830]">
            Licensing education with clear hours and open enrollment paths
          </h2>
          <p className="mt-4 max-w-[34rem] text-[1.02rem] leading-7 text-[#001830]/78">
            Pre-license through broker and continuing education — listed with
            formats, tuition cues, and school contact when you need a
            recommendation.
          </p>
        </div>

        <dl className="space-y-0 border-t border-[#001830]/18">
          {facts.map((item) => (
            <div
              key={item.label}
              data-proof-row
              className="flex items-baseline justify-between gap-6 border-b border-[#001830]/18 py-5"
            >
              <dt className="text-[0.92rem] font-medium text-[#001830]/75">
                {item.label}
              </dt>
              <dd className="shrink-0 font-sans text-[1.55rem] font-extrabold tracking-[-0.03em] text-[#001830] sm:text-[1.75rem]">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

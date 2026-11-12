"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";

function SectionMark() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M0 0H12L0 12V0Z" fill="#FFD400" />
    </svg>
  );
}

function QuoteMarks() {
  return (
    <div className="flex items-start gap-[2px]" aria-hidden>
      <svg width="16" height="16" viewBox="0 0 12 12" fill="none">
        <path d="M0 0H12L0 12V0Z" fill="#FFD400" />
      </svg>
      <svg width="16" height="16" viewBox="0 0 12 12" fill="none">
        <path d="M0 0H12L0 12V0Z" fill="#FFD400" />
      </svg>
    </div>
  );
}

const reviews = site.reviews.items;

export function HomeTestimonials() {
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  function syncFromScroll() {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-testimonial-card]");
    const step = card ? card.offsetWidth + 20 : el.clientWidth * 0.8;
    const nextIndex = Math.round(el.scrollLeft / step);
    const maxIndex = Math.max(0, reviews.length - 1);
    const clamped = Math.min(Math.max(nextIndex, 0), maxIndex);
    setIndex(clamped);
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  }

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    syncFromScroll();
    el.addEventListener("scroll", syncFromScroll, { passive: true });
    window.addEventListener("resize", syncFromScroll);
    return () => {
      el.removeEventListener("scroll", syncFromScroll);
      window.removeEventListener("resize", syncFromScroll);
    };
  }, []);

  function scrollByDir(dir: -1 | 1) {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-testimonial-card]");
    const step = card ? card.offsetWidth + 20 : 360;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  }

  const progress = ((index + 1) / reviews.length) * 100;

  return (
    <section className="overflow-hidden bg-[#F8F5F0]">
      <div className="mx-auto w-full max-w-[90rem] px-4 py-16 sm:px-6 md:py-20 lg:px-8 lg:py-24">
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <SectionMark />
            <p className="text-[0.8rem] font-bold uppercase tracking-[0.12em] text-black">
              Testimonials
            </p>
          </div>

          <nav
            className="flex items-center gap-8 sm:gap-10"
            aria-label="Testimonials carousel navigation"
          >
            <div
              className="relative hidden h-[2px] w-40 bg-[#d0ccc4] sm:block sm:w-48 md:w-56"
              aria-hidden
            >
              <span
                className="absolute inset-y-0 left-0 bg-black transition-[width] duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex items-center gap-5">
              <button
                type="button"
                onClick={() => scrollByDir(-1)}
                disabled={!canPrev}
                aria-label="Previous testimonial"
                className="flex items-center justify-center text-black transition-colors disabled:text-[#b0aaa0]"
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M15 5L8 12L15 19"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => scrollByDir(1)}
                disabled={!canNext}
                aria-label="Next testimonial"
                className="flex items-center justify-center text-black transition-colors disabled:text-[#b0aaa0]"
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M9 5L16 12L9 19"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </nav>
        </div>

        <ul
          ref={scrollerRef}
          className="mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mt-10"
        >
          {reviews.map((review) => (
            <li
              key={review.id}
              data-testimonial-card
              className="w-[85%] shrink-0 snap-start sm:w-[70%] md:w-[calc((100%-1.25rem)/2.08)]"
            >
              <blockquote className="flex h-full min-h-[20.5rem] flex-col rounded-[1.15rem] bg-white px-7 pb-7 pt-8 sm:min-h-[22rem] sm:px-8 sm:pt-9">
                <QuoteMarks />
                <p className="mt-7 flex-1 text-[1.05rem] font-medium leading-[1.5] tracking-[-0.015em] text-black sm:text-[1.125rem] sm:leading-[1.5]">
                  {review.quote}
                </p>
                <footer className="mt-8 flex items-end justify-between gap-4">
                  <div className="min-w-0">
                    <cite className="block font-sans text-[0.98rem] font-bold not-italic text-black">
                      {review.name ?? site.ui.sampleStudent}
                    </cite>
                    <span className="mt-0.5 block text-[0.9rem] text-black/55">
                      {review.detail}
                    </span>
                  </div>
                  {review.avatarSrc ? (
                    <div className="relative size-14 shrink-0 overflow-hidden rounded-full">
                      <Image
                        src={review.avatarSrc}
                        alt=""
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </div>
                  ) : null}
                </footer>
              </blockquote>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

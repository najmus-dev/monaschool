"use client";

import { useState } from "react";
import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react/ssr";
import { site } from "@/content/site";

export function HomeReviews() {
  const items = site.reviews.items.slice(0, site.reviews.homeCount);
  const [index, setIndex] = useState(0);
  const review = items[index];

  if (!review || items.length === 0) {
    return null;
  }

  function go(delta: number) {
    setIndex((current) => {
      const next = current + delta;
      if (next < 0) {
        return items.length - 1;
      }
      if (next >= items.length) {
        return 0;
      }
      return next;
    });
  }

  return (
    <section id="reviews" className="border-t border-line bg-paper">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">
            {site.home.reviewsEyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-brand sm:text-4xl">
            {site.home.reviewsTitle}
          </h2>
        </div>

        <div className="relative mx-auto mt-10 max-w-4xl md:mt-12">
          <div className="relative rounded-2xl bg-brand px-3 py-10 text-white shadow-[0_24px_60px_rgb(8_28_44/0.18)] sm:px-6 sm:py-12 md:px-8 md:py-14">
            <div className="flex items-center gap-1 sm:gap-3">
              <button
                type="button"
                className="inline-flex size-10 shrink-0 items-center justify-center text-white/40 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:size-11"
                aria-label="Previous review"
                onClick={() => go(-1)}
              >
                <CaretLeftIcon size={32} weight="regular" aria-hidden />
              </button>

              <div className="min-w-0 flex-1 text-center">
                <figure className="relative mx-auto max-w-2xl">
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -left-1 -top-2 font-display text-[4rem] leading-none text-accent sm:-left-2 sm:-top-3 sm:text-[5rem] md:text-[5.75rem]"
                  >
                    {"\u201C"}
                  </span>
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -bottom-5 -right-1 font-display text-[4rem] leading-none text-accent sm:-bottom-7 sm:-right-2 sm:text-[5rem] md:text-[5.75rem]"
                  >
                    {"\u201D"}
                  </span>

                  <blockquote className="px-7 text-[1.05rem] font-normal italic leading-8 text-white/95 sm:px-10 sm:text-lg sm:leading-9 md:px-12 md:text-[1.2rem] md:leading-9">
                    {review.quote}
                  </blockquote>

                  <figcaption className="mt-8">
                    <p className="text-base font-bold text-white">
                      {site.ui.sampleStudent}
                    </p>
                    <p className="mt-1 text-sm font-normal text-white/75">
                      {review.detail}
                    </p>
                  </figcaption>
                </figure>

                <div className="mt-9 flex items-center justify-center gap-2">
                  {items.map((item, itemIndex) => (
                    <button
                      key={item.id}
                      type="button"
                      aria-label={`Show review ${itemIndex + 1}`}
                      aria-current={itemIndex === index ? "true" : undefined}
                      className={`h-1.5 rounded-full transition-all ${
                        itemIndex === index
                          ? "w-6 bg-accent"
                          : "w-1.5 bg-white/35 hover:bg-white/60"
                      }`}
                      onClick={() => setIndex(itemIndex)}
                    />
                  ))}
                </div>
              </div>

              <button
                type="button"
                className="inline-flex size-10 shrink-0 items-center justify-center text-white/40 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:size-11"
                aria-label="Next review"
                onClick={() => go(1)}
              >
                <CaretRightIcon size={32} weight="regular" aria-hidden />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

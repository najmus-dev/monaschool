"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { site } from "@/content/site";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { BrandMotif } from "./brand-motif";
import { Container } from "./container";

export function HomeLearn() {
  const rootRef = useRef<HTMLElement>(null);
  useScrollReveal(rootRef, { stagger: 0.1 });

  return (
    <section ref={rootRef} className="relative overflow-hidden bg-paper">
      <BrandMotif
        tone="dark"
        className="pointer-events-none absolute -right-28 bottom-[-2rem] hidden h-64 w-[42rem] opacity-50 lg:block"
      />

      <Container className="grid grid-cols-1 items-center gap-14 py-24 md:gap-16 md:py-32 lg:grid-cols-12 lg:gap-12">
        <div
          data-reveal
          className="relative order-2 lg:order-1 lg:col-span-6 xl:col-span-7"
        >
          <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-media)] md:aspect-[5/4]">
            <Image
              src="/images/hero-banner.jpg"
              alt="Adult learners in a classroom during a course session"
              fill
              sizes="(min-width: 1024px) 52vw, 100vw"
              className="object-cover object-[center_40%]"
            />
          </div>
          <Link
            href="/contact?interest=group-training"
            className="absolute bottom-6 left-6 inline-flex h-11 items-center rounded-full bg-accent px-5 text-sm font-semibold text-accent-ink shadow-[0_12px_28px_rgb(201_133_42/0.4)] transition-colors hover:bg-accent-hover"
          >
            {site.home.orgCta}
          </Link>
        </div>

        <div className="relative z-10 order-1 lg:order-2 lg:col-span-6 xl:col-span-5 lg:pl-4">
          <p
            data-reveal
            className="font-display text-[1.05rem] font-semibold text-accent"
          >
            {site.home.learnEyebrow}
          </p>
          <h2
            data-reveal
            className="mt-5 max-w-[16ch] font-display text-[2.35rem] font-bold leading-[1.12] tracking-tight text-brand sm:text-[2.75rem] md:text-[3.1rem] md:leading-[1.08]"
          >
            A place where careers open and businesses learn to grow.
          </h2>
          <p
            data-reveal
            className="mt-7 max-w-[38ch] text-[1.05rem] leading-8 text-ink/80"
          >
            {site.home.learnBody}
          </p>
          <Link
            data-reveal
            href="/about"
            className="mt-10 inline-flex h-11 items-center rounded-full border border-brand/18 bg-surface px-5 text-sm font-semibold text-brand transition-colors hover:border-brand hover:bg-band"
          >
            {site.home.learnCta}
          </Link>
        </div>
      </Container>
    </section>
  );
}

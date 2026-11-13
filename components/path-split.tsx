"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

type PathSplitItem = {
  title: string;
  body: string;
  href: string;
  cta: string;
  image: string;
  imageAlt: string;
};

export function PathSplit({ items }: { items: PathSplitItem[] }) {
  const rootRef = useRef<HTMLElement>(null);
  useScrollReveal(rootRef, { stagger: 0.12, y: 24 });

  return (
    <section ref={rootRef} className="grid grid-cols-1 lg:grid-cols-2">
      {items.map((item) => (
        <article
          key={item.title}
          data-reveal
          className="relative isolate min-h-[22rem] overflow-hidden sm:min-h-[26rem]"
        >
          <Image
            src={item.image}
            alt={item.imageAlt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover object-center"
          />
          <div
            className="absolute inset-0 bg-[linear-gradient(105deg,rgb(255_255_255/0.94)_0%,rgb(255_255_255/0.78)_28%,rgb(255_255_255/0.35)_52%,rgb(255_255_255/0.08)_72%,transparent_100%)]"
            aria-hidden
          />
          <div className="relative flex h-full min-h-[22rem] items-center px-7 py-12 sm:min-h-[26rem] sm:px-12 lg:px-14">
            <div className="w-full max-w-[24rem]">
              <h2 className="font-display text-[1.75rem] font-bold leading-[1.15] tracking-tight text-brand sm:text-[2.1rem]">
                {item.title}
              </h2>
              <p className="mt-4 text-[0.95rem] leading-7 text-[#526578] sm:text-base">
                {item.body}
              </p>
              <div className="mt-8">
                <Link
                  href={item.href}
                  className="inline-flex min-h-[3.15rem] items-center justify-center rounded-md bg-accent px-8 text-[0.95rem] font-bold text-ink transition-colors hover:bg-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
                >
                  {item.cta}
                </Link>
              </div>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}

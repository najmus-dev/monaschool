"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";

gsap.registerPlugin(useGSAP);

const SLIDE_MS = 7000;

const pathCards = [
  {
    code: "FRE",
    title: "Florida Real Estate",
    href: "/florida-real-estate",
    video: "/videos/5529096-hd_1920_1080_30fps.mp4",
    headline: "Florida licensing for every stage of your career",
    body: "Pre-license, renewals, broker education, and continuing education — with formats you can compare on one page.",
    ctaLabel: "Explore courses",
    line: "#ffd400",
    lineTrack: "rgba(255, 212, 0, 0.28)",
  },
  {
    code: "PD",
    title: "Professional Development",
    href: "/professional-development",
    video: "/videos/4428751-uhd_3840_2160_25fps.mp4",
    headline: "Practical skills that move careers forward",
    body: "AI for business, sales, negotiation, communication, and leadership — livestream and in person.",
    ctaLabel: "View programs",
    line: "#e23b3b",
    lineTrack: "rgba(226, 59, 59, 0.22)",
  },
  {
    code: "IB",
    title: "International Business",
    href: "/international-business",
    video: "/videos/5252440-uhd_3840_2160_30fps.mp4",
    headline: "Learn to work and sell across markets",
    body: "Cross-cultural communication, international selling, market entry, and working with global clients.",
    ctaLabel: "Explore IB",
    line: "#3f78d4",
    lineTrack: "rgba(63, 120, 212, 0.22)",
  },
  {
    code: "CI",
    title: site.school.shortName,
    href: "/about",
    video: "/videos/5529096-hd_1920_1080_30fps.mp4",
    headline: "Education for every stage of your career",
    body: site.home.heroBody,
    ctaLabel: "About us",
    line: "#8b7cc8",
    lineTrack: "rgba(139, 124, 200, 0.28)",
  },
] as const;

export function HomeHero() {
  const rootRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [activeCard, setActiveCard] = useState(0);
  const [introDone, setIntroDone] = useState(false);
  const [paused, setPaused] = useState(false);

  const activeSlide = pathCards[activeCard] ?? pathCards[0];

  function goToCard(index: number) {
    setActiveCard(index);
  }

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      if (index === activeCard) {
        void video.play().catch(() => undefined);
      } else {
        video.pause();
      }
    });
  }, [activeCard]);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const content = gsap.utils.toArray<Element>(
        rootRef.current?.querySelectorAll("[data-hero-copy]") ?? [],
      );
      const cards = gsap.utils.toArray<Element>(
        rootRef.current?.querySelectorAll("[data-hero-card]") ?? [],
      );

      if (reduced) {
        gsap.set([...content, ...cards], { clearProps: "all" });
        setIntroDone(true);
        return;
      }

      gsap.set(content, { autoAlpha: 0, y: 28 });
      gsap.set(cards, { autoAlpha: 0, y: 56 });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => setIntroDone(true),
      });
      tl.to(content, { autoAlpha: 1, y: 0, duration: 0.65, stagger: 0.08 })
        .to(cards, { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.08 }, "-=0.15");
    },
    { scope: rootRef },
  );

  useGSAP(
    () => {
      const line = progressRef.current;
      if (!line || !introDone) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      gsap.killTweensOf(line);

      if (reduced) {
        gsap.set(line, { scaleX: 1 });
        return;
      }

      const tween = gsap.fromTo(
        line,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: SLIDE_MS / 1000,
          ease: "none",
          onComplete: () => {
            setActiveCard((current) => (current + 1) % pathCards.length);
          },
        },
      );

      if (paused) {
        tween.pause();
      }

      return () => {
        tween.kill();
      };
    },
    {
      dependencies: [activeCard, introDone],
      scope: rootRef,
      revertOnUpdate: true,
    },
  );

  useEffect(() => {
    const line = progressRef.current;
    if (!line) return;
    const tweens = gsap.getTweensOf(line);
    tweens.forEach((tween) => {
      if (paused) tween.pause();
      else tween.resume();
    });
  }, [paused]);

  useGSAP(
    () => {
      const copy = copyRef.current;
      if (!copy || !introDone) return;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      gsap.fromTo(
        copy.querySelectorAll("[data-slide-copy]"),
        { autoAlpha: 0, y: 18 },
        { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.06, ease: "power2.out" },
      );
    },
    { dependencies: [activeCard, introDone], scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      className="relative isolate min-h-[100svh] overflow-hidden bg-[#111111] text-[#111111]"
    >
      <div className="absolute inset-0">
        {pathCards.map((slide, index) => (
          <video
            key={slide.video + slide.code}
            ref={(node) => {
              videoRefs.current[index] = node;
            }}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              index === activeCard ? "opacity-100" : "opacity-0"
            }`}
            muted
            loop
            playsInline
            preload={index === 0 ? "auto" : "metadata"}
            poster={site.home.heroImage}
            aria-hidden
          >
            <source src={slide.video} type="video/mp4" />
          </video>
        ))}
        <div
          className="absolute inset-0 bg-[linear-gradient(100deg,#ffd400_0%,#ffd400_22%,rgba(255,212,0,0.72)_38%,rgba(245,245,245,0.78)_58%,rgba(245,245,245,0.35)_78%,transparent_100%)]"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08)_0%,transparent_24%,rgba(0,0,0,0.18)_100%)]"
          aria-hidden
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[92rem] flex-col justify-between px-4 pb-5 pt-[6.5rem] sm:px-6 sm:pb-7 sm:pt-[7rem] lg:px-8 lg:pt-[7.5rem]">
        <div
          ref={copyRef}
          className="max-w-[46rem] pt-2 sm:pt-6 lg:max-w-[52rem]"
          data-hero-copy
        >
          <h1
            data-slide-copy
            className="max-w-[20ch] font-sans text-[1.9rem] font-semibold uppercase leading-[1.08] tracking-[-0.02em] text-black sm:text-[2.45rem] sm:leading-[1.05] md:text-[2.85rem] md:leading-[1.05] lg:text-[3.1rem]"
          >
            {activeSlide.headline}
          </h1>
          <p
            data-slide-copy
            className="mt-4 max-w-[48ch] font-sans text-[1rem] font-normal leading-[1.65] text-black sm:max-w-[54ch] sm:text-[1.05rem] sm:leading-[1.7]"
          >
            {activeSlide.body}
          </p>
          <div data-slide-copy className="mt-5">
            <Link
              href={activeSlide.href}
              className="inline-flex h-[2.4rem] items-center rounded-[0.35rem] bg-black px-4 text-[0.88rem] font-semibold text-white transition-colors hover:bg-[#ffd400] hover:text-black"
            >
              {activeSlide.ctaLabel}
            </Link>
          </div>
        </div>

        <ul
          className="mt-14 grid grid-cols-1 gap-2.5 sm:grid-cols-2 xl:grid-cols-4 xl:gap-3"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {pathCards.map((card, index) => {
            const active = activeCard === index;
            return (
              <li key={card.code} data-hero-card>
                <button
                  type="button"
                  onClick={() => goToCard(index)}
                  aria-pressed={active}
                  className={`relative flex min-h-[6.75rem] w-full flex-col justify-between overflow-hidden rounded-xl px-5 py-4 text-left transition-all duration-300 ${
                    active
                      ? "bg-[#f7f7f7] shadow-[0_12px_28px_rgba(0,0,0,0.12)]"
                      : "bg-white/55 backdrop-blur-md hover:bg-white"
                  }`}
                >
                  <p className="text-[0.78rem] font-bold uppercase tracking-[0.08em] text-black">
                    {card.code}
                  </p>
                  <p className="max-w-[14ch] text-[1.05rem] font-medium leading-snug text-black">
                    {card.title}
                  </p>

                  <span
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-[3px]"
                    style={{
                      backgroundColor: active ? card.lineTrack : "transparent",
                    }}
                    aria-hidden
                  >
                    {active ? (
                      <span
                        ref={progressRef}
                        className="block h-full w-full origin-left"
                        style={{
                          backgroundColor: card.line,
                          transform: "scaleX(0)",
                        }}
                      />
                    ) : null}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

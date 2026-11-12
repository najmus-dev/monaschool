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
    line: "#C08430",
    lineTrack: "rgba(192, 132, 48, 0.28)",
  },
  {
    code: "PD",
    title: "Professional Development",
    href: "/professional-development",
    video: "/videos/4428751-uhd_3840_2160_25fps.mp4",
    headline: "Practical skills that move careers forward",
    body: "AI for business, sales, negotiation, communication, and leadership — livestream and in person.",
    ctaLabel: "View programs",
    line: "#002448",
    lineTrack: "rgba(0, 36, 72, 0.22)",
  },
  {
    code: "IB",
    title: "International Business",
    href: "/international-business",
    video: "/videos/5252440-uhd_3840_2160_30fps.mp4",
    headline: "Learn to work and sell across markets",
    body: "Cross-cultural communication, international selling, market entry, and working with global clients.",
    ctaLabel: "Explore IB",
    line: "#B47824",
    lineTrack: "rgba(180, 120, 36, 0.24)",
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
            className={`absolute inset-0 h-full w-full object-cover brightness-[0.88] contrast-[1.08] saturate-[1.05] transition-opacity duration-700 ${
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
          className="absolute inset-0 bg-[linear-gradient(105deg,rgba(0,24,48,0.95)_0%,rgba(0,36,72,0.8)_28%,rgba(0,36,72,0.4)_48%,transparent_72%)]"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.28)_0%,transparent_32%,rgba(0,0,0,0.35)_100%)]"
          aria-hidden
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[92rem] flex-col justify-between px-4 pb-5 pt-[9rem] sm:px-6 sm:pb-7 sm:pt-[10rem] lg:px-8 lg:pt-[10.75rem]">
        <div
          ref={copyRef}
          className="max-w-[46rem] pt-4 sm:pt-8 lg:max-w-[52rem]"
          data-hero-copy
        >
          <h1
            data-slide-copy
            className="max-w-[28ch] font-sans text-[1.55rem] font-semibold uppercase leading-[1.12] tracking-[-0.02em] text-white sm:text-[1.95rem] sm:leading-[1.1] md:text-[2.2rem] md:leading-[1.08] lg:text-[2.35rem]"
          >
            {activeSlide.headline}
          </h1>
          <p
            data-slide-copy
            className="mt-4 max-w-[48ch] font-sans text-[1rem] font-normal leading-[1.65] text-white/90 sm:max-w-[54ch] sm:text-[1.05rem] sm:leading-[1.7]"
          >
            {activeSlide.body}
          </p>
          <div data-slide-copy className="mt-5">
            <Link
              href={activeSlide.href}
              className="inline-flex h-[2.4rem] items-center rounded-[0.35rem] bg-white px-4 text-[0.88rem] font-semibold text-[#001830] transition-colors hover:bg-[#C08430]"
            >
              {activeSlide.ctaLabel}
            </Link>
          </div>
        </div>

        <ul
          className="mt-14 grid w-full grid-cols-1 gap-3 sm:mt-16 sm:grid-cols-3 sm:gap-3.5 lg:mt-[4.5rem] lg:gap-4"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {pathCards.map((card, index) => {
            const active = activeCard === index;
            return (
              <li key={card.code} data-hero-card className="min-w-0">
                <button
                  type="button"
                  onClick={() => goToCard(index)}
                  aria-pressed={active}
                  className={`relative flex w-full flex-col overflow-hidden rounded-2xl px-5 pb-4 pt-3.5 text-left transition-all duration-300 sm:px-5 sm:pb-4 sm:pt-3.5 ${
                    active
                      ? "bg-[#f7f7f7] shadow-[0_12px_28px_rgba(0,0,0,0.12)]"
                      : "bg-white/60 backdrop-blur-md hover:bg-white"
                  }`}
                >
                  <p className="text-[0.75rem] font-bold uppercase tracking-[0.1em] text-black/70">
                    {card.code}
                  </p>
                  <p className="mt-5 whitespace-nowrap text-[0.98rem] font-semibold leading-none text-black sm:mt-6 sm:text-[1.05rem] lg:text-[1.1rem]">
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

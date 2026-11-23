"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(useGSAP);

const SLIDE_MS = 7000;
const MOBILE_GAP = 12;

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
    lineTrack: "rgba(192, 132, 48, 0.4)",
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
    lineTrack: "rgba(0, 36, 72, 0.35)",
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
    lineTrack: "rgba(180, 120, 36, 0.38)",
  },
] as const;

export function HomeHero() {
  const rootRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [activeCard, setActiveCard] = useState(0);
  // Keep previous video painted until the next one has a real frame (avoids poster/old-image flash).
  const [displayedCard, setDisplayedCard] = useState(0);
  const [introDone, setIntroDone] = useState(false);
  const [paused, setPaused] = useState(false);

  const activeSlide = pathCards[activeCard] ?? pathCards[0];

  function goToCard(index: number) {
    setActiveCard(index);
  }

  useEffect(() => {
    const next = videoRefs.current[activeCard];
    if (!next) return;

    let cancelled = false;

    videoRefs.current.forEach((video, index) => {
      if (!video || index === activeCard) return;
      video.pause();
    });

    const reveal = () => {
      if (!cancelled) setDisplayedCard(activeCard);
    };

    const tryPlay = () => {
      void next.play().then(reveal).catch(reveal);
    };

    const onReady = () => {
      next.removeEventListener("loadeddata", onReady);
      next.removeEventListener("playing", onReady);
      tryPlay();
    };

    // Warm the upcoming neighbor so the next auto-advance is less likely to stall.
    const neighbor = videoRefs.current[(activeCard + 1) % pathCards.length];
    if (neighbor && neighbor.preload !== "auto") {
      neighbor.preload = "auto";
    }

    if (next.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      tryPlay();
    } else {
      next.addEventListener("loadeddata", onReady);
      next.addEventListener("playing", onReady);
      next.preload = "auto";
      void next.play().catch(() => undefined);
    }

    return () => {
      cancelled = true;
      next.removeEventListener("loadeddata", onReady);
      next.removeEventListener("playing", onReady);
    };
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
      tl.to(content, { autoAlpha: 1, y: 0, duration: 0.65, stagger: 0.08 }).to(
        cards,
        { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.08 },
        "-=0.15",
      );
    },
    { scope: rootRef },
  );

  // Mobile strip: fixed card width, active fully visible on the left, next peeks right.
  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) return;

      const mq = window.matchMedia("(min-width: 640px)");

      const layout = () => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-hero-card]", track);

        if (mq.matches) {
          gsap.set(track, { clearProps: "transform,padding" });
          cards.forEach((card) => gsap.set(card, { clearProps: "width" }));
          return;
        }

        const pad = 16;
        const viewport = window.innerWidth;
        // Active card fills most of the row; next card peeks ~22% on the right.
        const cardWidth = Math.min(viewport * 0.74, viewport - pad - 56);
        cards.forEach((card) => {
          gsap.set(card, { width: cardWidth });
        });

        gsap.set(track, { paddingLeft: pad, paddingRight: pad });

        // Ideal: active card flush left. Clamp so the last card never
        // leaves empty space on the right — it stays right-weighted instead.
        const trackWidth =
          pad +
          cards.length * cardWidth +
          Math.max(0, cards.length - 1) * MOBILE_GAP +
          pad;
        const maxScroll = Math.max(0, trackWidth - viewport);
        const ideal = activeCard * (cardWidth + MOBILE_GAP);
        const x = -Math.min(ideal, maxScroll);

        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduced) {
          gsap.set(track, { x });
        } else {
          gsap.to(track, { x, duration: 0.45, ease: "power2.out", overwrite: true });
        }
      };

      layout();
      mq.addEventListener("change", layout);
      window.addEventListener("resize", layout);
      return () => {
        mq.removeEventListener("change", layout);
        window.removeEventListener("resize", layout);
      };
    },
    { dependencies: [activeCard, introDone], scope: rootRef },
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
      className="relative isolate min-h-[108svh] overflow-hidden bg-[#111111] text-[#111111]"
    >
      <div className="absolute inset-0 bg-[#111111]">
        {pathCards.map((slide, index) => (
          <video
            key={slide.video + slide.code}
            ref={(node) => {
              videoRefs.current[index] = node;
            }}
            className={`absolute inset-0 h-full w-full object-cover brightness-[0.72] contrast-[1.12] saturate-[1.08] transition-opacity duration-700 ${
              index === displayedCard ? "opacity-100" : "opacity-0"
            }`}
            muted
            loop
            playsInline
            preload={index === 0 || index === 1 ? "auto" : "metadata"}
            aria-hidden
          >
            <source src={slide.video} type="video/mp4" />
          </video>
        ))}
        <div
          className="absolute inset-0 bg-[linear-gradient(105deg,rgba(0,24,48,0.97)_0%,rgba(0,36,72,0.88)_26%,rgba(0,36,72,0.62)_48%,rgba(0,36,72,0.28)_68%,rgba(0,24,48,0.18)_100%)] sm:bg-[linear-gradient(105deg,rgba(0,24,48,0.97)_0%,rgba(0,36,72,0.88)_26%,rgba(0,36,72,0.62)_48%,rgba(0,36,72,0.28)_68%,rgba(0,24,48,0.18)_100%)]"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.4)_0%,transparent_28%,rgba(0,0,0,0.55)_100%)]"
          aria-hidden
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[108svh] w-full max-w-[92rem] flex-col px-4 pb-5 pt-[10rem] sm:justify-between sm:px-6 sm:pb-7 sm:pt-[12rem] lg:px-8 lg:pt-[13rem]">
        {/* Mobile: copy lower + wide; desktop keeps top placement */}
        <div className="flex min-h-0 flex-1 flex-col justify-end sm:flex-none sm:justify-start">
          <div
            ref={copyRef}
            className="w-full max-w-none pb-8 sm:max-w-[46rem] sm:pb-0 sm:pt-14 lg:max-w-[52rem] lg:pt-16"
            data-hero-copy
          >
            <h1
              data-slide-copy
              className="w-[92%] max-w-none font-sans text-[2.15rem] font-bold uppercase leading-[1.04] tracking-[-0.03em] text-white sm:w-auto sm:max-w-[28ch] sm:text-[1.95rem] sm:font-semibold sm:leading-[1.1] sm:tracking-[-0.02em] sm:text-[#F3E6C8] md:text-[2.2rem] md:leading-[1.08] lg:text-[2.35rem]"
            >
              {activeSlide.headline}
            </h1>
            <p
              data-slide-copy
              className="mt-4 w-full max-w-none font-sans text-[1.05rem] font-normal leading-[1.55] text-white/90 sm:mt-4 sm:max-w-[54ch] sm:text-[1.05rem] sm:leading-[1.7] sm:text-[#E2EAF1]"
            >
              {activeSlide.body}
            </p>
            <div data-slide-copy className="mt-6 sm:mt-5">
              <Link
                href={activeSlide.href}
                className="inline-flex h-[2.65rem] items-center rounded-[var(--radius-control)] bg-[#C08430] px-5 text-[0.95rem] font-semibold text-[#001830] transition-colors hover:bg-[#F3E6C8] sm:h-[2.5rem] sm:text-[0.9rem]"
              >
                {activeSlide.ctaLabel}
              </Link>
            </div>
          </div>
        </div>

        <div
          className="-mx-4 shrink-0 overflow-hidden sm:mx-0 sm:mt-16 sm:overflow-visible lg:mt-[4.5rem]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
        >
          <ul
            ref={trackRef}
            className="flex w-max gap-3 will-change-transform sm:grid sm:w-full sm:grid-cols-3 sm:gap-3.5 sm:px-0 lg:gap-4"
          >
            {pathCards.map((card, index) => {
              const active = activeCard === index;
              return (
                <li
                  key={card.code}
                  data-hero-card
                  className="min-w-0 shrink-0 sm:w-auto sm:shrink"
                >
                  <button
                    type="button"
                    onClick={() => goToCard(index)}
                    aria-pressed={active}
                    className={`relative flex w-full flex-col overflow-hidden rounded-2xl px-5 pb-4 pt-3.5 text-left transition-all duration-300 sm:px-5 sm:pb-4 sm:pt-3.5 ${
                      active
                        ? "bg-[#f7f7f7] shadow-[0_12px_28px_rgba(0,0,0,0.12)]"
                        : "bg-white/55 backdrop-blur-md hover:bg-white"
                    }`}
                  >
                    <p className="text-[0.75rem] font-bold uppercase tracking-[0.1em] text-black/70">
                      {card.code}
                    </p>
                    <p className="mt-5 truncate text-[0.98rem] font-semibold leading-none text-black sm:mt-6 sm:whitespace-nowrap sm:text-[1.05rem] lg:text-[1.1rem]">
                      {card.title}
                    </p>

                    <span
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-1.5"
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
      </div>
    </section>
  );
}

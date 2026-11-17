"use client";

import Link from "next/link";
import { useRef } from "react";
import { site } from "@/content/site";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Container } from "./container";

export function HomeUpcoming() {
  const sessions = site.upcomingSessions;
  const rootRef = useRef<HTMLElement>(null);
  useScrollReveal(rootRef);

  if (sessions.length === 0) {
    return null;
  }

  return (
    <section ref={rootRef} className="border-t border-line bg-paper">
      <Container className="py-16 md:py-20">
        <div data-reveal className="max-w-2xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-accent">
            {site.home.upcomingEyebrow}
          </p>
          <h2 className="font-display text-4xl font-bold tracking-tight text-brand sm:text-5xl">
            {site.home.upcomingTitle}
          </h2>
        </div>

        <ul className="mt-10 divide-y divide-line border-y border-line">
          {sessions.map((session) => (
            <li
              key={session.id}
              data-reveal
              className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-semibold text-ink">{session.title}</p>
                <p className="mt-1 text-sm text-muted">
                  {session.when} · {session.timeZone} · {session.formatLabel}
                </p>
              </div>
              <Link
                href={`/courses/${session.courseSlug}`}
                className="inline-flex h-11 items-center justify-center rounded-[var(--radius-control)] bg-accent px-4 text-sm font-semibold text-accent-ink"
              >
                {site.ui.viewCourse}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

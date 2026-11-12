import Link from "next/link";
import { site } from "@/content/site";
import { Container } from "./container";

export function HomeUpcoming() {
  const sessions = site.upcomingSessions;
  if (sessions.length === 0) {
    return null;
  }

  return (
    <section className="border-t border-line bg-paper">
      <Container className="py-16 md:py-20">
        <div className="max-w-2xl">
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
              className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-semibold text-ink">{session.title}</p>
                <p className="mt-1 text-sm text-muted">
                  {session.when} · {session.timeZone} · {session.formatLabel} ·{" "}
                  {session.priceLabel}
                </p>
              </div>
              <Link
                href={`/courses/${session.courseSlug}`}
                className="inline-flex h-10 items-center justify-center rounded-md bg-accent px-4 text-sm font-semibold text-accent-ink"
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

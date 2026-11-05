import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { CheckIcon } from "@phosphor-icons/react/ssr";
import { getCourse, site, type CourseCategory } from "@/content/site";
import { Container } from "@/components/container";
import { EnrollLink } from "@/components/enroll-link";
import { PlaceholderNote } from "@/components/placeholder-note";

const courseHeroImage: Record<CourseCategory, string> = {
  "get-licensed": "/images/path-earn-home.jpg",
  renew: "/images/path-renew-study.jpg",
  prep: "/images/hero-study.jpg",
};

type CoursePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return site.courses.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({
  params,
}: CoursePageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourse(slug);

  if (!course) {
    return { title: "Course not found" };
  }

  return {
    title: course.name,
    description: course.summary,
  };
}

function CourseFallback() {
  return (
    <div className="relative bg-brand">
      <Container className="pb-10 pt-[calc(6.75rem+2.5rem)] md:pb-14 md:pt-[calc(6.75rem+3rem)]">
        <p className="text-base text-white/75">{site.ui.loadingCourse}</p>
      </Container>
    </div>
  );
}

async function CourseContent({ params }: CoursePageProps) {
  const { slug } = await params;
  const course = getCourse(slug);

  if (!course) {
    notFound();
  }

  const others = site.courses
    .filter(
      (item) =>
        item.slug !== course.slug && item.category === course.category,
    )
    .slice(0, 4);

  return (
    <article>
      <div className="relative isolate overflow-hidden border-b border-white/10 bg-brand text-footer-text">
        <Image
          src={courseHeroImage[course.category]}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[50%_40%] opacity-[0.28]"
          aria-hidden
          priority
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(180deg,rgb(10_53_82/0.82)_0%,rgb(10_53_82/0.88)_55%,rgb(10_53_82/0.94)_100%)]"
          aria-hidden
        />
        <Container className="relative pb-10 pt-[calc(6.75rem+2.5rem)] md:pb-14 md:pt-[calc(6.75rem+3rem)]">
          <nav aria-label={site.ui.breadcrumb} className="text-sm text-white/65">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link
                  href="/courses"
                  className="font-semibold text-white underline decoration-white/30 underline-offset-4 hover:decoration-white"
                >
                  {site.coursesPage.title}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-white/85">
                {course.linkLabel}
              </li>
            </ol>
          </nav>
          <div className="mt-6 max-w-3xl border-l-4 border-accent pl-5 md:pl-6">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
              {course.format}
            </p>
            <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-white text-balance md:text-5xl">
              {course.name}
            </h1>
            <p className="mt-4 max-w-[62ch] text-base leading-relaxed text-white/75 md:text-lg">
              {course.summary}
            </p>
          </div>
        </Container>
      </div>

      <Container className="grid grid-cols-1 gap-10 py-12 md:py-16 lg:grid-cols-[minmax(0,1.35fr)_minmax(17rem,0.65fr)] lg:items-start">
        <div className="min-w-0">
          <section>
            <h2 className="text-2xl font-bold tracking-tight text-brand">
              {site.ui.includedTitle}
            </h2>
            <ul className="mt-5 grid gap-3 border-y border-line py-5">
              {course.included.map((item) => (
                <li key={item} className="flex gap-3 text-base leading-7 text-ink">
                  <CheckIcon
                    size={18}
                    weight="bold"
                    aria-hidden
                    className="mt-1 shrink-0 text-brand"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-bold tracking-tight text-brand">
              {site.ui.audienceTitle}
            </h2>
            <p className="mt-4 max-w-[52ch] text-base leading-relaxed text-muted">
              {course.audience}
            </p>
          </section>

          {course.sessions && course.sessions.length > 0 ? (
            <section className="mt-10">
              <h2 className="text-2xl font-bold tracking-tight text-brand">
                {site.ui.sessionsTitle}
              </h2>
              <div className="mt-4">
                <PlaceholderNote>{site.ui.sessionsNote}</PlaceholderNote>
              </div>
              <ul className="mt-5 border-y border-line">
                {course.sessions.map((session) => (
                  <li
                    key={session.id}
                    className="grid grid-cols-1 gap-2 border-b border-line py-4 last:border-b-0 sm:grid-cols-[13rem_minmax(0,1fr)]"
                  >
                    <p className="font-semibold text-ink">{session.when}</p>
                    <p className="text-sm leading-6 text-muted">{session.detail}</p>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>

        <aside className="border border-line bg-surface lg:sticky lg:top-28">
          <div className="border-b border-line bg-band px-5 py-5">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
              Partner price
            </p>
            <p className="mt-2 text-4xl font-bold tabular-nums tracking-tight text-price">
              {course.priceLabel}
            </p>
            <p className="mt-1 text-sm text-muted">{course.priceNote}</p>
          </div>
          <div className="px-5 py-5">
            <EnrollLink href={course.enrollUrl} className="w-full">
              {site.ui.enroll}
            </EnrollLink>
            <p className="mt-3 text-sm leading-6 text-muted">{site.ui.enrollNote}</p>
            <Link
              href="/courses"
              className="mt-5 inline-block text-sm font-semibold text-brand underline decoration-brand/25 underline-offset-4"
            >
              {site.ui.allCourses}
            </Link>
          </div>
        </aside>

        {others.length > 0 ? (
          <section className="border-t border-line pt-10 lg:col-span-2">
            <h2 className="text-2xl font-bold tracking-tight text-brand">
              {site.ui.otherCourses}
            </h2>
            <ul className="mt-5 border-y border-line">
              {others.map((item) => (
                <li key={item.slug} className="border-b border-line last:border-b-0">
                  <Link
                    href={`/courses/${item.slug}`}
                    className="flex flex-col gap-1 py-4 transition-colors hover:text-brand sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                  >
                    <span className="font-semibold text-ink">{item.name}</span>
                    <span className="shrink-0 text-sm text-muted">
                      {item.format} · {item.priceLabel}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </Container>
    </article>
  );
}

export default function CoursePage({ params }: CoursePageProps) {
  return (
    <Suspense fallback={<CourseFallback />}>
      <CourseContent params={params} />
    </Suspense>
  );
}

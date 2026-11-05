import Link from "next/link";
import type { Course } from "@/content/site";
import { site } from "@/content/site";

export function CourseCard({ course }: { course: Course }) {
  return (
    <article className="flex h-full flex-col rounded-lg border border-line/70 bg-surface px-6 py-8 text-center shadow-[0_12px_32px_rgb(10_53_82/0.07)] md:px-8 md:py-9">
      <h2 className="font-display text-[1.4rem] font-bold leading-snug tracking-tight text-brand">
        <Link
          href={`/courses/${course.slug}`}
          className="transition-colors hover:text-accent"
        >
          {course.linkLabel}
        </Link>
      </h2>

      <div className="mx-auto mt-4 h-px w-14 bg-line" aria-hidden />

      <p className="mt-4 flex-1 text-[0.95rem] leading-7 text-muted">
        {course.summary}
      </p>

      <p className="mt-6 font-display text-[1.85rem] font-bold tabular-nums leading-none tracking-tight text-brand">
        {course.priceLabel}
      </p>
      <p className="mt-2 text-xs text-muted">{course.priceNote}</p>

      <div className="mt-8 grid gap-3">
        <Link
          href={`/courses/${course.slug}`}
          className="inline-flex h-12 items-center justify-center gap-1 rounded-md bg-accent px-4 text-sm font-bold uppercase tracking-[0.04em] text-ink transition-colors hover:bg-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          {site.ui.viewDetails}
          <span aria-hidden>›</span>
        </Link>
        <a
          href={course.enrollUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-10 items-center justify-center text-sm font-semibold text-brand underline decoration-brand/25 underline-offset-4 hover:decoration-brand"
        >
          {site.ui.enroll}
          <span className="sr-only"> (opens partner site)</span>
        </a>
      </div>
    </article>
  );
}

export function CourseGrid({
  courses,
  className = "",
}: {
  courses: Course[];
  className?: string;
}) {
  if (courses.length === 0) {
    return <p className="mt-8 text-base text-muted">{site.ui.emptyCourses}</p>;
  }

  const cols =
    courses.length === 1
      ? "sm:grid-cols-1 max-w-md mx-auto"
      : courses.length === 2
        ? "sm:grid-cols-2 max-w-3xl mx-auto"
        : courses.length === 3
          ? "sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto"
          : "sm:grid-cols-2 xl:grid-cols-3";

  return (
    <div
      className={`mt-12 grid grid-cols-1 items-stretch gap-6 ${cols} ${className}`}
    >
      {courses.map((course) => (
        <CourseCard key={course.slug} course={course} />
      ))}
    </div>
  );
}

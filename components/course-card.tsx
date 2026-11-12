import Link from "next/link";
import type { Course, DeliveryFormat } from "@/content/site";
import { coursePriceLabel, site } from "@/content/site";

function shortTag(course: Course) {
  if (course.floridaTopic === "get-license") return "PRE";
  if (course.floridaTopic === "sales-post-license") return "POST";
  if (course.floridaTopic === "become-broker") return "BRK";
  if (course.floridaTopic === "broker-post-license") return "BPM";
  if (course.floridaTopic === "continuing-education") return "CE";
  if (course.floridaTopic === "reactivation") return "REA";
  return "FRE";
}

export function CourseCard({
  course,
  highlightFormat,
}: {
  course: Course;
  highlightFormat?: DeliveryFormat | "all";
}) {
  const formatSummary =
    highlightFormat && highlightFormat !== "all"
      ? (course.formats.find((item) => item.format === highlightFormat)
          ?.formatLabel ?? course.formats.map((item) => item.formatLabel).join(" · "))
      : course.formats.map((item) => item.formatLabel).join(" · ");

  return (
    <article className="group relative flex h-full min-h-[16.5rem] flex-col overflow-hidden rounded-[1rem] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.05)] ring-1 ring-black/[0.04] transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(0,0,0,0.1)]">
      <div className="flex flex-1 flex-col px-6 pb-5 pt-6">
        <span className="inline-flex size-8 items-center justify-center rounded-[0.3rem] bg-[#0f766e] text-[0.62rem] font-bold uppercase tracking-[0.04em] text-white">
          {shortTag(course)}
        </span>

        <h2 className="mt-4 font-sans text-[1.12rem] font-bold leading-snug tracking-[-0.015em] text-[#222222]">
          {course.title}
        </h2>

        <p className="mt-3 text-[0.88rem] leading-6 text-[#888888]">
          {formatSummary}
        </p>
      </div>

      <div className="relative z-10 mt-auto">
        <div className="flex items-center justify-between gap-3 bg-[#ef5633] px-5 py-3.5 text-white transition-opacity duration-200 group-hover:opacity-0">
          <p className="min-w-0 truncate text-[0.84rem] font-medium">
            {course.hoursLabel}
          </p>
          <p className="shrink-0 text-[0.95rem] font-bold tabular-nums">
            {coursePriceLabel(course)}
          </p>
        </div>
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-[#ef5633] text-[0.9rem] font-bold text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          {site.ui.viewDetails}
        </div>
      </div>

      <Link
        href={`/courses/${course.slug}`}
        className="absolute inset-0 z-20"
        aria-label={`${site.ui.viewDetails}: ${course.title}`}
      />
    </article>
  );
}

export function CourseGrid({
  courses,
  className = "",
  highlightFormat = "all",
}: {
  courses: Course[];
  className?: string;
  highlightFormat?: DeliveryFormat | "all";
}) {
  if (courses.length === 0) {
    return (
      <p className="mt-8 text-base text-[#746C66]">{site.ui.emptyCourses}</p>
    );
  }

  const cols =
    courses.length === 1
      ? "grid-cols-1 max-w-[22rem]"
      : courses.length === 2
        ? "sm:grid-cols-2 max-w-3xl"
        : "sm:grid-cols-2 xl:grid-cols-3";

  return (
    <div>
      <p className="mt-8 text-[0.92rem] text-[#746C66]">
        Showing {courses.length} result{courses.length === 1 ? "" : "s"}
      </p>
      <div
        className={`mt-5 grid grid-cols-1 items-stretch gap-5 ${cols} ${className}`}
      >
        {courses.map((course) => (
          <CourseCard
            key={course.slug}
            course={course}
            highlightFormat={highlightFormat}
          />
        ))}
      </div>
    </div>
  );
}

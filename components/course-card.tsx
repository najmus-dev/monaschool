import Link from "next/link";
import type { Course, DeliveryFormat } from "@/content/site";
import { coursePriceLabel, site } from "@/content/site";

function shortTag(course: Course) {
  if (course.floridaTopic === "get-license") return "pre";
  if (course.floridaTopic === "sales-post-license") return "post";
  if (course.floridaTopic === "become-broker") return "brk";
  if (course.floridaTopic === "broker-post-license") return "bpm";
  if (course.floridaTopic === "continuing-education") return "ce";
  if (course.floridaTopic === "reactivation") return "rea";
  return "fre";
}

function tagTone(course: Course) {
  if (course.floridaTopic === "get-license") return "bg-[#c5d4e4]";
  if (course.floridaTopic === "sales-post-license") return "bg-[#e2c48a]";
  if (course.floridaTopic === "become-broker") return "bg-[#9eb6cd]";
  if (course.floridaTopic === "broker-post-license") return "bg-[#d4b88a]";
  if (course.floridaTopic === "continuing-education") return "bg-[#b8c9d8]";
  if (course.floridaTopic === "reactivation") return "bg-[#d8c9a8]";
  return "bg-[#c5d4e4]";
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
  const hoursMatch = course.hoursLabel.match(/(\d+)/);
  const hoursValue = hoursMatch?.[1] ?? null;

  return (
    <article className="group relative flex h-full min-h-[17rem] flex-col overflow-hidden rounded-md border border-black/10 bg-white transition-colors duration-200 hover:border-black/20">
      <div className="flex flex-1 flex-col px-6 pb-5 pt-6 sm:px-7 sm:pt-7">
        <span
          className={`inline-flex h-8 w-fit shrink-0 items-center justify-center self-start rounded-t-[0.45rem] rounded-b-none px-2.5 font-sans text-[0.95rem] font-black lowercase leading-none tracking-[-0.04em] text-black ${tagTone(course)}`}
        >
          {shortTag(course)}
        </span>

        <h2 className="mt-5 font-sans text-[1.15rem] font-extrabold leading-[1.28] tracking-[-0.02em] text-black sm:text-[1.22rem]">
          {course.title}
        </h2>

        <p className="mt-3 font-sans text-[0.95rem] font-normal leading-6 text-black">
          {course.hoursLabel}
        </p>

        <p className="mt-1.5 font-sans text-[0.9rem] font-normal leading-6 text-[#888888]">
          {formatSummary}
        </p>
      </div>

      <div className="relative mt-auto overflow-hidden">
        <div className="flex items-end justify-between gap-4 px-6 py-5 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full sm:px-7">
          <p className="min-w-0 font-sans leading-none text-black">
            {hoursValue ? (
              <>
                <span className="text-[1.35rem] font-extrabold tracking-[-0.02em]">
                  +{hoursValue}
                </span>
                <span className="ml-1.5 text-[0.9rem] font-semibold">Hours</span>
              </>
            ) : (
              <span className="text-[0.95rem] font-semibold">
                {course.hoursLabel}
              </span>
            )}
          </p>
          <p className="shrink-0 font-sans text-[1.1rem] font-extrabold tabular-nums tracking-[-0.02em] text-black">
            {coursePriceLabel(course)}
          </p>
        </div>

        <div
          className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-center bg-[#002448] px-6 py-5 text-center font-sans text-[0.95rem] font-bold text-white transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 sm:px-7"
          aria-hidden
        >
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

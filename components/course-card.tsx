import Image from "next/image";
import Link from "next/link";
import type { Course, DeliveryFormat } from "@/content/site";
import { site } from "@/content/site";
import { cardImageForCourse } from "@/lib/course-media";

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
  const image = cardImageForCourse(course);

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-panel)] border border-[#c5d0dc] bg-white shadow-[0_8px_24px_rgb(0_36_72/0.04)] transition-[border-color,box-shadow] duration-200 hover:border-[#002448]/30 hover:shadow-[0_14px_32px_rgb(0_36_72/0.08)]">
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#D7E0E9]">
        <Image
          src={image}
          alt=""
          fill
          sizes="(min-width: 1280px) 28vw, (min-width: 640px) 45vw, 90vw"
          className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(180deg,transparent_62%,rgba(0,24,48,0.22)_100%)]"
          aria-hidden
        />
      </div>

      <div className="flex flex-1 flex-col px-6 pb-5 pt-5 sm:px-7">
        <h2 className="font-sans text-[1.12rem] font-extrabold leading-[1.28] tracking-[-0.02em] text-[#001830] sm:text-[1.18rem]">
          {course.title}
        </h2>

        <p className="mt-2.5 line-clamp-2 font-sans text-[0.9rem] font-normal leading-6 text-[#5A6B7A]">
          {course.benefit}
        </p>

        <p className="mt-3 font-sans text-[0.86rem] font-normal leading-6 text-[#8FA3B8]">
          {formatSummary}
        </p>
      </div>

      <div className="relative mt-auto overflow-hidden border-t border-[#e2eaf1]">
        <div className="flex items-end justify-between gap-4 px-6 py-4 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full sm:px-7">
          <p className="min-w-0 font-sans leading-none text-[#001830]">
            {hoursValue ? (
              <>
                <span className="text-[1.25rem] font-extrabold tracking-[-0.02em]">
                  {hoursValue}
                </span>
                <span className="ml-1.5 text-[0.86rem] font-semibold">hrs</span>
              </>
            ) : (
              <span className="text-[0.92rem] font-semibold">
                {course.hoursLabel}
              </span>
            )}
          </p>
          <p className="shrink-0 font-sans text-[0.88rem] font-semibold text-[#5A6B7A]">
            {site.ui.viewDetails}
          </p>
        </div>

        <div
          className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-center bg-[#002448] px-6 py-4 text-center font-sans text-[0.92rem] font-bold text-white transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 sm:px-7"
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

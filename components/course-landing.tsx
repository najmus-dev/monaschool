"use client";

import { ArrowRightIcon } from "@phosphor-icons/react/ssr";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import type { Course } from "@/content/site";
import {
  coursePriceLabel,
  courses,
  getLearningCategory,
  site,
} from "@/content/site";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import {
  heroImageForCourse,
  sideImageForCourse,
} from "@/lib/course-media";
import { CourseFormatCards } from "./course-format-cards";
import { HomeQuestions } from "./home-questions";

function SectionMark() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M0 0H12L0 12V0Z" fill="#C08430" />
    </svg>
  );
}

export function CourseLanding({ course }: { course: Course }) {
  const rootRef = useRef<HTMLDivElement>(null);
  useScrollReveal(rootRef);

  const category = getLearningCategory(course.categoryIds[0] ?? "");
  const categoryHref = category ? `/${category.slug}` : "/florida-real-estate";
  const heroImage = heroImageForCourse(course);
  const formatLabels = course.formats.map((item) => item.formatLabel).join(" · ");
  const lowest = coursePriceLabel(course);
  const outcomes = course.outcomes.filter((item) => item.trim().length > 0);
  const included = course.included.filter((item) => item.trim().length > 0);

  const related = courses
    .filter(
      (item) =>
        item.published &&
        item.slug !== course.slug &&
        item.categoryIds.some((id) => course.categoryIds.includes(id)),
    )
    .slice(0, 3);

  const facts = [
    { label: "Hours", value: course.hoursLabel },
    { label: "Formats", value: formatLabels },
    { label: "Tuition", value: lowest },
  ];

  const aboutItems = [
    course.audience
      ? { label: "Who it is for", body: course.audience }
      : null,
    course.creditLabel
      ? { label: "Credit path", body: course.creditLabel }
      : null,
    course.prerequisites
      ? { label: "Prerequisites", body: course.prerequisites }
      : null,
  ].filter(Boolean) as { label: string; body: string }[];

  const aboutCols =
    aboutItems.length <= 1
      ? "grid-cols-1 max-w-2xl"
      : aboutItems.length === 2
        ? "sm:grid-cols-2"
        : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <div ref={rootRef}>
      {/* 1. Hero */}
      <section data-reveal-section className="relative isolate overflow-hidden">
        <div className="relative min-h-[20rem] sm:min-h-[22rem] md:min-h-[24rem] lg:min-h-[26rem]">
          <Image
            src={heroImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_28%]"
          />
          <div
            className="absolute inset-0 bg-[linear-gradient(105deg,rgba(0,24,48,0.94)_0%,rgba(0,36,72,0.8)_40%,rgba(0,36,72,0.32)_72%,rgba(0,24,48,0.18)_100%)]"
            aria-hidden
          />

          <div className="relative mx-auto flex min-h-[20rem] w-full max-w-[90rem] items-end px-4 pb-12 pt-[calc(4.25rem+3.25rem)] sm:min-h-[22rem] sm:px-6 sm:pb-14 sm:pt-[calc(4.25rem+3.75rem)] md:min-h-[24rem] lg:min-h-[26rem] lg:px-8 lg:pb-16">
            <div className="max-w-[42rem]">
              <nav
                data-reveal
                aria-label={site.ui.breadcrumb}
                className="text-[0.78rem] text-white/75"
              >
                <ol className="flex flex-wrap items-center gap-2">
                  <li>
                    <Link href="/" className="hover:text-white">
                      {site.ui.homeLink}
                    </Link>
                  </li>
                  <li aria-hidden className="text-white/40">
                    /
                  </li>
                  <li>
                    <Link href={categoryHref} className="hover:text-white">
                      {category?.shortLabel ?? "Courses"}
                    </Link>
                  </li>
                </ol>
              </nav>

              <div data-reveal className="mt-5 flex items-center gap-2.5">
                <SectionMark />
                <p className="text-[0.78rem] font-bold uppercase tracking-[0.14em] text-white">
                  {category?.label ?? "Course"}
                </p>
              </div>

              <h1
                data-reveal
                className="mt-4 font-sans text-[2rem] font-bold uppercase leading-[1.05] tracking-[-0.025em] text-white sm:text-[2.55rem] md:text-[3rem]"
              >
                {course.title}
              </h1>
              <p
                data-reveal
                className="mt-4 max-w-[36rem] text-[0.98rem] leading-7 text-white/88 sm:text-[1.05rem]"
              >
                {course.benefit}
              </p>
              <a
                data-reveal
                href="#formats"
                className="mt-6 inline-flex h-11 items-center gap-2 rounded-[var(--radius-control)] bg-white px-5 text-[0.9rem] font-bold text-[#002448] transition-colors hover:bg-[#C08430] hover:text-[#001830]"
              >
                {site.ui.chooseFormat}
                <ArrowRightIcon size={16} weight="bold" aria-hidden />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Facts + about — dense, no decorative side image */}
      <section data-reveal-section className="border-b border-black/8 bg-white">
        <div className="mx-auto w-full max-w-[90rem] px-4 py-10 sm:px-6 md:py-12 lg:px-8">
          <dl
            data-reveal
            className="grid grid-cols-1 gap-px overflow-hidden rounded-[var(--radius-panel)] border border-[#d5dde6] bg-[#d5dde6] sm:grid-cols-3"
          >
            {facts.map((fact) => (
              <div key={fact.label} className="bg-white px-5 py-5 sm:px-6">
                <dt className="text-[0.7rem] font-bold uppercase tracking-[0.12em] text-[#5A6B7A]">
                  {fact.label}
                </dt>
                <dd className="mt-2 text-[1.05rem] font-semibold leading-snug text-[#001830]">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>

          <div data-reveal className="mt-10">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="font-sans text-[1.45rem] font-bold tracking-[-0.02em] text-[#001830] sm:text-[1.6rem]">
                About this course
              </h2>
              <a
                href="#formats"
                className="inline-flex items-center gap-1.5 text-[0.88rem] font-bold text-[#002448] hover:text-[#C08430]"
              >
                {site.ui.chooseFormat}
                <ArrowRightIcon size={14} weight="bold" aria-hidden />
              </a>
            </div>

            {aboutItems.length > 0 ? (
              <div
                className={`mt-6 grid grid-cols-1 items-start gap-4 ${aboutCols}`}
              >
                {aboutItems.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[var(--radius-panel)] border border-[#d5dde6] bg-[#F7FAFC] px-5 py-5"
                  >
                    <p className="text-[0.72rem] font-bold uppercase tracking-[0.1em] text-[#5A6B7A]">
                      {item.label}
                    </p>
                    <p className="mt-2.5 text-[0.98rem] leading-7 text-[#001830]">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-5 max-w-2xl text-[1.02rem] leading-8 text-[#526578]">
                {course.benefit}
              </p>
            )}

            {course.certificateNote ? (
              <p className="mt-5 border-l-[3px] border-[#C08430] pl-4 text-[0.95rem] leading-7 text-[#5A6B7A]">
                {course.certificateNote}
              </p>
            ) : null}
          </div>
        </div>
      </section>

      {/* 3. Formats early — primary conversion block */}
      <section
        data-reveal-section
        id="formats"
        className="scroll-mt-28 bg-[#F7F3EE]"
      >
        <div className="mx-auto w-full max-w-[90rem] px-4 py-14 sm:px-6 md:py-16 lg:px-8 lg:py-20">
          <div data-reveal className="flex items-center gap-2.5">
            <SectionMark />
            <p className="text-[0.78rem] font-bold uppercase tracking-[0.12em] text-black">
              Formats & tuition
            </p>
          </div>
          <h2
            data-reveal
            className="mt-4 font-sans text-[2rem] font-bold tracking-[-0.02em] text-black sm:text-[2.35rem]"
          >
            Choose how you study
          </h2>
          <p
            data-reveal
            className="mt-3 max-w-[40rem] text-[1rem] leading-7 text-[#746C66]"
          >
            Tuition follows the school fee schedule. Self-paced enrolls on the
            partner site; livestream and classroom dates are requested through
            the school.
          </p>

          <div data-reveal className="mt-10">
            <CourseFormatCards course={course} />
          </div>

          {included.length > 0 ? (
            <div
              data-reveal
              className="mt-10 rounded-[var(--radius-panel)] bg-white px-6 py-7 sm:px-8"
            >
              <h3 className="font-sans text-[1.1rem] font-bold text-black">
                {site.ui.includedTitle}
              </h3>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {included.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-[0.95rem] leading-7 text-[#746C66]"
                  >
                    <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-[#C08430]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </section>

      {/* 4. Outcomes — compact numbered grid */}
      {outcomes.length > 0 ? (
        <section data-reveal-section className="border-b border-black/8 bg-[#F4F7FA]">
          <div className="mx-auto w-full max-w-[90rem] px-4 py-12 sm:px-6 md:py-14 lg:px-8">
            <div data-reveal className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <div className="flex items-center gap-2.5">
                  <SectionMark />
                  <p className="text-[0.78rem] font-bold uppercase tracking-[0.12em] text-[#001830]">
                    Outcomes
                  </p>
                </div>
                <h2 className="mt-3 font-sans text-[1.65rem] font-bold tracking-[-0.02em] text-[#001830] sm:text-[1.85rem]">
                  What you complete
                </h2>
              </div>
            </div>

            <ol
              data-reveal
              className={`mt-8 grid grid-cols-1 gap-4 ${
                outcomes.length === 1
                  ? "max-w-xl"
                  : outcomes.length === 2
                    ? "md:grid-cols-2"
                    : "md:grid-cols-2 xl:grid-cols-3"
              }`}
            >
              {outcomes.map((item, index) => (
                <li
                  key={item}
                  className="flex gap-4 rounded-[var(--radius-panel)] border border-[#d5dde6] bg-white px-5 py-5"
                >
                  <span className="font-sans text-[0.78rem] font-bold tabular-nums tracking-[0.06em] text-[#C08430]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[1rem] leading-7 text-[#001830]">
                    {item}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      {/* 5. Related */}
      {related.length > 0 ? (
        <section data-reveal-section className="bg-[#F7F3EE]">
          <div className="mx-auto w-full max-w-[90rem] px-4 py-14 sm:px-6 md:py-16 lg:px-8">
            <h2
              data-reveal
              className="font-sans text-[1.75rem] font-bold tracking-[-0.02em] text-black sm:text-[2rem]"
            >
              {site.ui.otherCourses}
            </h2>
            <ul className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
              {related.map((item) => (
                <li key={item.slug} data-reveal>
                  <Link
                    href={`/courses/${item.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-panel)] bg-white transition-shadow hover:shadow-[0_10px_28px_rgba(0,0,0,0.06)]"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#E8E2DA]">
                      <Image
                        src={sideImageForCourse(item)}
                        alt=""
                        fill
                        sizes="(min-width: 768px) 28vw, 90vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                    <div className="flex flex-1 flex-col px-6 pb-5 pt-5">
                      <p className="text-[0.68rem] font-bold uppercase tracking-[0.12em] text-[#746C66]">
                        {item.hoursLabel}
                      </p>
                      <h3 className="mt-2.5 font-sans text-[1.12rem] font-bold leading-snug text-black">
                        {item.title}
                      </h3>
                      <p className="mt-2.5 flex-1 text-[0.9rem] leading-6 text-[#746C66] line-clamp-2">
                        {item.benefit}
                      </p>
                    </div>
                    <div className="flex items-center justify-between bg-[#002448] px-5 py-3.5 text-[0.88rem] font-bold text-white transition-colors group-hover:bg-[#003054]">
                      <span>{site.ui.viewDetails}</span>
                      <ArrowRightIcon size={16} weight="bold" aria-hidden />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <HomeQuestions />
    </div>
  );
}

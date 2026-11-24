"use client";

import {
  ArrowSquareOutIcon,
  CaretDownIcon,
} from "@phosphor-icons/react/ssr";
import { useState } from "react";
import type { Course, CourseFormatOption } from "@/content/site";
import { nextSessionForFormat, site } from "@/content/site";

function isImmediatePurchase(option: CourseFormatOption) {
  return (
    option.enrollReady !== false &&
    (option.format === "self-paced" || option.format === "correspondence")
  );
}

function isScheduledFormat(option: CourseFormatOption) {
  return (
    option.enrollReady !== false &&
    (option.format === "livestream" || option.format === "classroom")
  );
}

function notifyHref(course: Course, option: CourseFormatOption) {
  return `/contact?interest=course-question&course=${encodeURIComponent(course.slug)}&format=${encodeURIComponent(option.formatLabel)}`;
}

function enrollMeta(
  course: Course,
  option: CourseFormatOption,
  getNotified: boolean,
) {
  const session = nextSessionForFormat(course.slug, option.formatLabel);
  const language = course.teachingLanguage ?? "English";
  const selfPaced =
    option.format === "self-paced" || option.format === "correspondence";

  const date = session?.when
    ? session.when
    : selfPaced
      ? site.ui.dateSelfPaced
      : site.ui.dateTba;

  const timeZone = session?.timeZone
    ? session.timeZone
    : selfPaced
      ? site.ui.timeZoneSelfPaced
      : site.ui.timeZoneDefault;

  const tuition =
    getNotified && option.priceCents === 0
      ? "Contact for pricing"
      : option.priceLabel;

  return [
    { label: site.ui.languageLabel, value: language },
    { label: site.ui.deliveryLabel, value: option.formatLabel },
    { label: site.ui.dateLabel, value: date },
    { label: site.ui.timeZoneLabel, value: timeZone },
    { label: site.ui.tuitionLabel, value: tuition },
  ] as const;
}

export function CourseFormatCards({ course }: { course: Course }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const isInternational = course.categoryIds.includes("international-business");

  return (
    <ul className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3">
      {course.formats.map((option) => {
        const open = openId === option.id;
        const enrollNow = isImmediatePurchase(option);
        const viewDates = isScheduledFormat(option);
        const getNotified = option.enrollReady === false;
        const meta = enrollMeta(course, option, getNotified);

        return (
          <li key={option.id}>
            <article className="flex h-full flex-col overflow-hidden rounded-[var(--radius-panel)] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.05)] ring-1 ring-black/[0.04]">
              <div className="flex flex-wrap gap-2 px-5 pt-5">
                <span className="rounded-[var(--radius-control)] bg-[#FDF2E9] px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.1em] text-[#222222]">
                  {option.formatLabel}
                </span>
                <span className="rounded-[var(--radius-control)] bg-[#FDF2E9] px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.1em] text-[#222222]">
                  {course.hoursLabel}
                </span>
                {isInternational ? (
                  <span className="rounded-[var(--radius-control)] bg-[#E8F0F7] px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.1em] text-[#002448]">
                    {course.teachingLanguage ?? "English"}
                  </span>
                ) : null}
                {option.courseNumber ? (
                  <span className="rounded-[var(--radius-control)] bg-[#F7F3EE] px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.1em] text-[#746C66]">
                    #{option.courseNumber}
                  </span>
                ) : null}
              </div>

              <div className="px-5 pt-4 pb-1">
                <h3 className="font-sans text-[1.15rem] font-bold leading-snug tracking-[-0.015em] text-[#222222]">
                  {course.title}
                </h3>
                <p className="mt-1.5 text-[0.9rem] text-[#746C66]">
                  {option.formatLabel}
                  {isInternational ? " · International enrollment" : ""}
                </p>
              </div>

              {/* Mona: language, format, date, time zone, tuition USD beside registration */}
              <div className="mt-4 border-t border-black/10 px-5">
                <p className="pt-4 text-[0.72rem] font-bold uppercase tracking-[0.1em] text-[#5A6B7A]">
                  Before you register
                </p>
                <dl className="mt-1">
                  {meta.map((row, index) => (
                    <div
                      key={row.label}
                      className={`flex items-start justify-between gap-4 py-3 text-[0.92rem] ${
                        index < meta.length - 1 ? "border-b border-black/10" : ""
                      }`}
                    >
                      <dt className="shrink-0 text-[#888888]">{row.label}</dt>
                      <dd className="text-right font-semibold leading-snug text-[#222222]">
                        {row.value}
                      </dd>
                    </div>
                  ))}
                </dl>
                {option.courseNumber ? (
                  <p className="border-t border-black/10 py-3 text-[0.84rem] text-[#888888]">
                    {site.ui.courseNumberLabel}:{" "}
                    <span className="font-semibold text-[#222222]">
                      #{option.courseNumber}
                    </span>
                  </p>
                ) : null}
              </div>

              <button
                type="button"
                className="flex w-full items-center justify-between border-t border-black/10 px-5 py-3.5 text-left text-[0.9rem] font-bold text-[#222222]"
                aria-expanded={open}
                onClick={() => setOpenId(open ? null : option.id)}
              >
                {open ? "Show less" : "Show more"}
                <CaretDownIcon
                  size={16}
                  weight="bold"
                  className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                  aria-hidden
                />
              </button>

              {open ? (
                <div className="space-y-3 border-t border-black/10 px-5 py-4 text-[0.9rem] leading-6 text-[#746C66]">
                  <p>{course.priceNote}</p>
                  <p>
                    {enrollNow
                      ? "Enroll now on the partner site for video, exams, and payment."
                      : viewDates
                        ? "View dates on the partner site, then enroll for the session that fits."
                        : "Get notified when registration opens for this format."}
                  </p>
                </div>
              ) : null}

              <div className="mt-auto p-4 pt-0">
                {enrollNow ? (
                  <a
                    href={option.enrollUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-[var(--radius-control)] bg-[#002448] px-4 text-[0.9rem] font-bold text-white transition-colors hover:bg-black"
                  >
                    {site.ui.enroll}
                    <ArrowSquareOutIcon size={15} weight="bold" aria-hidden />
                    <span className="sr-only"> (opens partner site)</span>
                  </a>
                ) : viewDates ? (
                  <a
                    href={option.enrollUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-[var(--radius-control)] bg-[#002448] px-4 text-[0.9rem] font-bold text-white transition-colors hover:bg-black"
                  >
                    {site.ui.viewDatesEnroll}
                    <ArrowSquareOutIcon size={15} weight="bold" aria-hidden />
                    <span className="sr-only"> (opens partner site)</span>
                  </a>
                ) : (
                  <a
                    href={notifyHref(course, option)}
                    className="inline-flex h-11 w-full items-center justify-center rounded-[var(--radius-control)] bg-[#8FA3B8] px-4 text-[0.9rem] font-bold text-black transition-colors hover:bg-black hover:text-white"
                  >
                    {site.ui.getNotified}
                  </a>
                )}
              </div>
            </article>
          </li>
        );
      })}
    </ul>
  );
}

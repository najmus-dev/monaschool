"use client";

import {
  ArrowSquareOutIcon,
  CaretDownIcon,
  CurrencyDollarIcon,
} from "@phosphor-icons/react/ssr";
import { useState } from "react";
import type { Course } from "@/content/site";
import { site } from "@/content/site";

export function CourseFormatCards({ course }: { course: Course }) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <ul className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3">
      {course.formats.map((option) => {
        const open = openId === option.id;
        const canEnrollNow =
          option.enrollReady !== false &&
          (option.format === "self-paced" ||
            option.format === "correspondence");

        return (
          <li key={option.id}>
            <article className="flex h-full flex-col overflow-hidden rounded-[1rem] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.05)] ring-1 ring-black/[0.04]">
              <div className="flex flex-wrap gap-2 px-5 pt-5">
                <span className="rounded-[0.25rem] bg-[#FDF2E9] px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.1em] text-[#222222]">
                  {option.formatLabel}
                </span>
                <span className="rounded-[0.25rem] bg-[#FDF2E9] px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.1em] text-[#222222]">
                  {course.hoursLabel}
                </span>
                {option.courseNumber ? (
                  <span className="rounded-[0.25rem] bg-[#F7F3EE] px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.1em] text-[#746C66]">
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
                </p>
              </div>

              <div className="mt-4 border-t border-black/10 px-5">
                <div className="flex items-center gap-2 pt-4 text-[0.8rem] font-bold uppercase tracking-[0.08em] text-[#222222]">
                  <CurrencyDollarIcon size={16} weight="regular" aria-hidden />
                  Details
                </div>
                <dl className="mt-1">
                  <div className="flex items-center justify-between gap-4 border-b border-black/10 py-3 text-[0.92rem]">
                    <dt className="text-[#888888]">{site.ui.tuitionLabel}</dt>
                    <dd className="font-semibold tabular-nums text-[#222222]">
                      {option.priceLabel}
                    </dd>
                  </div>
                  {option.courseNumber ? (
                    <div className="flex items-center justify-between gap-4 border-b border-black/10 py-3 text-[0.92rem]">
                      <dt className="text-[#888888]">
                        {site.ui.courseNumberLabel}
                      </dt>
                      <dd className="font-semibold text-[#222222]">
                        {option.courseNumber}
                      </dd>
                    </div>
                  ) : null}
                  <div className="flex items-center justify-between gap-4 py-3 text-[0.92rem]">
                    <dt className="text-[#888888]">Hours</dt>
                    <dd className="font-semibold text-[#222222]">
                      {course.hoursLabel}
                    </dd>
                  </div>
                </dl>
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
                    {canEnrollNow
                      ? "Enroll on the partner site for video, exams, and payment."
                      : "Request the next livestream or classroom dates from the school."}
                  </p>
                </div>
              ) : null}

              <div className="mt-auto p-4 pt-0">
                {canEnrollNow ? (
                  <a
                    href={option.enrollUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-[0.3rem] bg-[#002448] px-4 text-[0.9rem] font-bold text-white transition-colors hover:bg-black"
                  >
                    {site.ui.enroll}
                    <ArrowSquareOutIcon size={15} weight="bold" aria-hidden />
                    <span className="sr-only"> (opens partner site)</span>
                  </a>
                ) : (
                  <a
                    href={`/contact?interest=course-question&course=${encodeURIComponent(course.slug)}&format=${encodeURIComponent(option.formatLabel)}`}
                    className="inline-flex h-11 w-full items-center justify-center rounded-[0.3rem] bg-[#8FA3B8] px-4 text-[0.9rem] font-bold text-black transition-colors hover:bg-black hover:text-white"
                  >
                    {site.ui.requestDates}
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

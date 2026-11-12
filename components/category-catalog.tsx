"use client";

import { CaretDownIcon } from "@phosphor-icons/react/ssr";
import { useMemo, useState } from "react";
import type {
  Course,
  DeliveryFormat,
  LearningCategory,
} from "@/content/site";
import { site } from "@/content/site";
import { CourseGrid } from "./course-card";

const formatLabels: Record<DeliveryFormat, string> = {
  "self-paced": "Self-paced",
  livestream: "Livestream",
  classroom: "In person",
  correspondence: "Correspondence",
};

export function CategoryCatalog({
  category,
  courses,
}: {
  category: LearningCategory;
  courses: Course[];
}) {
  const [topic, setTopic] = useState("all");
  const [format, setFormat] = useState<"all" | DeliveryFormat>("all");

  const filtered = useMemo(() => {
    return courses.filter((course) => {
      const topicOk =
        topic === "all" ||
        course.floridaTopic === topic ||
        course.topicTags?.includes(topic);
      const formatOk =
        format === "all" ||
        course.formats.some((item) => item.format === format);
      return topicOk && formatOk;
    });
  }, [courses, topic, format]);

  const topicOptions = [
    { id: "all", label: site.ui.filterAll },
    ...category.topics.map((item) => ({ id: item.id, label: item.label })),
  ];
  const formatOptions: { id: "all" | DeliveryFormat; label: string }[] = [
    { id: "all", label: site.ui.filterFormatAll },
    ...category.allowedFormats.map((item) => ({
      id: item,
      label: formatLabels[item],
    })),
  ];

  const selectClass =
    "h-11 w-full min-w-[12rem] appearance-none rounded-[0.35rem] border border-[#d6d0c6] bg-white px-3.5 pr-10 text-[0.9rem] text-[#222222] outline-none focus:border-[#222222]";

  return (
    <div>
      <div className="rounded-[0.75rem] border border-[#f0d978] bg-[#FFEFB9] p-3 sm:p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="min-w-0 flex-1 md:max-w-[20rem]">
            <label
              htmlFor={`topic-${category.id}`}
              className="mb-1.5 block text-[0.72rem] font-bold uppercase tracking-[0.1em] text-[#222222]"
            >
              {site.ui.topicsLabel}
            </label>
            <div className="relative">
              <select
                id={`topic-${category.id}`}
                value={topic}
                onChange={(event) => setTopic(event.target.value)}
                className={selectClass}
              >
                {topicOptions.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </select>
              <CaretDownIcon
                size={14}
                weight="bold"
                className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#746C66]"
                aria-hidden
              />
            </div>
          </div>

          <div className="flex w-full flex-wrap items-end gap-3 md:w-auto">
            <div className="min-w-0 flex-1 md:w-[14rem] md:flex-none">
              <label
                htmlFor={`format-${category.id}`}
                className="mb-1.5 block text-[0.72rem] font-bold uppercase tracking-[0.1em] text-[#222222]"
              >
                {site.ui.formatLabel}
              </label>
              <div className="relative">
                <select
                  id={`format-${category.id}`}
                  value={format}
                  onChange={(event) =>
                    setFormat(event.target.value as "all" | DeliveryFormat)
                  }
                  className={selectClass}
                >
                  {formatOptions.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.label}
                    </option>
                  ))}
                </select>
                <CaretDownIcon
                  size={14}
                  weight="bold"
                  className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#746C66]"
                  aria-hidden
                />
              </div>
            </div>

            {(topic !== "all" || format !== "all") && (
              <button
                type="button"
                onClick={() => {
                  setTopic("all");
                  setFormat("all");
                }}
                className="mb-2.5 text-[0.84rem] font-semibold text-[#746C66] underline underline-offset-2 hover:text-black"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>
      </div>

      {filtered.length > 0 ? (
        <CourseGrid courses={filtered} highlightFormat={format} />
      ) : (
        <p className="mt-10 max-w-2xl text-base leading-7 text-[#746C66]">
          {topic !== "all" || format !== "all"
            ? site.ui.emptyFilterCourses
            : site.ui.emptyCategoryCourses}
        </p>
      )}
    </div>
  );
}

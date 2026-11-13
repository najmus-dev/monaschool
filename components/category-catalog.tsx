"use client";

import { CaretDownIcon } from "@phosphor-icons/react/ssr";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import type {
  Course,
  DeliveryFormat,
  LearningCategory,
} from "@/content/site";
import { site } from "@/content/site";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
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
  const searchParams = useSearchParams();
  const topicFromUrl = searchParams.get("topic");
  const validTopicIds = useMemo(
    () => new Set(category.topics.map((item) => item.id)),
    [category.topics],
  );
  const initialTopic =
    topicFromUrl && validTopicIds.has(topicFromUrl) ? topicFromUrl : "all";

  const [topic, setTopic] = useState(initialTopic);
  const [format, setFormat] = useState<"all" | DeliveryFormat>("all");

  useEffect(() => {
    if (topicFromUrl && validTopicIds.has(topicFromUrl)) {
      setTopic(topicFromUrl);
    }
  }, [topicFromUrl, validTopicIds]);

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

  const rootRef = useRef<HTMLDivElement>(null);
  useScrollReveal(rootRef, { y: 20, stagger: 0.08 });

  const selectClass =
    "h-10 w-full min-w-0 appearance-none rounded-[var(--radius-control)] border border-[#c5d0dc] bg-white px-3 pr-9 text-[0.86rem] text-[#001830] outline-none focus:border-[#002448] sm:h-11 sm:px-3.5 sm:pr-10 sm:text-[0.9rem] sm:min-w-[12rem]";

  return (
    <div ref={rootRef}>
      <div
        data-reveal
        className="w-full rounded-[var(--radius-panel)] border border-[#c5d0dc] bg-white p-3 sm:w-fit sm:max-w-full sm:bg-white/90 sm:p-4 sm:shadow-[0_8px_24px_rgb(0_36_72/0.04)] sm:backdrop-blur-sm"
      >
        <div className="flex flex-row flex-wrap items-end gap-2.5 sm:gap-3">
          <div className="min-w-0 flex-1 basis-[calc(50%-0.35rem)] sm:basis-auto sm:w-[16.5rem] sm:flex-none">
            <label
              htmlFor={`topic-${category.id}`}
              className="mb-1.5 block text-[0.68rem] font-bold uppercase tracking-[0.1em] text-[#5A6B7A] sm:text-[0.72rem]"
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
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#5A6B7A] sm:right-3.5"
                aria-hidden
              />
            </div>
          </div>

          <div className="min-w-0 flex-1 basis-[calc(50%-0.35rem)] sm:basis-auto sm:w-[14rem] sm:flex-none">
            <label
              htmlFor={`format-${category.id}`}
              className="mb-1.5 block text-[0.68rem] font-bold uppercase tracking-[0.1em] text-[#5A6B7A] sm:text-[0.72rem]"
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
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#5A6B7A] sm:right-3.5"
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
              className="inline-flex h-10 shrink-0 items-center text-[0.8rem] font-semibold text-[#5A6B7A] underline underline-offset-2 hover:text-[#001830] sm:h-11 sm:text-[0.84rem]"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {filtered.length > 0 ? (
        <div data-reveal>
          <CourseGrid courses={filtered} highlightFormat={format} />
        </div>
      ) : (
        <p
          data-reveal
          className="mt-10 max-w-2xl text-base leading-7 text-[#746C66]"
        >
          {topic !== "all" || format !== "all"
            ? site.ui.emptyFilterCourses
            : site.ui.emptyCategoryCourses}
        </p>
      )}
    </div>
  );
}

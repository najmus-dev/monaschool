"use client";

import {
  ArrowRightIcon,
  BuildingsIcon,
  ChalkboardTeacherIcon,
  VideoCameraIcon,
} from "@phosphor-icons/react/ssr";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import type { Course, LearningCategory } from "@/content/site";
import { site } from "@/content/site";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { CategoryCatalog } from "./category-catalog";
import { CategoryMediaHero } from "./category-media-hero";
import { HomeQuestions } from "./home-questions";
import { PathNextCta } from "./path-next-cta";

const keyFacts = [
  { label: "Formats", value: "Livestream · In person" },
  { label: "Audience", value: "Individuals & teams" },
  { label: "Focus", value: "AI, sales, leadership" },
  { label: "Status", value: "Publishes when confirmed" },
] as const;

const modules = [
  {
    title: "AI for Business & Productivity",
    outcome: "Use AI tools to research faster, draft clearer work, and cut routine admin.",
    forWhom: "Associates, coordinators, and managers building modern work habits",
  },
  {
    title: "Sales & Business Development",
    outcome: "Strengthen pipeline habits, outreach quality, and client follow-through.",
    forWhom: "Sales roles, brokers, and professionals growing a book of business",
  },
  {
    title: "Negotiation",
    outcome: "Prepare, frame, and close conversations with clearer structure and confidence.",
    forWhom: "Anyone handling deals, renewals, or high-stakes professional talks",
  },
  {
    title: "Communication & Presentation",
    outcome: "Present ideas cleanly in meetings, pitches, and client updates.",
    forWhom: "Professionals who brief teams, clients, or stakeholders",
  },
  {
    title: "Leadership",
    outcome: "Lead people and priorities with practical management fundamentals.",
    forWhom: "Team leads, new managers, and growing operators",
  },
] as const;

const experience = [
  {
    step: "01",
    title: "Live instruction",
    body: "Sessions run with an instructor in livestream or classroom—not self-paced modules.",
  },
  {
    step: "02",
    title: "Applied practice",
    body: "Exercises map to real workplace situations: meetings, deals, outreach, and team work.",
  },
  {
    step: "03",
    title: "Confirmed before publish",
    body: "Titles, dates, and tuition appear on this site only after the school confirms them.",
  },
] as const;

function SectionMark() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M0 0H12L0 12V0Z" fill="#C08430" />
    </svg>
  );
}

export function PdPage({
  category,
  courses,
}: {
  category: LearningCategory;
  courses: Course[];
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  useScrollReveal(rootRef);

  const askHref = `/contact?interest=course-question&path=${encodeURIComponent(category.slug)}`;
  const groupHref = `/contact?interest=group-training&path=${encodeURIComponent(category.slug)}`;

  return (
    <div ref={rootRef}>
      <CategoryMediaHero
        breadcrumb="Professional Development"
        label="Skills for work"
        title={category.pageTitle}
        lede={category.pageLede}
        image="/images/bright-office.jpg"
        imageAlt="Professionals collaborating in a bright modern office"
        imagePosition="center 40%"
        ctaHref="#modules"
        ctaLabel="Explore focus areas"
      />

      {/* At-a-glance — separate white band, Florida path-strip style */}
      <section className="border-b border-[#d5dde6] bg-white">
        <div className="mx-auto w-full max-w-[90rem] px-4 py-11 sm:px-6 md:py-12 lg:px-8">
          <ul className="grid grid-cols-1 divide-y divide-[#d5dde6] sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
            {keyFacts.map((fact, index) => (
              <li
                key={fact.label}
                className="min-h-0 sm:px-6 sm:first:pl-0 lg:px-8 lg:first:pl-0 lg:last:pr-0"
              >
                <div className="flex h-full flex-col py-6 sm:py-1">
                  <div className="flex items-baseline gap-3">
                    <span className="font-sans text-[0.78rem] font-bold tabular-nums tracking-[0.08em] text-[#C08430]">
                      0{index + 1}
                    </span>
                    <p className="text-[0.72rem] font-bold uppercase tracking-[0.12em] text-[#5A6B7A]">
                      {fact.label}
                    </p>
                  </div>
                  <p className="mt-3 font-sans text-[1.05rem] font-bold leading-snug tracking-[-0.015em] text-[#001830]">
                    {fact.value}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Curriculum modules — denser than thin columns */}
      <section
        id="modules"
        data-reveal-section
        className="scroll-mt-28 border-b border-[#d5dde6] bg-white"
      >
        <div className="mx-auto w-full max-w-[90rem] px-4 py-14 sm:px-6 md:py-16 lg:px-8 lg:py-20">
          <div className="grid grid-cols-1 items-end gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:gap-10">
            <div data-reveal className="max-w-2xl">
              <div className="flex items-center gap-2.5">
                <SectionMark />
                <p className="text-[0.78rem] font-bold uppercase tracking-[0.12em] text-[#001830]">
                  Curriculum map
                </p>
              </div>
              <h2 className="mt-3 font-sans text-[1.85rem] font-bold tracking-[-0.02em] text-[#001830] sm:text-[2.15rem]">
                Five focus areas. One professional path.
              </h2>
              <p className="mt-4 text-[1.02rem] leading-8 text-[#5A6B7A]">
                Each area below is a planned training theme. Individual course
                pages, instructors, dates, and fees publish here after the
                school confirms them—without placeholder listings.
              </p>
            </div>
            <div
              data-reveal
              className="relative hidden aspect-[16/10] overflow-hidden rounded-[var(--radius-media)] lg:block"
            >
              <Image
                src="/images/fl-card-office.jpg"
                alt=""
                fill
                sizes="22rem"
                className="object-cover object-[center_40%]"
              />
            </div>
          </div>

          <ul className="mt-12 divide-y divide-[#e2eaf1] border-y border-[#e2eaf1]">
            {modules.map(({ title, outcome, forWhom }, index) => (
              <li
                key={title}
                data-reveal
                className="grid grid-cols-1 gap-5 py-7 md:grid-cols-[2.75rem_minmax(0,1.15fr)_minmax(0,1fr)_minmax(0,0.9fr)] md:items-start md:gap-8 md:py-8"
              >
                <p className="font-sans text-[0.9rem] font-bold tabular-nums tracking-[0.06em] text-[#C08430]">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <div>
                  <h3 className="font-sans text-[1.12rem] font-bold leading-snug tracking-[-0.015em] text-[#001830] sm:text-[1.2rem]">
                    {title}
                  </h3>
                </div>
                <div>
                  <p className="text-[0.7rem] font-bold uppercase tracking-[0.1em] text-[#5A6B7A]">
                    Outcome
                  </p>
                  <p className="mt-2 text-[0.98rem] leading-7 text-[#001830]">
                    {outcome}
                  </p>
                </div>
                <div>
                  <p className="text-[0.7rem] font-bold uppercase tracking-[0.1em] text-[#5A6B7A]">
                    Best fit
                  </p>
                  <p className="mt-2 text-[0.98rem] leading-7 text-[#526578]">
                    {forWhom}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Who / How — audience split */}
      <section data-reveal-section className="border-b border-[#d5dde6] bg-[#F4F7FA]">
        <div className="mx-auto w-full max-w-[90rem] px-4 py-14 sm:px-6 md:py-16 lg:px-8 lg:py-20">
          <div data-reveal className="max-w-2xl">
            <div className="flex items-center gap-2.5">
              <SectionMark />
              <p className="text-[0.78rem] font-bold uppercase tracking-[0.12em] text-[#001830]">
                Who it is for
              </p>
            </div>
            <h2 className="mt-3 font-sans text-[1.85rem] font-bold tracking-[-0.02em] text-[#001830] sm:text-[2.15rem]">
              Built for working professionals and teams
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-2">
            <article
              data-reveal
              className="overflow-hidden rounded-[var(--radius-panel)] border border-[#d5dde6] bg-white"
            >
              <div className="relative aspect-[21/9] overflow-hidden bg-[#D7E0E9]">
                <Image
                  src="/images/hero-banner.jpg"
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 45vw, 90vw"
                  className="object-cover object-[center_35%]"
                />
              </div>
              <div className="px-6 py-7 sm:px-8">
                <div className="flex items-center gap-2.5">
                  <ChalkboardTeacherIcon
                    size={22}
                    weight="duotone"
                    className="text-[#002448]"
                    aria-hidden
                  />
                  <h3 className="font-sans text-[1.2rem] font-bold text-[#001830]">
                    Individual professionals
                  </h3>
                </div>
                <p className="mt-3 text-[0.98rem] leading-7 text-[#5A6B7A]">
                  Advance practical skills in AI, sales, negotiation,
                  communication, or leadership around a full work schedule.
                </p>
                <ul className="mt-5 space-y-2.5 text-[0.95rem] leading-7 text-[#001830]">
                  <li className="flex gap-2.5">
                    <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-[#C08430]" />
                    Join livestream or classroom dates when published
                  </li>
                  <li className="flex gap-2.5">
                    <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-[#C08430]" />
                    Ask the school which focus area fits your role
                  </li>
                </ul>
                <Link
                  href={askHref}
                  className="mt-6 inline-flex h-11 items-center gap-2 rounded-[var(--radius-control)] bg-[#002448] px-5 text-[0.9rem] font-bold text-white transition-colors hover:bg-black"
                >
                  Ask about open sessions
                  <ArrowRightIcon size={15} weight="bold" aria-hidden />
                </Link>
              </div>
            </article>

            <article
              data-reveal
              className="overflow-hidden rounded-[var(--radius-panel)] border border-[#d5dde6] bg-white"
            >
              <div className="relative aspect-[21/9] overflow-hidden bg-[#D7E0E9]">
                <Image
                  src="/images/fl-card-broker.jpg"
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 45vw, 90vw"
                  className="object-cover object-[center_45%]"
                />
              </div>
              <div className="px-6 py-7 sm:px-8">
                <div className="flex items-center gap-2.5">
                  <BuildingsIcon
                    size={22}
                    weight="duotone"
                    className="text-[#002448]"
                    aria-hidden
                  />
                  <h3 className="font-sans text-[1.2rem] font-bold text-[#001830]">
                    Brokerages & companies
                  </h3>
                </div>
                <p className="mt-3 text-[0.98rem] leading-7 text-[#5A6B7A]">
                  Commission tailored sessions for teams that need shared
                  language, skills, and practice—not one-off generic webinars.
                </p>
                <ul className="mt-5 space-y-2.5 text-[0.95rem] leading-7 text-[#001830]">
                  <li className="flex gap-2.5">
                    <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-[#C08430]" />
                    Align topics to your team&apos;s goals and schedule
                  </li>
                  <li className="flex gap-2.5">
                    <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-[#C08430]" />
                    Livestream or on-site delivery when confirmed
                  </li>
                </ul>
                <Link
                  href={groupHref}
                  className="mt-6 inline-flex h-11 items-center gap-2 rounded-[var(--radius-control)] border border-[#002448]/20 bg-white px-5 text-[0.9rem] font-bold text-[#001830] transition-colors hover:border-[#002448] hover:bg-[#002448] hover:text-white"
                >
                  {site.ui.groupTraining}
                  <ArrowRightIcon size={15} weight="bold" aria-hidden />
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Learning experience */}
      <section data-reveal-section className="border-b border-[#d5dde6] bg-white">
        <div className="mx-auto grid w-full max-w-[90rem] grid-cols-1 items-stretch gap-10 px-4 py-14 sm:px-6 md:py-16 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-14 lg:px-8 lg:py-20">
          <div
            data-reveal
            className="relative min-h-[18rem] overflow-hidden rounded-[var(--radius-media)] lg:min-h-full"
          >
            <Image
              src="/images/classroom.jpg"
              alt=""
              fill
              sizes="(min-width: 1024px) 42vw, 90vw"
              className="object-cover object-[center_28%]"
            />
            <div
              className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(0,24,48,0.72)_100%)]"
              aria-hidden
            />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.12em] text-[#C08430]">
                Learning experience
              </p>
              <p className="mt-2 max-w-sm font-sans text-[1.25rem] font-bold leading-snug text-white">
                Live sessions. Applied practice. Confirmed before it goes live
                on the site.
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <div data-reveal className="flex items-center gap-2.5">
              <SectionMark />
              <p className="text-[0.78rem] font-bold uppercase tracking-[0.12em] text-[#001830]">
                How sessions work
              </p>
            </div>
            <h2
              data-reveal
              className="mt-3 font-sans text-[1.85rem] font-bold tracking-[-0.02em] text-[#001830] sm:text-[2.15rem]"
            >
              Designed for professionals who need usable skills fast
            </h2>
            <ol className="mt-8 space-y-0 divide-y divide-[#e2eaf1] border-y border-[#e2eaf1]">
              {experience.map((item) => (
                <li
                  key={item.step}
                  data-reveal
                  className="flex gap-5 py-5 first:pt-5"
                >
                  <span className="w-8 shrink-0 font-sans text-[0.78rem] font-bold tabular-nums tracking-[0.08em] text-[#C08430]">
                    {item.step}
                  </span>
                  <div>
                    <p className="font-sans text-[1.08rem] font-bold text-[#001830]">
                      {item.title}
                    </p>
                    <p className="mt-1.5 text-[0.98rem] leading-7 text-[#5A6B7A]">
                      {item.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <div
              data-reveal
              className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2"
            >
              <div className="flex items-start gap-3 rounded-[var(--radius-panel)] border border-[#d5dde6] bg-[#F7FAFC] px-4 py-4">
                <VideoCameraIcon
                  size={22}
                  weight="duotone"
                  className="mt-0.5 shrink-0 text-[#002448]"
                  aria-hidden
                />
                <div>
                  <p className="font-bold text-[#001830]">Livestream</p>
                  <p className="mt-1 text-[0.9rem] leading-6 text-[#5A6B7A]">
                    Live online with an instructor when dates publish.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-[var(--radius-panel)] border border-[#d5dde6] bg-[#F7FAFC] px-4 py-4">
                <ChalkboardTeacherIcon
                  size={22}
                  weight="duotone"
                  className="mt-0.5 shrink-0 text-[#002448]"
                  aria-hidden
                />
                <div>
                  <p className="font-bold text-[#001830]">In person</p>
                  <p className="mt-1 text-[0.9rem] leading-6 text-[#5A6B7A]">
                    Classroom sessions at the school when dates publish.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {courses.length > 0 ? (
        <section id="courses" className="scroll-mt-28 bg-[#F4F7FA]">
          <div className="mx-auto w-full max-w-[90rem] px-4 py-14 sm:px-6 md:py-16 lg:px-8 lg:py-20">
            <div className="mb-9 max-w-2xl">
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.14em] text-[#C08430]">
                Course catalog
              </p>
              <h2 className="mt-2 font-sans text-[1.75rem] font-bold tracking-[-0.02em] text-[#001830] sm:text-[2rem]">
                Browse published courses
              </h2>
            </div>
            <CategoryCatalog category={category} courses={courses} />
          </div>
        </section>
      ) : null}

      <PathNextCta
        title="Have a team or course question?"
        body="Ask the school about upcoming sessions, group training, or when a program will publish."
        primaryHref={askHref}
        primaryLabel="Ask a question"
        secondaryHref={groupHref}
        secondaryLabel="Group training"
      />

      <HomeQuestions />
    </div>
  );
}

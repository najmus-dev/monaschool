import Image from "next/image";
import Link from "next/link";
import type { Course } from "@/content/site";
import {
  coursePriceLabel,
  courses,
  getLearningCategory,
  site,
} from "@/content/site";
import { CourseFormatCards } from "./course-format-cards";
import { HomeQuestions } from "./home-questions";

function SectionMark() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M0 0H12L0 12V0Z" fill="#FFD400" />
    </svg>
  );
}

const heroImages = [
  "/images/classroom.jpg",
  "/images/bright-office.jpg",
  "/images/hero-study.jpg",
  "/images/license-desk.jpg",
  "/images/notebook.jpg",
] as const;

function heroForSlug(slug: string) {
  let hash = 0;
  for (const char of slug) hash = (hash + char.charCodeAt(0)) % heroImages.length;
  return heroImages[hash] ?? heroImages[0];
}

export function CourseLanding({ course }: { course: Course }) {
  const category = getLearningCategory(course.categoryIds[0] ?? "");
  const categoryHref = category ? `/${category.slug}` : "/florida-real-estate";
  const heroImage = heroForSlug(course.slug);
  const formatLabels = course.formats.map((item) => item.formatLabel).join(", ");
  const lowest = coursePriceLabel(course);

  const detailCards = [
    {
      title: "Duration",
      body: `${course.hoursLabel} of Florida education as listed on the school fee schedule.`,
    },
    {
      title: "Credit path",
      body: course.creditLabel ?? course.title,
    },
    {
      title: "Formats",
      body: `${formatLabels}. Compare tuition by format before you enroll.`,
    },
    {
      title: "Included",
      body: course.included[0] ?? course.benefit,
    },
    {
      title: "Tuition",
      body: `${lowest} depending on format. Confirm the total on the partner site.`,
    },
  ];

  const skillCards = course.outcomes.slice(0, 4);

  const related = courses
    .filter(
      (item) =>
        item.published &&
        item.slug !== course.slug &&
        item.categoryIds.some((id) => course.categoryIds.includes(id)),
    )
    .slice(0, 3);

  return (
    <>
      <section className="relative isolate overflow-hidden">
        <div className="relative min-h-[18rem] sm:min-h-[20rem] md:min-h-[22rem] lg:min-h-[24rem]">
          <Image
            src={heroImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_28%]"
          />
          <div
            className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.74)_0%,rgba(0,0,0,0.48)_44%,rgba(0,0,0,0.14)_76%,transparent_100%)]"
            aria-hidden
          />

          <div className="relative mx-auto flex min-h-[18rem] w-full max-w-[90rem] items-center px-4 py-14 pt-[calc(5.75rem+1.25rem)] sm:min-h-[20rem] sm:px-6 md:min-h-[22rem] lg:min-h-[24rem] lg:px-8">
            <div className="max-w-[42rem]">
              <nav
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

              <div className="mt-5 flex items-center gap-2.5">
                <SectionMark />
                <p className="text-[0.78rem] font-bold uppercase tracking-[0.14em] text-white">
                  {category?.label ?? "Course"}
                </p>
              </div>

              <h1 className="mt-4 font-sans text-[2rem] font-bold uppercase leading-[1.05] tracking-[-0.025em] text-white sm:text-[2.55rem] md:text-[3rem]">
                {course.title}
              </h1>
              <p className="mt-4 max-w-[34rem] text-[0.98rem] leading-7 text-white/88 sm:text-[1.05rem]">
                {course.benefit}
              </p>
              <a
                href="#formats"
                className="mt-6 inline-flex h-11 items-center gap-2 rounded-[0.25rem] bg-[#FFD400] px-5 text-[0.9rem] font-bold text-black transition-colors hover:bg-white"
              >
                Find out more
                <span aria-hidden>→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F7F3EE]">
        <div className="mx-auto w-full max-w-[44rem] px-4 py-14 sm:px-6 md:py-16">
          <p className="text-[1.05rem] leading-8 text-[#222222]">
            {course.benefit}
          </p>
          <p className="mt-5 text-[1.05rem] leading-8 text-[#746C66]">
            Formats available: {formatLabels}. {site.ui.fromPrice}{" "}
            {lowest.replace(/^From\s+/i, "")}. {site.ui.priceIntro}
          </p>
          {course.certificateNote ? (
            <p className="mt-6 border-l-[3px] border-[#FFD400] pl-4 text-[0.95rem] leading-7 text-[#746C66]">
              {course.certificateNote}
            </p>
          ) : null}
          {course.prerequisites ? (
            <p className="mt-6 text-[0.95rem] leading-7 text-[#746C66]">
              <span className="font-semibold text-[#222222]">Prerequisites: </span>
              {course.prerequisites}
            </p>
          ) : null}
        </div>
      </section>

      <section className="bg-[#F7F3EE]">
        <div className="mx-auto w-full max-w-[90rem] px-4 pb-16 sm:px-6 md:pb-20 lg:px-8">
          <div className="flex items-center gap-2.5">
            <SectionMark />
            <p className="text-[0.78rem] font-bold uppercase tracking-[0.12em] text-black">
              How it works
            </p>
          </div>
          <h2 className="mt-4 font-sans text-[2.1rem] font-bold tracking-[-0.02em] text-black sm:text-[2.5rem]">
            {site.ui.courseDetails}
          </h2>
          <p className="mt-3 max-w-[36rem] text-[1rem] leading-7 text-[#746C66]">
            Published Florida education from the school fee schedule.
          </p>

          <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {detailCards.map((card) => (
              <li
                key={card.title}
                className="rounded-[1.15rem] bg-white px-6 py-7 shadow-[0_8px_24px_rgba(0,0,0,0.04)]"
              >
                <h3 className="font-sans text-[1.05rem] font-bold text-black">
                  {card.title}
                </h3>
                <p className="mt-3 text-[0.95rem] leading-7 text-[#746C66]">
                  {card.body}
                </p>
              </li>
            ))}
            <li className="flex min-h-[11.5rem] flex-col justify-between rounded-[1.15rem] bg-[#FFD400] px-6 py-7">
              <div>
                <h3 className="font-sans text-[1.15rem] font-bold text-black">
                  Ready to get started?
                </h3>
                <p className="mt-3 text-[0.95rem] leading-7 text-black/75">
                  Choose a format below. Enrollment, video, and payment open on
                  the partner site.
                </p>
              </div>
              <a
                href="#formats"
                className="mt-6 inline-flex items-center gap-2 self-end text-[0.92rem] font-bold text-black"
              >
                Find out more
                <span aria-hidden>→</span>
              </a>
            </li>
          </ul>
        </div>
      </section>

      <section className="bg-[#EEEEEE]">
        <div className="mx-auto w-full max-w-[90rem] px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <div className="flex items-center gap-2.5">
            <SectionMark />
            <p className="text-[0.78rem] font-bold uppercase tracking-[0.12em] text-black">
              Outcomes
            </p>
          </div>
          <h2 className="mt-4 max-w-[20ch] font-sans text-[2.1rem] font-bold tracking-[-0.02em] text-black sm:text-[2.45rem]">
            Practical skill development
          </h2>
          <p className="mt-3 max-w-[40rem] text-[1rem] leading-7 text-[#746C66]">
            Build capability through the published curriculum, assessments, and
            completion requirements for this course.
          </p>

          <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {skillCards.map((item) => (
              <li
                key={item}
                className="rounded-[1.15rem] bg-white px-6 py-7 shadow-[0_8px_24px_rgba(0,0,0,0.04)]"
              >
                <span
                  className="mb-5 block h-1 w-8 rounded-full bg-[#FFD400]"
                  aria-hidden
                />
                <h3 className="font-sans text-[1.08rem] font-bold leading-snug text-black">
                  {item}
                </h3>
              </li>
            ))}
            <li className="flex min-h-[11rem] flex-col justify-between rounded-[1.15rem] bg-[#FFD400] px-6 py-7">
              <p className="text-[1.15rem] font-bold leading-snug text-black">
                Compare formats and enroll when you are ready
              </p>
              <a
                href="#formats"
                className="mt-8 inline-flex size-11 items-center justify-center rounded-full bg-black text-white transition-colors hover:bg-white hover:text-black"
                aria-label="Jump to formats"
              >
                <span aria-hidden className="text-lg leading-none">
                  →
                </span>
              </a>
            </li>
          </ul>
        </div>
      </section>

      <section className="bg-[#FFD400]">
        <div className="mx-auto grid w-full max-w-[90rem] grid-cols-1 items-center gap-10 px-4 py-14 sm:px-6 md:gap-14 md:py-16 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16 lg:px-8">
          <div className="max-w-[34rem]">
            <h2 className="font-sans text-[2.1rem] font-bold tracking-[-0.02em] text-black sm:text-[2.5rem]">
              Ready for the next step?
            </h2>
            <p className="mt-4 text-[1.05rem] leading-7 text-black/75">
              Pick the format that fits your schedule. Tuition follows the
              school fee schedule and is confirmed on the partner site.
            </p>
            <a
              href="#formats"
              className="mt-8 inline-flex h-11 items-center rounded-[0.25rem] bg-black px-5 text-[0.88rem] font-bold text-white transition-colors hover:bg-white hover:text-black"
            >
              {site.ui.chooseFormat}
            </a>
          </div>
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[26rem] overflow-hidden rounded-[1.5rem] sm:aspect-[5/4] lg:mx-0 lg:max-w-none lg:justify-self-end">
            <Image
              src="/images/bright-office.jpg"
              alt=""
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover object-[center_22%]"
            />
          </div>
        </div>
      </section>

      <section className="bg-[#F7F3EE]">
        <div className="mx-auto w-full max-w-[90rem] px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <div className="flex items-center gap-2.5">
            <SectionMark />
            <p className="text-[0.78rem] font-bold uppercase tracking-[0.12em] text-black">
              Audience
            </p>
          </div>
          <h2 className="mt-4 font-sans text-[2.1rem] font-bold tracking-[-0.02em] text-black sm:text-[2.45rem]">
            {site.ui.audienceTitle}
          </h2>
          <div className="mt-8 max-w-[40rem] rounded-[1.15rem] bg-white px-6 py-7 shadow-[0_8px_24px_rgba(0,0,0,0.04)] sm:px-8 sm:py-8">
            <p className="text-[1.05rem] leading-8 text-[#222222]">
              {course.audience}
            </p>
          </div>
        </div>
      </section>

      <section id="formats" className="scroll-mt-28 bg-[#F7F3EE]">
        <div className="mx-auto w-full max-w-[90rem] px-4 pb-16 sm:px-6 md:pb-20 lg:px-8">
          <div className="flex items-center gap-2.5">
            <SectionMark />
            <p className="text-[0.78rem] font-bold uppercase tracking-[0.12em] text-black">
              Formats
            </p>
          </div>
          <h2 className="mt-4 font-sans text-[2.1rem] font-bold tracking-[-0.02em] text-black sm:text-[2.45rem]">
            Choose how you study
          </h2>
          <p className="mt-3 max-w-[40rem] text-[1rem] leading-7 text-[#746C66]">
            Each card lists school tuition and course number where published.
            Self-paced enrolls now; livestream and classroom dates are requested
            through the school.
          </p>

          <div className="mt-10">
            <CourseFormatCards course={course} />
          </div>

          <div className="mt-10 rounded-[1.15rem] bg-white px-6 py-7 sm:px-8">
            <h3 className="font-sans text-[1.1rem] font-bold text-black">
              {site.ui.includedTitle}
            </h3>
            <ul className="mt-5 grid gap-3.5 sm:grid-cols-2">
              {course.included.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-[0.95rem] leading-7 text-[#746C66]"
                >
                  <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-[#FFD400]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="bg-white">
          <div className="mx-auto w-full max-w-[90rem] px-4 py-16 sm:px-6 md:py-20 lg:px-8">
            <h2 className="font-sans text-[2rem] font-bold tracking-[-0.02em] text-black">
              {site.ui.otherCourses}
            </h2>
            <ul className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/courses/${item.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-[1rem] bg-[#F7F3EE] transition-colors hover:bg-[#F3EFE6]"
                  >
                    <div className="flex flex-1 flex-col px-6 pb-5 pt-6">
                      <p className="text-[0.68rem] font-bold uppercase tracking-[0.12em] text-[#746C66]">
                        {item.hoursLabel}
                      </p>
                      <h3 className="mt-3 font-sans text-[1.12rem] font-bold leading-snug text-black">
                        {item.title}
                      </h3>
                      <p className="mt-3 flex-1 text-[0.9rem] leading-6 text-[#746C66]">
                        {item.benefit}
                      </p>
                    </div>
                    <div className="flex items-center justify-between bg-[#ef5633] px-5 py-3.5 text-[0.88rem] font-bold text-white transition-colors group-hover:bg-[#d94828]">
                      <span>{site.ui.viewDetails}</span>
                      <span aria-hidden>→</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <HomeQuestions />
    </>
  );
}

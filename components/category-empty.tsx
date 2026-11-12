import Image from "next/image";
import Link from "next/link";
import type { DeliveryFormat, LearningCategory } from "@/content/site";
import { site } from "@/content/site";

function SectionMark({ dark = false }: { dark?: boolean }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M0 0H12L0 12V0Z" fill={dark ? "#111111" : "#FFD400"} />
    </svg>
  );
}

const formatLabels: Record<DeliveryFormat, string> = {
  "self-paced": "Self-paced",
  livestream: "Livestream",
  classroom: "In person",
  correspondence: "Correspondence",
};

const formatBodies: Partial<Record<DeliveryFormat, string>> = {
  livestream:
    "Live online sessions with an instructor when dates are published.",
  classroom: "In-person sessions at the school when dates are published.",
};

export function CategoryEmpty({
  category,
  note,
  image = "/images/bright-office.jpg",
}: {
  category: LearningCategory;
  note?: string;
  image?: string;
}) {
  const formats = category.allowedFormats.filter(
    (item) => item === "livestream" || item === "classroom",
  );
  const path = encodeURIComponent(category.slug);
  const askHref = `/contact?interest=course-question&path=${path}`;
  const groupHref = `/contact?interest=group-training&path=${path}`;

  return (
    <>
      <section className="bg-[#F7F3EE]">
        <div className="mx-auto grid w-full max-w-[90rem] grid-cols-1 items-start gap-10 px-4 pb-6 sm:px-6 md:gap-12 md:pb-8 lg:grid-cols-[minmax(0,0.44fr)_minmax(0,0.56fr)] lg:items-stretch lg:gap-x-14 lg:px-8 lg:pb-10 xl:gap-x-20">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-br-[3.75rem] rounded-tr-[3.75rem] sm:aspect-[5/4] lg:aspect-auto lg:h-full lg:min-h-[24rem]">
            <Image
              src={image}
              alt=""
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover object-[center_28%]"
            />
          </div>

          <div className="flex w-full min-w-0 max-w-[34rem] flex-col justify-center lg:justify-self-end lg:pl-2">
            <div className="flex items-center gap-2.5">
              <SectionMark />
              <p className="text-[0.78rem] font-bold uppercase tracking-[0.12em] text-black">
                Status
              </p>
            </div>
            <h2 className="mt-4 font-sans text-[2rem] font-bold tracking-[-0.02em] text-black sm:text-[2.35rem]">
              Courses publish when the school confirms them
            </h2>
            <p className="mt-4 text-[1.05rem] leading-8 text-[#746C66]">
              {site.ui.emptyCategoryCourses}
            </p>
            {note ? (
              <p className="mt-4 text-[1rem] leading-7 text-[#746C66]">
                {note}
              </p>
            ) : null}
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={askHref}
                className="inline-flex h-11 items-center rounded-[0.25rem] bg-[#FFD400] px-5 text-[0.9rem] font-bold text-black transition-colors hover:bg-black hover:text-white"
              >
                Ask about this path
              </Link>
              <Link
                href="/florida-real-estate"
                className="inline-flex h-11 items-center rounded-[0.25rem] border border-black/15 bg-white px-5 text-[0.9rem] font-bold text-black transition-colors hover:border-black hover:bg-black hover:text-white"
              >
                {site.ui.allCourses}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F7F3EE]">
        <div className="mx-auto w-full max-w-[90rem] px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <div className="flex items-center gap-2.5">
            <SectionMark />
            <p className="text-[0.78rem] font-bold uppercase tracking-[0.12em] text-black">
              {site.ui.topicsLabel}
            </p>
          </div>
          <h2 className="mt-4 max-w-[18ch] font-sans text-[2rem] font-bold tracking-[-0.02em] text-black sm:text-[2.35rem]">
            Focus areas in this path
          </h2>
          <p className="mt-3 max-w-[40rem] text-[1rem] leading-7 text-[#746C66]">
            These are the topic areas {site.school.shortName} plans for{" "}
            {category.label}. Individual course pages, tuition, and dates appear
            here after they are confirmed.
          </p>

          <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {category.topics.map((topic) => (
              <li
                key={topic.id}
                className="rounded-[1.15rem] bg-white px-6 py-8 shadow-[0_8px_24px_rgba(0,0,0,0.04)]"
              >
                <span
                  className="mb-5 block h-1 w-8 rounded-full bg-[#FFD400]"
                  aria-hidden
                />
                <h3 className="font-sans text-[1.12rem] font-bold leading-snug text-black">
                  {topic.label}
                </h3>
              </li>
            ))}
            <li className="flex min-h-[10.5rem] flex-col justify-between rounded-[1.15rem] bg-[#FFD400] px-6 py-7">
              <div>
                <h3 className="font-sans text-[1.15rem] font-bold text-black">
                  Need a tailored session?
                </h3>
                <p className="mt-3 text-[0.95rem] leading-7 text-black/75">
                  {site.ui.orgTrainingBody}
                </p>
              </div>
              <Link
                href={groupHref}
                className="mt-6 inline-flex items-center gap-2 self-end text-[0.92rem] font-bold text-black"
              >
                {site.ui.groupTraining}
                <span aria-hidden>→</span>
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <section className="bg-[#EEEEEE]">
        <div className="mx-auto w-full max-w-[90rem] px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <div className="flex items-center gap-2.5">
            <SectionMark />
            <p className="text-[0.78rem] font-bold uppercase tracking-[0.12em] text-black">
              {site.ui.formatLabel}
            </p>
          </div>
          <h2 className="mt-4 font-sans text-[2rem] font-bold tracking-[-0.02em] text-black sm:text-[2.35rem]">
            How this path is offered
          </h2>
          <p className="mt-3 max-w-[40rem] text-[1rem] leading-7 text-[#746C66]">
            {category.label} uses livestream and in-person formats only.
            Self-paced study stays with Florida Real Estate courses.
          </p>

          <ul className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
            {formats.map((format) => (
              <li
                key={format}
                className="rounded-[1.15rem] bg-white px-6 py-7 shadow-[0_8px_24px_rgba(0,0,0,0.04)]"
              >
                <p className="text-[0.72rem] font-bold uppercase tracking-[0.12em] text-[#746C66]">
                  Delivery
                </p>
                <h3 className="mt-3 font-sans text-[1.2rem] font-bold text-black">
                  {formatLabels[format]}
                </h3>
                <p className="mt-3 text-[0.95rem] leading-7 text-[#746C66]">
                  {formatBodies[format]}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-[#FFD400]">
        <div className="mx-auto grid w-full max-w-[90rem] grid-cols-1 items-start gap-10 px-4 py-14 sm:px-6 md:gap-12 md:py-16 lg:grid-cols-[minmax(0,0.44fr)_minmax(0,0.56fr)] lg:items-stretch lg:gap-x-14 lg:px-8 xl:gap-x-20">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-br-[3.75rem] rounded-tr-[3.75rem] sm:aspect-[5/4] lg:aspect-auto lg:h-full lg:min-h-[22rem]">
            <Image
              src="/images/classroom.jpg"
              alt=""
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover object-[center_28%]"
            />
          </div>
          <div className="flex w-full min-w-0 max-w-[34rem] flex-col justify-center lg:justify-self-end">
            <h2 className="font-sans text-[2.1rem] font-bold tracking-[-0.02em] text-black sm:text-[2.5rem]">
              Ready to talk through this path?
            </h2>
            <p className="mt-4 text-[1.05rem] leading-7 text-black/75">
              Ask about {category.label.toLowerCase()} for yourself, your
              brokerage, or your team. The school will reply with what is
              available once details are confirmed.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={askHref}
                className="inline-flex h-11 items-center rounded-[0.25rem] bg-black px-5 text-[0.88rem] font-bold text-white transition-colors hover:bg-white hover:text-black"
              >
                {site.ui.sendMessage}
              </Link>
              <a
                href={`tel:${site.school.phoneTel}`}
                className="inline-flex h-11 items-center rounded-[0.25rem] border border-black/20 bg-transparent px-5 text-[0.88rem] font-bold text-black transition-colors hover:bg-black hover:text-white"
              >
                Call the school
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

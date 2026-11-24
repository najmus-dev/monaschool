import type { Metadata } from "next";
import { getCourse, getLearningCategory } from "@/content/site";
import type { Course } from "@/content/site";
import { CategoryCourseGroups } from "@/components/category-course-groups";
import { CategoryMediaHero } from "@/components/category-media-hero";
import { HomeQuestions } from "@/components/home-questions";
import { PathNextCta } from "@/components/path-next-cta";
import { PdPathStrip } from "@/components/pd-path-strip";

const category = getLearningCategory("professional-development");

/** Mona’s Professional Development placement map */
const pdGroups = [
  {
    id: "commercial-brokerage",
    title: "Commercial & Business Brokerage",
    slugs: [
      "introduction-to-commercial-real-estate",
      "introduction-to-business-brokerage",
    ],
  },
  {
    id: "sales-communication",
    title: "Sales & Communication",
    slugs: ["the-voice-that-sells", "the-5-ws-of-selling"],
  },
  {
    id: "short-sales-reo",
    title: "Short Sales, REO & Default",
    slugs: [
      "short-sales-distressed-properties",
      "reo-default-real-estate",
    ],
  },
] as const;

export const metadata: Metadata = {
  title: category?.pageTitle ?? "Professional Development",
  description: category?.pageLede,
  alternates: { canonical: "/professional-development" },
  openGraph: {
    title: category?.pageTitle ?? "Professional Development",
    description: category?.pageLede,
    url: "/professional-development",
    images: [
      {
        url: "/images/pd-category-hero.jpg",
        alt: "Professional development and workplace learning",
      },
    ],
  },
};

function resolveGroupCourses(slugs: readonly string[]): Course[] {
  return slugs
    .map((slug) => getCourse(slug))
    .filter((course): course is Course => Boolean(course));
}

export default function ProfessionalDevelopmentPage() {
  if (!category) {
    return null;
  }

  const groups = pdGroups
    .map((group) => ({
      ...group,
      courses: resolveGroupCourses(group.slugs),
    }))
    .filter((group) => group.courses.length > 0);

  return (
    <>
      <CategoryMediaHero
        breadcrumb="Professional Development"
        label="Specialty skills"
        title={category.pageTitle}
        lede={category.pageLede}
        image="/images/pd-category-hero.jpg"
        imageAlt="Professionals collaborating in a modern office meeting"
        imagePosition="center 35%"
        ctaHref="#courses"
        ctaLabel="Browse courses"
      />

      <PdPathStrip />

      <section id="courses" className="scroll-mt-28 bg-[#F4F7FA]">
        <div className="mx-auto w-full max-w-[90rem] px-4 py-14 sm:px-6 md:py-16 lg:px-8 lg:py-20">
          <div className="mb-9 max-w-2xl">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.14em] text-[#C08430]">
              Course catalog
            </p>
            <h2 className="mt-2 font-sans text-[1.75rem] font-bold tracking-[-0.02em] text-[#001830] sm:text-[2rem]">
              Specialty Courses
            </h2>
            <p className="mt-3 text-[0.98rem] leading-7 text-[#5A6B7A]">
              Specialty courses from school submissions. Tuition and schedules
              update when the school confirms them—open a class for formats and
              details.
            </p>
          </div>

          <CategoryCourseGroups groups={groups} />
        </div>
      </section>

      <PathNextCta
        title="Need help picking a course?"
        body="Ask the office about specialty courses, group training, or upcoming dates."
        href="/contact?interest=course-question&path=professional-development"
        label="Ask a question"
      />

      <HomeQuestions />
    </>
  );
}

import type { Metadata } from "next";
import { getCourse, getLearningCategory } from "@/content/site";
import type { Course } from "@/content/site";
import { CategoryCourseGroups } from "@/components/category-course-groups";
import { CategoryMediaHero } from "@/components/category-media-hero";
import { FloridaPathStrip } from "@/components/florida-path-strip";
import { HomeQuestions } from "@/components/home-questions";
import { PathNextCta } from "@/components/path-next-cta";

const category = getLearningCategory("florida-real-estate");

/** Florida paths aligned with Mona’s Licensing & Renewal menu */
const floridaGroups = [
  {
    id: "get-licensed",
    title: "Get Licensed",
    slugs: ["sales-pre-license"],
  },
  {
    id: "first-renewal",
    title: "Complete My First Renewal",
    slugs: ["sales-post-license"],
  },
  {
    id: "renew-ce",
    title: "Renew With CE",
    slugs: [
      "continuing-education",
      "core-law",
      "ethics-business-practices",
    ],
  },
  {
    id: "become-broker",
    title: "Become a Broker",
    slugs: ["broker-pre-license"],
  },
  {
    id: "broker-first-renewal",
    title: "Broker First Renewal",
    slugs: ["broker-post-license-management"],
  },
  {
    id: "reactivate",
    title: "Reactivate My License",
    slugs: ["reactivation"],
  },
] as const;

export const metadata: Metadata = {
  title: category?.pageTitle ?? "Florida Real Estate",
  description: category?.pageLede,
  alternates: { canonical: "/florida-real-estate" },
  openGraph: {
    title: category?.pageTitle ?? "Florida Real Estate",
    description: category?.pageLede,
    url: "/florida-real-estate",
    images: [
      {
        url: "/images/florida-skyline.jpg",
        alt: "Florida skyline representing real estate careers",
      },
    ],
  },
};

function resolveGroupCourses(slugs: readonly string[]): Course[] {
  return slugs
    .map((slug) => getCourse(slug))
    .filter((course): course is Course => Boolean(course));
}

export default function FloridaRealEstatePage() {
  if (!category) {
    return null;
  }

  const groups = floridaGroups
    .map((group) => ({
      ...group,
      courses: resolveGroupCourses(group.slugs),
    }))
    .filter((group) => group.courses.length > 0);

  return (
    <>
      <CategoryMediaHero
        breadcrumb="Florida Licensing & Renewal"
        label="Florida licensing"
        title={category.pageTitle}
        lede={category.pageLede}
        image="/images/florida-skyline.jpg"
        imageAlt="Miami skyline at dusk representing Florida real estate careers"
        imagePosition="center 62%"
        ctaHref="#courses"
        ctaLabel="Browse courses"
      />

      <FloridaPathStrip />

      <section id="courses" className="scroll-mt-28 bg-[#F4F7FA]">
        <div className="mx-auto w-full max-w-[90rem] px-4 py-14 sm:px-6 md:py-16 lg:px-8 lg:py-20">
          <div className="mb-9 max-w-2xl">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.14em] text-[#C08430]">
              Course catalog
            </p>
            <h2 className="mt-2 font-sans text-[1.75rem] font-bold tracking-[-0.02em] text-[#001830] sm:text-[2rem]">
              Florida Licensing Courses
            </h2>
            <p className="mt-3 text-[0.98rem] leading-7 text-[#5A6B7A]">
              Browse by path. Open a class for formats, tuition, and enrollment.
              Cards show the same details as Professional Development and
              International Business.
            </p>
          </div>

          <CategoryCourseGroups groups={groups} />
        </div>
      </section>

      <PathNextCta
        title="Need help picking a path?"
        body="Ask the office which Florida course fits your license status, renewal date, or broker goals."
        href="/contact?interest=course-question&path=florida-real-estate"
        label="Ask a question"
      />

      <HomeQuestions />
    </>
  );
}

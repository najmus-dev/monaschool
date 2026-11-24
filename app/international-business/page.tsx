import type { Metadata } from "next";
import { getCourse, getLearningCategory } from "@/content/site";
import type { Course } from "@/content/site";
import { CategoryCourseGroups } from "@/components/category-course-groups";
import { CategoryMediaHero } from "@/components/category-media-hero";
import { HomeQuestions } from "@/components/home-questions";
import { IbPathStrip } from "@/components/ib-path-strip";
import { PathNextCta } from "@/components/path-next-cta";

const category = getLearningCategory("international-business");

/** Mona’s International Business placement map — same course pages where shared. */
const ibGroups = [
  {
    id: "cross-cultural-communication",
    title: "Cross-Cultural Communication",
    slugs: ["presenting-across-cultures"],
  },
  {
    id: "intl-selling-negotiation",
    title: "International Selling & Negotiation",
    slugs: ["negotiating-across-cultures"],
  },
  {
    id: "cross-cultural-leadership",
    title: "Cross-Cultural Leadership",
    slugs: ["leading-diverse-teams"],
  },
  {
    id: "global-real-estate",
    title: "Global Real Estate",
    slugs: [
      "global-clients-local-business",
      "from-trade-mission-to-real-estate-opportunity",
      "geopolitics-and-real-estate-investment",
    ],
  },
  {
    id: "market-entry",
    title: "Market Entry",
    slugs: [
      "when-businesses-cross-borders",
      "from-trade-mission-to-real-estate-opportunity",
      "geopolitics-and-real-estate-investment",
    ],
  },
  {
    id: "intl-clients",
    title: "Working With International Clients",
    slugs: ["global-clients-local-business"],
  },
] as const;

export const metadata: Metadata = {
  title: category?.pageTitle ?? "International Business",
  description: category?.pageLede,
  alternates: { canonical: "/international-business" },
  openGraph: {
    title: category?.pageTitle ?? "International Business",
    description: category?.pageLede,
    url: "/international-business",
    images: [
      {
        url: "/images/florida-skyline.jpg",
        alt: "City skyline representing international business markets",
      },
    ],
  },
};

function resolveGroupCourses(slugs: readonly string[]): Course[] {
  return slugs
    .map((slug) => getCourse(slug))
    .filter((course): course is Course => Boolean(course));
}

export default function InternationalBusinessPage() {
  if (!category) {
    return null;
  }

  const groups = ibGroups
    .map((group) => ({
      ...group,
      courses: resolveGroupCourses(group.slugs),
    }))
    .filter((group) => group.courses.length > 0);

  return (
    <>
      <CategoryMediaHero
        breadcrumb="International Business"
        label="Global markets"
        title={category.pageTitle}
        lede={category.pageLede}
        image="/images/florida-skyline.jpg"
        imageAlt="City skyline representing international markets and business"
        imagePosition="center 62%"
        ctaHref="#courses"
        ctaLabel="Browse courses"
      />

      <IbPathStrip />

      <section id="courses" className="scroll-mt-28 bg-[#F4F7FA]">
        <div className="mx-auto w-full max-w-[90rem] px-4 py-14 sm:px-6 md:py-16 lg:px-8 lg:py-20">
          <div className="mb-9 max-w-2xl">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.14em] text-[#C08430]">
              Course catalog
            </p>
            <h2 className="mt-2 font-sans text-[1.75rem] font-bold tracking-[-0.02em] text-[#001830] sm:text-[2rem]">
              International Business Courses
            </h2>
            <p className="mt-3 text-[0.98rem] leading-7 text-[#5A6B7A]">
              Courses mapped to each focus area. Shared titles open the same
              course page wherever they appear. Tuition and schedules update
              when the school confirms them.
            </p>
          </div>

          <CategoryCourseGroups groups={groups} />
        </div>
      </section>

      <PathNextCta
        title="Need help picking a course?"
        body="Ask the office about international courses, group training, or upcoming dates."
        href="/contact?interest=course-question&path=international-business"
        label="Ask a question"
      />

      <HomeQuestions />
    </>
  );
}

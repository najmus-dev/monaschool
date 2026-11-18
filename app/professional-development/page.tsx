import type { Metadata } from "next";
import { Suspense } from "react";
import {
  coursesForCategory,
  getLearningCategory,
} from "@/content/site";
import { CategoryCatalog } from "@/components/category-catalog";
import { CategoryMediaHero } from "@/components/category-media-hero";
import { HomeQuestions } from "@/components/home-questions";
import { PathNextCta } from "@/components/path-next-cta";
import { PdPathStrip } from "@/components/pd-path-strip";

const category = getLearningCategory("professional-development");

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

export default function ProfessionalDevelopmentPage() {
  if (!category) {
    return null;
  }

  const list = coursesForCategory("professional-development");

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
              Browse published courses
            </h2>
            <p className="mt-3 text-[0.98rem] leading-7 text-[#5A6B7A]">
              Specialty courses from school submissions. Approval and tuition
              update when the school confirms them—open a class for formats and
              details.
            </p>
          </div>
          <Suspense fallback={null}>
            <CategoryCatalog category={category} courses={list} />
          </Suspense>
        </div>
      </section>

      <PathNextCta
        title="Ready to pick a course?"
        body="Open a class for formats and details, or contact the office about group training and upcoming dates."
        primaryHref="#courses"
        primaryLabel="Browse courses"
        secondaryHref="/contact?interest=course-question&path=professional-development"
        secondaryLabel="Ask a question"
      />

      <HomeQuestions />
    </>
  );
}

import type { Metadata } from "next";
import { Suspense } from "react";
import {
  coursesForCategory,
  getLearningCategory,
  site,
} from "@/content/site";
import { CategoryCatalog } from "@/components/category-catalog";
import { CategoryMediaHero } from "@/components/category-media-hero";
import { FloridaPathStrip } from "@/components/florida-path-strip";
import { HomeQuestions } from "@/components/home-questions";
import { PathNextCta } from "@/components/path-next-cta";

const category = getLearningCategory("florida-real-estate");

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

export default function FloridaRealEstatePage() {
  if (!category) {
    return null;
  }

  const list = coursesForCategory("florida-real-estate");

  return (
    <>
      <CategoryMediaHero
        breadcrumb="Florida Real Estate"
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
              Browse published courses
            </h2>
            <p className="mt-3 text-[0.98rem] leading-7 text-[#5A6B7A]">
              {site.ui.priceIntro}
            </p>
          </div>
          <Suspense fallback={null}>
            <CategoryCatalog category={category} courses={list} />
          </Suspense>
        </div>
      </section>

      <PathNextCta
        title="Ready to pick a course?"
        body="Open a class for formats and tuition, or contact the office if you need a path recommendation."
        primaryHref="#courses"
        primaryLabel="Browse courses"
      />

      <HomeQuestions />
    </>
  );
}

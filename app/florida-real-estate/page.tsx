import type { Metadata } from "next";
import {
  coursesForCategory,
  getLearningCategory,
  site,
} from "@/content/site";
import { CategoryCatalog } from "@/components/category-catalog";
import { HomeQuestions } from "@/components/home-questions";
import { SimplePageHero } from "@/components/simple-page-hero";

const category = getLearningCategory("florida-real-estate");

export const metadata: Metadata = {
  title: category?.pageTitle ?? "Florida Real Estate",
  description: category?.pageLede,
};

export default function FloridaRealEstatePage() {
  if (!category) {
    return null;
  }

  const list = coursesForCategory("florida-real-estate");

  return (
    <>
      <SimplePageHero
        breadcrumb="Florida Real Estate"
        label="Courses"
        title={category.pageTitle}
        lede={category.pageLede}
      />
      <section className="bg-[#F7F3EE]">
        <div className="mx-auto w-full max-w-[90rem] px-4 pb-16 sm:px-6 md:pb-20 lg:px-8">
          <p className="mb-8 max-w-2xl text-[0.95rem] leading-7 text-[#746C66]">
            {site.ui.priceIntro}
          </p>
          <CategoryCatalog category={category} courses={list} />
        </div>
      </section>
      <HomeQuestions />
    </>
  );
}

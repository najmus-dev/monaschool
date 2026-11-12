import type { Metadata } from "next";
import {
  coursesForCategory,
  getLearningCategory,
} from "@/content/site";
import { CategoryCatalog } from "@/components/category-catalog";
import { CategoryEmpty } from "@/components/category-empty";
import { HomeQuestions } from "@/components/home-questions";
import { SimplePageHero } from "@/components/simple-page-hero";

const category = getLearningCategory("professional-development");

export const metadata: Metadata = {
  title: category?.pageTitle ?? "Professional Development",
  description: category?.pageLede,
};

export default function ProfessionalDevelopmentPage() {
  if (!category) {
    return null;
  }

  const list = coursesForCategory("professional-development");

  return (
    <>
      <SimplePageHero
        breadcrumb="Professional Development"
        label="Courses"
        title={category.pageTitle}
        lede={category.pageLede}
      />
      {list.length > 0 ? (
        <section className="bg-[#F7F3EE]">
          <div className="mx-auto w-full max-w-[90rem] px-4 pb-16 sm:px-6 md:pb-20 lg:px-8">
            <CategoryCatalog category={category} courses={list} />
          </div>
        </section>
      ) : (
        <CategoryEmpty
          category={category}
          image="/images/hero-study.jpg"
          note="AI for Business & Productivity sits in this path—not as a separate top-level menu. Livestream and in-person only."
        />
      )}
      <HomeQuestions />
    </>
  );
}

import type { Metadata } from "next";
import {
  coursesForCategory,
  getLearningCategory,
} from "@/content/site";
import { CategoryCatalog } from "@/components/category-catalog";
import { CategoryEmpty } from "@/components/category-empty";
import { HomeQuestions } from "@/components/home-questions";
import { SimplePageHero } from "@/components/simple-page-hero";

const category = getLearningCategory("international-business");

export const metadata: Metadata = {
  title: category?.pageTitle ?? "International Business",
  description: category?.pageLede,
  alternates: { canonical: "/international-business" },
  openGraph: {
    title: category?.pageTitle ?? "International Business",
    description: category?.pageLede,
    url: "/international-business",
  },
};

export default function InternationalBusinessPage() {
  if (!category) {
    return null;
  }

  const list = coursesForCategory("international-business");

  return (
    <>
      <SimplePageHero
        breadcrumb="International Business"
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
          image="/images/florida-skyline.jpg"
          note="Livestream and in-person only. Self-paced study is reserved for Florida Real Estate courses."
        />
      )}
      <HomeQuestions />
    </>
  );
}

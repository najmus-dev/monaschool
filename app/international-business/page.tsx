import type { Metadata } from "next";
import {
  coursesForCategory,
  getLearningCategory,
} from "@/content/site";
import { IbPage } from "@/components/ib-page";

const category = getLearningCategory("international-business");

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

export default function InternationalBusinessPage() {
  if (!category) {
    return null;
  }

  const list = coursesForCategory("international-business");

  return <IbPage category={category} courses={list} />;
}

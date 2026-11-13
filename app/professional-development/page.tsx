import type { Metadata } from "next";
import {
  coursesForCategory,
  getLearningCategory,
} from "@/content/site";
import { PdPage } from "@/components/pd-page";

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
        url: "/images/bright-office.jpg",
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

  return <PdPage category={category} courses={list} />;
}

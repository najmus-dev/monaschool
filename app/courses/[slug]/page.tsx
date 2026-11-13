import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CourseLanding } from "@/components/course-landing";
import { courses, getCourse } from "@/content/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return courses
    .filter((course) => course.published)
    .map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) {
    return { title: "Course" };
  }
  return {
    title: course.title,
    description: course.benefit,
    alternates: { canonical: `/courses/${course.slug}` },
    openGraph: {
      title: course.title,
      description: course.benefit,
      url: `/courses/${course.slug}`,
    },
  };
}

export default async function CourseDetailPage({ params }: Props) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) {
    notFound();
  }

  return <CourseLanding course={course} />;
}

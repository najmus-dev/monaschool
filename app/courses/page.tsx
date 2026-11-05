import type { Metadata } from "next";
import { site } from "@/content/site";
import { Container } from "@/components/container";
import { CourseChooser } from "@/components/course-chooser";
import { CourseGrid } from "@/components/course-card";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: site.coursesPage.title,
  description: site.coursesPage.lede,
};

export default function CoursesPage() {
  const getLicensed = site.courses.filter(
    (course) => course.category === "get-licensed",
  );
  const renew = site.courses.filter((course) => course.category === "renew");
  const prep = site.courses.filter((course) => course.category === "prep");

  return (
    <>
      <PageHeader
        title={site.coursesPage.title}
        lede={site.coursesPage.lede}
        image="/images/courses-band.jpg"
      />

      <section id="get-licensed" className="scroll-mt-28 bg-surface">
        <Container className="py-14 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-brand sm:text-4xl">
              {site.coursesPage.getTitle}
            </h2>
            <div className="mx-auto mt-4 h-0.5 w-12 bg-accent" aria-hidden />
            <p className="mt-4 text-base leading-7 text-muted sm:text-lg">
              {site.coursesPage.getLede}
            </p>
          </div>
          <CourseGrid courses={getLicensed} />
          <p className="mx-auto mt-8 max-w-xl text-center text-sm leading-6 text-muted">
            {site.ui.priceIntro}
          </p>
        </Container>
      </section>

      <section id="renew" className="scroll-mt-28 border-t border-line bg-paper">
        <Container className="py-14 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-brand sm:text-4xl">
              {site.coursesPage.renewTitle}
            </h2>
            <div className="mx-auto mt-4 h-0.5 w-12 bg-accent" aria-hidden />
            <p className="mt-4 text-base leading-7 text-muted sm:text-lg">
              {site.coursesPage.renewLede}
            </p>
          </div>
          <CourseGrid courses={renew} />
        </Container>
      </section>

      <section id="exam-prep" className="scroll-mt-28 border-t border-line bg-surface">
        <Container className="py-14 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-brand sm:text-4xl">
              {site.coursesPage.prepTitle}
            </h2>
            <div className="mx-auto mt-4 h-0.5 w-12 bg-accent" aria-hidden />
            <p className="mt-4 text-base leading-7 text-muted sm:text-lg">
              {site.coursesPage.prepLede}
            </p>
          </div>
          <CourseGrid courses={prep} />
        </Container>
      </section>

      <section id="which-course" className="border-t border-line bg-paper">
        <Container className="py-14 md:py-20">
          <CourseChooser />
        </Container>
      </section>
    </>
  );
}

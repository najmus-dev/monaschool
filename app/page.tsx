import { site } from "@/content/site";
import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";
import { CourseChooser } from "@/components/course-chooser";
import { CourseGrid } from "@/components/course-card";
import { HomeContact } from "@/components/home-contact";
import { HomeFaq } from "@/components/home-faq";
import { HomeHero } from "@/components/home-hero";
import { HomePaths } from "@/components/home-paths";
import { HomeReviews } from "@/components/home-reviews";
import { HomeSteps } from "@/components/home-steps";

export default function HomePage() {
  return (
    <>
      <HomeHero />

      <HomePaths />

      <section id="courses" className="border-t border-line bg-surface">
        <Container className="py-16 md:py-24">
          <div className="mb-0 flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-10">
            <div className="max-w-2xl">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-accent">
                {site.home.coursesEyebrow}
              </p>
              <h2 className="font-display text-4xl font-bold leading-[1.12] tracking-tight text-brand sm:text-5xl">
                {site.home.coursesTitle}
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-muted sm:text-lg">
                {site.home.coursesLede}
              </p>
              <p className="mt-3 text-sm leading-6 text-muted">
                {site.ui.priceIntro}
              </p>
            </div>
            <ButtonLink
              href="/courses"
              variant="secondary"
              className="h-12 shrink-0 self-start md:self-auto"
            >
              {site.ui.allCourses}
            </ButtonLink>
          </div>
          <CourseGrid
            courses={site.courses.filter((course) => course.featured)}
          />
        </Container>
      </section>

      <section
        id="which-course"
        aria-labelledby="course-chooser-heading"
        className="border-t border-line bg-paper"
      >
        <Container className="py-16 md:py-24">
          <CourseChooser />
        </Container>
      </section>

      <HomeSteps />

      <HomeReviews />

      <HomeFaq />

      <HomeContact />
    </>
  );
}

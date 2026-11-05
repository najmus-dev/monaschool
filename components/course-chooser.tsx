import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react/ssr";
import { getCourse, site } from "@/content/site";

function CourseLink({
  label,
  href,
  primary = false,
}: {
  label: string;
  href: string;
  primary?: boolean;
}) {
  return (
    <Link
      href={href}
      className={
        primary
          ? "group inline-flex h-12 w-full items-center justify-between gap-3 bg-brand px-4 text-sm font-semibold text-white transition-colors hover:bg-brand-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          : "group inline-flex h-12 w-full items-center justify-between gap-3 border border-stroke bg-surface px-4 text-sm font-semibold text-brand transition-colors hover:border-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      }
    >
      <span className="text-left">{label}</span>
      <ArrowRightIcon
        size={16}
        weight="bold"
        aria-hidden
        className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
      />
    </Link>
  );
}

export function CourseChooser() {
  return (
    <div>
      <div className="mb-12 max-w-2xl md:mb-14">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-accent">
          {site.home.chooserEyebrow}
        </p>
        <h2
          id="course-chooser-heading"
          className="font-display text-4xl font-bold leading-[1.12] tracking-tight text-brand sm:text-5xl"
        >
          {site.home.chooserTitle}
        </h2>
        <p className="mt-5 max-w-xl text-base leading-7 text-muted sm:text-lg">
          {site.home.chooserLede}
        </p>
      </div>

      <div className="grid grid-cols-1 divide-y divide-line border-y border-line lg:grid-cols-3 lg:divide-x lg:divide-y-0">
        {site.home.chooser.map((path) => {
          const linked = path.courseSlugs.flatMap((slug) => {
            const course = getCourse(slug);
            return course ? [course] : [];
          });

          return (
            <article
              key={path.title}
              className="flex flex-col px-0 py-9 lg:px-8 lg:py-10 xl:px-10"
            >
              <p className="flex min-h-5 items-center gap-2.5 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-muted">
                <span
                  aria-hidden
                  className="size-1.5 shrink-0 rounded-full bg-accent"
                />
                {path.status}
              </p>

              <h3 className="mt-5 min-h-[3.6rem] font-display text-[1.5rem] font-bold leading-snug tracking-tight text-brand sm:text-[1.65rem] lg:min-h-[4rem]">
                {path.title}
              </h3>

              <p className="mt-3 flex-1 text-[0.95rem] leading-7 text-muted">
                {path.body}
              </p>

              <div className="mt-8 grid gap-2.5">
                {linked.map((course, courseIndex) => (
                  <CourseLink
                    key={course.slug}
                    label={course.linkLabel}
                    href={`/courses/${course.slug}`}
                    primary={courseIndex === 0}
                  />
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

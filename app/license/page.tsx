import type { Metadata } from "next";
import Image from "next/image";
import { getCourse, site } from "@/content/site";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { PathSplit } from "@/components/path-split";
import { TextLink } from "@/components/text-link";

export const metadata: Metadata = {
  title: site.license.title,
  description: site.license.lede,
};

export default function LicensePage() {
  return (
    <>
      <PageHeader
        title={site.license.title}
        lede={site.license.lede}
        image="/images/florida-skyline.jpg"
      />

      <PathSplit
        items={[
          {
            title: "Earn your Florida real estate license",
            body: "Start with the 63-hour pre-license course, then follow the DBPR application and state exam steps below.",
            href: "/courses#get-licensed",
            cta: site.ui.getLicensed,
            image: "/images/path-earn-home.jpg",
            imageAlt: "Modern Florida home with a pool and tropical landscaping.",
          },
          {
            title: "Renew your license the easy way",
            body: "Use the 45-hour post-license course for the first renewal, or 14-hour continuing education after that.",
            href: "/courses#renew",
            cta: site.ui.renewLicense,
            image: "/images/path-renew-study.jpg",
            imageAlt: "A professional preparing for work in a bright office.",
          },
        ]}
      />

      <div className="bg-paper">
        <Container className="grid grid-cols-1 gap-10 py-14 md:py-20 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-start">
          <div>
            <p className="border-l-2 border-accent bg-band/60 px-4 py-3 text-sm leading-6 text-ink">
              {site.license.disclaimer}
            </p>
            <div className="mt-8 grid gap-0 border-y border-line sm:grid-cols-2 sm:divide-x sm:divide-line">
              <section className="border-b border-line py-6 sm:border-b-0 sm:pr-6">
                <h2 className="text-xl font-bold text-brand">
                  {site.license.timing.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-muted">
                  {site.license.timing.body}
                </p>
              </section>
              <section className="py-6 sm:pl-6">
                <h2 className="text-xl font-bold text-brand">
                  {site.license.start.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-muted">
                  {site.license.start.body}
                </p>
              </section>
            </div>
            <h2 className="mt-10 text-2xl font-bold tracking-tight text-brand">
              {site.license.requirementsTitle}
            </h2>
            <dl className="mt-4 border-y border-line">
              {site.license.requirements.map((item) => (
                <div
                  key={item.label}
                  className="grid grid-cols-1 gap-1 border-b border-line py-4 last:border-b-0 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-6"
                >
                  <dt className="font-semibold text-ink">{item.label}</dt>
                  <dd className="text-muted">{item.text}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative min-h-[16rem] overflow-hidden bg-band lg:min-h-[28rem]">
            <Image
              src={site.license.image}
              alt={site.license.imageAlt}
              fill
              sizes="(min-width: 1024px) 36vw, 100vw"
              className="object-cover"
            />
          </div>
        </Container>
      </div>

      <div className="border-t border-line bg-surface">
        <Container className="py-14 md:py-20">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-brand">
              From course to active license
            </h2>
            <div className="mx-auto mt-4 h-0.5 w-12 bg-accent" aria-hidden />
          </div>

          <ol className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {site.license.stages.map((stage, index) => {
              const linked = stage.courseSlugs.flatMap((slug) => {
                const course = getCourse(slug);
                return course ? [course] : [];
              });

              return (
                <li
                  key={stage.title}
                  className="flex flex-col border border-line bg-paper p-6 shadow-[0_8px_24px_rgb(10_53_82/0.05)]"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent">
                    Step {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 font-display text-xl font-bold leading-snug text-brand">
                    {stage.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-6 text-muted">
                    {stage.body}
                  </p>
                  {linked.length > 0 ? (
                    <p className="mt-4 flex flex-wrap gap-x-4 gap-y-2 border-t border-line pt-4">
                      {linked.map((course) => (
                        <TextLink
                          key={course.slug}
                          href={`/courses/${course.slug}`}
                        >
                          {course.linkLabel}
                        </TextLink>
                      ))}
                    </p>
                  ) : null}
                </li>
              );
            })}
          </ol>

          <div className="mt-12 grid max-w-[68ch] gap-4">
            {site.license.notes.map((note) => (
              <p key={note} className="text-base leading-relaxed text-muted">
                {note}
              </p>
            ))}
          </div>

          <h2 className="mt-12 text-2xl font-bold tracking-tight text-brand">
            {site.license.sourcesTitle}
          </h2>
          <ul className="mt-4 grid gap-2">
            {site.license.sources.map((source) => (
              <li key={source.href}>
                <TextLink href={source.href} external>
                  {source.label}
                </TextLink>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </>
  );
}

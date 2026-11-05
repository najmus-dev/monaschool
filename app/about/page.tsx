import type { Metadata } from "next";
import Image from "next/image";
import {
  BooksIcon,
  ChalkboardTeacherIcon,
  EnvelopeSimpleIcon,
  PathIcon,
  SealCheckIcon,
  StorefrontIcon,
} from "@phosphor-icons/react/ssr";
import { site } from "@/content/site";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { PlaceholderNote } from "@/components/placeholder-note";

export const metadata: Metadata = {
  title: site.about.title,
  description: site.about.lede,
};

const whyIcons = [
  ChalkboardTeacherIcon,
  PathIcon,
  StorefrontIcon,
  BooksIcon,
  EnvelopeSimpleIcon,
  SealCheckIcon,
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title={site.about.title}
        lede={site.about.lede}
        image="/images/florida-skyline.jpg"
      />

      <section className="bg-paper">
        <Container className="py-14 text-center md:py-20">
          <h2 className="font-display text-3xl font-bold tracking-tight text-brand sm:text-4xl">
            {site.about.whyTitle}
          </h2>
          <div className="mx-auto mt-4 h-0.5 w-12 bg-accent" aria-hidden />
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted sm:text-lg">
            {site.about.whyLede}
          </p>

          <ul className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-x-12 gap-y-10 text-left sm:grid-cols-2">
            {site.about.why.map((item, index) => {
              const Icon = whyIcons[index] ?? SealCheckIcon;
              return (
                <li key={item.title} className="flex gap-4">
                  <span className="mt-0.5 inline-flex size-11 shrink-0 items-center justify-center border border-brand/15 text-brand">
                    <Icon size={22} weight="regular" aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-brand">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted sm:text-[0.95rem] sm:leading-7">
                      {item.body}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      <section className="border-t border-line bg-surface">
        <Container className="grid grid-cols-1 gap-10 py-14 md:py-20 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <div className="grid max-w-3xl gap-6">
            <PlaceholderNote>{site.about.note}</PlaceholderNote>
            {site.about.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="text-base leading-relaxed text-ink md:text-lg"
              >
                {paragraph}
              </p>
            ))}
            <dl className="border-y border-line">
              {site.about.facts.map((fact) => (
                <div
                  key={fact.label}
                  className="grid grid-cols-1 gap-1 border-b border-line py-4 last:border-b-0 sm:grid-cols-[14rem_minmax(0,1fr)] sm:gap-6"
                >
                  <dt className="font-semibold text-ink">{fact.label}</dt>
                  <dd className="text-muted">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative min-h-[20rem] overflow-hidden bg-band lg:min-h-full">
            <Image
              src="/images/florida-skyline.jpg"
              alt="Florida waterfront skyline at dusk."
              fill
              sizes="(min-width: 1024px) 34vw, 100vw"
              className="object-cover object-[50%_65%]"
            />
          </div>
        </Container>
      </section>
    </>
  );
}

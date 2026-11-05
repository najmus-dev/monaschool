import type { Metadata } from "next";
import { site } from "@/content/site";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { PlaceholderNote } from "@/components/placeholder-note";

export const metadata: Metadata = {
  title: site.terms.title,
  description: site.terms.lede,
};

export default function TermsPage() {
  return (
    <>
      <PageHeader title={site.terms.title} lede={site.terms.lede} />
      <div className="bg-paper">
        <Container className="max-w-3xl py-14 md:py-20">
          <PlaceholderNote>{site.terms.note}</PlaceholderNote>
          <div className="mt-8 border-y border-line">
            {site.terms.sections.map((section) => (
              <section
                key={section.heading}
                className="border-b border-line py-7 last:border-b-0"
              >
                <h2 className="text-xl font-bold text-brand">{section.heading}</h2>
                <p className="mt-3 text-base leading-relaxed text-muted">
                  {section.body}
                </p>
              </section>
            ))}
          </div>
        </Container>
      </div>
    </>
  );
}

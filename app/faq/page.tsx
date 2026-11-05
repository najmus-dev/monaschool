import type { Metadata } from "next";
import { site } from "@/content/site";
import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";
import { FaqList } from "@/components/faq-list";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: site.faq.title,
  description: site.faq.lede,
};

export default function FaqPage() {
  return (
    <>
      <PageHeader title={site.faq.title} lede={site.faq.lede} />
      <div className="bg-paper">
        <Container className="py-14 md:py-20">
          <div className="mx-auto max-w-3xl">
            <FaqList items={site.faq.items} />
            <div className="mt-10 flex flex-wrap gap-3 border-t border-line pt-8">
              <ButtonLink href="/courses">{site.ui.seeCourses}</ButtonLink>
              <ButtonLink href="/contact" variant="secondary">
                {site.ui.sendMessage}
              </ButtonLink>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}

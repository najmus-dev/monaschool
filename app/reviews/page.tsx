import type { Metadata } from "next";
import { site } from "@/content/site";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { ReviewList } from "@/components/review-list";

export const metadata: Metadata = {
  title: site.reviews.title,
  description: site.reviews.lede,
};

export default function ReviewsPage() {
  return (
    <>
      <PageHeader
        title={site.reviews.title}
        lede={site.reviews.lede}
        image="/images/hero-study.jpg"
      />

      <section className="bg-paper">
        <Container className="py-14 md:py-20">
          <p className="mx-auto mb-10 max-w-2xl text-center text-sm leading-6 text-muted md:mb-12">
            {site.reviews.note}
          </p>
          <ReviewList items={site.reviews.items} />
        </Container>
      </section>
    </>
  );
}

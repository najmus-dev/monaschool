import Link from "next/link";
import { site } from "@/content/site";
import { Container } from "@/components/container";
import { FaqList } from "@/components/faq-list";

export function HomeFaq() {
  const items = site.faq.items.slice(0, site.faq.homeCount);

  return (
    <section id="questions" className="border-t border-line bg-surface">
      <Container className="py-14 md:py-20">
        <div className="mb-2 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-accent">
              {site.home.questionsEyebrow}
            </p>
            <h2 className="font-display text-3xl font-bold tracking-tight text-brand sm:text-4xl">
              {site.home.questionsTitle}
            </h2>
          </div>
          <Link
            href="/faq"
            className="text-sm font-semibold text-brand underline decoration-brand/25 underline-offset-4 transition-colors hover:decoration-brand"
          >
            {site.ui.allQuestions}
          </Link>
        </div>
        <FaqList items={items} />
      </Container>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";
import { Container } from "./container";

const visuals: Record<string, { image: string; alt: string }> = {
  "florida-real-estate": {
    image: "/images/path-earn-home.jpg",
    alt: "Florida home representing real estate careers",
  },
  "professional-development": {
    image: "/images/hero-study.jpg",
    alt: "Professional development study session",
  },
  "international-business": {
    image: "/images/courses-band.jpg",
    alt: "Modern property and market context",
  },
};

export function HomeCategories() {
  return (
    <section className="bg-mist">
      <Container className="py-20 md:py-28">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-accent">
            {site.home.categoriesEyebrow}
          </p>
          <h2 className="mt-4 font-display text-[2rem] font-bold leading-[1.15] tracking-tight text-brand sm:text-4xl md:text-[2.75rem]">
            Chart a path through three ways to learn.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-muted sm:text-lg">
            {site.home.categoriesLede}
          </p>
        </div>

        <ul className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {site.learningCategories.map((category) => {
            const visual = visuals[category.id];
            return (
              <li key={category.id}>
                <Link href={`/${category.slug}`} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-t-[999px] rounded-b-[1.1rem] shadow-[0_16px_36px_rgb(10_53_82/0.1)]">
                    {visual ? (
                      <Image
                        src={visual.image}
                        alt={visual.alt}
                        fill
                        sizes="(min-width: 640px) 30vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                    ) : null}
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-bold tracking-tight text-brand">
                    {category.label}
                  </h3>
                  <p className="mt-2 text-[0.95rem] leading-7 text-muted">
                    {category.cardBody}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}

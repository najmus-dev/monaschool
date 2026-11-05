import type { Review } from "@/content/site";
import { site } from "@/content/site";

export function ReviewList({ items }: { items: Review[] }) {
  if (items.length === 0) {
    return <p className="mt-8 text-base text-muted">{site.ui.emptyReviews}</p>;
  }

  return (
    <div className="mx-auto grid max-w-3xl gap-8 md:gap-10">
      {items.map((review) => (
        <figure
          key={review.id}
          className="relative rounded-2xl bg-brand px-8 py-10 text-center text-white shadow-[0_20px_50px_rgb(8_28_44/0.14)] sm:px-12 sm:py-12"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute left-5 top-4 font-display text-[3.5rem] leading-none text-accent sm:left-7 sm:top-5 sm:text-[4.5rem]"
          >
            {"\u201C"}
          </span>
          <span
            aria-hidden
            className="pointer-events-none absolute bottom-3 right-5 font-display text-[3.5rem] leading-none text-accent sm:bottom-4 sm:right-7 sm:text-[4.5rem]"
          >
            {"\u201D"}
          </span>

          <blockquote className="relative px-4 text-[1.05rem] font-normal italic leading-8 text-white/95 sm:px-6 sm:text-lg sm:leading-9">
            {review.quote}
          </blockquote>

          <figcaption className="relative mt-8">
            <p className="text-base font-bold text-white">
              {site.ui.sampleStudent}
            </p>
            <p className="mt-1 text-sm text-white/70">{review.detail}</p>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

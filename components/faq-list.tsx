import type { FaqItem } from "@/content/site";
import { site } from "@/content/site";

export function FaqList({ items }: { items: FaqItem[] }) {
  if (items.length === 0) {
    return (
      <p className="mt-8 text-base text-[#746C66]">{site.ui.emptyFaq}</p>
    );
  }

  return (
    <div>
      {items.map((item, index) => (
        <details
          key={item.question}
          className="group border-b border-black/10 first:border-t first:border-black/10"
        >
          <summary className="flex cursor-pointer list-none items-start gap-4 py-6 text-left outline-none transition-colors marker:content-none sm:gap-6 sm:py-7 [&::-webkit-details-marker]:hidden">
            <span className="mt-1 w-8 shrink-0 font-sans text-[0.75rem] font-bold uppercase tracking-[0.12em] text-[#746C66]">
              {String(index + 1).padStart(2, "0")}
            </span>

            <span className="min-w-0 flex-1 pt-0.5 text-[1.05rem] font-semibold leading-snug tracking-[-0.015em] text-[#222222] sm:text-[1.15rem] sm:leading-snug">
              {item.question}
            </span>

            <span
              className="relative mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-black/15 bg-white text-black transition-colors group-open:border-[#002448] group-open:bg-[#002448] group-open:text-white"
              aria-hidden
            >
              <span className="absolute h-[1.5px] w-3.5 bg-current" />
              <span className="absolute h-3.5 w-[1.5px] bg-current transition-transform duration-200 group-open:scale-y-0" />
            </span>
          </summary>

          <div className="grid grid-cols-[2rem_minmax(0,1fr)_2.25rem] gap-4 pb-7 sm:grid-cols-[2rem_minmax(0,1fr)_2.25rem] sm:gap-6">
            <span aria-hidden />
            <p className="max-w-[54ch] text-[0.98rem] leading-7 text-[#746C66] sm:text-[1.02rem] sm:leading-8">
              {item.answer}
            </p>
            <span aria-hidden />
          </div>
        </details>
      ))}
    </div>
  );
}

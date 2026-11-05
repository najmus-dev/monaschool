import { CaretDownIcon } from "@phosphor-icons/react/ssr";
import type { FaqItem } from "@/content/site";
import { site } from "@/content/site";

export function FaqList({ items }: { items: FaqItem[] }) {
  if (items.length === 0) {
    return <p className="mt-8 text-base text-muted">{site.ui.emptyFaq}</p>;
  }

  return (
    <div className="border-t border-line">
      {items.map((item) => (
        <details
          key={item.question}
          className="group border-b border-line"
        >
          <summary className="flex min-h-[4.25rem] cursor-pointer items-start justify-between gap-5 py-5 text-left outline-none transition-colors hover:text-brand focus-visible:text-brand">
            <span className="pt-0.5 text-base font-semibold leading-snug text-ink group-open:text-brand sm:text-[1.05rem]">
              {item.question}
            </span>
            <span className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center border border-line text-brand transition-colors group-open:border-accent group-open:bg-accent group-open:text-white">
              <CaretDownIcon
                size={16}
                weight="bold"
                aria-hidden
                className="faq-caret transition-transform duration-200"
              />
            </span>
          </summary>
          <p className="max-w-[62ch] pb-6 pr-12 text-[0.95rem] leading-7 text-muted">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}

import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react/ssr";
import { site } from "@/content/site";

export function HomeSteps() {
  return (
    <section id="steps" className="bg-brand text-footer-text">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="mb-12 flex flex-col gap-8 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-accent">
              {site.home.stepsEyebrow}
            </p>
            <h2 className="font-display text-4xl font-bold leading-[1.12] tracking-tight sm:text-5xl">
              {site.home.stepsTitle}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-footer-muted sm:text-lg">
              {site.home.stepsLede}
            </p>
          </div>
          <Link
            href="/license"
            className="inline-flex h-12 shrink-0 items-center justify-center gap-2 self-start border border-white/30 px-5 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:self-auto"
          >
            {site.ui.licenseGuide}
            <ArrowRightIcon size={16} weight="bold" aria-hidden />
          </Link>
        </div>

        <ol className="grid grid-cols-1 divide-y divide-white/15 border-y border-white/15 md:grid-cols-3 md:divide-x md:divide-y-0">
          {site.home.steps.map((step) => (
            <li
              key={step.title}
              className="flex flex-col px-0 py-9 md:px-8 md:py-10 xl:px-10"
            >
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-accent">
                {step.label}
              </p>
              <h3 className="mt-5 min-h-[3.5rem] font-display text-[1.5rem] font-bold leading-snug tracking-tight sm:text-[1.65rem]">
                {step.title}
              </h3>
              <p className="mt-3 text-[0.95rem] leading-7 text-footer-muted">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

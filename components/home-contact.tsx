import Image from "next/image";
import { EnvelopeSimpleIcon, PhoneIcon } from "@phosphor-icons/react/ssr";
import { site } from "@/content/site";
import { ButtonLink } from "@/components/button-link";

export function HomeContact() {
  return (
    <section id="contact" className="border-t border-line bg-paper">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-stretch lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <div className="flex flex-col justify-center px-4 py-16 sm:px-6 md:py-20 lg:px-8 lg:py-24 xl:pr-6">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-accent">
            {site.home.contactEyebrow}
          </p>
          <h2 className="max-w-[14ch] font-display text-4xl font-bold leading-[1.1] tracking-tight text-brand text-balance sm:text-5xl">
            {site.home.contactTitle}
          </h2>
          <p className="mt-5 max-w-[40ch] text-base leading-7 text-muted sm:text-lg">
            {site.home.contactLede}
          </p>

          <div className="mt-10 grid gap-4">
            <a
              href={`tel:${site.school.phoneTel}`}
              className="group inline-flex items-center gap-3.5"
            >
              <span className="inline-flex size-11 shrink-0 items-center justify-center border border-brand/15 bg-surface text-accent transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-white">
                <PhoneIcon size={20} weight="regular" aria-hidden />
              </span>
              <span className="font-display text-3xl font-bold tracking-tight text-brand transition-colors group-hover:text-accent sm:text-[2.15rem]">
                {site.school.phoneDisplay}
              </span>
            </a>

            <a
              href={`mailto:${site.school.email}`}
              className="inline-flex items-center gap-3.5 text-base font-semibold text-ink underline decoration-line underline-offset-4 hover:text-brand hover:decoration-brand"
            >
              <span className="inline-flex size-11 shrink-0 items-center justify-center border border-brand/15 bg-surface text-accent">
                <EnvelopeSimpleIcon size={20} weight="regular" aria-hidden />
              </span>
              {site.school.email}
            </a>

            <p className="pl-[3.85rem] text-sm leading-6 text-muted">
              {site.school.address}
            </p>
          </div>

          <div className="mt-10">
            <ButtonLink href="/contact" className="h-12 min-w-[11rem]">
              {site.ui.sendMessage}
            </ButtonLink>
          </div>
        </div>

        <div className="relative min-h-[16rem] sm:min-h-[20rem] lg:min-h-full lg:py-10 lg:pr-8">
          <div className="relative h-full min-h-[16rem] overflow-hidden bg-band sm:min-h-[20rem] [clip-path:polygon(0_0,100%_0,100%_100%,8%_100%)] lg:min-h-[28rem] lg:[clip-path:polygon(10%_0,100%_0,100%_100%,0_100%)]">
            <Image
              src="/images/classroom.jpg"
              alt="Adult students studying together with laptops — the same classroom energy as our courses."
              fill
              sizes="(min-width: 1024px) 48vw, 100vw"
              className="object-cover object-[center_30%]"
            />
            <div
              className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgb(10_53_82/0.28)_100%)]"
              aria-hidden
            />
          </div>
          <div
            className="pointer-events-none absolute inset-y-10 left-0 hidden w-1.5 bg-accent lg:block"
            aria-hidden
            style={{ clipPath: "polygon(0 6%, 100% 0, 100% 100%, 0 94%)" }}
          />
        </div>
      </div>
    </section>
  );
}

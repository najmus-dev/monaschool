import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";
import { Container } from "./container";

export function HomeContact() {
  return (
    <section id="contact" className="bg-mist">
      <Container className="grid grid-cols-1 items-center gap-12 py-20 md:gap-14 md:py-28 lg:grid-cols-12">
        <div className="lg:col-span-6 xl:col-span-5">
          <p className="font-display text-[1.05rem] font-semibold text-accent">
            Next step
          </p>
          <h2 className="mt-4 max-w-[10ch] font-display text-[2.75rem] font-bold leading-[1.05] tracking-tight text-brand sm:text-5xl md:text-[3.4rem]">
            Get started here.
          </h2>
          <p className="mt-6 max-w-[36ch] text-base leading-7 text-muted sm:text-lg sm:leading-8">
            {site.home.contactLede}
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/florida-real-estate"
              className="inline-flex h-12 items-center justify-center rounded-full bg-brand px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-hover"
            >
              Florida Real Estate
            </Link>
            <Link
              href="/professional-development"
              className="inline-flex h-12 items-center justify-center rounded-full bg-surface px-6 text-sm font-semibold text-brand ring-1 ring-brand/15 transition-colors hover:bg-white"
            >
              Professional Development
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center rounded-full bg-accent px-6 text-sm font-semibold text-accent-ink transition-colors hover:bg-accent-hover"
            >
              {site.ui.sendMessage}
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-2 text-sm text-muted">
            <a
              href={`tel:${site.school.phoneTel}`}
              className="font-semibold text-brand hover:text-accent"
            >
              {site.school.phoneDisplay}
            </a>
            <a
              href={`mailto:${site.school.email}`}
              className="hover:text-accent"
            >
              {site.school.email}
            </a>
          </div>
        </div>

        <div className="lg:col-span-6 xl:col-span-7">
          <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem] shadow-[0_24px_48px_rgb(10_53_82/0.14)] sm:aspect-[4/3]">
            <Image
              src="/images/classroom.jpg"
              alt="Adult learners collaborating during a course session"
              fill
              sizes="(min-width: 1024px) 48vw, 100vw"
              className="object-cover object-[center_30%]"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

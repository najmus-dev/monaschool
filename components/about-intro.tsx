import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";

function SectionMark() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M0 0H12L0 12V0Z" fill="#C08430" />
    </svg>
  );
}

export function AboutIntro() {
  const copy = site.about;

  return (
    <section className="bg-[#F8F5F0]">
      <div className="mx-auto grid w-full max-w-[90rem] grid-cols-1 items-stretch gap-10 px-4 py-16 sm:px-6 md:gap-14 md:py-20 lg:grid-cols-[minmax(0,0.44fr)_minmax(0,0.56fr)] lg:gap-x-16 lg:px-8 lg:py-24 xl:gap-x-20">
        <div className="relative min-h-[22rem] overflow-hidden rounded-[1.75rem] sm:min-h-[28rem] lg:min-h-full">
          <Image
            src={copy.introImage}
            alt={copy.introImageAlt}
            fill
            sizes="(min-width: 1024px) 40vw, 90vw"
            className="object-cover object-[center_22%]"
          />
        </div>

        <div className="flex w-full min-w-0 max-w-[34rem] flex-col justify-center lg:justify-self-end">
          <div className="flex items-center gap-2.5">
            <SectionMark />
            <p className="text-[0.8rem] font-bold uppercase tracking-[0.12em] text-black">
              {copy.introLabel}
            </p>
          </div>

          <h2 className="mt-5 font-sans text-[2.2rem] font-bold leading-[1.08] tracking-[-0.02em] text-black sm:text-[2.7rem]">
            {copy.introTitle}
          </h2>

          <p className="mt-5 text-[1.05rem] leading-[1.65] text-black/70 sm:text-[1.125rem] sm:leading-[1.7]">
            {copy.introBody}
          </p>

          <ul className="mt-10 space-y-0">
            {copy.highlights.map((item) => (
              <li
                key={item.label}
                className="flex items-baseline gap-5 border-t border-black/10 py-5 first:border-t-0 first:pt-0 last:pb-0"
              >
                <span className="w-[4.5rem] shrink-0 font-sans text-[2.35rem] font-bold leading-none tracking-[-0.03em] text-black sm:w-[5rem] sm:text-[2.75rem]">
                  {item.value}
                </span>
                <span className="text-[1rem] leading-snug text-black/65 sm:text-[1.05rem]">
                  {item.label}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <Link
              href="/florida-real-estate"
              className="inline-flex h-11 items-center rounded-[0.25rem] bg-[#002448] px-5 text-[0.88rem] font-bold text-white transition-colors hover:bg-black"
            >
              Explore Florida Real Estate
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";

export function HomePaths() {
  return (
    <section
      aria-labelledby="home-paths-heading"
      className="relative z-0 bg-paper pt-28 sm:pt-32 md:pt-36"
    >
      <h2 id="home-paths-heading" className="sr-only">
        {site.home.pathTitle}
      </h2>

      {/* Paper pad above photos: overlapping Classroom / Zoom / Online cards land here */}
      <div className="grid grid-cols-1 border-t border-line lg:grid-cols-2">
        {site.home.paths.map((path) => (
          <article
            key={path.title}
            className="relative overflow-hidden"
          >
            <Image
              src={path.image}
              alt={path.imageAlt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-center"
            />
            <div
              className="absolute inset-0 bg-[linear-gradient(100deg,rgb(255_255_255/0.96)_0%,rgb(255_255_255/0.9)_34%,rgb(255_255_255/0.45)_58%,rgb(255_255_255/0.12)_78%,transparent_100%)]"
              aria-hidden
            />

            <div className="relative flex min-h-[17.5rem] items-center px-7 py-10 sm:min-h-[19rem] sm:px-10 sm:py-12 lg:min-h-[20.5rem] lg:px-14 xl:px-16">
              <div className="w-full max-w-[21rem] sm:max-w-[23rem]">
                <h3 className="font-display text-[1.55rem] font-bold leading-[1.18] tracking-tight text-brand sm:text-[1.85rem] lg:text-[2rem]">
                  {path.title}
                </h3>
                <p className="mt-3 text-[0.92rem] leading-6 text-[#526578] sm:text-[0.95rem] sm:leading-7">
                  {path.body}
                </p>
                <div className="mt-6">
                  <Link
                    href={path.href}
                    className="inline-flex min-h-11 items-center justify-center rounded-md bg-accent px-6 text-[0.9rem] font-bold text-ink transition-colors hover:bg-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
                  >
                    {path.cta}
                  </Link>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

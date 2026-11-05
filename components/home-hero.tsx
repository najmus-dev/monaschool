import Image from "next/image";
import {
  ChalkboardTeacherIcon,
  DesktopIcon,
  VideoCameraIcon,
} from "@phosphor-icons/react/ssr";
import { site } from "@/content/site";
import { ButtonLink } from "./button-link";

const featureIcons = [ChalkboardTeacherIcon, VideoCameraIcon, DesktopIcon];

export function HomeHero() {
  return (
    <section className="relative z-10 text-footer-text">
      <div className="absolute inset-0">
        <Image
          src={site.home.heroImage}
          alt={site.home.heroImageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_45%]"
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(180deg,rgb(8_28_44/0.58)_0%,rgb(8_28_44/0.42)_32%,rgb(8_28_44/0.55)_62%,rgb(8_28_44/0.72)_100%)]"
          aria-hidden
        />
      </div>

      {/* Fixed header is 6.75rem tall — pad past it so copy never sits under the nav */}
      <div className="relative mx-auto flex min-h-[min(92dvh,52rem)] w-full max-w-6xl flex-col px-4 pt-[calc(6.75rem+2.5rem)] sm:px-6 md:pt-[calc(6.75rem+3.5rem)] lg:px-8">
        <div className="flex flex-1 flex-col items-center justify-start pb-36 pt-4 text-center sm:pt-6 md:pb-40">
          <div className="w-full max-w-3xl">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-accent">
              {site.home.heroEyebrow}
            </p>

            <h1 className="mt-5 font-display text-[2.75rem] font-bold leading-[1.05] tracking-[-0.02em] text-balance sm:text-5xl md:text-[3.75rem] md:leading-[1.04]">
              {site.school.name}
            </h1>

            <p className="mx-auto mt-5 max-w-2xl font-display text-[1.35rem] font-semibold leading-[1.25] tracking-[-0.01em] text-white/95 sm:text-[1.65rem] md:text-[1.85rem] md:leading-[1.22]">
              {site.home.heroTitle}
            </p>

            <p className="mx-auto mt-6 max-w-2xl text-[1.05rem] font-medium leading-8 text-white/88 sm:text-lg sm:leading-8 md:text-xl md:leading-9">
              {site.home.heroBody}
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <ButtonLink href="#courses" className="h-12 min-w-[11.5rem]">
                {site.home.heroPrimary}
              </ButtonLink>
              <ButtonLink href="/license" variant="onDark" className="h-12">
                {site.home.heroSecondary}
              </ButtonLink>
            </div>

            <p className="mx-auto mt-8 max-w-xl text-[0.95rem] leading-7 text-white/65">
              {site.home.trust}
            </p>
          </div>
        </div>

        <ul className="relative z-20 mb-[-4.5rem] grid grid-cols-1 gap-3 md:mb-[-5.5rem] md:grid-cols-3 md:gap-4">
          {site.home.heroFeatures.map((feature, index) => {
            const Icon = featureIcons[index] ?? DesktopIcon;
            return (
              <li
                key={feature.title}
                className="border border-line bg-surface px-5 py-6 text-ink shadow-[0_16px_40px_rgb(8_28_44/0.18)] md:px-6 md:py-7"
              >
                <div className="flex items-center gap-2.5">
                  <span className="inline-flex size-9 items-center justify-center bg-accent-soft text-accent">
                    <Icon size={20} weight="regular" aria-hidden />
                  </span>
                  <h2 className="font-display text-lg font-bold tracking-tight text-brand md:text-xl">
                    {feature.title}
                  </h2>
                </div>
                <p className="mt-3 text-sm leading-6 text-muted">
                  {feature.body}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

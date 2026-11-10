import Image from "next/image";
import {
  CertificateIcon,
  DesktopIcon,
  EnvelopeSimpleIcon,
  PhoneIcon,
  SealCheckIcon,
  ShieldCheckIcon,
  WaveformIcon,
} from "@phosphor-icons/react/ssr";
import { site } from "@/content/site";
import { ButtonLink } from "./button-link";

const featureIcons = [
  ShieldCheckIcon,
  DesktopIcon,
  CertificateIcon,
  WaveformIcon,
];
const featureTints = [
  "bg-[#e8f1fb] text-[#2f6fad]",
  "bg-[#e7f6ef] text-[#2f8a5b]",
  "bg-[#e8f1fb] text-[#2f6fad]",
  "bg-[#e7f6ef] text-[#2f8a5b]",
];

export function HomeHero() {
  return (
    <section className="relative z-10">
      {/* Match REIB reference: full-bleed band ~500px tall, image covers the frame */}
      <div className="relative isolate flex min-h-[28rem] w-full items-center overflow-hidden text-white sm:min-h-[30rem] md:min-h-[32rem] lg:min-h-[34rem]">
        <Image
          src={site.home.heroImage}
          alt={site.home.heroImageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_35%]"
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(105deg,rgb(8_28_44/0.78)_0%,rgb(8_28_44/0.62)_55%,rgb(8_28_44/0.5)_100%)]"
          aria-hidden
        />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pt-[4.75rem] pb-10 sm:px-6 sm:pb-12 lg:px-8 lg:pb-14">
          <div className="max-w-3xl text-left">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-3.5 py-1.5 text-[0.78rem] font-semibold text-white backdrop-blur-sm">
              <SealCheckIcon size={15} weight="bold" aria-hidden />
              {site.home.heroBadge}
            </p>

            <h1 className="mt-4 font-sans text-[1.85rem] font-bold leading-[1.12] tracking-[-0.02em] text-balance sm:mt-5 sm:text-4xl md:text-[2.65rem] md:leading-[1.1]">
              {site.home.heroTitle}
            </h1>

            <p className="mt-3 max-w-2xl text-sm font-medium leading-6 text-white/90 sm:mt-4 sm:text-base sm:leading-7 md:text-lg md:leading-8">
              {site.home.heroBody}
            </p>

            <div className="mt-5 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <ButtonLink href="#courses" className="h-11 min-w-[10rem] sm:h-12">
                {site.home.heroPrimary}
              </ButtonLink>

              <div className="flex flex-wrap gap-2 sm:gap-2.5">
                <a
                  href={`mailto:${site.school.email}`}
                  className="inline-flex h-10 items-center gap-2 rounded-md border border-white/40 bg-white/5 px-3 text-sm font-medium text-white transition-colors hover:bg-white/12 sm:h-11 sm:px-3.5"
                >
                  <EnvelopeSimpleIcon size={16} weight="bold" aria-hidden />
                  {site.school.email}
                </a>
                <a
                  href={`tel:${site.school.phoneTel}`}
                  className="inline-flex h-10 items-center gap-2 rounded-md border border-white/40 bg-white/5 px-3 text-sm font-medium text-white transition-colors hover:bg-white/12 sm:h-11 sm:px-3.5"
                >
                  <PhoneIcon size={16} weight="bold" aria-hidden />
                  {site.school.phoneDisplay}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-line bg-surface">
        <ul className="mx-auto grid max-w-6xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {site.home.heroFeatures.map((feature, index) => {
            const Icon = featureIcons[index] ?? SealCheckIcon;
            const tint = featureTints[index] ?? featureTints[0];
            return (
              <li
                key={feature.title}
                className="flex items-start gap-3.5 px-5 py-7 sm:px-6 sm:py-8 lg:px-7"
              >
                <span
                  className={`inline-flex size-11 shrink-0 items-center justify-center rounded-xl ${tint}`}
                >
                  <Icon size={22} weight="duotone" aria-hidden />
                </span>
                <div className="min-w-0 pt-0.5">
                  <h2 className="text-[0.95rem] font-bold leading-snug tracking-tight text-ink">
                    {feature.title}
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-muted">
                    {feature.body}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

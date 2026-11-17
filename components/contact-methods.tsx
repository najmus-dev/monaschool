"use client";

import {
  EnvelopeSimpleIcon,
  MapPinIcon,
  PhoneIcon,
} from "@phosphor-icons/react/ssr";
import { useRef, type ComponentType } from "react";
import { site } from "@/content/site";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

type ContactCard = {
  key: string;
  eyebrow: string;
  title: string;
  href: string;
  value: string;
  Icon: ComponentType<{
    size?: number;
    weight?: "regular";
    "aria-hidden"?: boolean;
  }>;
  tone: string;
};

const cards: ContactCard[] = [
  ...(site.school.email
    ? [
        {
          key: "general",
          eyebrow: "General",
          title: "General enquiries",
          href: `mailto:${site.school.email}`,
          value: site.school.email,
          Icon: EnvelopeSimpleIcon,
          tone: "#C08430",
        },
      ]
    : []),
  {
    key: "phone",
    eyebrow: "Office",
    title: "Call the school",
    href: `tel:${site.school.phoneTel}`,
    value: site.school.phoneDisplay,
    Icon: PhoneIcon,
    tone: "#002448",
  },
  {
    key: "location",
    eyebrow: "Location",
    title: site.school.city,
    href: "/about",
    value: site.school.address,
    Icon: MapPinIcon,
    tone: "#3d5a73",
  },
];

export function ContactMethods() {
  const rootRef = useRef<HTMLElement>(null);
  useScrollReveal(rootRef, { stagger: 0.1 });

  const cols =
    cards.length === 2
      ? "sm:grid-cols-2"
      : cards.length === 1
        ? "grid-cols-1"
        : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <section ref={rootRef} className="bg-[#F8F5F0]">
      <div className="mx-auto w-full max-w-[90rem] px-4 py-16 sm:px-6 md:py-20 lg:px-8 lg:py-24">
        <h2
          data-reveal
          className="font-sans text-[2.15rem] font-bold tracking-[-0.02em] text-black sm:text-[2.5rem]"
        >
          {site.contact.reachTitle}
        </h2>

        <ul className={`mt-8 grid w-full grid-cols-1 gap-5 ${cols} lg:gap-6`}>
          {cards.map(({ key, eyebrow, title, href, value, Icon, tone }) => (
            <li key={key} data-reveal className="min-w-0">
              <a
                href={href}
                className="relative flex h-full min-h-[10.5rem] flex-col overflow-hidden rounded-[1.15rem] bg-white px-6 py-6 shadow-[0_10px_28px_rgba(0,0,0,0.06)] transition-shadow hover:shadow-[0_14px_34px_rgba(0,0,0,0.09)] sm:min-h-[11.5rem] sm:flex-row sm:items-end sm:justify-between sm:gap-6 sm:px-8 sm:py-7"
              >
                <span
                  className="absolute inset-y-0 left-0 w-[3px]"
                  style={{ backgroundColor: tone }}
                  aria-hidden
                />
                <div className="min-w-0">
                  <p className="text-[0.72rem] font-bold uppercase tracking-[0.12em] text-black">
                    {eyebrow}
                  </p>
                  <h3 className="mt-3 font-sans text-[1.25rem] font-medium leading-snug text-black sm:text-[1.35rem]">
                    {title}
                  </h3>
                </div>
                <span className="mt-8 inline-flex items-center gap-2 text-[0.95rem] font-semibold text-black/80 sm:mt-0 sm:shrink-0">
                  <Icon size={18} weight="regular" aria-hidden />
                  {value}
                </span>
              </a>
            </li>
          ))}
        </ul>

        <p
          data-reveal
          className="mt-8 max-w-[42rem] text-[0.88rem] leading-6 text-[#746C66]"
        >
          {site.contact.accessBody}
        </p>
      </div>
    </section>
  );
}

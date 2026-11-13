"use client";

import {
  EnvelopeSimpleIcon,
  PhoneIcon,
} from "@phosphor-icons/react/ssr";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { site } from "@/content/site";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const companyLinks = [
  { label: "About us", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/faq" },
  { label: "Student login", href: site.ui.studentLoginHref, external: true },
] as const;

const learnLinks = [
  { label: "Florida Real Estate", href: "/florida-real-estate" },
  { label: "Professional Development", href: "/professional-development" },
  { label: "International Business", href: "/international-business" },
] as const;

const policyLinks = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
] as const;

function FooterLink({
  href,
  children,
  external,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  const className =
    "inline-flex min-h-11 items-center text-[0.98rem] font-semibold text-black transition-colors hover:text-black/55";

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

function LinkColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { label: string; href: string; external?: boolean }[];
}) {
  return (
    <div data-reveal>
      <h2 className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-black/40">
        {title}
      </h2>
      <ul className="mt-4 grid gap-3">
        {links.map((link) => (
          <li key={link.label}>
            <FooterLink href={link.href} external={link.external}>
              {link.label}
            </FooterLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  const rootRef = useRef<HTMLElement>(null);
  useScrollReveal(rootRef, { start: "top 92%", y: 18, stagger: 0.05 });

  return (
    <footer ref={rootRef} className="relative mt-auto bg-[#001830]">
      <div className="relative mx-auto max-w-[92rem] px-3 pb-3 sm:px-4 lg:px-5">
        <div className="rounded-t-[1.75rem] bg-white px-6 pb-10 pt-12 sm:rounded-t-[2rem] sm:px-10 sm:pb-12 sm:pt-14 md:px-14">
          <div data-reveal>
            <Link
              href="/"
              className="inline-flex"
              aria-label={`${site.school.name}, home`}
            >
              <Image
                src="/institute-logos/REIB_Formal_Institutional_Logo.png"
                alt={site.school.logoAlt}
                width={520}
                height={320}
                unoptimized
                className="h-auto w-full max-w-[10.5rem] object-contain object-left sm:max-w-[12rem] md:max-w-[13.5rem]"
              />
            </Link>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
              <a
                href={`tel:${site.school.phoneTel}`}
                className="inline-flex items-center gap-2 text-[0.92rem] font-semibold text-black/70 transition-colors hover:text-black"
              >
                <PhoneIcon size={18} weight="regular" aria-hidden />
                {site.school.phoneDisplay}
              </a>
              <a
                href={`mailto:${site.school.email}`}
                className="inline-flex items-center gap-2 text-[0.92rem] font-semibold text-black/70 transition-colors hover:text-black"
              >
                <EnvelopeSimpleIcon size={18} weight="regular" aria-hidden />
                {site.school.email}
              </a>
            </div>
          </div>

          {/* Mobile: 2-col like Leo; desktop: 3-col */}
          <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 sm:mt-12 md:grid-cols-3 md:gap-x-10">
            <LinkColumn title="Company" links={companyLinks} />
            <LinkColumn title="Policies" links={policyLinks} />
            <div className="col-span-2 md:col-span-1">
              <LinkColumn title="Learn" links={learnLinks} />
            </div>
          </div>

          <div
            data-reveal
            className="mt-12 border-t border-black/10 pt-6 text-[0.8rem] leading-6 text-black/55 sm:mt-14"
          >
            <p>
              © 2026 {site.school.name}. All rights reserved.
            </p>
            <p className="mt-2">{site.school.licenseLine}</p>
          </div>

          <div
            data-reveal
            className="mt-6 border-t border-black/10 pt-6 text-[0.8rem] leading-6 text-black/50"
          >
            <p>
              {site.school.tagline} Based in {site.school.city}, Florida.{" "}
              {site.school.hours}.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

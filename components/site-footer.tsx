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
    "inline-flex min-h-9 items-center text-[0.95rem] font-medium text-black transition-colors hover:text-black/55 md:min-h-0 md:py-0.5";

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
      <h2 className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-black/40">
        {title}
      </h2>
      <ul className="mt-2.5 grid gap-1 md:mt-3 md:gap-1.5">
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
        <div className="rounded-t-[1.75rem] bg-white px-6 pb-8 pt-10 sm:rounded-t-[2rem] sm:px-10 sm:pb-9 sm:pt-11 md:px-14 md:pb-10 md:pt-12">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between md:gap-12 lg:gap-16">
            <div data-reveal className="shrink-0 md:max-w-[16rem]">
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
                  className="h-auto w-full max-w-[10.5rem] object-contain object-left sm:max-w-[12rem] md:max-w-[13rem]"
                />
              </Link>

              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 md:mt-5">
                <a
                  href={`tel:${site.school.phoneTel}`}
                  className="inline-flex items-center gap-2 text-[0.88rem] font-medium text-black/65 transition-colors hover:text-black"
                >
                  <PhoneIcon size={16} weight="regular" aria-hidden />
                  {site.school.phoneDisplay}
                </a>
                <a
                  href={`mailto:${site.school.email}`}
                  className="inline-flex items-center gap-2 text-[0.88rem] font-medium text-black/65 transition-colors hover:text-black"
                >
                  <EnvelopeSimpleIcon size={16} weight="regular" aria-hidden />
                  {site.school.email}
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-7 sm:gap-x-10 md:grid-cols-3 md:gap-x-12 lg:gap-x-16">
              <LinkColumn title="Company" links={companyLinks} />
              <LinkColumn title="Policies" links={policyLinks} />
              <div className="col-span-2 md:col-span-1">
                <LinkColumn title="Learn" links={learnLinks} />
              </div>
            </div>
          </div>

          <div
            data-reveal
            className="mt-8 border-t border-black/10 pt-5 text-[0.78rem] leading-5 text-black/50 sm:mt-9 md:mt-10 md:pt-6"
          >
            <p>© 2026 {site.school.name}. All rights reserved.</p>
            <p className="mt-1.5">{site.school.licenseLine}</p>
            <p className="mt-3 max-w-3xl">
              {site.school.tagline} Based in {site.school.city}, Florida.{" "}
              {site.school.hours}.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

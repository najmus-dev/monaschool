import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";
import { Container } from "./container";

const columns = [
  {
    title: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "FAQ", href: "/faq" },
      { label: "Student login", href: site.ui.studentLoginHref, external: true },
    ],
  },
  {
    title: "Learn",
    links: [
      { label: "Florida Real Estate", href: "/florida-real-estate" },
      { label: "Professional Development", href: "/professional-development" },
      { label: "International Business", href: "/international-business" },
    ],
  },
  {
    title: "Policies",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="relative mt-auto bg-[#001830]">
      <div className="relative mx-auto max-w-[92rem] px-3 pb-3 sm:px-4 lg:px-5">
        <div className="rounded-t-[1.75rem] bg-white px-6 pb-10 pt-12 sm:px-10 sm:pt-14 md:px-14">
          <Container className="!px-0">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-[minmax(0,1.1fr)_minmax(0,2fr)] md:gap-10">
              <div>
                <Link
                  href="/"
                  className="inline-flex"
                  aria-label={`${site.school.name}, home`}
                >
                  <Image
                    src="/institute-logos/REIB_Institute_Full_Logo.jpg"
                    alt={site.school.logoAlt}
                    width={360}
                    height={140}
                    className="h-14 w-auto"
                  />
                </Link>
                <p className="mt-5 max-w-[28ch] text-sm leading-6 text-black/65">
                  {site.school.tagline} {site.school.city}, Florida.
                </p>
                <div className="mt-5 space-y-1 text-sm text-black/70">
                  <a
                    href={`tel:${site.school.phoneTel}`}
                    className="block font-semibold text-black hover:underline"
                  >
                    {site.school.phoneDisplay}
                  </a>
                  <a
                    href={`mailto:${site.school.email}`}
                    className="block hover:underline"
                  >
                    {site.school.email}
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
                {columns.map((column) => (
                  <div key={column.title}>
                    <h2 className="text-[0.72rem] font-bold uppercase tracking-[0.14em] text-black/45">
                      {column.title}
                    </h2>
                    <ul className="mt-4 grid gap-2.5">
                      {column.links.map((link) => (
                        <li key={link.label}>
                          {"external" in link && link.external ? (
                            <a
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[0.95rem] font-medium text-black transition-colors hover:text-black/55"
                            >
                              {link.label}
                            </a>
                          ) : (
                            <Link
                              href={link.href}
                              className="text-[0.95rem] font-medium text-black transition-colors hover:text-black/55"
                            >
                              {link.label}
                            </Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 border-t border-black/10 pt-6 text-xs leading-6 text-black/50">
              <p>
                © 2026 {site.school.shortName}. {site.school.licenseLine}
              </p>
              <p className="mt-2">{site.school.hours}</p>
            </div>
          </Container>
        </div>
      </div>
    </footer>
  );
}

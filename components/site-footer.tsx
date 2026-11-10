import Link from "next/link";
import { site } from "@/content/site";
import { Container } from "./container";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-brand text-footer-text">
      <Container className="grid grid-cols-1 gap-12 py-14 md:grid-cols-12 md:gap-10 md:py-16">
        <div className="md:col-span-5">
          <p className="font-display text-2xl font-bold tracking-tight">
            {site.school.shortName}
          </p>
          <p className="mt-2 text-sm leading-6 text-white/60">
            {site.school.city}, FL
          </p>
          <p className="mt-6 max-w-[40ch] border-l-2 border-accent pl-4 text-sm leading-6 text-white/75">
            {site.school.licenseLine}
          </p>
        </div>

        <div className="md:col-span-3">
          <h2 className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-accent">
            {site.ui.footerContact}
          </h2>
          <ul className="mt-5 grid gap-3 text-sm">
            <li>
              <a
                className="font-semibold text-footer-text transition-colors hover:text-accent"
                href={`tel:${site.school.phoneTel}`}
              >
                {site.school.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                className="font-semibold text-footer-text transition-colors hover:text-accent"
                href={`mailto:${site.school.email}`}
              >
                {site.school.email}
              </a>
            </li>
            <li className="leading-6 text-white/60">{site.school.address}</li>
          </ul>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 md:col-span-4">
          <div>
            <h2 className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-accent">
              {site.ui.footerExplore}
            </h2>
            <ul className="mt-5 grid gap-2.5 text-sm">
              <li>
                <Link
                  className="text-white/80 transition-colors hover:text-accent"
                  href="/"
                >
                  {site.ui.homeLink}
                </Link>
              </li>
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    className="text-white/80 transition-colors hover:text-accent"
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-accent">
              {site.ui.footerLegal}
            </h2>
            <ul className="mt-5 grid gap-2.5 text-sm">
              {site.legalNav.map((item) => (
                <li key={item.href}>
                  <Link
                    className="text-white/80 transition-colors hover:text-accent"
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  className="text-white/80 transition-colors hover:text-accent"
                  href={site.ui.studentLoginHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {site.ui.studentLogin}
                  <span className="sr-only"> (opens partner site)</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Container>

      <div className="border-t border-white/10 bg-brand-hover/40">
        <Container className="py-4 text-sm leading-6 text-white/55">
          Course video, exams, and payment open on Class Made Easy. Enroll and
          student login use this school&apos;s partner links.
        </Container>
      </div>
    </footer>
  );
}

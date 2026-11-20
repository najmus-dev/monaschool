import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ContactForm } from "@/components/contact-form";
import { ContactMethods } from "@/components/contact-methods";
import { HomeQuestions } from "@/components/home-questions";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: site.instructorsApply.title,
  description: site.instructorsApply.lede,
  alternates: { canonical: "/instructors/apply" },
  openGraph: {
    title: site.instructorsApply.title,
    description: site.instructorsApply.lede,
    url: "/instructors/apply",
  },
};

function SectionMark() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M0 0H12L0 12V0Z" fill="#C08430" />
    </svg>
  );
}

export default function InstructorsApplyPage() {
  const copy = site.instructorsApply;

  return (
    <>
      <section className="bg-[#F7F3EE]">
        <div className="mx-auto w-full max-w-[90rem] px-4 pb-16 pt-[calc(4.25rem+2rem)] sm:px-6 md:pb-20 md:pt-[calc(4.25rem+2.5rem)] lg:px-8">
          <nav aria-label="Breadcrumb" className="text-[0.8rem] text-[#746C66]">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link
                  href="/"
                  className="transition-colors hover:text-[#222222]"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden className="text-[#746C66]/50">
                /
              </li>
              <li className="text-[#222222]">{copy.breadcrumb}</li>
            </ol>
          </nav>

          <div className="mx-auto mt-14 w-full max-w-[28rem] md:mt-16">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2.5">
                <SectionMark />
                <p className="text-[0.78rem] font-bold uppercase tracking-[0.12em] text-[#222222]">
                  {copy.label}
                </p>
              </div>
              <h1 className="mt-4 font-sans text-[2.2rem] font-bold uppercase leading-[1.05] tracking-[-0.02em] text-[#222222] sm:text-[2.75rem] md:text-[3.1rem]">
                {copy.heading}
              </h1>
              <p className="mt-4 text-[0.98rem] leading-7 text-[#746C66] sm:text-[1.05rem]">
                {copy.lede}
              </p>
            </div>

            <div className="mt-10">
              <Suspense
                fallback={
                  <p className="text-center text-sm text-black/55">
                    Loading form…
                  </p>
                }
              >
                <ContactForm lockedInterest="teaching-partnership" />
              </Suspense>
            </div>

            <p className="mt-8 text-center text-[0.9rem] leading-6 text-[#746C66]">
              Looking for a course question instead?{" "}
              <Link
                href="/contact"
                className="font-semibold text-[#002448] underline-offset-2 hover:underline"
              >
                Contact the school
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <ContactMethods />
      <HomeQuestions />
    </>
  );
}

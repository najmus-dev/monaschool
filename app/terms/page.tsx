import type { Metadata } from "next";
import { HomeQuestions } from "@/components/home-questions";
import {
  PolicyFooterLinks,
  PolicySections,
} from "@/components/policy-sections";
import { SimplePageHero } from "@/components/simple-page-hero";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: site.terms.title,
  description: site.terms.lede,
};

export default function TermsPage() {
  return (
    <>
      <SimplePageHero
        breadcrumb="Terms"
        label="Policies"
        title={site.terms.title}
        lede={site.terms.lede}
      />

      <section className="bg-white">
        <div className="mx-auto w-full max-w-[90rem] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <article className="mx-auto max-w-[46rem]">
            <PolicySections sections={site.terms.sections} />
            <PolicyFooterLinks
              links={[
                { href: "/privacy", label: "Read privacy" },
                { href: "/contact", label: "Contact the school" },
              ]}
            />
          </article>
        </div>
      </section>

      <HomeQuestions />
    </>
  );
}

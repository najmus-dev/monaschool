import type { Metadata } from "next";
import { HomeQuestions } from "@/components/home-questions";
import {
  PolicyFooterLinks,
  PolicySections,
} from "@/components/policy-sections";
import { SimplePageHero } from "@/components/simple-page-hero";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: site.privacy.title,
  description: site.privacy.lede,
};

export default function PrivacyPage() {
  return (
    <>
      <SimplePageHero
        breadcrumb="Privacy"
        label="Policies"
        title={site.privacy.title}
        lede={site.privacy.lede}
      />

      <section className="bg-white">
        <div className="mx-auto w-full max-w-[90rem] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <article className="mx-auto max-w-[46rem]">
            <PolicySections sections={site.privacy.sections} />
            <PolicyFooterLinks
              links={[
                { href: "/terms", label: "Read terms" },
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

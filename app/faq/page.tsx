import type { Metadata } from "next";
import Link from "next/link";
import { FaqList } from "@/components/faq-list";
import { HomeQuestions } from "@/components/home-questions";
import { SimplePageHero } from "@/components/simple-page-hero";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: site.faq.title,
  description: site.faq.lede,
};

export default function FaqPage() {
  return (
    <>
      <SimplePageHero
        breadcrumb="FAQ"
        label="Help"
        title={site.faq.title}
        lede={site.faq.lede}
      />

      <section className="bg-[#F7F3EE]">
        <div className="mx-auto w-full max-w-[90rem] px-4 pb-16 sm:px-6 md:pb-24 lg:px-8">
          <div className="mx-auto max-w-[52rem]">
            <FaqList items={site.faq.items} />

            <div className="mt-12 flex flex-col gap-4 border-t border-black/10 pt-10 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-[28rem] text-[0.98rem] leading-7 text-[#746C66]">
                Still deciding on a course or format? Browse the catalog or send
                the school a message.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/florida-real-estate"
                  className="inline-flex h-11 items-center rounded-[0.3rem] bg-black px-5 text-[0.86rem] font-bold text-white transition-colors hover:bg-[#FFD400] hover:text-black"
                >
                  {site.ui.seeCourses}
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex h-11 items-center rounded-[0.3rem] border border-black bg-transparent px-5 text-[0.86rem] font-bold text-black transition-colors hover:bg-black hover:text-white"
                >
                  {site.ui.sendMessage}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <HomeQuestions />
    </>
  );
}

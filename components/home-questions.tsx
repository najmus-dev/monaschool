import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";

export function HomeQuestions() {
  return (
    <section className="relative isolate overflow-hidden">
      <Image
        src="/images/leo-cussen-footer-chat-supervisor.webp"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-[center_42%]"
      />
      <div className="absolute inset-0 bg-black/40" aria-hidden />

      <div className="relative mx-auto flex min-h-[20rem] max-w-[90rem] flex-col items-center justify-center px-4 py-20 text-center sm:min-h-[24rem] sm:px-6 md:min-h-[26rem] md:py-24">
        <p className="max-w-[38rem] text-[1.05rem] font-medium leading-[1.65] text-white sm:text-[1.125rem] sm:leading-[1.7]">
          Our team is here to help. Call the school or send a message to get the
          answers you need.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <a
            href={`tel:${site.school.phoneTel}`}
            className="inline-flex h-11 items-center rounded-[0.2rem] bg-[#FFD400] px-6 text-[0.9rem] font-bold text-black transition-colors hover:bg-white"
          >
            Call the school
          </a>
          <Link
            href="/contact?interest=course-question"
            className="inline-flex h-11 items-center rounded-[0.2rem] bg-[#FFD400] px-6 text-[0.9rem] font-bold text-black transition-colors hover:bg-white"
          >
            Send a message
          </Link>
        </div>
      </div>
    </section>
  );
}

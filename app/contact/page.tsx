import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/content/site";
import { ContactForm } from "@/components/contact-form";
import { ContactMethods } from "@/components/contact-methods";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: site.contact.title,
  description: site.contact.lede,
};

export default function ContactPage() {
  return (
    <>
      <PageHeader title={site.contact.title} lede={site.contact.lede} />
      <div className="bg-paper">
        <Container className="grid grid-cols-1 gap-10 py-14 md:py-20 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div>
            <div className="relative mb-8 aspect-[16/10] overflow-hidden bg-band [clip-path:polygon(0_0,100%_0,100%_100%,6%_100%)]">
              <Image
                src="/images/contact-home.jpg"
                alt="Modern Florida home with a pool representing the market sales associates serve."
                fill
                sizes="(min-width: 1024px) 34vw, 100vw"
                className="object-cover object-[55%_40%]"
              />
            </div>
            <ContactMethods />
            <section className="mt-8 border-t border-line pt-6">
              <h2 className="text-xl font-bold text-brand">
                {site.contact.accessTitle}
              </h2>
              <p className="mt-3 text-sm leading-6 text-muted">
                {site.contact.accessBody}
              </p>
            </section>
          </div>
          <div className="border border-line bg-surface p-5 md:p-7">
            <ContactForm />
          </div>
        </Container>
      </div>
    </>
  );
}

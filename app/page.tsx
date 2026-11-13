import type { Metadata } from "next";
import { HomeAdvantages } from "@/components/home-advantages";
import { HomeConnect } from "@/components/home-connect";
import { HomeHero } from "@/components/home-hero";
import { HomeQuestions } from "@/components/home-questions";
import { HomeTestimonials } from "@/components/home-testimonials";
import { HomeUpcoming } from "@/components/home-upcoming";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: { absolute: `${site.home.metaTitle} | ${site.school.name}` },
  description: site.school.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: site.home.metaTitle,
    description: site.school.description,
    url: "/",
    images: [{ url: site.home.heroImage, alt: site.home.heroImageAlt }],
  },
};

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeAdvantages />
      <HomeUpcoming />
      <HomeTestimonials />
      <HomeConnect />
      <HomeQuestions />
    </>
  );
}

import type { Metadata } from "next";
import { AboutHero } from "@/components/about-hero";
import { AboutIntro } from "@/components/about-intro";
import { AboutValues } from "@/components/about-values";
import { HomeConnect } from "@/components/home-connect";
import { HomeQuestions } from "@/components/home-questions";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: site.about.title,
  description: site.about.lede,
  alternates: { canonical: "/about" },
  openGraph: {
    title: site.about.title,
    description: site.about.lede,
    url: "/about",
    images: [{ url: site.about.heroImage, alt: site.about.heroImageAlt }],
  },
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutIntro />
      <AboutValues />
      <HomeConnect />
      <HomeQuestions />
    </>
  );
}

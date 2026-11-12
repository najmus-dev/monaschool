import { HomeAdvantages } from "@/components/home-advantages";
import { HomeConnect } from "@/components/home-connect";
import { HomeHero } from "@/components/home-hero";
import { HomeQuestions } from "@/components/home-questions";
import { HomeTestimonials } from "@/components/home-testimonials";
import { HomeUpcoming } from "@/components/home-upcoming";

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

import type { Course } from "@/content/site";

const pdImages: Record<string, string> = {
  "the-voice-that-sells": "/images/pd-voice-sells.jpg",
  "the-5-ws-of-selling": "/images/pd-5ws-selling.jpg",
  "leading-diverse-teams": "/images/pd-leading-teams.jpg",
  "presenting-across-cultures": "/images/pd-presenting-cultures.jpg",
  "negotiating-across-cultures": "/images/pd-negotiating-cultures.jpg",
  "introduction-to-commercial-real-estate": "/images/pd-commercial-re.jpg",
  "introduction-to-business-brokerage": "/images/pd-business-brokerage.jpg",
  "from-trade-mission-to-real-estate-opportunity":
    "/images/pd-trade-mission.jpg",
  "geopolitics-and-real-estate-investment": "/images/pd-geopolitics-invest.jpg",
  "global-clients-local-business": "/images/pd-global-clients.jpg",
  "when-businesses-cross-borders": "/images/pd-cross-borders-map.jpg",
  "short-sales-distressed-properties": "/images/pd-short-sales.jpg",
  "reo-default-real-estate": "/images/pd-reo-default.jpg",
};

/** Prefer real-estate relevant photography by topic / slug. */
export function heroImageForCourse(course: Course) {
  const pd = pdImages[course.slug];
  if (pd) return pd;

  const topic = course.floridaTopic;
  if (topic === "get-license") return "/images/contact-home.jpg";
  if (topic === "become-broker") return "/images/fl-card-broker.jpg";
  if (topic === "sales-post-license") return "/images/courses-band.jpg";
  if (topic === "broker-post-license") return "/images/fl-card-office.jpg";
  if (topic === "continuing-education") return "/images/hero-banner.jpg";
  if (topic === "reactivation") return "/images/fl-card-reactivation.jpg";
  if (course.categoryIds.includes("professional-development")) {
    return "/images/pd-category-hero.jpg";
  }
  if (course.categoryIds.includes("international-business")) {
    return "/images/florida-skyline.jpg";
  }
  return "/images/hero-open-home.jpg";
}

export function sideImageForCourse(course: Course) {
  const pd = pdImages[course.slug];
  if (pd) return pd;

  switch (course.slug) {
    case "sales-pre-license":
      return "/images/contact-home.jpg";
    case "broker-pre-license":
      return "/images/fl-card-broker.jpg";
    case "sales-post-license":
      return "/images/fl-card-coastal.jpg";
    case "continuing-education":
      return "/images/hero-banner.jpg";
    case "core-law":
      return "/images/fl-card-law.jpg";
    case "ethics-business-practices":
      return "/images/fl-card-ethics.jpg";
    case "reactivation":
      return "/images/fl-card-reactivation.jpg";
    case "broker-post-license-management":
      return "/images/fl-card-office.jpg";
    default:
      break;
  }

  const topic = course.floridaTopic;
  if (topic === "get-license") return "/images/contact-home.jpg";
  if (topic === "become-broker") return "/images/fl-card-broker.jpg";
  if (topic === "continuing-education") return "/images/hero-banner.jpg";
  if (topic === "sales-post-license") return "/images/fl-card-coastal.jpg";
  if (topic === "broker-post-license") return "/images/fl-card-office.jpg";
  if (topic === "reactivation") return "/images/hero-open-home.jpg";
  if (course.categoryIds.includes("professional-development")) {
    return "/images/pd-category-hero.jpg";
  }
  return "/images/florida-skyline.jpg";
}

export function cardImageForCourse(course: Course) {
  return sideImageForCourse(course);
}

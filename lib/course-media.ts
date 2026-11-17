import type { Course } from "@/content/site";

/** Prefer real-estate relevant photography by topic / slug. */
export function heroImageForCourse(course: Course) {
  const topic = course.floridaTopic;
  if (topic === "get-license") return "/images/contact-home.jpg";
  if (topic === "become-broker") return "/images/fl-card-broker.jpg";
  if (topic === "sales-post-license") return "/images/courses-band.jpg";
  if (topic === "broker-post-license") return "/images/fl-card-office.jpg";
  if (topic === "continuing-education") return "/images/hero-banner.jpg";
  if (topic === "reactivation") return "/images/fl-card-reactivation.jpg";
  if (course.categoryIds.includes("professional-development")) {
    return "/images/bright-office.jpg";
  }
  if (course.categoryIds.includes("international-business")) {
    return "/images/florida-skyline.jpg";
  }
  return "/images/hero-open-home.jpg";
}

export function sideImageForCourse(course: Course) {
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
    case "the-voice-that-sells":
    case "presenting-across-cultures":
      return "/images/bright-office.jpg";
    case "the-5-ws-of-selling":
    case "negotiating-across-cultures":
      return "/images/courses-band.jpg";
    case "leading-diverse-teams":
      return "/images/fl-card-office.jpg";
    case "introduction-to-commercial-real-estate":
    case "introduction-to-business-brokerage":
      return "/images/fl-card-broker.jpg";
    case "from-trade-mission-to-real-estate-opportunity":
    case "geopolitics-and-real-estate-investment":
    case "global-clients-local-business":
    case "when-businesses-cross-borders":
      return "/images/florida-skyline.jpg";
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
  return "/images/florida-skyline.jpg";
}

export function cardImageForCourse(course: Course) {
  return sideImageForCourse(course);
}

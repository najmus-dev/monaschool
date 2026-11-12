/**
 * Course catalog shaped to the Nov 10, 2026 REIB developer brief:
 * category → course → format. Florida Real Estate tuition from the fee schedule.
 * Professional Development and International Business topics are listed for IA only
 * until REIB supplies confirmed copy, instructors, dates, and fees.
 */

export type LearningCategoryId =
  | "florida-real-estate"
  | "professional-development"
  | "international-business";

export type FloridaTopicId =
  | "get-license"
  | "sales-post-license"
  | "become-broker"
  | "broker-post-license"
  | "continuing-education"
  | "reactivation";

export type DeliveryFormat =
  | "self-paced"
  | "livestream"
  | "classroom"
  | "correspondence";

export type CourseFormatOption = {
  id: string;
  format: DeliveryFormat;
  formatLabel: string;
  courseNumber?: string;
  priceCents: number;
  priceLabel: string;
  enrollUrl: string;
  /** When false, show Request Next Dates even for self-paced (partner product not live). */
  enrollReady?: boolean;
};

export type Course = {
  slug: string;
  title: string;
  /** One-sentence learning benefit for cards. */
  benefit: string;
  hoursLabel: string;
  categoryIds: LearningCategoryId[];
  floridaTopic?: FloridaTopicId;
  /** Extra topic tags for PD / IB filters later. */
  topicTags?: string[];
  creditLabel?: string;
  certificateNote?: string;
  audience: string;
  outcomes: string[];
  included: string[];
  prerequisites?: string;
  priceNote: string;
  formats: CourseFormatOption[];
  published: boolean;
  featured?: boolean;
};

export type LearningCategory = {
  id: LearningCategoryId;
  slug: string;
  label: string;
  shortLabel: string;
  cardBody: string;
  pageTitle: string;
  pageLede: string;
  allowedFormats: DeliveryFormat[];
  topics: { id: string; label: string }[];
};

const priceNote = "School recommended tuition. Confirm at checkout.";

/** Class Made Easy partner school id from the partner dashboard. */
const partnerSchool = "40";
export const partnerShop = (slug: string) =>
  `https://classmadeeasy.com/shop/${slug}/?school=${partnerSchool}`;
export const partnerAccount = "https://classmadeeasy.com/my-account/";

const enroll63Hour = partnerShop("63-hour-sales-associate-pre-license-course");
const enroll45Hour = partnerShop("45-hour-post-licensing-course");
const enroll14Hour = partnerShop("14-hour-continuing-education-course");
const enrollBroker72 = partnerShop("72-hour-broker-pre-license-course");
const enrollReactivation = partnerShop(
  "florida-real-estate-28-hour-reactivation",
);
const enrollCoreLaw = partnerShop("3-hour-core-law-course");
const enrollEthics = partnerShop("3-hour-ethics-business-practices-course");
const enrollBrokerPostMgmt = partnerShop("broker-post-licensing-course");

function money(cents: number) {
  return `$${Math.round(cents / 100)}`;
}

function fmt(
  id: string,
  format: DeliveryFormat,
  formatLabel: string,
  courseNumber: string | undefined,
  dollars: number,
  enrollUrl: string,
  enrollReady = true,
): CourseFormatOption {
  const priceCents = dollars * 100;
  return {
    id,
    format,
    formatLabel,
    courseNumber,
    priceCents,
    priceLabel: money(priceCents),
    enrollUrl,
    enrollReady,
  };
}

export const learningCategories: LearningCategory[] = [
  {
    id: "florida-real-estate",
    slug: "florida-real-estate",
    label: "Florida Real Estate",
    shortLabel: "Florida Real Estate",
    cardBody: "Earn, renew or advance your Florida license.",
    pageTitle: "Florida Real Estate",
    pageLede:
      "Licensing, post-license, broker education, continuing education, and reactivation. Choose a topic, then pick self-paced, livestream, or in person.",
    allowedFormats: ["self-paced", "livestream", "classroom", "correspondence"],
    topics: [
      { id: "get-license", label: "Get Your License" },
      { id: "sales-post-license", label: "Sales Post-License" },
      { id: "become-broker", label: "Become a Broker" },
      { id: "broker-post-license", label: "Broker Post-License" },
      { id: "continuing-education", label: "Continuing Education" },
      { id: "reactivation", label: "Reactivation" },
    ],
  },
  {
    id: "professional-development",
    slug: "professional-development",
    label: "Professional Development",
    shortLabel: "Professional Development",
    cardBody:
      "Build practical skills in AI, sales, communication and leadership.",
    pageTitle: "Professional Development",
    pageLede:
      "Practical skills in AI for business, sales, negotiation, communication, and leadership—offered as livestream and in-person sessions.",
    allowedFormats: ["livestream", "classroom"],
    topics: [
      { id: "ai-business", label: "AI for Business & Productivity" },
      { id: "sales-bd", label: "Sales & Business Development" },
      { id: "negotiation", label: "Negotiation" },
      { id: "communication", label: "Communication & Presentation" },
      { id: "leadership", label: "Leadership" },
    ],
  },
  {
    id: "international-business",
    slug: "international-business",
    label: "International Business",
    shortLabel: "International Business",
    cardBody:
      "Learn to work, sell and negotiate across cultures and markets.",
    pageTitle: "International Business",
    pageLede:
      "Cross-cultural communication, international selling and negotiation, market entry, and working with international clients—livestream and in person.",
    allowedFormats: ["livestream", "classroom"],
    topics: [
      { id: "cross-cultural", label: "Cross-cultural Communication" },
      { id: "intl-selling", label: "International Selling & Negotiation" },
      { id: "market-entry", label: "Market Entry" },
      { id: "intl-clients", label: "Working with International Clients" },
    ],
  },
];

export const courses: Course[] = [
  {
    slug: "sales-pre-license",
    title: "Sales Pre-License, 63 hours",
    benefit: "Complete the required Florida sales associate pre-license education.",
    hoursLabel: "63 hours",
    categoryIds: ["florida-real-estate"],
    floridaTopic: "get-license",
    creditLabel: "Florida sales associate pre-license",
    audience:
      "For people starting the Florida sales associate license path.",
    outcomes: [
      "Finish the 63-hour FREC I curriculum",
      "Pass the end-of-course exam",
      "Receive a completion slip valid for two years",
    ],
    included: [
      "63-hour FREC I sales associate pre-license curriculum",
      "Quizzes and the end-of-course exam",
      "Completion slip valid for two years after you pass",
    ],
    priceNote,
    formats: [
      fmt("sp", "self-paced", "Self-paced", "0033527", 179, enroll63Hour),
      fmt("live", "livestream", "Livestream", "0033534", 349, enroll63Hour),
      fmt("class", "classroom", "In person", "0033539", 449, enroll63Hour),
    ],
    published: true,
    featured: true,
  },
  {
    slug: "broker-pre-license",
    title: "Broker Pre-License, 72 hours",
    benefit: "Prepare for the Florida broker license with the 72-hour pre-license course.",
    hoursLabel: "72 hours",
    categoryIds: ["florida-real-estate"],
    floridaTopic: "become-broker",
    creditLabel: "Florida broker pre-license",
    audience:
      "For experienced sales associates preparing for the Florida broker path.",
    outcomes: [
      "Complete the 72-hour broker pre-license curriculum",
      "Pass the end-of-course exam",
    ],
    included: [
      "72-hour Florida broker pre-license curriculum",
      "Quizzes and the end-of-course exam",
      "Certificate on completion",
    ],
    priceNote,
    formats: [
      fmt("sp", "self-paced", "Self-paced", "0033532", 299, enrollBroker72),
      fmt("live", "livestream", "Livestream", "0033536", 329, enrollBroker72),
      fmt("class", "classroom", "In person", "0033541", 349, enrollBroker72),
    ],
    published: true,
    featured: true,
  },
  {
    slug: "sales-post-license",
    title: "Sales Post-License, 45 hours",
    benefit: "Finish the required first-renewal post-license education for sales associates.",
    hoursLabel: "45 hours",
    categoryIds: ["florida-real-estate"],
    floridaTopic: "sales-post-license",
    creditLabel: "Florida sales associate post-license",
    audience:
      "For sales associates who must finish post-license education before the initial license expires.",
    outcomes: [
      "Complete the 45-hour post-license curriculum",
      "Meet the first-renewal education requirement",
    ],
    included: [
      "45-hour sales associate post-license curriculum",
      "Required before the first renewal expiration date",
      "Final exam and certificate on completion",
    ],
    priceNote,
    formats: [
      fmt("sp", "self-paced", "Self-paced", "0033528", 119, enroll45Hour),
      fmt("live", "livestream", "Livestream", "0033535", 179, enroll45Hour),
      fmt("class", "classroom", "In person", "0033540", 189, enroll45Hour),
    ],
    published: true,
    featured: true,
  },
  {
    slug: "continuing-education",
    title: "Continuing Education, 14 hours",
    benefit: "Complete later-renewal continuing education, including Core Law and Ethics hours.",
    hoursLabel: "14 hours",
    categoryIds: ["florida-real-estate"],
    floridaTopic: "continuing-education",
    creditLabel: "Florida continuing education",
    audience:
      "For licensees who finished post-license education and need a later renewal.",
    outcomes: [
      "Complete 14 hours of continuing education",
      "Cover Core Law, Ethics & Business Practices, and specialty credit",
    ],
    included: [
      "14-hour continuing education for later renewals",
      "Includes Core Law, Ethics & Business Practices, and specialty credit",
      "Final exam and certificate on completion",
      "Correspondence is a labeled delivery option for this course",
    ],
    priceNote,
    formats: [
      fmt("sp", "self-paced", "Self-paced", "0033533", 25, enroll14Hour),
      fmt(
        "corr",
        "correspondence",
        "Correspondence",
        "0033537",
        25,
        enroll14Hour,
      ),
      fmt("class", "classroom", "In person", "0033538", 99, enroll14Hour),
    ],
    published: true,
    featured: true,
  },
  {
    slug: "core-law",
    title: "Core Law, 3 hours",
    benefit: "Take the Core Law portion of continuing education on its own.",
    hoursLabel: "3 hours",
    categoryIds: ["florida-real-estate"],
    floridaTopic: "continuing-education",
    creditLabel: "Florida Core Law CE",
    audience: "For licensees who need Core Law hours as part of a renewal plan.",
    outcomes: ["Complete 3 hours of Core Law"],
    included: [
      "3 hours Core Law",
      "Self-paced online",
      "Final exam and certificate on completion",
    ],
    priceNote,
    formats: [
      fmt("sp", "self-paced", "Self-paced", "0033530", 15, enrollCoreLaw),
    ],
    published: true,
  },
  {
    slug: "ethics-business-practices",
    title: "Ethics & Business Practices, 3 hours",
    benefit: "Take the Ethics & Business Practices portion of continuing education on its own.",
    hoursLabel: "3 hours",
    categoryIds: ["florida-real-estate"],
    floridaTopic: "continuing-education",
    creditLabel: "Florida Ethics CE",
    audience:
      "For licensees who need Ethics and Business Practices hours as part of a renewal plan.",
    outcomes: ["Complete 3 hours of Ethics and Business Practices"],
    included: [
      "3 hours Ethics and Business Practices",
      "Self-paced online",
      "Final exam and certificate on completion",
    ],
    priceNote,
    formats: [
      fmt("sp", "self-paced", "Self-paced", "0033529", 15, enrollEthics),
    ],
    published: true,
  },
  {
    slug: "reactivation",
    title: "Reactivation, 28 hours",
    benefit: "Complete reactivation education when your Florida license status requires it.",
    hoursLabel: "28 hours",
    categoryIds: ["florida-real-estate"],
    floridaTopic: "reactivation",
    creditLabel: "Florida reactivation",
    audience:
      "For licensees whose Florida real estate license needs reactivation education. Confirm status with DBPR.",
    outcomes: ["Complete the 28-hour reactivation curriculum"],
    included: [
      "28-hour reactivation curriculum",
      "Law, ethics, and brokerage operations review",
      "Self-paced lessons and final exam",
    ],
    priceNote,
    formats: [
      fmt("sp", "self-paced", "Self-paced", "0033531", 69, enrollReactivation),
    ],
    published: true,
  },
  {
    slug: "broker-post-license-management",
    title: "Broker Post-License Management",
    benefit:
      "Complete the standalone 30-hour Management module for broker post-license education.",
    hoursLabel: "30 hours",
    categoryIds: ["florida-real-estate"],
    floridaTopic: "broker-post-license",
    creditLabel: "Broker post-license Management module",
    certificateNote:
      "Priced as a standalone 30-hour Management module. Not the full 60-hour broker post-license package. Confirm hours on the school’s approval letter.",
    audience:
      "For brokers who need the Management post-license module — not the full 60-hour package.",
    outcomes: ["Complete the standalone Management module"],
    included: [
      "Standalone 30-hour Management module",
      "Confirm hours against the school’s approval letter before you enroll",
    ],
    priceNote,
    formats: [
      // Partner shop slug is not live yet (CME 404). Route all formats through the school.
      fmt(
        "sp",
        "self-paced",
        "Self-paced",
        "0033542",
        99,
        enrollBrokerPostMgmt,
        false,
      ),
      fmt(
        "live",
        "livestream",
        "Livestream",
        "0033543",
        179,
        enrollBrokerPostMgmt,
        false,
      ),
      fmt(
        "class",
        "classroom",
        "In person",
        "0033544",
        199,
        enrollBrokerPostMgmt,
        false,
      ),
    ],
    published: true,
  },
];

/** Live sessions across categories. Empty until REIB supplies dates. */
export const upcomingSessions: {
  id: string;
  courseSlug: string;
  title: string;
  when: string;
  timeZone: string;
  formatLabel: string;
  priceLabel: string;
}[] = [];

export function getLearningCategory(slug: string) {
  return learningCategories.find((item) => item.slug === slug);
}

export function getCourse(slug: string) {
  return courses.find((course) => course.slug === slug && course.published);
}

export function coursesForCategory(categoryId: LearningCategoryId) {
  return courses.filter(
    (course) =>
      course.published && course.categoryIds.includes(categoryId),
  );
}

export function coursePriceLabel(course: Course) {
  const prices = course.formats.map((item) => item.priceCents);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  if (min === max) {
    return money(min);
  }
  return `From ${money(min)}`;
}

export function courseFormatLabels(course: Course) {
  return course.formats.map((item) => item.formatLabel).join(" · ");
}

export function defaultFormat(course: Course) {
  return course.formats[0];
}

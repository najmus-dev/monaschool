/**
 * Course catalog shaped to the Nov 10, 2026 REIB developer brief:
 * category → course → format. Florida Real Estate tuition from the fee schedule.
 * Professional Development specialty courses are listed from school submissions
 * (tuition and schedules publish as confirmed). International Business topics remain
 * listed for IA until confirmed titles move there.
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
export const partnerAccount = "https://classmadeeasy.com/student-dashboard/";

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
/** Placeholder enroll URL — PD specialty courses use Request Next Dates until CME/live. */
const enrollPendingContact = "/contact?interest=course-question";

const pdPriceNote =
  "Tuition will be published when the school confirms fees.";

function money(cents: number) {
  if (cents === 0) return "Contact for pricing";
  return `$${Math.round(cents / 100)}`;
}

function pendingPdFormats(): CourseFormatOption[] {
  return [
    fmt("sp", "self-paced", "Self-paced", undefined, 0, enrollPendingContact, false),
    fmt("live", "livestream", "Livestream", undefined, 0, enrollPendingContact, false),
    fmt("class", "classroom", "In person", undefined, 0, enrollPendingContact, false),
  ];
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
      "Specialty and professional skills for real estate practice—communication, sales, leadership, commercial foundations, and cross-border work. Formats include self-paced, livestream, and in person. Tuition and schedules publish as the school confirms them.",
    allowedFormats: ["self-paced", "livestream", "classroom"],
    topics: [
      { id: "communication", label: "Communication & Presentation" },
      { id: "sales-bd", label: "Sales & Business Development" },
      { id: "negotiation", label: "Negotiation" },
      { id: "leadership", label: "Leadership" },
      { id: "commercial", label: "Commercial & Brokerage" },
      { id: "cross-border", label: "Cross-border & Global Clients" },
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
  {
    slug: "the-voice-that-sells",
    title: "The Voice That Sells",
    benefit:
      "Make sure the person listening receives the message you intended—on the phone, in meetings, and in front of a group.",
    hoursLabel: "3 hours",
    categoryIds: ["professional-development"],
    topicTags: ["communication"],
    creditLabel: "Specialty CE",
    audience:
      "Florida sales associates, broker associates, and brokers who want to listen actively, choose clear words, use their voice purposefully, and check understanding in inquiry calls, client meetings, follow-ups, and public speaking.",
    outcomes: [
      "Distinguish what you intended to say from what the listener actually understood, and confirm meaning with an open question and paraphrase",
      "Rewrite ambiguous or pressuring real estate messages using clear, accurate, client-centered language",
      "Use tone, pace, pauses, emphasis, and volume deliberately, and repair a misunderstanding during a simulated phone call",
      "Deliver a two-minute real estate talk and answer a question with accurate information or an appropriate referral",
      "Evaluate your communication using observable behavior and listener feedback, then commit to one specific improvement",
    ],
    included: [
      "Readings and vocal demonstration practice for phone, meetings, and short talks",
      "Three application activities: message interpretation, same-words vocal comparison with call repair, and a two-minute talk",
      "Reception and communication feedback criteria",
      "Knowledge check with answer explanations",
    ],
    prerequisites: "Basic familiarity with a Florida real estate transaction.",
    priceNote: pdPriceNote,
    formats: pendingPdFormats(),
    published: true,
    featured: true,
  },
  {
    slug: "the-5-ws-of-selling",
    title: "The 5 W's of Selling",
    benefit:
      "Run structured buyer and seller consultations with Who, What, Where, Why, and When so recommendations rest on confirmed needs.",
    hoursLabel: "2 hours",
    categoryIds: ["professional-development"],
    topicTags: ["sales-bd"],
    creditLabel: "Specialty CE",
    audience:
      "Florida sales associates, broker associates, and brokers who want a repeatable consultation process before recommending properties, discussing listing strategy, or explaining brokerage services.",
    outcomes: [
      "Explain the purpose of each of the five W categories in a real estate consultation",
      "Write neutral, open-ended buyer and seller questions that separate requirements from preferences",
      "Use a listening sequence of ask, clarify, summarize, and confirm",
      "Complete a needs analysis that separates confirmed facts, client preferences, and items still needing verification",
      "Close a consultation with a confirmed summary and an agreed next step, responsible party, and follow-up time",
    ],
    included: [
      "Five W's question bank for buyers and sellers",
      "Neutral-language rewrite practice",
      "Needs analysis worksheet",
      "Buyer and seller role-play cases with feedback criteria",
      "Knowledge check with instructor key",
    ],
    prerequisites: "None required.",
    priceNote: pdPriceNote,
    formats: pendingPdFormats(),
    published: true,
    featured: true,
  },
  {
    slug: "leading-diverse-teams",
    title: "Leading Diverse Teams",
    benefit:
      "Make brokerage work more reliable with clear handoffs, responsible technology rollouts, and evidence-based coaching across a varied team.",
    hoursLabel: "3 hours",
    categoryIds: ["professional-development"],
    topicTags: ["leadership"],
    creditLabel: "Specialty CE",
    audience:
      "Florida brokers, broker associates, team leaders, and sales associates with coordination responsibilities who want to improve communication, technology adoption, and accountability in real estate workflows.",
    outcomes: [
      "Set a team communication agreement covering channel, acknowledgment, task ownership, timing, and escalation",
      "Repair a client or transaction handoff with an accurate record, confirmed recipient, and verified next action",
      "Design a limited technology-adoption pilot and review AI-assisted drafts before any client use",
      "Conduct a feedback conversation that describes evidence, invites explanation, and confirms a work standard",
      "Create a 30-day implementation plan with broker approval, responsibilities, training, and review dates",
    ],
    included: [
      "Fictional brokerage case with handoff, technology-pilot, and coaching scenarios",
      "Paired activities with worksheets and demonstrations",
      "Feedback criteria for coaching conversations",
      "Knowledge check with answers",
    ],
    prerequisites:
      "Basic understanding of brokerage roles, client service, and transaction stages.",
    priceNote: pdPriceNote,
    formats: pendingPdFormats(),
    published: true,
  },
  {
    slug: "presenting-across-cultures",
    title: "Presenting Across Cultures",
    benefit:
      "Shape buyer consultations, listing presentations, and property briefings around what each audience needs to decide—without sacrificing accuracy.",
    hoursLabel: "3 hours",
    categoryIds: ["professional-development"],
    topicTags: ["communication"],
    creditLabel: "Specialty CE",
    audience:
      "Florida sales associates, broker associates, and brokers who present to clients with differing expectations about credibility, evidence, relationships, and participation.",
    outcomes: [
      "Prepare an audience brief identifying the decision, participants, communication preferences, and information needs",
      "Design an opening and sequence that connect relevant credentials and services to the audience's stated needs",
      "Separate verified facts, estimates, opinions, examples, and unsupported promises in presentation material",
      "Adapt pace, examples, and visuals to audience feedback while keeping the facts constant and avoiding stereotypes",
      "Answer questions with bounded responses and close with a check for understanding and a voluntary next step",
    ],
    included: [
      "Guidance on cultural expectations as a starting point for inquiry—not nationality scripts",
      "Demonstration scripts and original fictional cases",
      "Paired presentation activities with worksheets",
      "Observable feedback criteria (no accent, appearance, or personality scoring)",
      "Knowledge check with answers",
    ],
    prerequisites:
      "Basic understanding of the roles and stages of a Florida real estate transaction.",
    priceNote: pdPriceNote,
    formats: pendingPdFormats(),
    published: true,
  },
  {
    slug: "negotiating-across-cultures",
    title: "Negotiating Across Cultures",
    benefit:
      "Adapt how you discuss offers, counteroffers, and deadlines to each client's decision style while keeping information accurate and the choice theirs.",
    hoursLabel: "3 hours",
    categoryIds: ["professional-development"],
    topicTags: ["negotiation"],
    creditLabel: "Specialty CE",
    audience:
      "Florida sales associates, broker associates, and brokers who want to recognize different negotiation expectations, discover individual client preferences, and adapt communication within clear transaction procedures.",
    outcomes: [
      "Distinguish an observed negotiation behavior from a cultural assumption and a verified client preference",
      "Run a discovery conversation covering priorities, communication preferences, decision participants, and timing",
      "Separate positions from underlying interests and explain offers or counteroffers with evidence and clear conditions",
      "Respond to silence, indirect answers, concession requests, and time pressure by checking meaning instead of assuming intent",
      "Clarify roles, confidentiality permissions, and decision authority when advisers, interpreters, or family are involved",
    ],
    included: [
      "Cases covering buyer discovery, seller counteroffer, inspection negotiation, and multiple decision participants",
      "Role cards and worksheets for paired activities",
      "Feedback criteria for negotiation practice",
      "Knowledge check with answers",
    ],
    prerequisites: "Basic understanding of the stages of a real estate transaction.",
    priceNote: pdPriceNote,
    formats: pendingPdFormats(),
    published: true,
    featured: true,
  },
  {
    slug: "introduction-to-commercial-real-estate",
    title: "Introduction to Commercial Real Estate",
    benefit:
      "Learn the questions, records, calculations, and professional coordination behind commercial property sales and leasing.",
    hoursLabel: "3 hours",
    categoryIds: ["professional-development"],
    topicTags: ["commercial"],
    creditLabel: "Specialty CE",
    audience:
      "Florida sales associates, broker associates, and brokers familiar with basic real estate practice who are beginning to explore commercial assignments.",
    outcomes: [
      "Distinguish major commercial property types and owner-user, investor, landlord, and tenant objectives",
      "Compare a lease quote by separating base rent, estimated additional charges, and unresolved obligations",
      "Calculate simplified effective gross income, NOI, an indicated cap rate, and an illustrative debt-service coverage ratio",
      "Explain why these calculations do not establish appraised value, lender approval, or investment suitability",
      "Prepare a due-diligence plan assigning use, physical, environmental, lease, financial, and legal questions to the right professionals",
    ],
    included: [
      "Fictional small commercial center and prospective business tenant case",
      "Lease-comparison worksheet",
      "Worked income and coverage calculations",
      "Due-diligence action plan exercise",
      "Knowledge check with answer explanations",
    ],
    prerequisites: "Familiarity with basic real estate practice.",
    priceNote: pdPriceNote,
    formats: pendingPdFormats(),
    published: true,
    featured: true,
  },
  {
    slug: "introduction-to-business-brokerage",
    title: "Introduction to Business Brokerage",
    benefit:
      "Understand what is actually being sold in a business sale, which information to request, and when specialist advice is required.",
    hoursLabel: "3 hours",
    categoryIds: ["professional-development"],
    topicTags: ["commercial"],
    creditLabel: "Specialty CE",
    audience:
      "Florida sales associates, broker associates, and brokers familiar with basic brokerage practice who want an introduction to brokering the sale of an operating business.",
    outcomes: [
      "Distinguish the sale of an operating business from a sale or lease of its premises, and define the transaction scope",
      "Develop a seller/buyer intake and a staged confidential-disclosure plan under broker supervision",
      "Distinguish revenue, accounting profit, and cash flow, and calculate a simplified illustrative SDE bridge",
      "Identify transferability and value factors without treating an asking price or a single multiple as a valuation",
      "Sequence a business-sale transaction and assign due-diligence questions, including international buyer issues, to the right professionals",
    ],
    included: [
      "Fictional Harbor Lane Café case file and financial case",
      "Activities covering sale and disclosure planning, earnings calculation, and a transaction action plan",
      "Worksheets and model answers",
      "Knowledge check with answer key",
    ],
    prerequisites: "Familiarity with basic brokerage practice.",
    priceNote: pdPriceNote,
    formats: pendingPdFormats(),
    published: true,
  },
  {
    slug: "from-trade-mission-to-real-estate-opportunity",
    title: "From Trade Mission to Real Estate Opportunity",
    benefit:
      "Turn trade-mission conversations into qualified, permission-based real estate next steps—or a well-supported decision not to pursue them.",
    hoursLabel: "3 hours",
    categoryIds: ["professional-development"],
    topicTags: ["cross-border"],
    creditLabel: "Specialty CE",
    audience:
      "Florida brokers, broker associates, and sales associates who want to evaluate missions, research participants, conduct purposeful discovery, and turn supported premises needs into appropriate next steps.",
    outcomes: [
      "Evaluate a mission's fit against a Florida real estate service objective, organizer terms, access, and budget",
      "Prepare a company brief and meeting plan that separate supplied facts, dated sources, and premises hypotheses",
      "Conduct discovery on premises, location, decision authority, timing, and funding, and record sharing permission",
      "Classify each contact by evidence as a potential assignment, relationship, adviser handoff, or hold/close item",
      "Build a 90-day roadmap with owners, dates, dependencies, and decision gates, measured separately from earned revenue",
    ],
    included: [
      "Mission preparation brief and meeting plan",
      "Discovery and permission record",
      "Prioritized 90-day roadmap template",
      "Fictional case with budget, activities, and worksheets",
      "Knowledge check with answers",
    ],
    prerequisites: "Basic understanding of brokerage roles and transaction stages.",
    priceNote: pdPriceNote,
    formats: pendingPdFormats(),
    published: true,
  },
  {
    slug: "geopolitics-and-real-estate-investment",
    title: "Geopolitics and Real Estate Investment",
    benefit:
      "Translate geopolitical, currency, and strategic-geography context into the right real estate questions for a client's market-entry decision.",
    hoursLabel: "3 hours",
    categoryIds: ["professional-development"],
    topicTags: ["cross-border"],
    creditLabel: "Specialty CE",
    audience:
      "Florida brokers, broker associates, and sales associates familiar with basic brokerage practice who want to investigate how geopolitical developments may affect a client's real estate investment or market-entry decision.",
    outcomes: [
      "Trace how geopolitical developments can affect real estate demand, financing, operating income, or exit conditions",
      "Calculate a simplified home-currency property outcome and identify currency, transfer, and evidence limits",
      "Interpret gateways, chokepoints, and route dependencies on teaching maps, recognizing map limitations",
      "Evaluate country and city evidence for relevance, date, and comparability",
      "Deliver a sourced client advisory brief with stated limits, professional referrals, and a concrete next action",
    ],
    included: [
      "Geographic teaching-map exercises",
      "Fictional client dossier",
      "Activities including a currency illustration",
      "Knowledge check with answers",
    ],
    prerequisites:
      "Familiarity with basic brokerage practice; no GIS or international investment experience required.",
    priceNote: pdPriceNote,
    formats: pendingPdFormats(),
    published: true,
  },
  {
    slug: "global-clients-local-business",
    title: "Global Clients, Local Business",
    benefit:
      "Serve international buyers with clear consultations, an understandable transaction map, and well-timed professional referrals—without cultural assumptions.",
    hoursLabel: "3 hours",
    categoryIds: ["professional-development"],
    topicTags: ["cross-border"],
    creditLabel: "Specialty CE",
    audience:
      "Florida sales associates, broker associates, and brokers who want to communicate effectively with international buyers, explain the purchase process, and coordinate competent, fair service within their professional role.",
    outcomes: [
      "Distinguish cultural tendencies from assumptions about an individual buyer",
      "Use consultation questions to establish buyer objectives, decision-makers, and communication preferences",
      "Explain the roles and major stages of a Florida purchase, and check understanding of deadlines across time zones",
      "Identify questions that need legal, tax, immigration, or financing referrals",
      "Develop a communication and referral plan for an international buyer while applying consistent, fair service",
    ],
    included: [
      "Observe-ask-confirm-adapt method",
      "Buyer consultation worksheet",
      "Deadline misunderstanding case",
      "Buyer service plan exercise",
      "Knowledge check with instructor answer guide",
    ],
    prerequisites: "Basic knowledge of a Florida purchase transaction.",
    priceNote: pdPriceNote,
    formats: pendingPdFormats(),
    published: true,
    featured: true,
  },
  {
    slug: "when-businesses-cross-borders",
    title: "When Businesses Cross Borders",
    benefit:
      "Identify and investigate the premises needs of companies entering or expanding in the United States—from business discovery to coordinated next steps.",
    hoursLabel: "3 hours",
    categoryIds: ["professional-development"],
    topicTags: ["cross-border"],
    creditLabel: "Specialty CE",
    audience:
      "Florida brokers, broker associates, and sales associates who want to connect a company's U.S. entry or expansion objectives to real estate service.",
    outcomes: [
      "Distinguish common business-entry models and the premises questions each creates",
      "Conduct discovery on current operations, phased requirements, decision participants, funding assumptions, and timing",
      "Compare proposed locations against verified operational requirements and calculate a limited first-year occupancy illustration",
      "Separate brokerage responsibilities from company, tax, immigration, funding, and technical matters, and prepare a permission-based handoff",
      "Create an action plan with owners, evidence, dependencies, review points, and escalation",
    ],
    included: [
      "Fictional foreign manufacturer case (first Florida distribution and sales operation)",
      "Premises proposal comparison practice",
      "Activities with worksheets",
      "Knowledge check with answers",
    ],
    prerequisites: "Basic understanding of brokerage practice and transaction stages.",
    priceNote: pdPriceNote,
    formats: pendingPdFormats(),
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
  const pending = course.formats.every(
    (item) => item.enrollReady === false && item.priceCents === 0,
  );
  if (pending) {
    return "Contact for pricing";
  }
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

/**
 * All public copy, prices, navigation, and enroll URLs live in this file.
 * Enroll URLs are Class Made Easy partner links (?school=40).
 * Prices and school contact facts may still be placeholders until the school confirms them.
 * Do not add a founding story, instructor names, or real student reviews here
 * until the school provides them.
 */

export type NavItem = {
  label: string;
  href: string;
};

export type ClassSession = {
  id: string;
  when: string;
  detail: string;
};

export type CourseCategory = "get-licensed" | "renew" | "prep";

export type Course = {
  slug: string;
  name: string;
  linkLabel: string;
  format: string;
  priceLabel: string;
  priceNote: string;
  summary: string;
  included: string[];
  audience: string;
  enrollUrl: string;
  category: CourseCategory;
  /** Shown in the home “Popular courses” grid. */
  featured?: boolean;
  sessions?: ClassSession[];
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type Review = {
  id: string;
  quote: string;
  detail: string;
};

const priceNote = "Current partner-site price. Confirm at checkout.";

const phoneDisplay = "(407) 555-0198";
const phoneTel = "+14075550198";
const email = "admissions@monaschool.com";
const schoolName = "Mona School";
const city = "Orlando";
const dbprSchoolLicense = "Pending approval";
const dbprProviderNumber = "Pending approval";

/** Class Made Easy partner school id from the partner dashboard. */
const partnerSchool = "40";
const partnerShop = (slug: string) =>
  `https://classmadeeasy.com/shop/${slug}/?school=${partnerSchool}`;

const enroll63Hour = partnerShop("63-hour-sales-associate-pre-license-course");
const enroll45Hour = partnerShop("45-hour-post-licensing-course");
const enroll14Hour = partnerShop("14-hour-continuing-education-course");
const partnerAccount = "https://classmadeeasy.com/my-account/";

export const courses: Course[] = [
  {
    slug: "63-hour-classroom",
    name: "63-hour pre-license, live classroom and Zoom",
    linkLabel: "Classroom and Zoom",
    format: "Live classroom and Zoom",
    priceLabel: "$189",
    priceNote,
    summary:
      `Live classroom and Zoom weeks in ${city} are scheduled by the school. Enroll opens the 63-hour partner course checkout used with this school.`,
    included: [
      "63-hour FREC I pre-license curriculum",
      `Ask the school about live classroom and Zoom weeks in ${city}`,
      "Partner checkout for course access, quizzes, and the end-of-course exam",
      "Six months of access on Class Made Easy after enrollment",
    ],
    audience: `For people who want a scheduled pre-license class, in a room in ${city} or on Zoom.`,
    enrollUrl: enroll63Hour,
    category: "get-licensed",
    featured: true,
    sessions: [
      {
        id: "placeholder-week",
        when: "Dates not set",
        detail:
          "Placeholder row. Replace it with a real classroom week. The same meetings are planned on Zoom.",
      },
    ],
  },
  {
    slug: "63-hour-online",
    name: "63-hour pre-license, self-paced online",
    linkLabel: "Self-paced online",
    format: "Self-paced online",
    priceLabel: "$189",
    priceNote,
    summary:
      "Florida-approved 63-hour sales associate pre-license course. Self-paced online with narration, quizzes, and the end-of-course exam on Class Made Easy.",
    included: [
      "63-hour FREC I pre-license curriculum",
      "Self-paced, narrated online lessons",
      "Section quizzes and a 100-question end-of-course exam",
      "Instant certificate download after completion",
      "Six months of access on Class Made Easy",
    ],
    audience:
      "For people who want to study for the sales associate pre-license course around work or family time.",
    enrollUrl: enroll63Hour,
    category: "get-licensed",
    featured: true,
  },
  {
    slug: "mutual-recognition",
    name: "Mutual recognition course",
    linkLabel: "Mutual recognition",
    format: "Self-paced online",
    priceLabel: "$75",
    priceNote,
    summary:
      "For licensed real estate professionals from a Florida mutual-recognition state. About 15–20 hours online, with Florida law modules and exam prep on Class Made Easy.",
    included: [
      "Florida law modules and practice exam",
      "Self-paced online delivery",
      "Six months of access on Class Made Easy",
    ],
    audience:
      "For licensed sales associates or brokers from a mutual-recognition state who need the Florida mutual-recognition course.",
    enrollUrl: partnerShop("mutual-recognition-course"),
    category: "get-licensed",
  },
  {
    slug: "broker-pre-license",
    name: "72-hour broker pre-license course",
    linkLabel: "72-hour broker pre-license",
    format: "Self-paced online",
    priceLabel: "$250",
    priceNote,
    summary:
      "Florida-approved 72-hour broker pre-license course. Self-paced online with quizzes and the end-of-course exam on Class Made Easy.",
    included: [
      "72-hour Florida broker pre-license curriculum",
      "Self-paced, narrated online lessons",
      "Quizzes and a 100-question end-of-course exam",
      "Instant certificate download after completion",
      "Six months of access on Class Made Easy",
    ],
    audience:
      "For experienced sales associates who are preparing for the Florida broker license path.",
    enrollUrl: partnerShop("72-hour-broker-pre-license-course"),
    category: "get-licensed",
  },
  {
    slug: "45-hour-post-license",
    name: "45-hour post-license, self-paced online",
    linkLabel: "45-hour post-license",
    format: "Self-paced online",
    priceLabel: "$149",
    priceNote,
    summary:
      "Required 45-hour sales associate post-license course for the first renewal. Self-paced online with case studies and the final exam on Class Made Easy.",
    included: [
      "45-hour sales associate post-license curriculum",
      "Self-paced, narrated online lessons",
      "100-question final exam on the partner site",
      "Instant certificate download after completion",
      "Six months of access on Class Made Easy",
    ],
    audience:
      "For sales associates who must finish post-license education before the expiration date on the initial license.",
    enrollUrl: enroll45Hour,
    category: "renew",
    featured: true,
  },
  {
    slug: "14-hour-continuing-education",
    name: "14-hour continuing education, self-paced online",
    linkLabel: "14-hour continuing education",
    format: "Self-paced online",
    priceLabel: "$30",
    priceNote,
    summary:
      "Required 14-hour continuing education for later renewals, including Core Law and Ethics & Business Practices. Self-paced online on Class Made Easy.",
    included: [
      "3 hours Core Law, 3 hours Ethics and Business Practices, and specialty credit",
      "Self-paced online lessons and a final exam",
      "Instant certificate download after completion",
      "Six months of access on Class Made Easy",
    ],
    audience:
      "For licensees who already finished post-license education and are due for a later renewal.",
    enrollUrl: enroll14Hour,
    category: "renew",
    featured: true,
  },
  {
    slug: "28-hour-reactivation",
    name: "28-hour Florida real estate reactivation",
    linkLabel: "28-hour reactivation",
    format: "Self-paced online",
    priceLabel: "$79",
    priceNote,
    summary:
      "Florida-approved 28-hour reactivation course for licensees whose license has been involuntarily inactive more than 12 months but less than 24 months. Confirm your status with DBPR.",
    included: [
      "28-hour reactivation curriculum",
      "Law, ethics, and brokerage operations review",
      "Self-paced online lessons and final exam",
      "Six months of access on Class Made Easy",
    ],
    audience:
      "For licensees whose Florida real estate license needs reactivation education.",
    enrollUrl: partnerShop("florida-real-estate-28-hour-reactivation"),
    category: "renew",
  },
  {
    slug: "3-hour-core-law",
    name: "3-hour Core Law",
    linkLabel: "3-hour Core Law",
    format: "Self-paced online",
    priceLabel: "$20",
    priceNote,
    summary:
      "Florida-approved 3-hour Core Law course for the Core Law portion of continuing education renewals.",
    included: [
      "3 hours Core Law",
      "Self-paced online on Class Made Easy",
      "Final exam and instant certificate download",
    ],
    audience:
      "For licensees who need the Core Law hours as part of a renewal plan.",
    enrollUrl: partnerShop("3-hour-core-law-course"),
    category: "renew",
  },
  {
    slug: "3-hour-ethics",
    name: "3-hour Ethics and Business Practices",
    linkLabel: "3-hour Ethics",
    format: "Self-paced online",
    priceLabel: "$20",
    priceNote,
    summary:
      "Florida-approved 3-hour Ethics & Business Practices course for that portion of continuing education renewals.",
    included: [
      "3 hours Ethics and Business Practices",
      "Self-paced online on Class Made Easy",
      "Final exam and instant certificate download",
    ],
    audience:
      "For licensees who need the Ethics and Business Practices hours as part of a renewal plan.",
    enrollUrl: partnerShop("3-hour-ethics-business-practices-course"),
    category: "renew",
  },
  {
    slug: "ultimate-exam-prep",
    name: "Ultimate Exam Prep Course",
    linkLabel: "Ultimate Exam Prep",
    format: "Self-paced online",
    priceLabel: "$49",
    priceNote,
    summary:
      "Supplemental exam prep with practice quizzes and timed practice exams. Not a substitute for a required hour course.",
    included: [
      "Practice quizzes and timed practice exams",
      "Answer explanations and performance tracking",
      "Six months of access on Class Made Easy",
    ],
    audience:
      "For students preparing for the Florida sales associate state exam after pre-license education.",
    enrollUrl: partnerShop("ultimate-exam-prep-course"),
    category: "prep",
  },
  {
    slug: "smart-pill-exam-prep",
    name: "Smart Pill Real Estate Exam Prep",
    linkLabel: "Smart Pill Exam Prep",
    format: "Self-paced online",
    priceLabel: "$69",
    priceNote,
    summary:
      "Supplemental exam prep with about 1,000 practice questions for sales associates and brokers. Not a required hour course.",
    included: [
      "About 1,000 practice questions with answers",
      "Generate practice exams on Class Made Easy",
      "Six months of access after checkout",
    ],
    audience:
      "For students who want an additional exam-prep option before the state exam.",
    enrollUrl: partnerShop("smart-pill-real-estate-exam-prep"),
    category: "prep",
  },
  {
    slug: "real-estate-flashcards",
    name: "Real Estate Flashcards",
    linkLabel: "Flashcards",
    format: "Study aid",
    priceLabel: "$29",
    priceNote,
    summary:
      "Online vocabulary flashcards for real estate terms and state-exam review. A study aid, not a required hour course.",
    included: [
      "Online flashcards on Class Made Easy",
      "Keyword review for course and exam study",
      "Six months of access after checkout",
    ],
    audience: "For students who want flashcards while reviewing course material.",
    enrollUrl: partnerShop("real-estate-flashcards"),
    category: "prep",
  },
];

export function getCourse(slug: string): Course | undefined {
  return courses.find((course) => course.slug === slug);
}

const headerCourse = getCourse("63-hour-online");

if (!headerCourse) {
  throw new Error("Header enroll slug must match a course in this file.");
}

export const site = {
  school: {
    name: schoolName,
    city,
    phoneDisplay,
    phoneTel,
    email,
    address: `1200 Orange Avenue, ${city}, FL 32801`,
    hours: "Mon–Fri, 9:00 a.m.–5:00 p.m. ET",
    dbprSchoolLicense,
    dbprProviderNumber,
    licenseLine: `DBPR school license: ${dbprSchoolLicense}. Course provider number: ${dbprProviderNumber}.`,
    description:
      "Florida real estate pre-license, post-license, continuing education, reactivation, and exam prep. Classroom, Zoom, and self-paced online. Enrollment opens on Class Made Easy.",
  },
  headerCta: {
    label: "Enroll",
    href: headerCourse.enrollUrl,
  },
  nav: [
    { label: "Courses", href: "/courses" },
    { label: "Licensing", href: "/license" },
    { label: "About", href: "/about" },
    { label: "Reviews", href: "/reviews" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ] satisfies NavItem[],
  legalNav: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ] satisfies NavItem[],
  ui: {
    skipToContent: "Skip to content",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    enroll: "Enroll",
    allCourses: "All courses",
    sessionsTitle: "Upcoming classes",
    sessionsNote:
      "Placeholder schedule. These rows are not published class dates.",
    studentLogin: "Student login",
    studentLoginHref: partnerAccount,
    sampleReview: "Review",
    sampleStudent: "Student",
    includedTitle: "What is included",
    audienceTitle: "Who it is for",
    footerContact: "Contact",
    footerExplore: "On this site",
    footerLegal: "Legal",
    trustLabel: "Approval status",
    seeCourses: "Browse courses",
    viewDetails: "Learn more",
    getLicensed: "Get your license",
    renewLicense: "Renew your license",
    sendMessage: "Send a message",
    openEmail: "Open email app",
    editMessage: "Edit message",
    licenseGuide: "License guide",
    allQuestions: "All questions",
    allReviews: "View all reviews",
    otherCourses: "Other courses",
    courseDetails: "Course details",
    loadingCourse: "Loading this course.",
    breadcrumb: "Breadcrumb",
    enrollNote:
      "Opens the Class Made Easy partner checkout for this school. Video, exam, and payment happen there.",
    priceIntro:
      "Prices shown match the Class Made Easy partner checkout for this school. Confirm the total before you pay.",
    emptyCourses: "No courses are listed yet.",
    emptyReviews: "No sample reviews are listed yet.",
    emptyFaq: "No questions are listed yet.",
    notFoundTitle: "That page is not on this site.",
    notFoundBody: "Try the course list or go back to the home page.",
    homeLink: "Home",
    errorTitle: "This page hit a problem.",
    errorBody: "Try again. If it keeps happening, call the school.",
    tryAgain: "Try again",
    form: {
      name: "Name",
      nameHint: "The name you want the school to use in a reply.",
      nameError: "Enter your name.",
      email: "Email",
      emailHint: "The address where the school can answer you.",
      emailError: "Enter an email address like name@example.com.",
      phone: "Phone",
      phoneHint: "Optional. Include it if you want a call back.",
      phoneError: "Enter a phone number, or leave this blank.",
      message: "Message",
      messageHint: "Say which course you are asking about.",
      messageError: "Enter a few words so the school knows what you need.",
      submit: "Prepare email",
      summary: "Check the highlighted fields.",
      readyTitle: "Email draft ready",
      readyBody:
        "Nothing is stored on this website. Open your email app to send the draft.",
      subject: `Question for ${schoolName}`,
    },
  },
  home: {
    metaTitle: "Florida real estate license courses",
    heroEyebrow: `${city}, Florida`,
    heroTitle: "Florida sales associate courses",
    heroBody:
      "Classroom and Zoom weeks, or self-paced online. Pre-license, post-license, and continuing education. Enroll opens on the partner site.",
    heroPrimary: "Browse courses",
    heroSecondary: "Licensing steps",
    heroImage: "/images/hero-open-home.jpg",
    heroImageAlt:
      "Bright open-concept living room and kitchen with floor-to-ceiling glass and a wood accent wall.",
    heroFeatures: [
      {
        title: "Classroom",
        body: `Live FREC I weeks in ${city}, with matching Zoom seats.`,
      },
      {
        title: "Zoom",
        body: "Join the live class from home on the same schedule.",
      },
      {
        title: "Online",
        body: "Self-paced video, quizzes, and the end-of-course exam.",
      },
    ],
    pathEyebrow: "Real estate paths",
    pathTitle: "Get or renew your Florida license",
    pathLede:
      "Pre-license for new sales associates. Post-license and continuing education when it is time to renew.",
    paths: [
      {
        eyebrow: "Pre-license",
        title: "Earn your Florida real estate license",
        body: "Take the required 63-hour sales associate course—classroom and Zoom, or self-paced online.",
        details: [
          "Classroom instruction",
          "Live Zoom classes",
          "Self-paced online",
        ],
        href: "/courses#get-licensed",
        cta: "Get your license",
        visual: "image" as const,
        image: "/images/path-earn-home.jpg",
        imageAlt: "Contemporary two-story home with a landscaped front yard.",
      },
      {
        eyebrow: "Renewal",
        title: "Renew your license the easy way",
        body: "Finish the 45-hour post-license course, or the 14-hour continuing education course for later renewals.",
        details: ["45-hour post-license", "14-hour continuing education"],
        href: "/courses#renew",
        cta: "Renew your license",
        visual: "image" as const,
        image: "/images/path-renew-study.jpg",
        imageAlt: "Adult student studying course materials at a desk.",
      },
    ],
    trust:
      "Built to FREC hour rules. DBPR reporting starts after this school is approved.",
    coursesEyebrow: "Course catalog",
    coursesTitle: "Popular courses",
    coursesLede:
      "Compare format, price, and what is included. Enroll opens on the partner site.",
    chooserEyebrow: "Find your course",
    chooserTitle: "Which stage are you at?",
    chooserLede:
      "Your license status determines which Florida real estate education course you need. Choose the situation that applies to you.",
    chooser: [
      {
        status: "No license yet",
        title: "Get your real estate license",
        body: "Take the required 63-hour Florida pre-license course. Pick classroom and Zoom, or self-paced online.",
        courseSlugs: ["63-hour-classroom", "63-hour-online"],
      },
      {
        status: "First renewal",
        title: "Finish post-license education",
        body: "Complete the required 45-hour post-license course before the expiration date on your initial license.",
        courseSlugs: ["45-hour-post-license"],
      },
      {
        status: "Later renewals",
        title: "Complete continuing education",
        body: "After post-license, take the required 14-hour continuing education course for later renewals.",
        courseSlugs: ["14-hour-continuing-education"],
      },
    ],
    stepsEyebrow: "Licensing path",
    stepsTitle: "From the course to an active license",
    stepsLede:
      "The school course is the first part. DBPR issues the license after you apply and pass the state exam.",
    steps: [
      {
        label: "Step 1",
        title: "Finish the 63-hour course",
        body: "Complete a FREC I pre-license course and its end-of-course exam. The completion slip is valid for two years.",
      },
      {
        label: "Step 2",
        title: "Apply and pass the state exam",
        body: "Submit the DBPR application, get fingerprinted, and pass the Pearson VUE sales associate exam.",
      },
      {
        label: "Step 3",
        title: "Activate, then renew",
        body: "A broker activates your license. Finish the 45-hour post-license course before your first expiration date.",
      },
    ],
    reviewsEyebrow: "Testimonials",
    reviewsTitle: "What our students say",
    reviewsLede:
      "Placeholder quotes for layout. Replace with approved student feedback when available.",
    questionsEyebrow: "FAQ",
    questionsTitle: "Before you enroll",
    questionsLede:
      "Formats, renewals, and what this site handles. The full FAQ has the longer answers.",
    contactEyebrow: "Contact",
    contactTitle: "Talk with the school",
    contactLede:
      "Ask about classroom weeks, online pacing, or which renewal course you need. Video, exams, and payment stay on the partner site.",
  },
  coursesPage: {
    title: "Florida real estate courses",
    lede: "Pre-license, renewal, reactivation, and exam prep. Classroom, Zoom, or self-paced online. Checkout opens on Class Made Easy with this school's partner links.",
    getTitle: "Get your license",
    getLede:
      "Sales associate and broker pre-license paths, plus mutual recognition when that DBPR route applies.",
    renewTitle: "Renew or reactivate",
    renewLede:
      "Post-licensing, continuing education, reactivation, and standalone Core Law or Ethics hours.",
    prepTitle: "Exam prep and study aids",
    prepLede:
      "Optional exam prep and study tools on the partner site. These do not replace required hour courses.",
  },
  reviews: {
    title: "What students say",
    lede: "Sample quotes for page layout only. They are not feedback from real Mona School students.",
    note: "These quotes are placeholders for design. Replace them when the school has reviews it is allowed to publish.",
    homeCount: 3,
    items: [
      {
        id: "sample-online",
        quote:
          "I could pause the video and replay a section after work. The chapter order was easy to follow.",
        detail: "63-hour online",
      },
      {
        id: "sample-classroom",
        quote:
          "A set classroom week was what I needed. Hearing the lesson again on Zoom helped it stick.",
        detail: "63-hour classroom",
      },
      {
        id: "sample-post",
        quote:
          "I finished the 45-hour course in the evenings, before my first renewal date.",
        detail: "45-hour post-license",
      },
      {
        id: "sample-ce",
        quote:
          "The 14-hour course listed the Core Law hours and the ethics hours up front.",
        detail: "14-hour continuing education",
      },
    ] satisfies Review[],
  },
  about: {
    title: "About",
    lede: `${schoolName} offers Florida sales associate education in ${city}—classroom, Zoom, and self-paced online.`,
    note: "Placeholder school story. Replace this page with the school's own description. Do not add a founding story, instructor names, or student results until the school provides them.",
    paragraphs: [
      `${schoolName} is preparing to offer Florida sales associate courses for students in ${city}. The catalog covers the 63-hour pre-license course, the 45-hour post-license course, and the 14-hour continuing education course.`,
      "Live classes are planned as classroom and Zoom. Online classes are self-paced narrated video on the partner platform. License numbers will be posted in the footer when DBPR issues them.",
    ],
    whyTitle: `Why ${schoolName}?`,
    whyLede:
      "Clear Florida hour paths, three study formats, and enrollment that opens on the partner course site.",
    why: [
      {
        title: "Classroom, Zoom, or online",
        body: "Take the 63-hour course on a set schedule in the room or on Zoom, or study self-paced video when work hours vary.",
      },
      {
        title: "License and renewal paths",
        body: "Pre-license, 45-hour post-license, and 14-hour continuing education are listed with the hours Florida requires.",
      },
      {
        title: "No hidden checkout here",
        body: "This site explains courses and prices. Video, exams, and payment stay on the partner site after you choose Enroll.",
      },
      {
        title: "Straight licensing guide",
        body: "A plain walkthrough of DBPR steps—application, fingerprints, state exam, and broker activation—without legal advice claims.",
      },
      {
        title: "Local contact in Orlando",
        body: `Call ${phoneDisplay} or email ${email} before you pick a format or renewal course.`,
      },
      {
        title: "Approval status in the open",
        body: `DBPR school license and provider numbers stay visible in the footer while status is ${dbprSchoolLicense.toLowerCase()}.`,
      },
    ],
    facts: [
      { label: "City", value: city },
      { label: "Phone", value: phoneDisplay },
      { label: "Email", value: email },
      { label: "DBPR school license", value: dbprSchoolLicense },
      { label: "Course provider number", value: dbprProviderNumber },
    ],
  },
  license: {
    title: "How to get a Florida real estate license",
    lede: "The usual path to a Florida sales associate license, and which course on this site fits each part.",
    disclaimer:
      "This page summarizes public DBPR and Florida Real Estate Commission requirements. It is not legal advice. Fees, forms, and exam rules change. Read the current DBPR checklist before you apply.",
    image: "/images/license-desk.jpg",
    imageAlt: "Documents and a laptop on a desk during license paperwork.",
    timing: {
      title: "How long it takes",
      body: "The 63-hour course comes first. DBPR then reviews the application, you take the state exam, and a broker activates the license. A pre-license completion slip is valid for two years.",
    },
    start: {
      title: "How to start",
      body: "Choose the 63-hour pre-license course. Take it on a set classroom and Zoom schedule, or as self-paced video. Enrollment, the lessons, and the end-of-course exam open on the partner site.",
    },
    requirementsTitle: "Before you apply",
    requirements: [
      { label: "Age", text: "You must be at least 18." },
      {
        label: "Education",
        text: "You need a high school diploma or the equivalent.",
      },
      {
        label: "Identification",
        text: "DBPR requires a Social Security number on the application.",
      },
    ],
    stages: [
      {
        title: "Finish the 63-hour pre-license course",
        body: "Pass a FREC I sales associate pre-license course of 63 hours, including the end-of-course exam. The completion slip is valid for two years, and you need a current slip to sit for the state exam. A four-year degree in real estate may qualify for an exemption. Confirm that with DBPR before you skip the course.",
        courseSlugs: ["63-hour-classroom", "63-hour-online"],
      },
      {
        title: "Apply to DBPR and submit fingerprints",
        body: "Submit the sales associate application and fee to the Department of Business and Professional Regulation. After you apply, get fingerprinted through a Livescan provider. DBPR asks that the application come before the fingerprints. Results can take several days.",
        courseSlugs: [],
      },
      {
        title: "Pass the state exam",
        body: "When DBPR approves the application, schedule the Florida sales associate exam with Pearson VUE. That exam is separate from the end-of-course exam in the pre-license course. Use the current Candidate Information Booklet for the passing score, identification rules, and what you may bring.",
        courseSlugs: [],
      },
      {
        title: "Have a broker activate the license",
        body: "Passing the state exam does not put you to work on your own. DBPR issues the license, and it stays inactive until a licensed broker activates it. This school does not activate licenses.",
        courseSlugs: [],
      },
      {
        title: "Finish 45-hour post-license education",
        body: "Before the expiration date on your initial license, finish a 45-hour sales associate post-license course. If you miss that deadline, the license can become null and void. DBPR describes a four-year real estate degree as an exemption.",
        courseSlugs: ["45-hour-post-license"],
      },
      {
        title: "Take 14-hour continuing education later",
        body: "Each later renewal period requires 14 hours: 3 hours of Core Law, 3 hours of Ethics and Business Practices, and 8 hours of specialty education. An active member of the Florida Bar in good standing may be exempt. Tell DBPR if that applies to you.",
        courseSlugs: [
          "14-hour-continuing-education",
          "3-hour-core-law",
          "3-hour-ethics",
        ],
      },
    ],
    notes: [
      "If you hold an active real estate license in another state, read the DBPR mutual recognition rules before you enroll in the 63-hour course. Some applicants take a Florida law exam instead.",
      "Broker licensing has its own pre-license and post-license hour rules. Use the broker pre-license course in this catalog when that path applies, and confirm current DBPR requirements before you enroll.",
    ],
    sourcesTitle: "Official pages",
    sources: [
      {
        label: "DBPR sales associate license checklist",
        href: "https://www.myfloridalicense.com/CheckListDetail.asp?XACT_DEFN_ID=744&clientCode=2501&xactCode=1010",
      },
      {
        label: "Florida Real Estate Commission",
        href: "https://www2.myfloridalicense.com/real-estate-commission/",
      },
    ],
  },
  faq: {
    title: "FAQ",
    lede: "Straight answers about where class happens, which course to take, and what this school can report.",
    homeCount: 5,
    items: [
      {
        question: "Where do the videos, exams, and payment happen?",
        answer:
          "On the partner course site. Every Enroll button leaves this website. This site does not play video, score exams, or take payment.",
      },
      {
        question: "Which 63-hour option should I pick?",
        answer:
          "Choose live classroom and Zoom if you want a set schedule. Choose self-paced online if you need to study around work. Both are 63-hour pre-license courses. You still take the state exam after the course.",
      },
      {
        question: "I have a new sales associate license. Which course is for the first renewal?",
        answer:
          "The 45-hour post-license course. Finish it before the expiration date on your initial license. Missing that deadline can make the license null and void.",
      },
      {
        question: "I have renewed before. What do I take now?",
        answer:
          "The 14-hour continuing education course: 3 hours Core Law, 3 hours Ethics and Business Practices, and 8 hours of specialty education.",
      },
      {
        question: "Can the school report my completion to DBPR today?",
        answer: `Not yet. The DBPR school license and course provider number are ${dbprSchoolLicense.toLowerCase()}. Reporting starts after approval. Check the license line in the footer before you rely on a completion being reported.`,
      },
      {
        question: "How long is a pre-license completion slip good for?",
        answer:
          "Two years from the date you complete the 63-hour course. An expired slip is not accepted at the state exam.",
      },
      {
        question: "Does finishing the course give me a license?",
        answer:
          "No. You still apply to DBPR, submit fingerprints, pass the state exam, and have a broker activate the license.",
      },
      {
        question: "How do I ask the school a question?",
        answer: `Call ${phoneDisplay} or email ${email}. The contact form does not store messages. It opens an email draft in your own email app.`,
      },
    ] satisfies FaqItem[],
  },
  contact: {
    title: "Contact",
    lede: `Call, email, or open a draft in your email app. ${schoolName} does not take course payment on this site.`,
    accessTitle: "Course access",
    accessBody:
      "Video, exams, and payment stay on the partner site. Use Enroll on the course you want. This form only prepares an email to the school.",
  },
  privacy: {
    title: "Privacy",
    lede: "A short placeholder. Have it reviewed before the site launches.",
    note: "Placeholder policy. Replace this page with text the school's counsel has reviewed.",
    sections: [
      {
        heading: "What this site is",
        body: "These pages describe courses and link out for enrollment. There are no student accounts, no video player, and no checkout on this website.",
      },
      {
        heading: "What this site does not collect",
        body: "This site does not ask you to create a password, does not take card numbers, and does not store course progress.",
      },
      {
        heading: "Contact messages",
        body: "The contact form does not submit to a server here. It opens your email application with a draft. Your email provider then handles delivery.",
      },
      {
        heading: "Partner site",
        body: "Enroll and student login open Class Made Easy pages for this school. That site has its own privacy policy for video, exams, accounts, and payment.",
      },
    ],
  },
  terms: {
    title: "Terms",
    lede: "A short placeholder. Have it reviewed before the site launches.",
    note: "Placeholder terms. Replace this page with text the school's counsel has reviewed.",
    sections: [
      {
        heading: "Informational pages",
        body: "This website describes Florida sales associate courses. It does not sell the course. The enrollment agreement, if you buy one, is formed on the partner site.",
      },
      {
        heading: "Prices and links",
        body: "Enroll links open Class Made Easy with this school's partner id. Listed prices mirror that checkout and can change; confirm the total before you pay.",
      },
      {
        heading: "Approval status",
        body: `The DBPR school license and course provider number are ${dbprSchoolLicense.toLowerCase()}. Course descriptions follow the public hour requirements. They are not a promise that DBPR has approved this school.`,
      },
      {
        heading: "No exam or license promise",
        body: "Finishing a course does not guarantee that you will pass the state exam or receive a license. Licensing decisions belong to DBPR.",
      },
    ],
  },
  courses,
};

export type ChooserOption = (typeof site.home.chooser)[number];

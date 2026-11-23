/**
 * All public copy, navigation, and school facts live in this file.
 * Course catalog (category → course → format) lives in content/catalog.ts
 * per the Nov 10, 2026 REIB developer brief and fee schedule.
 * Do not invent PD/IB courses, instructor bios, or live dates until REIB supplies them.
 */

import {
  courses,
  learningCategories,
  partnerAccount,
  upcomingSessions,
} from "@/content/catalog";

export type {
  Course,
  CourseFormatOption,
  DeliveryFormat,
  FloridaTopicId,
  LearningCategory,
  LearningCategoryId,
} from "@/content/catalog";

export {
  courseFormatLabels,
  coursePriceLabel,
  courses,
  coursesForCategory,
  defaultFormat,
  getCourse,
  getLearningCategory,
  learningCategories,
  upcomingSessions,
} from "@/content/catalog";

export type NavItem = {
  label: string;
  href: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type Review = {
  id: string;
  quote: string;
  detail: string;
  name?: string;
  avatarSrc?: string;
};

const phoneDisplay = "(407) 574-5920";
const phoneTel = "+14075745920";
/** Empty until the school provides a public inbox. Do not show placeholder emails. */
const email = "";
const schoolName = "Real Estate & International Business Institute";
const schoolShortName = "REIB Institute";
const city = "Orlando";
const logoSrc = "/institute-logos/REIB_Formal_Institutional_Logo.png";
const logoAlt = "REIB Institute — Real Estate & International Business Institute";
const tagline = "Where Education Opens Markets.";
const credentialsLine =
  "A Florida licensed school. Accredited international business institute.";
const equalOpportunityLine = "Equal opportunity employer.";

export const site = {
  school: {
    name: schoolName,
    shortName: schoolShortName,
    tagline,
    city,
    phoneDisplay,
    phoneTel,
    email,
    logoSrc,
    logoAlt,
    address: `${city}, FL`,
    hours: "Mon–Fri, 9:00 a.m.–5:00 p.m. ET",
    credentialsLine,
    equalOpportunityLine,
    licenseLine: `${credentialsLine} ${equalOpportunityLine}`,
    description:
      "Real estate education, professional development, and international business learning. Florida licensing courses plus specialty business development programs.",
  },
  courses,
  learningCategories,
  upcomingSessions,
  headerCta: {
    label: "Florida Real Estate",
    href: "/florida-real-estate",
  },
  nav: [
    { label: "Florida Real Estate", href: "/florida-real-estate" },
    { label: "Professional Development", href: "/professional-development" },
    { label: "International Business", href: "/international-business" },
    { label: "About", href: "/about" },
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
    enroll: "Enroll Now",
    register: "Register",
    requestDates: "Request Next Dates",
    viewCourse: "View Course",
    allCourses: "Browse Florida courses",
    sessionsTitle: "Upcoming live classes",
    sessionsNote:
      "Live dates appear here when the school publishes them. No Coming soon labels.",
    studentLogin: "Student Login",
    studentLoginHref: partnerAccount,
    formatLabel: "Format",
    chooseFormat: "Choose format",
    fromPrice: "From",
    groupTraining: "Request Group Training",
    learnWithReib: "Learn with REIB Institute",
    orgTrainingTitle: "Training for organizations",
    orgTrainingBody:
      "Brokerages, companies, and professional groups can request tailored sessions.",
    emptyCategoryCourses:
      "No course pages are listed here yet. REIB Institute will publish classes once descriptions, instructors, dates, and fees are confirmed—without placeholder or Coming soon listings.",
    topicsLabel: "Topics",
    filterAll: "All topics",
    filterFormatAll: "All formats",
    sampleReview: "Review",
    sampleStudent: "Student",
    includedTitle: "What is included",
    audienceTitle: "Who it is for",
    footerContact: "Contact",
    footerExplore: "On this site",
    footerLegal: "Legal",
    trustLabel: "The institute",
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
      "Tuition matches the school fee schedule (revised Nov 10, 2026). Confirm the total and format before you pay.",
    courseNumberLabel: "Course number",
    tuitionLabel: "School tuition",
    emptyCourses: "No courses are listed yet.",
    emptyFilterCourses: "No courses match these filters. Clear a filter and try again.",
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
      submit: "Prepare message",
      summary: "Check the highlighted fields.",
      readyTitle: "Message ready",
      readyBody: email
        ? "Nothing is stored on this website. Open your email app to send the draft."
        : `Nothing is stored on this website. Call the office at ${phoneDisplay} with these details.`,
      subject: `Question for ${schoolName}`,
      interest: "I am interested in",
      interestHint: "Pick the closest option so the school can route your note.",
      interestError: "Choose an interest.",
      interestOptions: [
        { value: "course-question", label: "Course Question" },
        { value: "group-training", label: "Group Training" },
        {
          value: "teaching-partnership",
          label: "Instructor application / teaching",
        },
        { value: "other", label: "Other" },
      ],
      organization: "Organization name",
      organizationHint: "Required for group training requests.",
      organizationError: "Enter the organization name.",
      groupSize: "Approximate group size",
      groupSizeHint: "Optional. A range is fine.",
      teachingFocus: "Primary teaching focus",
      teachingFocusError: "Choose a teaching focus.",
      teachingFocusOptions: [
        { value: "florida-real-estate", label: "Florida Real Estate" },
        {
          value: "professional-development",
          label: "Professional Development",
        },
        { value: "international-business", label: "International Business" },
        { value: "multiple", label: "More than one area" },
      ],
      teachingExperience: "Years of teaching or industry experience",
      teachingExperienceError: "Share your relevant experience.",
      teachingCredentials: "Licenses or credentials",
      teachingCredentialsHint:
        "Example: Florida real estate license, broker, industry certifications.",
      teachingCredentialsError:
        "List at least one credential or write Not applicable.",
      teachingProfile: "LinkedIn or portfolio URL",
      teachingProfileHint: "Optional.",
    },
  },
  home: {
    metaTitle: "Where Education Opens Markets",
    heroBadge: schoolShortName,
    heroEyebrow: tagline,
    heroTitle: "Build your career. Expand your business.",
    heroBody:
      "Real estate education, professional development and international business learning.",
    heroPrimary: "Explore Florida Real Estate",
    heroSecondary: "About us",
    heroImage: "/images/hero-banner.jpg",
    heroImageAlt:
      "Adult learners in a classroom taking notes and working on laptops.",
    categoriesEyebrow: "Three clear ways to learn",
    categoriesTitle: "Choose your path",
    categoriesLede:
      "Florida real estate stays easy to find. Professional development and international business stay clearly visible.",
    upcomingEyebrow: "Schedule",
    upcomingTitle: "Upcoming live classes",
    upcomingEmpty: "No live sessions are scheduled yet. Request dates for the course you need.",
    learnEyebrow: "The institute",
    learnTitle: "Learn with REIB Institute",
    learnBody:
      "Practical education for careers and businesses — Florida licensing when you need it, and specialty business development as programs are confirmed.",
    learnCta: "About the institute",
    orgEyebrow: "Groups",
    orgTitle: "Training for organizations",
    orgBody:
      "Brokerages, companies, and professional groups can request tailored livestream or in-person sessions.",
    orgCta: "Request Group Training",
    contactEyebrow: "Contact",
    contactTitle: "Talk with the school",
    contactLede:
      "Ask about a course, format, or group training. Video, exams, and payment for published courses open on the partner site.",
  },
  coursesPage: {
    title: "Florida real estate courses",
    lede: "Pre-license, post-license, continuing education, reactivation, and broker courses. Classroom, livestream, correspondence, or self-paced. Tuition from the school fee schedule. Checkout opens on Class Made Easy.",
    getTitle: "Get your license",
    getLede:
      "Sales associate 63-hour and broker 72-hour pre-license courses in classroom, livestream, or self-paced formats.",
    renewTitle: "Renew or reactivate",
    renewLede:
      "Sales post-license, continuing education, reactivation, Core Law, Ethics, and broker post-license Management.",
    prepTitle: "Exam prep and study aids",
    prepLede:
      "Optional exam prep and study tools. These do not replace required hour courses.",
  },
  reviews: {
    title: "What students say",
    lede: "Sample quotes for page layout only. They are not feedback from real REIB Institute students.",
    note: "These quotes are placeholders for design. Replace them when the school has reviews it is allowed to publish.",
    homeCount: 4,
    items: [
      {
        id: "sample-online",
        name: "Alex",
        quote:
          "I could pause the video and replay a section after work. The chapter order was easy to follow.",
        detail: "63-hour online",
        avatarSrc: "/images/classroom.jpg",
      },
      {
        id: "sample-classroom",
        name: "Jordan",
        quote:
          "A set classroom week was what I needed. Hearing the lesson again in the livestream section helped it stick.",
        detail: "63-hour classroom",
        avatarSrc: "/images/hero-study.jpg",
      },
      {
        id: "sample-post",
        name: "Sam",
        quote:
          "I finished the 45-hour course in the evenings, before my first renewal date.",
        detail: "45-hour post-license",
        avatarSrc: "/images/notebook.jpg",
      },
      {
        id: "sample-ce",
        name: "Riley",
        quote:
          "The 14-hour course listed the Core Law hours and the ethics hours up front.",
        detail: "14-hour continuing education",
        avatarSrc: "/images/bright-office.jpg",
      },
    ] satisfies Review[],
  },
  about: {
    title: "About us",
    heroTitle: "Where education opens markets",
    lede: `Florida real estate education in ${city}—with paths for licensing, renewal, and specialty learning.`,
    heroImage: "/images/classroom.jpg",
    heroImageAlt: "Adult learners in a classroom session",
    note: "Placeholder school story. Replace this page with the school's own description. Do not add a founding story, instructor names, or student results until the school provides them.",
    paragraphs: [
      `${schoolName} offers Florida sales associate and broker education for students in ${city}, along with specialty professional development and international business learning. The catalog follows the school fee schedule for pre-license, post-license, continuing education, reactivation, and broker Management.`,
      "Formats include classroom, livestream, correspondence, and self-paced. REIB Institute is a Florida licensed school and an accredited international business institute.",
    ],
    introLabel: "The institute",
    introTitle: "Clear paths for every stage",
    introBody:
      "REIB Institute focuses on practical Florida real estate education—published hour courses, flexible formats, and enrollment that opens on the partner site when you are ready.",
    introImage: "/images/bright-office.jpg",
    introImageAlt: "Professionals collaborating in a bright office",
    highlights: [
      {
        value: "63",
        label: "Hour sales associate pre-license course",
      },
      {
        value: "45",
        label: "Hour post-license path after licensing",
      },
      {
        value: "14",
        label: "Hour continuing education for renewals",
      },
    ],
    whyTitle: "Why students choose REIB Institute",
    whyLede:
      "Clear Florida hour paths, multiple study formats, and enrollment that opens on the partner course site.",
    valuesLabel: "Our approach",
    valuesTitle: "Education that supports every stage",
    why: [
      {
        title: "Flexible formats",
        body: "Take the 63-hour course in a classroom, on livestream, or as self-paced study when work hours vary. Correspondence is also available for 14-hour CE.",
      },
      {
        title: "License and renewal paths",
        body: "Pre-license, 45-hour post-license, 14-hour continuing education, reactivation, and broker courses — open a course page to see tuition by format.",
      },
      {
        title: "Transparent enrollment",
        body: "This site explains courses and prices. Video, exams, and payment stay on the partner site after you choose Enroll.",
      },
      {
        title: "Straight licensing guide",
        body: "A plain walkthrough of DBPR steps—application, fingerprints, state exam, and broker activation—without legal advice claims.",
      },
      {
        title: "Local contact in Orlando",
        body: `Call the office at ${phoneDisplay} before you pick a format or renewal course.`,
      },
      {
        title: "Licensed and accredited",
        body: "A Florida licensed school and an accredited international business institute—with equal opportunity employment.",
      },
    ],
    facts: [
      { label: "City", value: city },
      { label: "Office phone", value: phoneDisplay },
      { label: "School", value: "Florida licensed" },
      { label: "Institute", value: "Accredited international business" },
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
      body: "Choose the 63-hour pre-license course. Take it in classroom, livestream, or self-paced format. Enrollment, lessons, and the end-of-course exam open on the partner site.",
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
        courseSlugs: ["sales-pre-license"],
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
        courseSlugs: ["sales-post-license"],
      },
      {
        title: "Take 14-hour continuing education later",
        body: "Each later renewal period requires 14 hours: 3 hours of Core Law, 3 hours of Ethics and Business Practices, and 8 hours of specialty education. An active member of the Florida Bar in good standing may be exempt. Tell DBPR if that applies to you.",
        courseSlugs: [
          "continuing-education",
          "core-law",
          "ethics-business-practices",
        ],
      },
    ],
    notes: [
      "If you hold an active real estate license in another state, read the DBPR mutual recognition rules before you enroll in the 63-hour course. Some applicants take a Florida law exam instead.",
      "Broker licensing has its own pre-license and post-license hour rules. Use the 72-hour broker pre-license courses in this catalog when that path applies. Broker Post-License Management is listed as a standalone 30-hour module, not the full 60-hour package.",
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
    title: "Frequently asked questions",
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
          "Choose classroom or livestream if you want a set schedule. Choose self-paced if you need to study around work. All three are 63-hour sales associate pre-license courses. You still take the state exam after the course.",
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
        question: "Can the school report my completion to DBPR?",
        answer:
          "Ask the office which courses this school can report for your license cycle. Call or use the contact form if you need confirmation for a specific course.",
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
        answer: `Call the office at ${phoneDisplay}. You can also use the contact form on this site to prepare your details, then call with your question.`,
      },
    ] satisfies FaqItem[],
  },
  contact: {
    title: "Contact",
    label: "Contact us",
    heading: "General enquiry",
    lede: "To help us direct your enquiry, please select a type below and share a few details.",
    reachTitle: "Reach us",
    reachLede: "Call the office for course questions, formats, and next steps.",
    accessTitle: "Course access",
    accessBody:
      "Video, exams, and payment stay on the partner site. Use Enroll on the course you want. For questions, call the office number on this site.",
  },
  instructorsApply: {
    title: "Become an instructor",
    label: "Instructor applications",
    heading: "Become an instructor",
    lede: "Apply to teach Florida real estate, professional development, or international business with REIB Institute. Share your focus, experience, and credentials—the school reviews applications and follows up when there is a fit.",
    breadcrumb: "Become an instructor",
  },
  privacy: {
    title: "Privacy policy",
    lede: "How this marketing site handles information while you browse courses and contact the school.",
    note: "Placeholder policy for layout. Replace this page with text the school's counsel has reviewed before launch.",
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
        body: "The contact form does not submit to a server here. Use it to organize your details, then call the school office. A public email address will be added when the school provides one.",
      },
      {
        heading: "Partner site",
        body: "Enroll and student login open Class Made Easy pages for this school. That site has its own privacy policy for video, exams, accounts, and payment.",
      },
    ],
  },
  terms: {
    title: "Terms of use",
    lede: "Rules for using this informational website and the enrollment links that leave it.",
    note: "Placeholder terms for layout. Replace this page with text the school's counsel has reviewed before launch.",
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
        heading: "School standing",
        body: `${credentialsLine} Course descriptions follow public Florida hour requirements. Completing a course does not guarantee a license; licensing decisions belong to DBPR.`,
      },
      {
        heading: "No exam or license promise",
        body: "Finishing a course does not guarantee that you will pass the state exam or receive a license. Licensing decisions belong to DBPR.",
      },
    ],
  },
};

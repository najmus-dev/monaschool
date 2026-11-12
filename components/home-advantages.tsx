function BriefcaseIcon() {
  return (
    <svg width="96" height="96" viewBox="0 0 48 48" fill="none" aria-hidden>
      <path
        d="M16 18V14.5C16 12.567 17.567 11 19.5 11H28.5C30.433 11 32 12.567 32 14.5V18"
        stroke="#FFD400"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <rect x="9" y="18" width="30" height="22" rx="3" fill="#FFD400" />
      <path
        d="M9 26H39"
        stroke="#F7F4EC"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PeopleIcon() {
  return (
    <svg width="96" height="96" viewBox="0 0 48 48" fill="none" aria-hidden>
      <circle cx="29.5" cy="16" r="5.5" stroke="#FFD400" strokeWidth="2.2" />
      <path
        d="M38.5 34.5C38.5 29.8056 34.6944 26 30 26C28.7606 26 27.5905 26.266 26.545 26.741"
        stroke="#FFD400"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <circle cx="19" cy="17" r="6.5" fill="#FFD400" />
      <path
        d="M8 36.5C8 30.701 12.701 26 18.5 26C24.299 26 29 30.701 29 36.5"
        fill="#FFD400"
      />
    </svg>
  );
}

function LearningIcon() {
  return (
    <svg width="96" height="96" viewBox="0 0 48 48" fill="none" aria-hidden>
      <rect
        x="8"
        y="10"
        width="32"
        height="26"
        rx="3"
        stroke="#FFD400"
        strokeWidth="2.2"
      />
      <rect x="14" y="16" width="20" height="14" rx="1.5" fill="#FFD400" />
      <path
        d="M18 42H30"
        stroke="#FFD400"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M24 36V42"
        stroke="#FFD400"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function GrowthIcon() {
  return (
    <svg width="96" height="96" viewBox="0 0 48 48" fill="none" aria-hidden>
      <path
        d="M10 38V28"
        stroke="#FFD400"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <path
        d="M19 38V22"
        stroke="#FFD400"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <path
        d="M28 38V16"
        stroke="#FFD400"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <path
        d="M35.8 8.6L37.1 12.2L40.9 12.5L37.9 15L38.9 18.7L35.8 16.7L32.7 18.7L33.7 15L30.7 12.5L34.5 12.2L35.8 8.6Z"
        fill="#FFD400"
      />
    </svg>
  );
}

function SectionMark() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M0 0H12L0 12V0Z" fill="#FFD400" />
    </svg>
  );
}

const advantages = [
  {
    title: "Real world training",
    body: "Build practical skills through real estate scenarios that reflect the realities of Florida licensing and practice.",
    Icon: BriefcaseIcon,
  },
  {
    title: "Personalised support",
    body: "Get clear guidance from the school when you need help choosing a course, format, or next step in your path.",
    Icon: PeopleIcon,
  },
  {
    title: "Flexible learning",
    body: "Develop capability through flexible formats designed to fit around modern work and life commitments.",
    Icon: LearningIcon,
  },
  {
    title: "Professional growth",
    body: "Build knowledge that supports your growth — from licensing through professional and international learning.",
    Icon: GrowthIcon,
  },
] as const;

export function HomeAdvantages() {
  return (
    <section className="bg-[#F8F5F0]">
      <div className="mx-auto w-full max-w-[90rem] px-4 py-16 sm:px-6 md:py-20 lg:px-8 lg:py-24">
        <div className="flex items-center gap-2.5">
          <SectionMark />
          <p className="text-[0.8rem] font-bold uppercase tracking-[0.12em] text-black">
            Choose Cherkaoui Institute
          </p>
        </div>

        <h2 className="mt-5 font-sans text-[2.15rem] font-semibold leading-[1.15] tracking-[-0.02em] text-black sm:text-[2.6rem] md:text-[2.9rem]">
          A career long advantage
        </h2>

        <ul className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4 xl:gap-6">
          {advantages.map(({ title, body, Icon }) => (
            <li
              key={title}
              className="rounded-[1.5rem] bg-white px-7 pb-10 pt-8 shadow-[0_8px_30px_rgba(0,0,0,0.05)]"
            >
              <Icon />
              <h3 className="mt-8 font-sans text-[1.125rem] font-bold leading-snug text-black">
                {title}
              </h3>
              <p className="mt-3 max-w-[16.5rem] text-[0.9375rem] font-normal leading-[1.55] text-[#555555]">
                {body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

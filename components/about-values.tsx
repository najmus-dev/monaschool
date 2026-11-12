import { site } from "@/content/site";

function SectionMark() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M0 0H12L0 12V0Z" fill="#111111" />
    </svg>
  );
}

export function AboutValues() {
  const copy = site.about;

  return (
    <section className="bg-[#FFD400]">
      <div className="mx-auto w-full max-w-[90rem] px-4 py-16 sm:px-6 md:py-20 lg:px-8 lg:py-24">
        <div className="flex items-center gap-2.5">
          <SectionMark />
          <p className="text-[0.8rem] font-bold uppercase tracking-[0.12em] text-black">
            {copy.valuesLabel}
          </p>
        </div>

        <h2 className="mt-5 max-w-[18ch] font-sans text-[2.15rem] font-bold leading-[1.1] tracking-[-0.02em] text-black sm:text-[2.6rem] md:text-[2.9rem]">
          {copy.valuesTitle}
        </h2>

        <ul className="mt-12 grid grid-cols-1 gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-14 lg:gap-y-12">
          {copy.why.map((item) => (
            <li key={item.title}>
              <h3 className="font-sans text-[1.15rem] font-bold leading-snug text-black">
                {item.title}
              </h3>
              <p className="mt-3 text-[0.95rem] leading-7 text-black/75">
                {item.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

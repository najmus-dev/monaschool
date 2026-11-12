import Link from "next/link";

function SectionMark() {
  return (
    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M0 0H12L0 12V0Z" fill="#C08430" />
    </svg>
  );
}

export function PolicySections({
  sections,
}: {
  sections: { heading: string; body: string }[];
}) {
  return (
    <div className="border-t border-black/10">
      {sections.map((section, index) => (
        <section
          key={section.heading}
          className="grid gap-4 border-b border-black/10 py-8 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-6 md:py-9"
        >
          <div className="flex items-start gap-2 pt-1 sm:block">
            <SectionMark />
            <span className="font-sans text-[0.75rem] font-bold uppercase tracking-[0.12em] text-[#746C66] sm:mt-3 sm:block">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
          <div>
            <h2 className="font-sans text-[1.25rem] font-bold tracking-[-0.015em] text-[#222222] sm:text-[1.35rem]">
              {section.heading}
            </h2>
            <p className="mt-3 max-w-[54ch] text-[1rem] leading-7 text-[#746C66] sm:leading-8">
              {section.body}
            </p>
          </div>
        </section>
      ))}
    </div>
  );
}

export function PolicyFooterLinks({
  links,
}: {
  links: { href: string; label: string }[];
}) {
  return (
    <div className="mt-12 flex flex-wrap items-center gap-3 border-t border-black/10 pt-8">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="inline-flex h-10 items-center rounded-[0.3rem] border border-black bg-transparent px-4 text-[0.84rem] font-bold text-black transition-colors hover:bg-black hover:text-white"
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}

import { ArrowRightIcon } from "@phosphor-icons/react/ssr";

const paths = [
  {
    title: "Get licensed",
    body: "Sales pre-license education for the Florida sales associate path.",
    href: "/florida-real-estate#get-licensed",
  },
  {
    title: "First renewal",
    body: "Post-license hours required before the initial license expires.",
    href: "/florida-real-estate#first-renewal",
  },
  {
    title: "Stay current",
    body: "Continuing education, Core Law, Ethics, reactivation, and broker paths.",
    href: "/florida-real-estate#renew-ce",
  },
] as const;

export function FloridaPathStrip() {
  return (
    <section className="border-b border-[#d5dde6] bg-white">
      <div className="mx-auto w-full max-w-[90rem] px-4 py-11 sm:px-6 md:py-12 lg:px-8">
        <ul className="grid grid-cols-1 divide-y divide-[#d5dde6] md:grid-cols-3 md:divide-x md:divide-y-0">
          {paths.map(({ title, body, href }, index) => (
            <li
              key={href}
              className="min-h-0 md:px-8 md:first:pl-0 md:last:pr-0"
            >
              <a
                href={href}
                className="group flex h-full flex-col py-7 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#002448]/30 md:py-1"
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-sans text-[0.78rem] font-bold tabular-nums tracking-[0.08em] text-[#C08430]">
                    0{index + 1}
                  </span>
                  <p className="font-sans text-[1.05rem] font-bold tracking-[-0.015em] text-[#001830] group-hover:text-[#002448]">
                    {title}
                  </p>
                </div>
                <p className="mt-3 flex-1 text-[0.95rem] leading-7 text-[#5A6B7A]">
                  {body}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-[0.86rem] font-bold text-[#002448]">
                  View courses
                  <ArrowRightIcon
                    size={14}
                    weight="bold"
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

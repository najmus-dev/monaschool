import {
  EnvelopeSimpleIcon,
  MapPinIcon,
  PhoneIcon,
} from "@phosphor-icons/react/ssr";
import { site } from "@/content/site";

const cards = [
  {
    key: "general",
    eyebrow: "General",
    title: "General enquiries",
    href: `mailto:${site.school.email}`,
    value: site.school.email,
    Icon: EnvelopeSimpleIcon,
    tone: "#FFD400",
  },
  {
    key: "phone",
    eyebrow: "Phone",
    title: "Call the school",
    href: `tel:${site.school.phoneTel}`,
    value: site.school.phoneDisplay,
    Icon: PhoneIcon,
    tone: "#7B6BB0",
  },
  {
    key: "location",
    eyebrow: "Location",
    title: site.school.city,
    href: "/about",
    value: site.school.address,
    Icon: MapPinIcon,
    tone: "#3f78d4",
  },
] as const;

export function ContactMethods() {
  return (
    <section className="bg-[#F8F5F0]">
      <div className="mx-auto w-full max-w-[90rem] px-4 py-16 sm:px-6 md:py-20 lg:px-8 lg:py-24">
        <h2 className="font-sans text-[2.15rem] font-bold tracking-[-0.02em] text-black sm:text-[2.5rem]">
          {site.contact.reachTitle}
        </h2>

        <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {cards.map(({ key, eyebrow, title, href, value, Icon, tone }) => (
            <li key={key}>
              <a
                href={href}
                className="relative flex h-full min-h-[11.5rem] flex-col overflow-hidden rounded-[1.15rem] bg-white px-6 pb-6 pt-6 shadow-[0_10px_28px_rgba(0,0,0,0.06)] transition-shadow hover:shadow-[0_14px_34px_rgba(0,0,0,0.09)]"
              >
                <span
                  className="absolute inset-y-0 left-0 w-[3px]"
                  style={{ backgroundColor: tone }}
                  aria-hidden
                />
                <p className="text-[0.72rem] font-bold uppercase tracking-[0.12em] text-black">
                  {eyebrow}
                </p>
                <h3 className="mt-3 font-sans text-[1.2rem] font-medium leading-snug text-black">
                  {title}
                </h3>
                <span className="mt-auto inline-flex items-center gap-2 pt-8 text-[0.92rem] font-normal text-black/80">
                  <Icon size={16} weight="regular" aria-hidden />
                  {value}
                </span>
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-8 max-w-[42rem] text-[0.88rem] leading-6 text-[#746C66]">
          {site.contact.accessBody}
        </p>
      </div>
    </section>
  );
}

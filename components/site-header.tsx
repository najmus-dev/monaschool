"use client";

import { useGSAP } from "@gsap/react";
import {
  ArrowRightIcon,
  CaretRightIcon,
  EnvelopeSimpleIcon,
  StudentIcon,
} from "@phosphor-icons/react/ssr";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { site } from "@/content/site";
import { MobileNavPanel } from "./mobile-nav-panel";

gsap.registerPlugin(useGSAP);

type MenuKey =
  | "florida-real-estate"
  | "professional-development"
  | "international-business"
  | "about"
  | "contact";

type MenuLink = {
  label: string;
  href: string;
  badge?: string;
};

function MenuBadge({ children }: { children: string }) {
  return (
    <span className="inline-flex shrink-0 items-center rounded-full border border-[#C08430]/40 px-2 py-0.5 text-[0.58rem] font-bold uppercase tracking-[0.1em] text-[#8A6A2F]">
      {children}
    </span>
  );
}

const menuSections: {
  key: MenuKey;
  label: string;
  href: string;
  lede: string;
  hasPanel: boolean;
  tone: string;
  badge?: string;
  columns: { heading: string; links: MenuLink[] }[];
  cta: { label: string; href: string; body: string };
}[] = [
  {
    key: "florida-real-estate",
    label: "Florida Licensing & Renewal",
    href: "/florida-real-estate",
    lede: "Find the right Florida license or renewal course — then compare formats and tuition on the course page.",
    hasPanel: true,
    tone: "#dce6ef",
    columns: [
      {
        heading: "Licensing & renewal",
        links: [
          { label: "Get Licensed", href: "/courses/sales-pre-license" },
          {
            label: "Complete My First Renewal",
            href: "/courses/sales-post-license",
          },
          {
            label: "Renew With CE",
            href: "/courses/continuing-education",
          },
        ],
      },
      {
        heading: "Broker path",
        links: [
          { label: "Become a Broker", href: "/courses/broker-pre-license" },
          {
            label: "Broker First Renewal",
            href: "/courses/broker-post-license-management",
          },
          {
            label: "Reactivate My License",
            href: "/courses/reactivation",
          },
        ],
      },
      {
        heading: "Helpful links",
        links: [
          { label: "Student login", href: site.ui.studentLoginHref },
          { label: "Browse all courses", href: "/florida-real-estate" },
          { label: "Core Law", href: "/courses/core-law" },
          { label: "Ethics", href: "/courses/ethics-business-practices" },
          { label: "Ask a question", href: "/contact" },
        ],
      },
    ],
    cta: {
      label: "Browse Florida courses",
      href: "/florida-real-estate",
      body: "See licensing and renewal courses, then open a class for formats and tuition.",
    },
  },
  {
    key: "professional-development",
    label: "Professional Development",
    href: "/professional-development",
    lede: "Specialty skills for real estate practice—sales, communication, and commercial brokerage. Enrollment opens as schedules are published.",
    hasPanel: true,
    tone: "#ebe4d4",
    columns: [
      {
        heading: "Sales & Communication",
        links: [
          {
            label: "The Voice That Sells",
            href: "/courses/the-voice-that-sells",
            badge: "Coming soon",
          },
          {
            label: "The 5 W's of Selling",
            href: "/courses/the-5-ws-of-selling",
            badge: "Coming soon",
          },
        ],
      },
      {
        heading: "Commercial & Business Brokerage",
        links: [
          {
            label: "Introduction to Commercial Real Estate",
            href: "/courses/introduction-to-commercial-real-estate",
            badge: "Coming soon",
          },
          {
            label: "Introduction to Business Brokerage",
            href: "/courses/introduction-to-business-brokerage",
            badge: "Coming soon",
          },
        ],
      },
      {
        heading: "Short Sales, REO & Default",
        links: [
          {
            label: "Short Sales & Distressed Properties",
            href: "/courses/short-sales-distressed-properties",
            badge: "Coming soon",
          },
          {
            label: "REO & Default Real Estate",
            href: "/courses/reo-default-real-estate",
            badge: "Coming soon",
          },
          {
            label: "Browse Specialty Courses",
            href: "/professional-development#courses",
          },
          {
            label: "Request group training",
            href: "/contact?interest=group-training&path=professional-development",
          },
        ],
      },
    ],
    cta: {
      label: "Preview PD courses",
      href: "/professional-development#courses",
      body: "Browse specialty courses now. Enrollment and tuition open as the school publishes schedules.",
    },
  },
  {
    key: "international-business",
    label: "International Business",
    href: "/international-business",
    lede: "Cross-cultural communication, international selling, market entry, and global clients.",
    hasPanel: true,
    tone: "#d4e3ee",
    columns: [
      {
        heading: "Focus areas",
        links: [
          {
            label: "Cross-Cultural Communication",
            href: "/international-business#cross-cultural-communication",
          },
          {
            label: "International Selling & Negotiation",
            href: "/international-business#intl-selling-negotiation",
          },
          {
            label: "Cross-Cultural Leadership",
            href: "/international-business#cross-cultural-leadership",
          },
          {
            label: "Global Real Estate",
            href: "/international-business#global-real-estate",
          },
          {
            label: "Market Entry",
            href: "/international-business#market-entry",
          },
          {
            label: "Working With International Clients",
            href: "/international-business#intl-clients",
          },
        ],
      },
      {
        heading: "Featured courses",
        links: [
          {
            label: "Presenting Across Cultures",
            href: "/courses/presenting-across-cultures",
            badge: "Coming soon",
          },
          {
            label: "Negotiating Across Cultures",
            href: "/courses/negotiating-across-cultures",
            badge: "Coming soon",
          },
          {
            label: "Global Clients, Local Business",
            href: "/courses/global-clients-local-business",
            badge: "Coming soon",
          },
          {
            label: "When Businesses Cross Borders",
            href: "/courses/when-businesses-cross-borders",
            badge: "Coming soon",
          },
        ],
      },
      {
        heading: "Helpful links",
        links: [
          {
            label: "Browse all IB courses",
            href: "/international-business#courses",
          },
          {
            label: "Request group training",
            href: "/contact?interest=group-training&path=international-business",
          },
          { label: "Ask a question", href: "/contact" },
        ],
      },
    ],
    cta: {
      label: "Browse IB courses",
      href: "/international-business#courses",
      body: "Open a focus area for course cards. Tuition and schedules publish as the school confirms them.",
    },
  },
  {
    key: "about",
    label: "About us",
    href: "/about",
    lede: "Where education opens markets.",
    hasPanel: true,
    tone: "#f0e4c8",
    columns: [
      {
        heading: "The institute",
        links: [
          { label: "About us", href: "/about" },
          { label: "FAQ", href: "/faq" },
          { label: "Privacy", href: "/privacy" },
          { label: "Terms", href: "/terms" },
        ],
      },
      {
        heading: "Ways to learn",
        links: [
          {
            label: "Florida Licensing & Renewal",
            href: "/florida-real-estate",
          },
          { label: "Professional Development", href: "/professional-development" },
          { label: "International Business", href: "/international-business" },
        ],
      },
      {
        heading: "Connect",
        links: [
          { label: "Contact", href: "/contact" },
          { label: "Student login", href: site.ui.studentLoginHref },
          {
            label: "Become an instructor",
            href: "/instructors/apply",
          },
        ],
      },
    ],
    cta: {
      label: "About us",
      href: "/about",
      body: "Learn how REIB Institute supports licensing, advancement, and specialty business education.",
    },
  },
  {
    key: "contact",
    label: "Contact",
    href: "/contact",
    lede: "Ask about a course, group training, or partnership.",
    hasPanel: false,
    tone: "#e2eaf1",
    columns: [],
    cta: {
      label: "Send a message",
      href: "/contact",
      body: "",
    },
  },
];

function menuKeyFromPath(pathname: string): MenuKey {
  if (pathname.startsWith("/florida-real-estate")) return "florida-real-estate";
  if (pathname.startsWith("/professional-development")) {
    return "professional-development";
  }
  if (pathname.startsWith("/international-business")) {
    return "international-business";
  }
  if (
    pathname.startsWith("/about") ||
    pathname.startsWith("/faq") ||
    pathname.startsWith("/privacy") ||
    pathname.startsWith("/terms")
  ) {
    return "about";
  }
  if (pathname.startsWith("/contact")) return "contact";
  return "florida-real-estate";
}

export function SiteHeader() {
  const pathname = usePathname();
  const panelId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const menuWasOpenRef = useRef(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<MenuKey>(() =>
    menuKeyFromPath(pathname),
  );

  const activeSection = useMemo(
    () => menuSections.find((item) => item.key === activeMenu) ?? menuSections[0],
    [activeMenu],
  );

  useEffect(() => {
    setMenuOpen(false);
    setActiveMenu(menuKeyFromPath(pathname));
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  useGSAP(
    () => {
      if (!menuOpen || !panelRef.current) return;
      // Desktop megamenu only — mobile uses MobileNavPanel.
      if (!window.matchMedia("(min-width: 1024px)").matches) return;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      const asideItems = gsap.utils.toArray<HTMLElement>(
        "[data-menu-aside] li",
        panelRef.current,
      );
      const content = panelRef.current.querySelector("[data-menu-content]");

      gsap.fromTo(
        panelRef.current,
        { autoAlpha: 0, y: -18 },
        { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" },
      );
      gsap.fromTo(
        asideItems,
        { autoAlpha: 0, x: -14 },
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.35,
          stagger: 0.045,
          ease: "power2.out",
          delay: 0.08,
        },
      );
      if (content) {
        gsap.fromTo(
          content,
          { autoAlpha: 0, y: 16 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.4,
            ease: "power2.out",
            delay: 0.12,
          },
        );
      }
    },
    { dependencies: [menuOpen] },
  );

  useGSAP(
    () => {
      if (!menuOpen || !panelRef.current) {
        menuWasOpenRef.current = false;
        return;
      }
      if (!window.matchMedia("(min-width: 1024px)").matches) return;
      // Skip content crossfade on the same open that runs the panel intro.
      if (!menuWasOpenRef.current) {
        menuWasOpenRef.current = true;
        return;
      }
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      const content = panelRef.current.querySelector("[data-menu-content]");
      if (!content) return;

      gsap.fromTo(
        content,
        { autoAlpha: 0.35, y: 10 },
        { autoAlpha: 1, y: 0, duration: 0.32, ease: "power2.out" },
      );
    },
    { dependencies: [activeMenu, menuOpen] },
  );

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div className="pointer-events-auto mx-auto w-full max-w-[92rem] px-3 pt-3 sm:px-4 sm:pt-4 lg:px-5">
        <div
          className={`relative flex h-[6.15rem] items-center justify-between gap-3 rounded-[1.25rem] px-4 shadow-[0_10px_30px_rgba(0,0,0,0.14)] backdrop-blur-2xl sm:h-[6.75rem] sm:px-6 lg:h-[7.5rem] lg:rounded-[1.5rem] ${
            menuOpen ? "bg-white" : "bg-white lg:bg-white/90"
          }`}
        >
          {/* Desktop: Menu left */}
          <button
            type="button"
            className="hidden h-11 shrink-0 items-center gap-3 bg-transparent px-0 text-[1rem] font-medium text-black lg:inline-flex"
            aria-expanded={menuOpen}
            aria-controls={`${panelId}-desktop`}
            onClick={() => setMenuOpen((value) => !value)}
          >
            <span className="relative block h-3.5 w-5" aria-hidden>
              <span
                className={`absolute left-0 top-0 block h-[2px] w-5 origin-center bg-black transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  menuOpen ? "translate-y-[6px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[6px] block h-[2px] w-3.5 origin-center bg-black transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  menuOpen ? "w-5 -translate-y-[6px] -rotate-45" : ""
                }`}
              />
            </span>
            <span>{menuOpen ? "Close" : "Menu"}</span>
          </button>

          {/* Mobile: logo left · Desktop: logo centered — formal institute mark */}
          <Link
            href="/"
            className="relative z-10 shrink-0 lg:absolute lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2"
            aria-label={`${site.school.name}, home`}
          >
            <Image
              src={site.school.logoSrc}
              alt={site.school.logoAlt}
              width={333}
              height={203}
              priority
              unoptimized
              className="h-[4.85rem] w-auto max-w-[16.5rem] object-contain object-left sm:h-[5.4rem] sm:max-w-[19.5rem] lg:h-[6.15rem] lg:max-w-[23.5rem] lg:object-center"
            />
          </Link>

          <div className="flex items-center gap-1 sm:gap-2">
            <a
              href={site.ui.studentLoginHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex size-10 items-center justify-center rounded-full text-[#111111] transition-colors hover:bg-[#002448]/10 hover:text-[#002448] lg:hidden"
              aria-label={site.ui.studentLogin}
            >
              <StudentIcon size={22} weight="regular" aria-hidden />
            </a>
            <a
              href={site.ui.studentLoginHref}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden h-10 items-center gap-2 rounded-full px-3 text-[0.9rem] font-semibold text-[#C08430] transition-colors hover:bg-[#C08430]/12 hover:text-[#9a6a20] lg:inline-flex lg:px-4"
            >
              <StudentIcon size={18} weight="bold" aria-hidden />
              <span>{site.ui.studentLogin}</span>
            </a>
            <Link
              href="/contact"
              aria-label="Contact"
              className="hidden h-10 items-center gap-2 rounded-full bg-[#002448] px-4 text-[0.9rem] font-medium text-white transition-colors hover:bg-black lg:inline-flex lg:px-5"
            >
              <EnvelopeSimpleIcon size={17} weight="bold" aria-hidden />
              <span>Contact</span>
            </Link>
            {/* Mobile: menu/close icon on the right */}
            <button
              type="button"
              className="inline-flex size-10 items-center justify-center rounded-full text-black lg:hidden"
              aria-expanded={menuOpen}
              aria-controls={panelId}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((value) => !value)}
            >
              <span className="relative block h-3.5 w-5" aria-hidden>
                <span
                  className={`absolute left-0 top-0 block h-[2px] w-5 origin-center bg-black transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    menuOpen ? "translate-y-[6px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute left-0 top-[6px] block h-[2px] w-3.5 origin-center bg-black transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    menuOpen ? "w-5 -translate-y-[6px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>

        <MobileNavPanel
          open={menuOpen}
          panelId={panelId}
          sections={menuSections}
          onClose={() => setMenuOpen(false)}
        />

        {menuOpen ? (
          <div
            ref={panelRef}
            id={`${panelId}-desktop`}
            className="mt-3 hidden max-h-[min(82vh,42rem)] overflow-y-auto rounded-[1.75rem] bg-[#f3efe6] shadow-[0_28px_60px_rgba(0,0,0,0.18)] lg:block lg:overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:h-full lg:max-h-[min(82vh,42rem)] lg:grid-cols-[17.5rem_minmax(0,1fr)] lg:items-stretch">
              <aside
                data-menu-aside
                className="shrink-0 border-b border-black/8 p-3 sm:p-4 lg:border-b-0 lg:overflow-y-auto lg:py-5 lg:pl-5 lg:pr-2"
              >
                <ul className="grid gap-1 sm:gap-1.5">
                  {menuSections.map((section) => {
                    const active =
                      section.hasPanel && section.key === activeMenu;
                    if (!section.hasPanel) {
                      return (
                        <li key={section.key}>
                          <Link
                            href={section.href}
                            className="flex w-full items-center rounded-xl px-3 py-2.5 text-left text-[0.95rem] font-medium text-black/55 transition-colors hover:text-black sm:px-3.5 sm:py-3 sm:text-[1rem]"
                            style={{ backgroundColor: "transparent" }}
                            onMouseEnter={(event) => {
                              event.currentTarget.style.backgroundColor =
                                section.tone;
                            }}
                            onMouseLeave={(event) => {
                              event.currentTarget.style.backgroundColor =
                                "transparent";
                            }}
                            onClick={() => setMenuOpen(false)}
                          >
                            {section.label}
                          </Link>
                        </li>
                      );
                    }
                    return (
                      <li key={section.key}>
                        <button
                          type="button"
                          onClick={() => setActiveMenu(section.key)}
                          className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-[0.95rem] font-medium text-black transition-colors sm:px-3.5 sm:py-3 sm:text-[1rem]"
                          style={{
                            backgroundColor: active ? section.tone : "transparent",
                          }}
                          onMouseEnter={(event) => {
                            if (!active) {
                              event.currentTarget.style.backgroundColor =
                                section.tone;
                            }
                          }}
                          onMouseLeave={(event) => {
                            event.currentTarget.style.backgroundColor = active
                              ? section.tone
                              : "transparent";
                          }}
                        >
                          <span className="flex min-w-0 items-center">
                            <span className="truncate">{section.label}</span>
                            {section.badge ? (
                              <MenuBadge>{section.badge}</MenuBadge>
                            ) : null}
                          </span>
                          <CaretRightIcon
                            size={16}
                            weight="bold"
                            className="shrink-0 text-black/50"
                            aria-hidden
                          />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </aside>

              <div className="flex min-h-0 min-w-0 flex-col p-2 sm:p-3 lg:h-full lg:min-h-0 lg:pl-2">
                <div
                  data-menu-content
                  className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[1.25rem] bg-white shadow-[0_1px_0_rgba(0,0,0,0.04)] sm:rounded-[1.35rem] lg:h-full"
                >
                  <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6 md:p-8 lg:max-h-none">
                    <h2 className="flex flex-wrap items-center gap-y-1 font-sans text-[1.45rem] font-bold tracking-tight text-black sm:text-[1.85rem] md:text-[2.15rem]">
                      <span>{activeSection.label}</span>
                      {activeSection.badge ? (
                        <MenuBadge>{activeSection.badge}</MenuBadge>
                      ) : null}
                    </h2>
                    <p className="mt-2 max-w-xl text-[0.95rem] leading-6 text-black/70 sm:text-[1rem] sm:leading-7">
                      {activeSection.lede}
                    </p>
                    <div
                      className="mt-5 border-t border-black/10 sm:mt-6"
                      aria-hidden
                    />

                    <div className="mt-5 grid grid-cols-1 gap-6 sm:mt-7 sm:grid-cols-2 sm:gap-8 xl:grid-cols-3 xl:gap-10">
                      {activeSection.columns.map((column) => (
                        <div key={column.heading} className="min-w-0">
                          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-black/40">
                            {column.heading}
                          </p>
                          <ul className="mt-3 grid gap-2.5 sm:mt-4 sm:gap-3">
                            {column.links.map((link) => {
                              const external =
                                link.href.startsWith("http") ||
                                link.href.startsWith("tel:") ||
                                link.href.startsWith("mailto:");
                              const className =
                                "break-words text-[0.95rem] font-medium text-black transition-colors hover:text-black/55 hover:underline hover:underline-offset-4 sm:text-[1rem]";
                              const label = link.badge ? (
                                <span className="flex items-start justify-between gap-2">
                                  <span className="min-w-0">{link.label}</span>
                                  <MenuBadge>{link.badge}</MenuBadge>
                                </span>
                              ) : (
                                link.label
                              );
                              return (
                                <li key={`${column.heading}-${link.label}`}>
                                  {external ? (
                                    <a
                                      href={link.href}
                                      className={className}
                                      target={
                                        link.href.startsWith("http")
                                          ? "_blank"
                                          : undefined
                                      }
                                      rel={
                                        link.href.startsWith("http")
                                          ? "noopener noreferrer"
                                          : undefined
                                      }
                                      onClick={() => setMenuOpen(false)}
                                    >
                                      {label}
                                    </a>
                                  ) : (
                                    <Link
                                      href={link.href}
                                      className={className}
                                      onClick={() => setMenuOpen(false)}
                                    >
                                      {label}
                                    </Link>
                                  )}
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div
                    className="flex shrink-0 flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-6 sm:py-5 md:px-8"
                    style={{ backgroundColor: activeSection.tone }}
                  >
                    <p className="max-w-xl text-[0.92rem] leading-6 text-black sm:text-[1rem]">
                      {activeSection.cta.body}
                    </p>
                    <Link
                      href={activeSection.cta.href}
                      className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-md border border-black bg-transparent px-4 text-[0.9rem] font-semibold text-black transition-colors hover:bg-black hover:text-white sm:h-11 sm:text-[0.95rem]"
                      onClick={() => setMenuOpen(false)}
                    >
                      {activeSection.cta.label}
                      <ArrowRightIcon size={16} weight="bold" aria-hidden />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}

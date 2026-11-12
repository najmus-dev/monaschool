"use client";

import {
  CaretRightIcon,
  EnvelopeSimpleIcon,
  StudentIcon,
} from "@phosphor-icons/react/ssr";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useMemo, useState } from "react";
import { site } from "@/content/site";

type MenuKey =
  | "florida-real-estate"
  | "professional-development"
  | "international-business"
  | "about"
  | "contact";

const menuSections: {
  key: MenuKey;
  label: string;
  href: string;
  lede: string;
  hasPanel: boolean;
  tone: string;
  columns: { heading: string; links: { label: string; href: string }[] }[];
  cta: { label: string; href: string; body: string };
}[] = [
  {
    key: "florida-real-estate",
    label: "Florida Real Estate",
    href: "/florida-real-estate",
    lede: "Your pathway into a Florida real estate career — and the education to keep it current.",
    hasPanel: true,
    tone: "#ebe4f5",
    columns: [
      {
        heading: "Start or advance",
        links: [
          { label: "Get your license", href: "/courses/sales-pre-license" },
          { label: "Sales post-license", href: "/courses/sales-post-license" },
          { label: "Become a broker", href: "/courses/broker-pre-license" },
        ],
      },
      {
        heading: "Stay current",
        links: [
          {
            label: "Continuing education",
            href: "/courses/continuing-education",
          },
          {
            label: "Broker post-license",
            href: "/courses/broker-post-license-management",
          },
          { label: "Reactivation", href: "/courses/reactivation" },
        ],
      },
      {
        heading: "Helpful links",
        links: [
          { label: "Browse all courses", href: "/florida-real-estate" },
          { label: "Core Law", href: "/courses/core-law" },
          { label: "Ethics", href: "/courses/ethics-business-practices" },
          { label: "Student login", href: site.ui.studentLoginHref },
          { label: "Ask a question", href: "/contact" },
        ],
      },
    ],
    cta: {
      label: "See Florida courses",
      href: "/florida-real-estate",
      body: "Compare published courses and tuition from the school fee schedule.",
    },
  },
  {
    key: "professional-development",
    label: "Professional Development",
    href: "/professional-development",
    lede: "Practical programs that build capability for careers and teams.",
    hasPanel: true,
    tone: "#f6d4d0",
    columns: [
      {
        heading: "Skill areas",
        links: [
          { label: "AI for business & productivity", href: "/professional-development" },
          { label: "Sales & business development", href: "/professional-development" },
          { label: "Negotiation", href: "/professional-development" },
          { label: "Communication & presentation", href: "/professional-development" },
          { label: "Leadership", href: "/professional-development" },
        ],
      },
      {
        heading: "For organizations",
        links: [
          {
            label: "Request group training",
            href: "/contact?interest=group-training",
          },
          { label: "Contact the school", href: "/contact" },
        ],
      },
      {
        heading: "Helpful links",
        links: [
          { label: "Category overview", href: "/professional-development" },
          { label: "FAQ", href: "/faq" },
        ],
      },
    ],
    cta: {
      label: "See PD",
      href: "/professional-development",
      body: "Strengthen skills for what’s next — livestream and in-person sessions.",
    },
  },
  {
    key: "international-business",
    label: "International Business",
    href: "/international-business",
    lede: "Education for cross-border work, selling, and market entry.",
    hasPanel: true,
    tone: "#d7eaf7",
    columns: [
      {
        heading: "Focus areas",
        links: [
          {
            label: "Cross-cultural communication",
            href: "/international-business",
          },
          {
            label: "International selling & negotiation",
            href: "/international-business",
          },
          { label: "Market entry", href: "/international-business" },
          {
            label: "Working with international clients",
            href: "/international-business",
          },
        ],
      },
      {
        heading: "Partnerships",
        links: [
          {
            label: "Teaching / partnership inquiry",
            href: "/contact?interest=teaching-partnership",
          },
          { label: "Contact the school", href: "/contact" },
        ],
      },
      {
        heading: "Helpful links",
        links: [
          { label: "Category overview", href: "/international-business" },
          { label: "About us", href: "/about" },
        ],
      },
    ],
    cta: {
      label: "See IB",
      href: "/international-business",
      body: "Programs appear here as the school confirms descriptions, instructors, dates, and fees.",
    },
  },
  {
    key: "about",
    label: "About us",
    href: "/about",
    lede: "Where education opens markets.",
    hasPanel: true,
    tone: "#ffe566",
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
          { label: "Florida Real Estate", href: "/florida-real-estate" },
          { label: "Professional Development", href: "/professional-development" },
          { label: "International Business", href: "/international-business" },
        ],
      },
      {
        heading: "Connect",
        links: [
          { label: "Contact", href: "/contact" },
          { label: "Student login", href: site.ui.studentLoginHref },
        ],
      },
    ],
    cta: {
      label: "About us",
      href: "/about",
      body: "Learn how Cherkaoui Institute supports licensing, advancement, and specialty business education.",
    },
  },
  {
    key: "contact",
    label: "Contact",
    href: "/contact",
    lede: "Ask about a course, group training, or partnership.",
    hasPanel: false,
    tone: "#ffd400",
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

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div className="pointer-events-auto mx-auto w-full max-w-[92rem] px-3 pt-3 sm:px-4 sm:pt-4 lg:px-5">
        <div className="relative flex h-[4.1rem] items-center justify-between gap-3 rounded-[1.75rem] bg-white/90 px-4 shadow-[0_10px_30px_rgba(0,0,0,0.12)] backdrop-blur-2xl sm:h-[4.5rem] sm:px-6">
          <button
            type="button"
            className="inline-flex h-11 items-center gap-3 bg-transparent px-0 text-[1rem] font-medium text-black"
            aria-expanded={menuOpen}
            aria-controls={panelId}
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

          <Link
            href="/"
            className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center"
            aria-label={`${site.school.name}, home`}
          >
            <Image
              src={site.school.logoSrc}
              alt={site.school.logoAlt}
              width={360}
              height={96}
              priority
              unoptimized
              className="h-9 w-auto sm:h-10"
            />
          </Link>

          <div className="flex items-center gap-1 sm:gap-2">
            <a
              href={site.ui.studentLoginHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex size-10 items-center justify-center rounded-full text-[#111111] transition-colors hover:bg-[#ffd400]/hover:text-black"
              aria-label={site.ui.studentLogin}
            >
              <StudentIcon size={22} weight="regular" aria-hidden />
            </a>
            <Link
              href="/contact"
              aria-label="Contact"
              className="inline-flex h-10 items-center gap-2 rounded-full bg-[#111111] px-4 text-[0.9rem] font-medium text-white transition-colors hover:bg-[#ffd400] hover:text-black sm:px-5"
            >
              <EnvelopeSimpleIcon size={17} weight="bold" aria-hidden />
              <span className="hidden sm:inline">Contact</span>
            </Link>
          </div>
        </div>

        {menuOpen ? (
          <div
            id={panelId}
            className="mt-3 max-h-[min(82vh,42rem)] overflow-y-auto rounded-[1.75rem] bg-[#f3efe6] shadow-[0_28px_60px_rgba(0,0,0,0.18)] lg:overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:h-full lg:max-h-[min(82vh,42rem)] lg:grid-cols-[17.5rem_minmax(0,1fr)] lg:items-stretch">
              <aside className="shrink-0 border-b border-black/8 p-3 sm:p-4 lg:border-b-0 lg:overflow-y-auto lg:py-5 lg:pl-5 lg:pr-2">
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
                          <span>{section.label}</span>
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
                <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[1.25rem] bg-white shadow-[0_1px_0_rgba(0,0,0,0.04)] sm:rounded-[1.35rem] lg:h-full">
                  <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6 md:p-8 lg:max-h-none">
                    <h2 className="font-sans text-[1.45rem] font-bold tracking-tight text-black sm:text-[1.85rem] md:text-[2.15rem]">
                      {activeSection.label}
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
                                      {link.label}
                                    </a>
                                  ) : (
                                    <Link
                                      href={link.href}
                                      className={className}
                                      onClick={() => setMenuOpen(false)}
                                    >
                                      {link.label}
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
                      <span aria-hidden>→</span>
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

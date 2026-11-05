"use client";

import { ListIcon, PhoneIcon, XIcon } from "@phosphor-icons/react/ssr";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { site } from "@/content/site";

function isCurrent(href: string, pathname: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** Dark photo/navy tops need white nav; light washed page headers need dark nav. */
function usesDarkTop(pathname: string) {
  if (pathname === "/") return true;
  if (pathname.startsWith("/courses/") && pathname !== "/courses") return true;
  return false;
}

export function SiteHeader() {
  const pathname = usePathname();
  const [openPath, setOpenPath] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const open = openPath === pathname;
  const panelId = useId();
  const transparent = !scrolled && !open;
  const onDark = transparent && usesDarkTop(pathname);

  function toggleMenu() {
    setOpenPath(open ? null : pathname);
  }

  useEffect(() => {
    setOpenPath(null);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenPath(null);
      }
    };

    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
        transparent
          ? "bg-transparent"
          : "border-b border-line bg-surface/95 shadow-[0_1px_0_rgb(16_35_52/0.04)] backdrop-blur-md"
      }`}
    >
      <div
        className={`border-b ${
          onDark
            ? "border-white/15"
            : transparent
              ? "border-brand/10"
              : "border-line/80 bg-band/60"
        }`}
      >
        <div className="mx-auto flex h-9 w-full max-w-6xl items-center justify-between gap-4 px-4 text-[0.78rem] sm:px-6 lg:px-8">
          <a
            href={`tel:${site.school.phoneTel}`}
            className={`inline-flex items-center gap-1.5 font-medium transition-colors ${
              onDark
                ? "text-white/85 hover:text-white"
                : "text-brand hover:text-accent"
            }`}
          >
            <PhoneIcon size={14} weight="bold" aria-hidden />
            {site.school.phoneDisplay}
          </a>
          <a
            href={site.ui.studentLoginHref}
            target="_blank"
            rel="noopener noreferrer"
            className={`font-medium transition-colors ${
              onDark
                ? "text-white/75 hover:text-white"
                : "text-muted hover:text-brand"
            }`}
          >
            {site.ui.studentLogin}
            <span className="sr-only"> (opens partner site)</span>
          </a>
        </div>
      </div>

      <div>
        <div className="mx-auto grid h-[4.5rem] w-full max-w-6xl grid-cols-[auto_1fr_auto] items-center gap-4 px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className={`min-w-0 font-display text-[1.35rem] font-bold tracking-tight transition-colors ${
              onDark ? "text-white" : "text-brand"
            }`}
            aria-label={`${site.school.name}, home`}
          >
            {site.school.name}
          </Link>

          <nav
            className="hidden items-center justify-center gap-1 xl:flex"
            aria-label="Primary"
          >
            {site.nav.map((item) => {
              const current = isCurrent(item.href, pathname);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={current ? "page" : undefined}
                  className={`rounded-md px-3 py-2 text-[0.84rem] font-medium tracking-[0.01em] transition-colors ${
                    onDark
                      ? current
                        ? "bg-white/15 text-white"
                        : "text-white/80 hover:text-white"
                      : current
                        ? "bg-brand/8 text-brand"
                        : "text-[#5c6b7a] hover:text-brand"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center justify-end gap-2 sm:gap-3">
            <a
              href={site.headerCta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center justify-center rounded-md bg-accent px-4 text-[0.84rem] font-semibold text-accent-ink transition-colors hover:bg-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:px-5"
            >
              {site.headerCta.label}
              <span className="sr-only"> (opens partner site)</span>
            </a>
            <button
              type="button"
              className={`inline-flex size-10 items-center justify-center rounded-md border xl:hidden ${
                onDark
                  ? "border-white/35 text-white"
                  : "border-line text-brand"
              }`}
              aria-expanded={open}
              aria-controls={panelId}
              onClick={toggleMenu}
            >
              {open ? (
                <XIcon size={20} weight="regular" aria-hidden />
              ) : (
                <ListIcon size={20} weight="regular" aria-hidden />
              )}
              <span className="sr-only">
                {open ? site.ui.closeMenu : site.ui.openMenu}
              </span>
            </button>
          </div>
        </div>
      </div>

      {open ? (
        <nav
          id={panelId}
          aria-label="Mobile"
          className="fixed inset-x-0 top-[calc(2.25rem+4.5rem)] bottom-0 z-40 overflow-y-auto bg-surface xl:hidden"
        >
          <ul className="flex flex-col px-4 py-3">
            {site.nav.map((item) => {
              const current = isCurrent(item.href, pathname);
              return (
                <li key={item.href} className="border-b border-line">
                  <Link
                    href={item.href}
                    aria-current={current ? "page" : undefined}
                    className={`block py-3.5 text-[0.95rem] font-medium ${
                      current ? "text-brand" : "text-ink"
                    }`}
                    onClick={() => setOpenPath(null)}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
            <li className="border-b border-line">
              <a
                href={site.ui.studentLoginHref}
                target="_blank"
                rel="noopener noreferrer"
                className="block py-3.5 text-[0.95rem] font-medium text-ink"
              >
                {site.ui.studentLogin}
                <span className="sr-only"> (opens partner site)</span>
              </a>
            </li>
            <li className="py-5">
              <a
                href={`tel:${site.school.phoneTel}`}
                className="inline-flex items-center gap-2 text-[0.95rem] font-semibold text-brand"
              >
                <PhoneIcon size={16} weight="bold" aria-hidden />
                {site.school.phoneDisplay}
              </a>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}

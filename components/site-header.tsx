"use client";

import { ListIcon, PhoneIcon, XIcon } from "@phosphor-icons/react/ssr";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { site } from "@/content/site";

function isCurrent(href: string, pathname: string) {
  if (href === "/") {
    return pathname === "/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [openPath, setOpenPath] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const open = openPath === pathname;
  const panelId = useId();

  function toggleMenu() {
    setOpenPath(open ? null : pathname);
  }

  useEffect(() => {
    setOpenPath(null);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
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
      className={`fixed inset-x-0 top-0 z-40 border-b bg-surface/95 backdrop-blur-md transition-[border-color,box-shadow] duration-300 ${
        scrolled || open
          ? "border-line shadow-[0_8px_24px_rgb(10_53_82/0.06)]"
          : "border-line/70"
      }`}
    >
      <div className="mx-auto flex h-[4.75rem] w-full max-w-6xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex shrink-0 items-center"
          aria-label={`${site.school.name}, home`}
        >
          <Image
            src={site.school.logoSrc}
            alt={site.school.logoAlt}
            width={220}
            height={48}
            priority
            className="h-10 w-auto sm:h-11"
          />
        </Link>

        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="Primary"
        >
          {site.nav.map((item) => {
            const current = isCurrent(item.href, pathname);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={current ? "page" : undefined}
                className={`relative rounded-md px-3.5 py-2 text-[0.95rem] font-semibold tracking-[-0.01em] transition-colors ${
                  current
                    ? "text-brand"
                    : "text-muted hover:text-ink"
                }`}
              >
                {item.label}
                <span
                  aria-hidden
                  className={`absolute inset-x-3.5 -bottom-0.5 h-[2px] rounded-full bg-accent transition-opacity ${
                    current ? "opacity-100" : "opacity-0"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center justify-end gap-1 sm:gap-2.5">
          <a
            href={site.ui.studentLoginHref}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden h-10 items-center px-2.5 text-[0.9rem] font-semibold tracking-[-0.01em] text-muted transition-colors hover:text-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand md:inline-flex"
          >
            {site.ui.studentLogin}
            <span className="sr-only"> (opens partner site)</span>
          </a>
          <Link
            href={site.headerCta.href}
            className="inline-flex h-10 items-center justify-center rounded-md bg-accent px-4 text-[0.9rem] font-semibold tracking-[-0.01em] text-accent-ink transition-colors hover:bg-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:px-5"
          >
            {site.headerCta.label}
          </Link>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-md text-brand transition-colors hover:bg-brand/5 lg:hidden"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={toggleMenu}
          >
            {open ? (
              <XIcon size={22} weight="regular" aria-hidden />
            ) : (
              <ListIcon size={22} weight="regular" aria-hidden />
            )}
            <span className="sr-only">
              {open ? site.ui.closeMenu : site.ui.openMenu}
            </span>
          </button>
        </div>
      </div>

      {open ? (
        <nav
          id={panelId}
          aria-label="Mobile"
          className="fixed inset-x-0 top-[4.75rem] bottom-0 z-40 overflow-y-auto border-t border-line bg-surface lg:hidden"
        >
          <ul className="mx-auto flex max-w-6xl flex-col px-4 py-2 sm:px-6">
            {site.nav.map((item) => {
              const current = isCurrent(item.href, pathname);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={current ? "page" : undefined}
                    className={`flex items-center justify-between border-b border-line py-4 text-[1.05rem] font-semibold tracking-[-0.01em] ${
                      current ? "text-brand" : "text-ink"
                    }`}
                    onClick={() => setOpenPath(null)}
                  >
                    {item.label}
                    {current ? (
                      <span className="size-1.5 rounded-full bg-accent" aria-hidden />
                    ) : null}
                  </Link>
                </li>
              );
            })}
            <li>
              <a
                href={site.ui.studentLoginHref}
                target="_blank"
                rel="noopener noreferrer"
                className="block border-b border-line py-4 text-[1.05rem] font-semibold tracking-[-0.01em] text-muted"
              >
                {site.ui.studentLogin}
                <span className="sr-only"> (opens partner site)</span>
              </a>
            </li>
            <li className="flex flex-col gap-4 py-6">
              <Link
                href={site.headerCta.href}
                className="inline-flex h-11 items-center justify-center rounded-md bg-accent px-5 text-[1rem] font-semibold tracking-[-0.01em] text-accent-ink"
                onClick={() => setOpenPath(null)}
              >
                {site.headerCta.label}
              </Link>
              <a
                href={`tel:${site.school.phoneTel}`}
                className="inline-flex items-center justify-center gap-2 text-[0.95rem] font-semibold text-brand"
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

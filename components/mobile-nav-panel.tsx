"use client";

import { useGSAP } from "@gsap/react";
import {
  ArrowRightIcon,
  CaretLeftIcon,
  CaretRightIcon,
  StudentIcon,
} from "@phosphor-icons/react/ssr";
import gsap from "gsap";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";

gsap.registerPlugin(useGSAP);

export type MobileMenuKey =
  | "florida-real-estate"
  | "professional-development"
  | "international-business"
  | "about"
  | "contact";

export type MobileMenuSection = {
  key: MobileMenuKey;
  label: string;
  href: string;
  lede: string;
  hasPanel: boolean;
  tone: string;
  columns: { heading: string; links: { label: string; href: string }[] }[];
  cta: { label: string; href: string; body: string };
};

type StackFrame =
  | { type: "root" }
  | { type: "section"; key: MobileMenuKey }
  | { type: "column"; key: MobileMenuKey; columnHeading: string };

function isExternal(href: string) {
  return (
    href.startsWith("http") ||
    href.startsWith("tel:") ||
    href.startsWith("mailto:")
  );
}

function NavLink({
  href,
  children,
  className,
  onNavigate,
  trailing,
}: {
  href: string;
  children: React.ReactNode;
  className: string;
  onNavigate: () => void;
  trailing?: React.ReactNode;
}) {
  const external = isExternal(href);
  const content = (
    <>
      <span className="min-w-0 flex-1 text-left">{children}</span>
      {trailing}
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        className={className}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        onClick={onNavigate}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={className} onClick={onNavigate}>
      {content}
    </Link>
  );
}

export function MobileNavPanel({
  open,
  panelId,
  sections,
  onClose,
}: {
  open: boolean;
  panelId: string;
  sections: MobileMenuSection[];
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const slideRef = useRef<HTMLDivElement>(null);
  const [stack, setStack] = useState<StackFrame[]>([{ type: "root" }]);
  const directionRef = useRef<"forward" | "back">("forward");
  const frame = stack[stack.length - 1] ?? { type: "root" as const };

  useEffect(() => {
    if (!open) {
      setStack([{ type: "root" }]);
      directionRef.current = "forward";
    }
  }, [open]);

  useGSAP(
    () => {
      if (!open || !panelRef.current) return;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;
      gsap.fromTo(
        panelRef.current,
        { autoAlpha: 0, y: -14 },
        { autoAlpha: 1, y: 0, duration: 0.35, ease: "power2.out" },
      );
    },
    { dependencies: [open] },
  );

  useGSAP(
    () => {
      if (!open || !slideRef.current) return;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      const fromX = directionRef.current === "forward" ? 56 : -40;
      gsap.fromTo(
        slideRef.current,
        { autoAlpha: 0.4, x: fromX },
        { autoAlpha: 1, x: 0, duration: 0.32, ease: "power2.out" },
      );
    },
    { dependencies: [stack, open] },
  );

  function push(next: StackFrame) {
    directionRef.current = "forward";
    setStack((prev) => [...prev, next]);
  }

  function pop() {
    directionRef.current = "back";
    setStack((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
  }

  if (!open) return null;

  const section =
    frame.type === "section" || frame.type === "column"
      ? sections.find((item) => item.key === frame.key)
      : undefined;
  const column =
    frame.type === "column" && section
      ? section.columns.find((item) => item.heading === frame.columnHeading)
      : undefined;

  const rowClass =
    "flex w-full items-center gap-3 py-3.5 text-[1.05rem] font-semibold text-black";
  const drillClass = `${rowClass} justify-between text-left transition-colors active:bg-black/[0.03]`;
  const leafClass = `${rowClass} justify-between border-b border-black/10 transition-colors active:bg-black/[0.03]`;

  return (
    <div
      ref={panelRef}
      id={panelId}
      className="mt-3 flex max-h-[min(78svh,40rem)] flex-col overflow-hidden rounded-[1.5rem] bg-white shadow-[0_24px_50px_rgba(0,0,0,0.18)] lg:hidden"
    >
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
        <div ref={slideRef} className="px-5 pb-5 pt-4 sm:px-6">
          {frame.type === "root" ? (
            <>
              <ul>
                {sections.map((item) => (
                  <li key={item.key} className="border-b border-black/8 last:border-b-0">
                    {item.hasPanel ? (
                      <button
                        type="button"
                        className={drillClass}
                        onClick={() => push({ type: "section", key: item.key })}
                      >
                        <span>{item.label}</span>
                        <CaretRightIcon
                          size={16}
                          weight="bold"
                          className="shrink-0 text-black/45"
                          aria-hidden
                        />
                      </button>
                    ) : (
                      <NavLink
                        href={item.href}
                        className={drillClass}
                        onNavigate={onClose}
                        trailing={
                          <CaretRightIcon
                            size={16}
                            weight="bold"
                            className="shrink-0 text-black/45"
                            aria-hidden
                          />
                        }
                      >
                        {item.label}
                      </NavLink>
                    )}
                  </li>
                ))}
              </ul>

              <div className="mt-2 border-t border-black/10 pt-1">
                <a
                  href={site.ui.studentLoginHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between py-3.5 text-[1.02rem] font-semibold text-black"
                  onClick={onClose}
                >
                  <span>{site.ui.studentLogin}</span>
                  <StudentIcon size={20} weight="regular" aria-hidden />
                </a>
              </div>
            </>
          ) : null}

          {frame.type === "section" && section ? (
            <>
              <button
                type="button"
                onClick={pop}
                className="inline-flex items-center gap-1.5 text-[0.95rem] font-semibold text-black"
              >
                <CaretLeftIcon size={16} weight="bold" aria-hidden />
                Back
              </button>

              <h2 className="mt-5 font-sans text-[1.55rem] font-bold leading-tight tracking-tight text-black">
                {section.label}
              </h2>
              <p className="mt-2 text-[0.95rem] leading-6 text-black/65">
                {section.lede}
              </p>
              <div className="mt-5 border-t border-black/10" aria-hidden />

              <ul className="mt-1">
                {section.columns.map((col) => (
                  <li key={col.heading} className="border-b border-black/8">
                    <button
                      type="button"
                      className={drillClass}
                      onClick={() =>
                        push({
                          type: "column",
                          key: section.key,
                          columnHeading: col.heading,
                        })
                      }
                    >
                      <span>{col.heading}</span>
                      <CaretRightIcon
                        size={16}
                        weight="bold"
                        className="shrink-0 text-black/45"
                        aria-hidden
                      />
                    </button>
                  </li>
                ))}
              </ul>

              <div
                className="mt-6 rounded-[1rem] px-4 py-4"
                style={{ backgroundColor: section.tone }}
              >
                <p className="text-[0.92rem] leading-6 text-black">
                  {section.cta.body}
                </p>
                <Link
                  href={section.cta.href}
                  onClick={onClose}
                  className="mt-4 inline-flex h-10 items-center gap-2 rounded-md border border-black bg-transparent px-4 text-[0.9rem] font-semibold text-black"
                >
                  {section.cta.label}
                  <ArrowRightIcon size={16} weight="bold" aria-hidden />
                </Link>
              </div>
            </>
          ) : null}

          {frame.type === "column" && section && column ? (
            <>
              <button
                type="button"
                onClick={pop}
                className="inline-flex items-center gap-1.5 text-[0.95rem] font-semibold text-black"
              >
                <CaretLeftIcon size={16} weight="bold" aria-hidden />
                Back
              </button>

              <h2 className="mt-5 font-sans text-[1.55rem] font-bold leading-tight tracking-tight text-black">
                {column.heading}
              </h2>
              <p className="mt-1 text-[0.9rem] text-black/55">{section.label}</p>
              <div className="mt-5 border-t border-black/10" aria-hidden />

              <ul className="mt-1">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <NavLink
                      href={link.href}
                      className={leafClass}
                      onNavigate={onClose}
                      trailing={
                        <ArrowRightIcon
                          size={16}
                          weight="regular"
                          className="shrink-0 text-black/40"
                          aria-hidden
                        />
                      }
                    >
                      {link.label}
                    </NavLink>
                  </li>
                ))}
              </ul>

              <div
                className="mt-6 rounded-[1rem] px-4 py-4"
                style={{ backgroundColor: section.tone }}
              >
                <p className="text-[0.92rem] leading-6 text-black">
                  {section.cta.body}
                </p>
                <Link
                  href={section.cta.href}
                  onClick={onClose}
                  className="mt-4 inline-flex h-10 items-center gap-2 rounded-md border border-black bg-transparent px-4 text-[0.9rem] font-semibold text-black"
                >
                  {section.cta.label}
                  <ArrowRightIcon size={16} weight="bold" aria-hidden />
                </Link>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

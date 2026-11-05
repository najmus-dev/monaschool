import Link from "next/link";
import type { ReactNode } from "react";
import { buttonClass } from "./button-styles";

export function ButtonLink({
  href,
  children,
  className = "",
  variant = "primary",
}: {
  href: string;
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "onDark";
}) {
  return (
    <Link
      href={href}
      className={`${buttonClass.base} ${buttonClass[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}

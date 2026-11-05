import { ArrowSquareOutIcon } from "@phosphor-icons/react/ssr";
import type { ReactNode } from "react";
import { buttonClass } from "./button-styles";

export function EnrollLink({
  href,
  children,
  className = "",
  iconClassName = "",
  variant = "primary",
}: {
  href: string;
  children: ReactNode;
  className?: string;
  iconClassName?: string;
  variant?: "primary" | "secondary";
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${buttonClass.base} ${buttonClass[variant]} ${className}`}
    >
      {children}
      <ArrowSquareOutIcon
        size={18}
        weight="regular"
        aria-hidden
        className={iconClassName}
      />
      <span className="sr-only"> (opens partner site)</span>
    </a>
  );
}

"use client";

import { site } from "@/content/site";
import { buttonClass } from "@/components/button-styles";
import { Container } from "@/components/container";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Container className="py-16 md:py-24">
      <h1 className="font-display text-3xl font-bold tracking-tight text-brand md:text-4xl">
        {site.ui.errorTitle}
      </h1>
      <p className="mt-3 max-w-[46ch] text-base leading-relaxed text-muted">
        {site.ui.errorBody}
      </p>
      <button
        type="button"
        className={`${buttonClass.base} ${buttonClass.primary} mt-8`}
        onClick={reset}
      >
        {site.ui.tryAgain}
      </button>
    </Container>
  );
}

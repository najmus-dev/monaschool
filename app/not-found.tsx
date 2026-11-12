import { site } from "@/content/site";
import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";

export default function NotFound() {
  return (
    <div className="relative bg-brand text-footer-text">
      <Container className="pb-16 pt-[calc(5.75rem+2.5rem)] md:pb-24 md:pt-[calc(5.75rem+3.25rem)]">
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-accent">
          404
        </p>
        <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
          {site.ui.notFoundTitle}
        </h1>
        <p className="mt-3 max-w-[46ch] text-base leading-relaxed text-white/75">
          {site.ui.notFoundBody}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/">{site.ui.homeLink}</ButtonLink>
          <ButtonLink href="/courses" variant="onDark">
            {site.coursesPage.title}
          </ButtonLink>
        </div>
      </Container>
    </div>
  );
}

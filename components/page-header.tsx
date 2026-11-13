import { Container } from "./container";

export function PageHeader({
  title,
  lede,
  eyebrow = "REIB Institute",
}: {
  title: string;
  lede: string;
  eyebrow?: string;
  image?: string | null;
}) {
  return (
    <div className="relative overflow-hidden border-b border-line/50 section-wash">
      <Container className="relative pb-12 pt-[calc(4.25rem+2.75rem)] md:pb-16 md:pt-[calc(4.25rem+3.5rem)]">
        <p className="text-sm font-semibold text-accent">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl font-display text-3xl font-bold tracking-tight text-brand text-balance md:text-5xl md:leading-[1.12]">
          {title}
        </h1>
        <div className="dot-rule mt-6 max-w-sm" aria-hidden />
        <p className="mt-6 max-w-2xl text-base leading-7 text-muted md:text-lg md:leading-8">
          {lede}
        </p>
      </Container>
    </div>
  );
}

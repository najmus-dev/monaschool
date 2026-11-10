import Image from "next/image";
import { Container } from "./container";

export function PageHeader({
  title,
  lede,
  image = "/images/courses-band.jpg",
}: {
  title: string;
  lede: string;
  eyebrow?: string;
  image?: string | null;
}) {
  return (
    <div className="relative overflow-hidden border-b border-line">
      {image ? (
        <>
          <Image
            src={image}
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-[50%_40%]"
            aria-hidden
            priority={false}
          />
          <div
            className="absolute inset-0 bg-[linear-gradient(180deg,rgb(255_255_255/0.55)_0%,rgb(255_255_255/0.72)_50%,rgb(255_255_255/0.88)_100%)]"
            aria-hidden
          />
        </>
      ) : (
        <div className="absolute inset-0 bg-brand" aria-hidden />
      )}

      <Container className="relative pb-14 pt-[calc(4.75rem+2.5rem)] text-center md:pb-20 md:pt-[calc(4.75rem+3.25rem)]">
        <h1
          className={`mx-auto max-w-4xl font-display text-3xl font-bold tracking-tight text-balance md:text-5xl md:leading-[1.1] ${
            image ? "text-brand" : "text-white"
          }`}
        >
          {title}
        </h1>
        <div className="mx-auto mt-5 h-0.5 w-16 bg-accent" aria-hidden />
        <p
          className={`mx-auto mt-5 max-w-2xl text-base leading-relaxed md:text-lg md:leading-8 ${
            image ? "text-muted" : "text-white/80"
          }`}
        >
          {lede}
        </p>
      </Container>
    </div>
  );
}

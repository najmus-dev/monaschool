export function SectionHeading({
  title,
  lede,
}: {
  title: string;
  lede?: string;
  eyebrow?: string;
}) {
  return (
    <div className="max-w-[40rem]">
      <h2 className="text-3xl font-bold tracking-tight text-brand md:text-4xl">
        {title}
      </h2>
      {lede ? (
        <p className="mt-3 max-w-[60ch] text-base leading-relaxed text-muted md:text-lg">
          {lede}
        </p>
      ) : null}
    </div>
  );
}

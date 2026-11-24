import Link from "next/link";

export function PathNextCta({
  title,
  body,
  href = "/contact",
  label = "Ask a question",
}: {
  title: string;
  body: string;
  href?: string;
  label?: string;
}) {
  return (
    <section className="border-y border-[#d5dde6] bg-white">
      <div className="mx-auto flex w-full max-w-[90rem] flex-col gap-6 px-4 py-10 sm:px-6 sm:py-12 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="font-sans text-[1.35rem] font-bold tracking-[-0.02em] text-[#001830] sm:text-[1.5rem]">
            {title}
          </h2>
          <p className="mt-2 text-[0.95rem] leading-7 text-[#5A6B7A]">{body}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href={href}
            className="inline-flex h-11 items-center justify-center rounded-[var(--radius-control)] bg-[#002448] px-5 text-[0.9rem] font-bold text-white transition-colors hover:bg-black"
          >
            {label}
          </Link>
        </div>
      </div>
    </section>
  );
}

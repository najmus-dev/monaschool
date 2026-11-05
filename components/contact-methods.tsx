import { site } from "@/content/site";

export function ContactMethods() {
  return (
    <div>
      <p className="text-sm text-muted">{site.school.address}</p>
      <p className="mt-1 text-sm text-muted">{site.school.hours}</p>
      <div className="mt-4 grid gap-2">
        <a
          className="text-2xl font-bold text-brand underline decoration-brand/25 underline-offset-4"
          href={`tel:${site.school.phoneTel}`}
        >
          {site.school.phoneDisplay}
        </a>
        <a
          className="text-base font-semibold text-ink underline decoration-line underline-offset-4 hover:text-brand"
          href={`mailto:${site.school.email}`}
        >
          {site.school.email}
        </a>
      </div>
    </div>
  );
}

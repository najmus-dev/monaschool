/** Soft silhouette motif — Overlake uses evergreen; REIB uses coastal/skyline shapes in brand color. */
export function BrandMotif({
  className = "",
  tone = "light",
}: {
  className?: string;
  tone?: "light" | "dark" | "accent";
}) {
  const fill =
    tone === "accent"
      ? "rgb(201 133 42 / 0.35)"
      : tone === "dark"
        ? "rgb(10 53 82 / 0.12)"
        : "rgb(255 255 255 / 0.14)";

  return (
    <svg
      className={className}
      viewBox="0 0 600 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        fill={fill}
        d="M0 180V95c28-18 54-12 78 2 22 13 41 8 62-6 24-16 48-14 72 4 20 15 42 12 64-2 26-16 52-10 76 8 18 14 40 16 62 4 24-14 48-8 70 10 16 14 36 18 56 8V180H0Z"
      />
      <path
        fill={fill}
        d="M40 180V120l22-48 20 48V180H40Zm70 0V108l18-36 16 36v72H110Zm62 0v-58l20-42 18 42v58h-38Zm66 0v-48l16-34 14 34v48h-30Zm58 0v-62l22-50 20 50v62h-42Z"
      />
    </svg>
  );
}

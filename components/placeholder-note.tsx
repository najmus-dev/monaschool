export function PlaceholderNote({ children }: { children: string }) {
  return (
    <p className="border border-accent/30 bg-accent-soft px-4 py-3 text-sm leading-6 text-ink">
      <strong className="font-semibold">Placeholder. </strong>
      {children}
    </p>
  );
}

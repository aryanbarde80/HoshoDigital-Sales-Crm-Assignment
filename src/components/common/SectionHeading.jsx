export function SectionHeading({ eyebrow, title, description, action }) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="space-y-2">
        {eyebrow ? (
          <p className="text-xs uppercase tracking-[0.32em] text-[var(--text-muted)]">{eyebrow}</p>
        ) : null}
        <div>
          <h2 className="text-2xl font-semibold text-[var(--text-primary)]">{title}</h2>
          {description ? (
            <p className="mt-2 max-w-3xl text-sm text-[var(--text-secondary)]">{description}</p>
          ) : null}
        </div>
      </div>
      {action}
    </div>
  );
}

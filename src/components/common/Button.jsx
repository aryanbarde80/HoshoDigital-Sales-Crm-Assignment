export function Button({
  children,
  className = "",
  intent = "primary",
  type = "button",
  ...props
}) {
  const intents = {
    primary: "bg-[var(--accent-strong)] text-white shadow-[var(--shadow-soft)]",
    secondary:
      "border border-[var(--border-strong)] bg-[var(--surface-muted)] text-[var(--text-primary)]",
    ghost: "bg-transparent text-[var(--text-secondary)] hover:bg-[var(--surface-muted)]"
  };

  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-semibold transition duration-200 hover:-translate-y-0.5 ${intents[intent]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

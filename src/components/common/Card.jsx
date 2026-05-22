export function Card({ children, className = "" }) {
  return (
    <section
      className={`rounded-[28px] border border-[var(--border-soft)] bg-[var(--surface-card)] p-5 shadow-[var(--shadow-card)] backdrop-blur-xl ${className}`}
    >
      {children}
    </section>
  );
}

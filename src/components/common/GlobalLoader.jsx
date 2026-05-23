import { motion } from "framer-motion";

export function GlobalLoader() {
  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-[var(--surface-app)]/96 backdrop-blur-xl">
      <div className="relative flex flex-col items-center gap-5 text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 3.5, ease: "linear" }}
          className="relative h-24 w-24 rounded-[28px] border border-white/10 bg-[var(--surface-card)] shadow-[var(--shadow-card)]"
        >
          <div className="absolute inset-3 rounded-[22px] bg-[linear-gradient(135deg,var(--accent-strong),var(--accent-secondary))]" />
          <div className="absolute inset-0 grid place-items-center text-3xl font-bold text-white">
            O
          </div>
        </motion.div>
        <div>
          <p className="text-xs uppercase tracking-[0.34em] text-[var(--text-muted)]">Orbit Sales OS</p>
          <h2 className="mt-3 text-2xl font-semibold text-[var(--text-primary)]">
            Preparing your revenue cockpit
          </h2>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            Loading dashboards, security controls, and role-aware workspaces.
          </p>
        </div>
      </div>
    </div>
  );
}

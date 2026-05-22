import { motion } from "framer-motion";
import { Card } from "./Card";

export function MetricCard({ label, value, hint, icon, accent = "cyan" }) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.18 }}>
      <Card className="relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-1 rounded-full" style={{ background: `var(--${accent})` }} />
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm text-[var(--text-muted)]">{label}</p>
            <h3 className="mt-3 text-2xl font-semibold text-[var(--text-primary)]">{value}</h3>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">{hint}</p>
          </div>
          <div className="rounded-2xl bg-[var(--surface-muted)] p-3 text-lg text-[var(--text-primary)]">
            {icon}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

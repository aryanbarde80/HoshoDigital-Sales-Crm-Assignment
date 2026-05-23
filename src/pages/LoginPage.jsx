import { motion } from "framer-motion";
import { FiArrowRight, FiBarChart2, FiLayers, FiTarget } from "react-icons/fi";
import { Seo } from "../components/common/Seo";
import { useAppContext } from "../context/AppContext";
import { Button } from "../components/common/Button";

export function LoginPage() {
  const { loginAsRole, roles } = useAppContext();

  return (
    <div className="min-h-screen bg-[var(--surface-app)] px-4 py-6">
      <Seo
        title="Login"
        path="/login"
        description="Sign in to Orbit Sales OS and explore role-based CRM dashboards for sales, marketing, product, and executive teams."
      />
      <div className="mx-auto grid min-h-[calc(100vh-3rem)] max-w-[1500px] overflow-hidden rounded-[36px] border border-[var(--border-soft)] bg-[var(--surface-card)] shadow-[var(--shadow-card)] lg:grid-cols-[1.1fr_0.9fr]">
        <div className="relative overflow-hidden p-8 lg:p-14">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(96,165,250,0.22),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(79,209,197,0.18),transparent_34%)]" />
          <div className="relative">
            <p className="text-xs uppercase tracking-[0.36em] text-[var(--text-muted)]">Internship Assignment Submission</p>
            <h1 className="mt-6 max-w-xl text-5xl font-semibold leading-tight text-[var(--text-primary)]">
              Sales management reimagined as a modern operating system.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-[var(--text-secondary)]">
              Orbit Sales OS is a polished CRM-style workspace purpose-built for pipeline control,
              customer intelligence, marketing ROI, product feedback capture, and executive-level
              decision support.
            </p>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {[
                {
                  title: "Revenue orchestration",
                  body: "Unified dashboards, weighted forecasting, and role-aware KPI tracking.",
                  icon: <FiBarChart2 />
                },
                {
                  title: "Customer command center",
                  body: "Profiles, interaction histories, account plans, and renewal signals.",
                  icon: <FiTarget />
                },
                {
                  title: "Cross-functional alignment",
                  body: "Marketing, product, and leadership workflows in one cohesive surface.",
                  icon: <FiLayers />
                }
              ].map((card, index) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="rounded-[28px] border border-[var(--border-soft)] bg-[var(--surface-muted)] p-5"
                >
                  <div className="inline-flex rounded-2xl bg-[var(--accent-strong)] p-3 text-white">{card.icon}</div>
                  <h2 className="mt-4 text-lg font-semibold">{card.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{card.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-[var(--border-soft)] bg-[var(--surface-sidebar)] p-8 lg:border-l lg:border-t-0 lg:p-10">
          <div className="mx-auto max-w-xl">
            <p className="text-xs uppercase tracking-[0.32em] text-[var(--text-muted)]">Mock authentication</p>
            <h2 className="mt-4 text-3xl font-semibold text-[var(--text-primary)]">Choose a workspace role</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
              The assignment allows clean role-based rendering without heavyweight enterprise auth,
              so this experience is optimized for quick evaluator access and fast feature exploration.
            </p>

            <div className="mt-8 grid gap-4">
              {roles.map((role, index) => (
                <motion.div
                  key={role.id}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 * index }}
                  className="rounded-[28px] border border-[var(--border-soft)] bg-[var(--surface-card)] p-5"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-[var(--text-primary)]">{role.title}</h3>
                      <p className="mt-2 text-sm text-[var(--text-secondary)]">{role.summary}</p>
                    </div>
                    <Button onClick={() => loginAsRole(role.id)}>
                      Enter workspace
                      <FiArrowRight />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

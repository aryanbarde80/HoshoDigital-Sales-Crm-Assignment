import { useEffect, useMemo } from "react";
import { useIdleTimer } from "react-idle-timer";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  FiActivity,
  FiBarChart2,
  FiBriefcase,
  FiCommand,
  FiGrid,
  FiLayers,
  FiLogOut,
  FiSliders,
  FiShield,
  FiTarget,
  FiUsers
} from "react-icons/fi";
import { useAppContext } from "../../context/AppContext";
import { initialsFromName } from "../../utils/formatters";
import { Button } from "../common/Button";
import { CustomSelect } from "../common/CustomSelect";

const navigation = [
  { to: "/", label: "Dashboard", icon: <FiGrid /> },
  { to: "/customers", label: "Customers", icon: <FiUsers /> },
  { to: "/pipeline", label: "Pipeline", icon: <FiTarget /> },
  { to: "/activities", label: "Activities", icon: <FiActivity /> },
  { to: "/team", label: "Team", icon: <FiBriefcase /> },
  { to: "/reports", label: "Reports", icon: <FiBarChart2 /> },
  { to: "/marketing", label: "Marketing", icon: <FiLayers /> },
  { to: "/product", label: "Product", icon: <FiLayers /> },
  { to: "/executive", label: "Executive", icon: <FiBarChart2 /> }
];

export function Shell({ children }) {
  const {
    data,
    logout,
    roles,
    session,
    switchRole,
    theme,
    themePresets,
    setTheme,
    resetDemo,
    recordAuditLog
  } =
    useAppContext();
  const location = useLocation();
  const currentUser = useMemo(
    () => data.users.find((user) => user.id === session.userId) ?? data.users[0],
    [data.users, session.userId]
  );
  const activeTheme = themePresets.find((preset) => preset.id === theme) ?? themePresets[0];

  useEffect(() => {
    if (!session.role) {
      return;
    }

    recordAuditLog({
      action: "view_route",
      entity: "navigation",
      detail: `Visited ${location.pathname}.`
    });
  }, [location.pathname, recordAuditLog, session.role]);

  useIdleTimer({
    timeout: 1000 * 60 * 15,
    onIdle: () => logout("idle"),
    debounce: 500
  });

  return (
    <div className="min-h-screen bg-[var(--surface-app)] text-[var(--text-primary)]">
      <div className="mx-auto grid min-h-screen max-w-[1680px] grid-cols-1 gap-4 px-3 py-3 md:px-4 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-6 lg:px-6 lg:py-4">
        <aside className="overflow-visible rounded-[32px] border border-[var(--border-soft)] bg-[var(--surface-sidebar)] p-4 shadow-[var(--shadow-card)] md:p-5">
          <Link to="/" className="flex items-center gap-3 rounded-3xl bg-[var(--surface-muted)] p-4">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[var(--accent-strong)] text-lg font-bold text-white">
              H
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-[var(--text-muted)]">Hosho Digital</p>
              <h1 className="text-lg font-semibold">Orbit Sales OS</h1>
            </div>
          </Link>

          <nav className="mt-6 flex gap-2 overflow-x-auto pb-1 lg:block lg:space-y-2">
            {navigation.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `flex shrink-0 items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-white/10 text-white shadow-[var(--shadow-soft)]"
                      : "text-[var(--text-secondary)] hover:bg-white/5 hover:text-[var(--text-primary)]"
                  }`
                }
              >
                <span className="text-base">{item.icon}</span>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="mt-6 rounded-[28px] bg-[var(--surface-muted)] p-4">
            <p className="text-xs uppercase tracking-[0.28em] text-[var(--text-muted)]">Role Switcher</p>
            <CustomSelect
              value={session.role}
              onChange={switchRole}
              options={roles.map((role) => ({
                value: role.id,
                label: role.title,
                description: role.summary
              }))}
              className="mt-3"
              buttonClassName="bg-[var(--surface-card)]"
              showSelectedDescription={false}
            />
            <p className="mt-3 text-sm text-[var(--text-secondary)]">
              {roles.find((role) => role.id === session.role)?.summary}
            </p>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-[28px] border border-[var(--border-soft)] bg-[var(--surface-muted)] p-4">
              <p className="text-xs uppercase tracking-[0.28em] text-[var(--text-muted)]">Theme Studio</p>
              <div className="mt-4 grid gap-2">
                {themePresets.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => setTheme(preset.id)}
                    className={`flex items-center justify-between rounded-2xl border px-3 py-3 text-left transition ${
                      preset.id === theme
                        ? "border-[var(--accent-strong)] bg-[var(--surface-card)] text-[var(--text-primary)]"
                        : "border-[var(--border-soft)] bg-transparent text-[var(--text-secondary)] hover:bg-white/5"
                    }`}
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium">{preset.name}</p>
                      <p className="mt-1 text-xs text-[var(--text-muted)]">Accent {preset.accent}</p>
                    </div>
                    <span
                      className="h-4 w-4 rounded-full border border-white/20"
                      style={{ backgroundColor: preset.accent }}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] border border-[var(--border-soft)] bg-[var(--surface-muted)] p-4">
              <p className="text-xs uppercase tracking-[0.28em] text-[var(--text-muted)]">Workspace</p>
              <div className="mt-3 flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[var(--accent-strong)] text-sm font-semibold text-white">
                  {initialsFromName(currentUser.name)}
                </div>
                <div className="min-w-0">
                  <p className="truncate font-semibold text-[var(--text-primary)]">{currentUser.name}</p>
                  <p className="text-sm text-[var(--text-secondary)]">{currentUser.region}</p>
                </div>
              </div>
              <div className="mt-4 rounded-[22px] border border-[var(--border-soft)] bg-[var(--surface-card)] p-3">
                <div className="flex items-center gap-2 text-[var(--text-primary)]">
                  <FiShield className="text-[var(--accent-strong)]" />
                  <p className="text-sm font-semibold">Secure session policy</p>
                </div>
                <p className="mt-2 text-xs leading-5 text-[var(--text-secondary)]">
                  Auto logout triggers after 15 minutes of inactivity. Audit events are recorded
                  for login, role changes, approvals, and route access.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-[28px] border border-[var(--border-soft)] bg-[var(--surface-muted)] p-4">
            <div className="flex items-center gap-2">
              <FiCommand className="text-[var(--accent-strong)]" />
              <p className="text-sm font-semibold text-[var(--text-primary)]">Command shelf</p>
            </div>
            <div className="mt-3 flex flex-wrap gap-2 text-xs text-[var(--text-secondary)]">
              <span className="rounded-full border border-[var(--border-soft)] px-3 py-1">Idle guard</span>
              <span className="rounded-full border border-[var(--border-soft)] px-3 py-1">Audit trail</span>
              <span className="rounded-full border border-[var(--border-soft)] px-3 py-1">Safe markdown</span>
              <span className="rounded-full border border-[var(--border-soft)] px-3 py-1">Form validation</span>
            </div>
          </div>

          <div className="mt-4 grid gap-3">
            <Button intent="secondary" onClick={resetDemo} className="justify-start">
              <FiSliders />
              Reset demo data
            </Button>
            <Button intent="ghost" onClick={() => logout()} className="justify-start">
              <FiLogOut />
              Sign out
            </Button>
          </div>
        </aside>

        <main className="flex min-h-[calc(100vh-2rem)] flex-col">
          <header className="rounded-[32px] border border-[var(--border-soft)] bg-[var(--surface-card)] px-5 py-5 shadow-[var(--shadow-card)] md:px-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-[var(--text-muted)]">
                  {location.pathname === "/" ? "Revenue command center" : "CRM workspace"}
                </p>
                <h2 className="mt-2 text-3xl font-semibold">
                  {roles.find((role) => role.id === session.role)?.title} workspace
                </h2>
                <p className="mt-2 max-w-2xl text-sm text-[var(--text-secondary)]">
                  Enterprise-ready sales orchestration across pipeline, customers, campaigns,
                  product intelligence, and executive analytics.
                </p>
              </div>
              <div className="rounded-[28px] bg-[var(--surface-muted)] px-4 py-3 text-sm text-[var(--text-secondary)]">
                <p className="font-semibold text-[var(--text-primary)]">Live context</p>
                <p>{currentUser.name}</p>
                <p>{roles.find((role) => role.id === session.role)?.title}</p>
                <p className="mt-2 text-xs text-[var(--text-muted)]">Theme: {activeTheme.name}</p>
              </div>
            </div>
          </header>

          <div className="mt-6 flex-1">{children}</div>
        </main>
      </div>
    </div>
  );
}

import { useMemo } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  FiActivity,
  FiBarChart2,
  FiBriefcase,
  FiGrid,
  FiLayers,
  FiLogOut,
  FiMoon,
  FiSun,
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
  const { data, logout, roles, session, switchRole, theme, toggleTheme, resetDemo } =
    useAppContext();
  const location = useLocation();
  const currentUser = useMemo(
    () => data.users.find((user) => user.id === session.userId) ?? data.users[0],
    [data.users, session.userId]
  );

  return (
    <div className="min-h-screen bg-[var(--surface-app)] text-[var(--text-primary)]">
      <div className="mx-auto grid min-h-screen max-w-[1600px] grid-cols-1 gap-6 px-4 py-4 lg:grid-cols-[280px_minmax(0,1fr)] lg:px-6">
        <aside className="rounded-[32px] border border-[var(--border-soft)] bg-[var(--surface-sidebar)] p-5 shadow-[var(--shadow-card)]">
          <Link to="/" className="flex items-center gap-3 rounded-3xl bg-[var(--surface-muted)] p-4">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[var(--accent-strong)] text-lg font-bold text-white">
              H
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-[var(--text-muted)]">Hosho Digital</p>
              <h1 className="text-lg font-semibold">Orbit Sales OS</h1>
            </div>
          </Link>

          <nav className="mt-6 space-y-2">
            {navigation.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
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

          <div className="mt-8 rounded-[28px] bg-[var(--surface-muted)] p-4">
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
            />
            <p className="mt-3 text-sm text-[var(--text-secondary)]">
              {roles.find((role) => role.id === session.role)?.summary}
            </p>
          </div>

          <div className="mt-6 rounded-[28px] border border-[var(--border-soft)] bg-[var(--surface-muted)] p-4">
            <p className="text-xs uppercase tracking-[0.28em] text-[var(--text-muted)]">Workspace</p>
            <div className="mt-3 flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[var(--accent-strong)] text-sm font-semibold text-white">
                {initialsFromName(currentUser.name)}
              </div>
              <div>
                <p className="font-semibold text-[var(--text-primary)]">{currentUser.name}</p>
                <p className="text-sm text-[var(--text-secondary)]">{currentUser.region}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-3">
            <Button intent="secondary" onClick={toggleTheme} className="justify-start">
              {theme === "dark" ? <FiSun /> : <FiMoon />}
              {theme === "dark" ? "Switch to light" : "Switch to dark"}
            </Button>
            <Button intent="secondary" onClick={resetDemo} className="justify-start">
              Reset demo data
            </Button>
            <Button intent="ghost" onClick={logout} className="justify-start">
              <FiLogOut />
              Sign out
            </Button>
          </div>
        </aside>

        <main className="flex min-h-[calc(100vh-2rem)] flex-col">
          <header className="rounded-[32px] border border-[var(--border-soft)] bg-[var(--surface-card)] px-6 py-5 shadow-[var(--shadow-card)]">
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
              </div>
            </div>
          </header>

          <div className="mt-6 flex-1">{children}</div>
        </main>
      </div>
    </div>
  );
}

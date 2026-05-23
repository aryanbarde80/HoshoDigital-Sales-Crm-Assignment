import { FiActivity, FiBarChart2, FiGlobe, FiTarget, FiTrendingUp } from "react-icons/fi";
import { Card } from "../components/common/Card";
import { MetricCard } from "../components/common/MetricCard";
import { Seo } from "../components/common/Seo";
import { SectionHeading } from "../components/common/SectionHeading";
import { Tag } from "../components/common/Tag";
import { useAppContext } from "../context/AppContext";
import { formatCompactCurrency, formatPercent } from "../utils/formatters";

export function ExecutivePage() {
  const { auditLogs, data, metrics, insights, themePresets, theme } = useAppContext();

  return (
    <div className="space-y-6">
      <Seo
        title="Executive Analytics"
        path="/executive"
        description="View strategic revenue KPIs, regional outlook, business performance, and real-time style executive insights in Orbit Sales OS."
      />
      <SectionHeading
        eyebrow="Executive analytics"
        title="Strategic revenue intelligence"
        description="A high-level, real-time style leadership view across company health, regional growth opportunity, and commercial risk."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Booked revenue"
          value={formatCompactCurrency(metrics.wonRevenue)}
          hint="Closed won revenue already secured"
          icon={<FiTrendingUp />}
          accent="cyan"
        />
        <MetricCard
          label="Forecast"
          value={formatCompactCurrency(metrics.forecastValue)}
          hint="Weighted near-term revenue projection"
          icon={<FiBarChart2 />}
          accent="blue"
        />
        <MetricCard
          label="Win rate"
          value={formatPercent(metrics.winRate, 0)}
          hint="Performance across closed deals"
          icon={<FiTarget />}
          accent="amber"
        />
        <MetricCard
          label="Regional spread"
          value={`${data.regionalPerformance.length} zones`}
          hint="Markets tracked in the current business view"
          icon={<FiGlobe />}
          accent="pink"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.75fr_1.25fr]">
        <Card>
          <p className="text-xs uppercase tracking-[0.28em] text-[var(--text-muted)]">
            Leadership brief
          </p>
          <div className="mt-4 space-y-4">
            {insights.map((insight) => (
              <div key={insight.id} className="rounded-[24px] bg-[var(--surface-muted)] p-4">
                <h3 className="font-semibold text-[var(--text-primary)]">{insight.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                  {insight.body}
                </p>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <p className="text-xs uppercase tracking-[0.28em] text-[var(--text-muted)]">
            Region-by-region outlook
          </p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {data.regionalPerformance.map((region) => (
              <div
                key={region.region}
                className="rounded-[24px] border border-[var(--border-soft)] bg-[var(--surface-muted)] p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-semibold text-[var(--text-primary)]">{region.region}</h3>
                  <span className="text-sm text-[var(--text-secondary)]">
                    {formatPercent(region.winRate, 0)}
                  </span>
                </div>
                <p className="mt-2 text-sm text-[var(--text-secondary)]">
                  Revenue {formatCompactCurrency(region.revenue)} • Pipeline{" "}
                  {formatCompactCurrency(region.pipeline)}
                </p>
                <div className="mt-4 h-2 rounded-full bg-black/15">
                  <div
                    className="h-2 rounded-full bg-[var(--accent-strong)]"
                    style={{ width: `${Math.min(region.roi * 18, 100)}%` }}
                  />
                </div>
                <p className="mt-3 text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
                  Growth ROI {region.roi.toFixed(1)}x
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <Card>
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-[var(--text-muted)]">
                Audit stream
              </p>
              <h3 className="mt-2 text-lg font-semibold text-[var(--text-primary)]">
                Role actions and approvals
              </h3>
            </div>
            <Tag tone="info">{auditLogs.length} recent events</Tag>
          </div>
          <div className="mt-4 space-y-3">
            {auditLogs.slice(0, 8).map((entry) => (
              <div
                key={entry.id}
                className="rounded-[22px] border border-[var(--border-soft)] bg-[var(--surface-muted)] p-4"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-2">
                    <FiActivity className="text-[var(--accent-strong)]" />
                    <p className="font-semibold capitalize text-[var(--text-primary)]">
                      {entry.action.replaceAll("_", " ")}
                    </p>
                  </div>
                  <Tag tone={entry.severity === "warning" ? "warning" : "info"}>
                    {entry.role}
                  </Tag>
                </div>
                <p className="mt-2 text-sm text-[var(--text-secondary)]">{entry.detail}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
                  {entry.actor} • {new Date(entry.timestamp).toLocaleString("en-US")}
                </p>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <p className="text-xs uppercase tracking-[0.28em] text-[var(--text-muted)]">
            Experience controls
          </p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="rounded-[24px] border border-[var(--border-soft)] bg-[var(--surface-muted)] p-4">
              <p className="text-sm font-semibold text-[var(--text-primary)]">Active theme</p>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                {themePresets.find((preset) => preset.id === theme)?.name}
              </p>
            </div>
            <div className="rounded-[24px] border border-[var(--border-soft)] bg-[var(--surface-muted)] p-4">
              <p className="text-sm font-semibold text-[var(--text-primary)]">Session policy</p>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                Auto logout after 15 minutes of inactivity with audit capture.
              </p>
            </div>
            <div className="rounded-[24px] border border-[var(--border-soft)] bg-[var(--surface-muted)] p-4">
              <p className="text-sm font-semibold text-[var(--text-primary)]">Crash handling</p>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                Error boundaries wrap the workspace and Sentry can activate via environment DSN.
              </p>
            </div>
            <div className="rounded-[24px] border border-[var(--border-soft)] bg-[var(--surface-muted)] p-4">
              <p className="text-sm font-semibold text-[var(--text-primary)]">Input hardening</p>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                Yup validation protects forms and sanitized markdown protects rich text surfaces.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

import { FiActivity, FiBarChart2, FiDollarSign, FiTrendingUp, FiUsers } from "react-icons/fi";
import { RevenueTrendChart, PipelineFunnelChart, RegionPerformanceChart, WinLossChart } from "../components/charts/Charts";
import { Card } from "../components/common/Card";
import { MetricCard } from "../components/common/MetricCard";
import { SectionHeading } from "../components/common/SectionHeading";
import { useAppContext } from "../context/AppContext";
import { formatCompactCurrency, formatPercent } from "../utils/formatters";

export function DashboardPage() {
  const { data, insights, metrics } = useAppContext();

  return (
    <div className="space-y-6">
      <SectionHeading
        eyebrow="Overview"
        title="Performance cockpit"
        description="A single operational view of quota progress, pipeline strength, customer health, and campaign efficiency."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <MetricCard label="Open pipeline" value={formatCompactCurrency(metrics.openPipelineValue)} hint="Value across live opportunities" icon={<FiDollarSign />} accent="cyan" />
        <MetricCard label="Weighted forecast" value={formatCompactCurrency(metrics.forecastValue)} hint="Probability-adjusted near-term revenue" icon={<FiTrendingUp />} accent="blue" />
        <MetricCard label="Quota attainment" value={formatPercent(metrics.quotaAttainment, 0)} hint="Team-wide progress to goal" icon={<FiBarChart2 />} accent="amber" />
        <MetricCard label="Customer health" value={`${Math.round(metrics.averageHealth)}/100`} hint="Average account health across the book" icon={<FiUsers />} accent="pink" />
        <MetricCard label="Campaign ROI" value={`${metrics.campaignRoi.toFixed(1)}x`} hint="Influenced revenue over spend" icon={<FiActivity />} accent="emerald" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <RevenueTrendChart series={data.revenueSeries} />
        <PipelineFunnelChart opportunities={data.opportunities} />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <RegionPerformanceChart regions={data.regionalPerformance} />
        <WinLossChart data={data.winLoss} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <Card>
          <p className="text-xs uppercase tracking-[0.28em] text-[var(--text-muted)]">Strategic insights</p>
          <div className="mt-4 space-y-4">
            {insights.map((insight) => (
              <div key={insight.id} className="rounded-[24px] bg-[var(--surface-muted)] p-4">
                <h3 className="font-semibold text-[var(--text-primary)]">{insight.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{insight.body}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <p className="text-xs uppercase tracking-[0.28em] text-[var(--text-muted)]">Forecast widgets</p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {data.regionalPerformance.map((region) => (
              <div key={region.region} className="rounded-[24px] border border-[var(--border-soft)] bg-[var(--surface-muted)] p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-[var(--text-primary)]">{region.region}</h3>
                  <span className="text-sm text-[var(--text-secondary)]">{formatPercent(region.winRate, 0)} win rate</span>
                </div>
                <div className="mt-3 h-2 rounded-full bg-black/15">
                  <div className="h-2 rounded-full bg-[var(--accent-strong)]" style={{ width: `${Math.min(region.roi * 18, 100)}%` }} />
                </div>
                <div className="mt-3 flex items-center justify-between text-sm text-[var(--text-secondary)]">
                  <span>Revenue {formatCompactCurrency(region.revenue)}</span>
                  <span>ROI {region.roi.toFixed(1)}x</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

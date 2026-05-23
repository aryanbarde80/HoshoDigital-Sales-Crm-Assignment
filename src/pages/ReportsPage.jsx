import { RevenueTrendChart, RegionPerformanceChart, WinLossChart } from "../components/charts/Charts";
import { Card } from "../components/common/Card";
import { Seo } from "../components/common/Seo";
import { SectionHeading } from "../components/common/SectionHeading";
import { useAppContext } from "../context/AppContext";
import { formatCompactCurrency, formatPercent } from "../utils/formatters";

export function ReportsPage() {
  const { data, metrics } = useAppContext();

  return (
    <div className="space-y-6">
      <Seo
        title="Reports and Analytics"
        path="/reports"
        description="Explore forecasting visuals, revenue reporting, win-loss analysis, and regional commercial performance in Orbit Sales OS."
      />
      <SectionHeading
        eyebrow="Reports & analytics"
        title="Forecasting, region analysis, and win/loss intelligence"
        description="A presentation-ready reporting layer built on realistic demo data and aligned to the submission brief."
      />

      <div className="grid gap-6 xl:grid-cols-2">
        <RevenueTrendChart series={data.revenueSeries} />
        <RegionPerformanceChart regions={data.regionalPerformance} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.75fr_1.25fr]">
        <WinLossChart data={data.winLoss} />
        <Card>
          <p className="text-xs uppercase tracking-[0.28em] text-[var(--text-muted)]">Forecast narrative</p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <ReportCallout
              title="Weighted forecast"
              body={`${formatCompactCurrency(metrics.forecastValue)} is expected to land from the current open book, led by expansion and renewal plays.`}
            />
            <ReportCallout
              title="Pipeline coverage"
              body={`${(metrics.openPipelineValue / metrics.wonRevenue).toFixed(1)}x coverage against booked wins indicates healthy forward demand generation.`}
            />
            <ReportCallout
              title="Regional consistency"
              body={`${data.regionalPerformance.filter((item) => item.winRate >= 0.3).length} regions are above the 30% win-rate benchmark.`}
            />
            <ReportCallout
              title="Quota pulse"
              body={`${formatPercent(metrics.quotaAttainment, 0)} of quota is already secured, leaving meaningful headroom for late-quarter acceleration.`}
            />
          </div>
        </Card>
      </div>
    </div>
  );
}

function ReportCallout({ title, body }) {
  return (
    <div className="rounded-[24px] bg-[var(--surface-muted)] p-4">
      <h3 className="font-semibold text-[var(--text-primary)]">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{body}</p>
    </div>
  );
}

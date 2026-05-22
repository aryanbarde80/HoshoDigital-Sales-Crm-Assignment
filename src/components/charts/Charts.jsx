import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Funnel,
  FunnelChart,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { buildPipelineStageSummary } from "../../utils/metrics";
import { Card } from "../common/Card";

const PIE_COLORS = ["#4fd1c5", "#60a5fa", "#f59e0b", "#f472b6"];

export function RevenueTrendChart({ series }) {
  return (
    <Card className="h-[360px]">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Revenue vs Forecast</h3>
        <p className="text-sm text-[var(--text-secondary)]">Momentum across actuals, forecast, and pipeline coverage.</p>
      </div>
      <ResponsiveContainer width="100%" height="85%">
        <AreaChart data={series}>
          <defs>
            <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#60a5fa" stopOpacity={0.5} />
              <stop offset="100%" stopColor="#60a5fa" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="rgba(148, 163, 184, 0.16)" vertical={false} />
          <XAxis dataKey="month" tick={{ fill: "var(--text-muted)" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "var(--text-muted)" }} axisLine={false} tickLine={false} />
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey="actual"
            stroke="#60a5fa"
            fill="url(#actualGradient)"
            strokeWidth={3}
            name="Actual"
          />
          <Area type="monotone" dataKey="forecast" stroke="#4fd1c5" fillOpacity={0} strokeWidth={2} name="Forecast" />
          <Area type="monotone" dataKey="pipeline" stroke="#f59e0b" fillOpacity={0} strokeWidth={2} name="Pipeline" />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
}

export function PipelineFunnelChart({ opportunities }) {
  const data = buildPipelineStageSummary(opportunities)
    .filter((item) => !item.stage.startsWith("Closed"))
    .map((item) => ({
      value: item.value,
      name: item.stage
    }));

  return (
    <Card className="h-[360px]">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Pipeline Funnel</h3>
        <p className="text-sm text-[var(--text-secondary)]">Progression through active selling stages.</p>
      </div>
      <ResponsiveContainer width="100%" height="85%">
        <FunnelChart>
          <Tooltip />
          <Funnel dataKey="value" data={data} isAnimationActive>
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={PIE_COLORS[index % PIE_COLORS.length]} />
            ))}
          </Funnel>
        </FunnelChart>
      </ResponsiveContainer>
    </Card>
  );
}

export function RegionPerformanceChart({ regions }) {
  return (
    <Card className="h-[360px]">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Regional Performance</h3>
        <p className="text-sm text-[var(--text-secondary)]">Revenue and weighted pipeline by geography.</p>
      </div>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={regions}>
          <CartesianGrid stroke="rgba(148, 163, 184, 0.16)" vertical={false} />
          <XAxis dataKey="region" tick={{ fill: "var(--text-muted)" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "var(--text-muted)" }} axisLine={false} tickLine={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="revenue" fill="#60a5fa" radius={[12, 12, 0, 0]} name="Revenue" />
          <Bar dataKey="pipeline" fill="#4fd1c5" radius={[12, 12, 0, 0]} name="Pipeline" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}

export function WinLossChart({ data }) {
  return (
    <Card className="h-[360px]">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Win / Loss Distribution</h3>
        <p className="text-sm text-[var(--text-secondary)]">Closed outcomes compared to the active book of business.</p>
      </div>
      <ResponsiveContainer width="100%" height="85%">
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="label" innerRadius={70} outerRadius={110} paddingAngle={4}>
            {data.map((entry, index) => (
              <Cell key={entry.label} fill={PIE_COLORS[index % PIE_COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
}

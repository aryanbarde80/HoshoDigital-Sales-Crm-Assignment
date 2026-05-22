import { Card } from "../components/common/Card";
import { DataTable } from "../components/common/DataTable";
import { SectionHeading } from "../components/common/SectionHeading";
import { Tag } from "../components/common/Tag";
import { useAppContext } from "../context/AppContext";
import { formatCompactCurrency, formatPercent } from "../utils/formatters";

export function TeamPage() {
  const { data, updateDiscountRequest } = useAppContext();

  const leaderboardRows = data.targets.map((target) => {
    const owner = data.users.find((user) => user.id === target.ownerId);
    return {
      id: target.id,
      owner: owner?.name,
      quota: formatCompactCurrency(target.quota),
      attained: formatCompactCurrency(target.attained),
      attainment: formatPercent(target.attained / target.quota, 0),
      meetings: target.meetings,
      winRate: formatPercent(target.winRate, 0)
    };
  });

  const territoryColumns = [
    { key: "name", label: "Territory" },
    {
      key: "ownerId",
      label: "Owner",
      render: (territory) => data.users.find((user) => user.id === territory.ownerId)?.name
    },
    { key: "leadsOpen", label: "Open leads" },
    {
      key: "coverage",
      label: "Coverage",
      render: (territory) => formatPercent(territory.coverage, 0)
    }
  ];

  return (
    <div className="space-y-6">
      <SectionHeading
        eyebrow="Team performance"
        title="Leaderboard, territories, and approvals"
        description="Monitor target progress, distribute territories cleanly, and review discount exceptions with margin awareness."
      />

      <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <Card>
          <h3 className="text-lg font-semibold text-[var(--text-primary)]">Sales leaderboard</h3>
          <div className="mt-5 space-y-4">
            {leaderboardRows.map((row, index) => (
              <div key={row.id} className="rounded-[24px] border border-[var(--border-soft)] bg-[var(--surface-muted)] p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">Rank #{index + 1}</p>
                    <h3 className="mt-2 text-lg font-semibold text-[var(--text-primary)]">{row.owner}</h3>
                  </div>
                  <Tag tone={index === 0 ? "success" : "info"}>{row.attainment}</Tag>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-4">
                  <MiniStat label="Quota" value={row.quota} />
                  <MiniStat label="Attained" value={row.attained} />
                  <MiniStat label="Meetings" value={row.meetings} />
                  <MiniStat label="Win rate" value={row.winRate} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="space-y-6">
          <Card>
            <h3 className="text-lg font-semibold text-[var(--text-primary)]">Territory ownership</h3>
            <div className="mt-4">
              <DataTable columns={territoryColumns} rows={data.territories} />
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold text-[var(--text-primary)]">Discount approvals</h3>
            <div className="mt-4 space-y-4">
              {data.discountRequests.map((request) => {
                const opportunity = data.opportunities.find((item) => item.id === request.opportunityId);
                return (
                  <div key={request.id} className="rounded-[24px] bg-[var(--surface-muted)] p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <h4 className="font-semibold text-[var(--text-primary)]">{opportunity?.name}</h4>
                        <p className="mt-1 text-sm text-[var(--text-secondary)]">{request.percent}% requested discount</p>
                      </div>
                      <Tag tone={request.status === "Approved" ? "success" : request.status === "Rejected" ? "danger" : "warning"}>
                        {request.status}
                      </Tag>
                    </div>
                    {request.status === "Pending" ? (
                      <div className="mt-4 flex gap-3">
                        <button
                          onClick={() => updateDiscountRequest(request.id, "Approved")}
                          className="rounded-2xl bg-emerald-500/15 px-4 py-2 text-sm font-semibold text-emerald-300"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => updateDiscountRequest(request.id, "Rejected")}
                          className="rounded-2xl bg-rose-500/15 px-4 py-2 text-sm font-semibold text-rose-300"
                        >
                          Reject
                        </button>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function MiniStat({ label, value }) {
  return (
    <div className="rounded-[20px] border border-[var(--border-soft)] px-3 py-3">
      <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">{label}</p>
      <p className="mt-2 font-semibold text-[var(--text-primary)]">{value}</p>
    </div>
  );
}

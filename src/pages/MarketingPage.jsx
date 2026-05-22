import { Card } from "../components/common/Card";
import { DataTable } from "../components/common/DataTable";
import { SectionHeading } from "../components/common/SectionHeading";
import { Tag } from "../components/common/Tag";
import { useAppContext } from "../context/AppContext";
import { formatCompactCurrency } from "../utils/formatters";

export function MarketingPage() {
  const { data } = useAppContext();

  const campaignColumns = [
    { key: "name", label: "Campaign" },
    { key: "channel", label: "Channel" },
    { key: "spend", label: "Spend", render: (campaign) => formatCompactCurrency(campaign.spend) },
    {
      key: "influencedRevenue",
      label: "Influenced revenue",
      render: (campaign) => formatCompactCurrency(campaign.influencedRevenue)
    },
    { key: "qualifiedLeads", label: "Qualified leads" },
    { key: "roi", label: "ROI", render: (campaign) => `${campaign.roi.toFixed(1)}x` }
  ];

  return (
    <div className="space-y-6">
      <SectionHeading
        eyebrow="Marketing"
        title="Campaign tracking, lead sharing, and segmentation"
        description="Measure sales influence, surface ROI, and give marketing its own intelligent operating view inside the CRM."
      />

      <Card>
        <DataTable columns={campaignColumns} rows={data.campaigns} />
      </Card>

      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <Card>
          <p className="text-xs uppercase tracking-[0.28em] text-[var(--text-muted)]">Customer segments</p>
          <div className="mt-4 space-y-4">
            {data.customerSegments.map((segment) => (
              <div key={segment.id} className="rounded-[24px] bg-[var(--surface-muted)] p-4">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-semibold text-[var(--text-primary)]">{segment.name}</h3>
                  <Tag tone={segment.trend.startsWith("+") ? "success" : "warning"}>{segment.trend}</Tag>
                </div>
                <p className="mt-2 text-sm text-[var(--text-secondary)]">
                  {segment.accounts} accounts • {formatCompactCurrency(segment.avgDealSize)} average deal size
                </p>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <p className="text-xs uppercase tracking-[0.28em] text-[var(--text-muted)]">Lead sharing highlights</p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {data.campaigns.map((campaign) => (
              <div key={campaign.id} className="rounded-[24px] border border-[var(--border-soft)] bg-[var(--surface-muted)] p-4">
                <h3 className="font-semibold text-[var(--text-primary)]">{campaign.name}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                  {campaign.qualifiedLeads} qualified leads have been passed to the sales team with a current influenced pipeline of {formatCompactCurrency(campaign.influencedRevenue)}.
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

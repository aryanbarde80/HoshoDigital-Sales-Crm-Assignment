import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { Card } from "../components/common/Card";
import { EmptyState } from "../components/common/EmptyState";
import { MarkdownBlock } from "../components/common/MarkdownBlock";
import { Seo } from "../components/common/Seo";
import { SectionHeading } from "../components/common/SectionHeading";
import { Tag } from "../components/common/Tag";
import { useAppContext } from "../context/AppContext";
import { formatCompactCurrency, formatDate } from "../utils/formatters";

export function CustomerDetailPage() {
  const { customerId } = useParams();
  const { data } = useAppContext();

  const customer = data.customers.find((item) => item.id === customerId);
  const interactions = useMemo(
    () => data.interactions.filter((item) => item.customerId === customerId),
    [customerId, data.interactions]
  );
  const activities = useMemo(
    () => data.activities.filter((item) => item.customerId === customerId),
    [customerId, data.activities]
  );
  const opportunities = useMemo(
    () => data.opportunities.filter((item) => item.customerId === customerId),
    [customerId, data.opportunities]
  );

  if (!customer) {
    return (
      <EmptyState
        title="Customer not found"
        body="The selected account could not be located in the demo dataset."
      />
    );
  }

  return (
    <div className="space-y-6">
      <Seo
        title={customer.name}
        path={`/customers/${customer.id}`}
        description={`Explore account history, activities, opportunity portfolio, and renewal context for ${customer.name}.`}
      />
      <SectionHeading
        eyebrow="Customer profile"
        title={customer.name}
        description="Complete account context across history, activities, account plans, and active revenue plays."
        action={
          <Link to="/customers" className="text-sm text-[var(--accent-strong)]">
            Back to customers
          </Link>
        }
      />

      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <Card>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm text-[var(--text-secondary)]">{customer.industry}</p>
              <h3 className="mt-2 text-2xl font-semibold text-[var(--text-primary)]">
                {customer.contactName}
              </h3>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">{customer.contactEmail}</p>
            </div>
            <Tag tone="info">{customer.tier}</Tag>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Stat label="Annual value" value={formatCompactCurrency(customer.annualValue)} />
            <Stat label="Renewal" value={formatDate(customer.renewalDate)} />
            <Stat label="Health score" value={`${customer.healthScore}/100`} />
            <Stat label="Satisfaction" value={`${customer.satisfaction}/5`} />
          </div>
          <div className="mt-6 rounded-[24px] bg-[var(--surface-muted)] p-4">
            <p className="text-xs uppercase tracking-[0.28em] text-[var(--text-muted)]">
              Account plan
            </p>
            <MarkdownBlock content={customer.accountPlan} className="mt-3" />
          </div>
          <div className="mt-4 rounded-[24px] bg-[var(--surface-muted)] p-4">
            <p className="text-xs uppercase tracking-[0.28em] text-[var(--text-muted)]">
              Account notes
            </p>
            <MarkdownBlock content={customer.notes} className="mt-3" />
          </div>
        </Card>

        <Card>
          <p className="text-xs uppercase tracking-[0.28em] text-[var(--text-muted)]">
            Interaction history
          </p>
          <div className="mt-5 space-y-4">
            {interactions.map((interaction) => (
              <div
                key={interaction.id}
                className="rounded-[24px] border border-[var(--border-soft)] bg-[var(--surface-muted)] p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-semibold text-[var(--text-primary)]">{interaction.type}</h3>
                  <span className="text-sm text-[var(--text-secondary)]">
                    {formatDate(interaction.date)}
                  </span>
                </div>
                <p className="mt-2 text-sm text-[var(--text-secondary)]">{interaction.note}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card>
          <p className="text-xs uppercase tracking-[0.28em] text-[var(--text-muted)]">
            Opportunity portfolio
          </p>
          <div className="mt-4 space-y-4">
            {opportunities.map((opportunity) => (
              <div key={opportunity.id} className="rounded-[24px] bg-[var(--surface-muted)] p-4">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-semibold text-[var(--text-primary)]">{opportunity.name}</h3>
                  <Tag
                    tone={
                      opportunity.status === "Won"
                        ? "success"
                        : opportunity.status === "Lost"
                          ? "danger"
                          : "info"
                    }
                  >
                    {opportunity.stage}
                  </Tag>
                </div>
                <div className="mt-3 flex items-center justify-between text-sm text-[var(--text-secondary)]">
                  <span>{formatCompactCurrency(opportunity.value)}</span>
                  <span>{opportunity.probability}% probability</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <p className="text-xs uppercase tracking-[0.28em] text-[var(--text-muted)]">
            Activities and reminders
          </p>
          <div className="mt-4 space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="rounded-[24px] bg-[var(--surface-muted)] p-4">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-semibold text-[var(--text-primary)]">{activity.title}</h3>
                  <Tag tone={activity.outcome === "Done" ? "success" : "warning"}>
                    {activity.outcome}
                  </Tag>
                </div>
                <p className="mt-2 text-sm text-[var(--text-secondary)]">{activity.note}</p>
                <p className="mt-3 text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
                  {activity.type} • {formatDate(activity.dueDate)}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-[20px] border border-[var(--border-soft)] bg-[var(--surface-muted)] p-4">
      <p className="text-xs uppercase tracking-[0.22em] text-[var(--text-muted)]">{label}</p>
      <p className="mt-2 text-lg font-semibold text-[var(--text-primary)]">{value}</p>
    </div>
  );
}

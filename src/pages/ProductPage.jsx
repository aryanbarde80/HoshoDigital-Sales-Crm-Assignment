import { Card } from "../components/common/Card";
import { Seo } from "../components/common/Seo";
import { SectionHeading } from "../components/common/SectionHeading";
import { Tag } from "../components/common/Tag";
import { useAppContext } from "../context/AppContext";
import { formatDate } from "../utils/formatters";

export function ProductPage() {
  const { data } = useAppContext();

  return (
    <div className="space-y-6">
      <Seo
        title="Product"
        path="/product"
        description="Manage product updates, customer feedback themes, and feature request prioritization from the product management workspace."
      />
      <SectionHeading
        eyebrow="Product management"
        title="Updates, feature requests, and feedback intelligence"
        description="Translate field insight into roadmap decisions while equipping sales with fresh product context."
      />

      <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        <Card>
          <p className="text-xs uppercase tracking-[0.28em] text-[var(--text-muted)]">Product updates</p>
          <div className="mt-4 space-y-4">
            {data.productUpdates.map((update) => (
              <div key={update.id} className="rounded-[24px] bg-[var(--surface-muted)] p-4">
                <h3 className="font-semibold text-[var(--text-primary)]">{update.title}</h3>
                <p className="mt-2 text-sm text-[var(--text-secondary)]">{update.summary}</p>
                <p className="mt-3 text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
                  {update.audience} • {formatDate(update.launchDate)}
                </p>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <p className="text-xs uppercase tracking-[0.28em] text-[var(--text-muted)]">Feature request pipeline</p>
          <div className="mt-4 space-y-4">
            {data.featureRequests.map((request) => {
              const customer = data.customers.find((item) => item.id === request.customerId);
              return (
                <div key={request.id} className="rounded-[24px] border border-[var(--border-soft)] bg-[var(--surface-muted)] p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h3 className="font-semibold text-[var(--text-primary)]">{request.title}</h3>
                      <p className="mt-1 text-sm text-[var(--text-secondary)]">{customer?.name}</p>
                    </div>
                    <div className="flex gap-2">
                      <Tag tone={request.priority === "Critical" ? "danger" : request.priority === "High" ? "warning" : "info"}>
                        {request.priority}
                      </Tag>
                      <Tag tone="info">{request.status}</Tag>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-[var(--text-secondary)]">{request.votes} field votes captured from customer-facing teams.</p>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      <Card>
        <p className="text-xs uppercase tracking-[0.28em] text-[var(--text-muted)]">Voice of customer feed</p>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {data.feedbackItems.map((feedback) => {
            const customer = data.customers.find((item) => item.id === feedback.customerId);
            return (
              <div key={feedback.id} className="rounded-[24px] border border-[var(--border-soft)] bg-[var(--surface-muted)] p-4">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-semibold text-[var(--text-primary)]">{feedback.theme}</h3>
                  <Tag tone={feedback.sentiment === "Positive" ? "success" : feedback.sentiment === "Negative" ? "danger" : "warning"}>
                    {feedback.sentiment}
                  </Tag>
                </div>
                <p className="mt-2 text-sm text-[var(--text-secondary)]">{feedback.summary}</p>
                <p className="mt-3 text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
                  {customer?.name} • {feedback.source}
                </p>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

import { useMemo, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { Button } from "../components/common/Button";
import { Card } from "../components/common/Card";
import { CustomSelect } from "../components/common/CustomSelect";
import { EmptyState } from "../components/common/EmptyState";
import { Seo } from "../components/common/Seo";
import { SectionHeading } from "../components/common/SectionHeading";
import { Tag } from "../components/common/Tag";
import { useAppContext } from "../context/AppContext";
import { formatCompactCurrency, formatDate } from "../utils/formatters";
import { opportunitySchema, validateForm } from "../utils/validation";

const STAGES = ["Qualified", "Proposal", "Negotiation", "At Risk", "Closed Won", "Closed Lost"];

const blankOpportunity = {
  name: "",
  customerId: "",
  stage: "Qualified",
  probability: 45,
  value: 100000,
  expectedClose: "2026-06-30",
  region: "North America",
  source: "Outbound",
  status: "Open"
};

export function PipelinePage() {
  const { data, session, upsertOpportunity } = useAppContext();
  const [draft, setDraft] = useState({
    ...blankOpportunity,
    customerId: data.customers[0]?.id ?? ""
  });
  const [errors, setErrors] = useState({});

  const grouped = useMemo(
    () =>
      STAGES.map((stage) => ({
        stage,
        opportunities: data.opportunities.filter((item) => item.stage === stage)
      })),
    [data.opportunities]
  );

  const handleCreateOpportunity = async (event) => {
    event.preventDefault();
    const { errors: validationErrors, values } = await validateForm(opportunitySchema, draft);

    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    upsertOpportunity({
      ...values,
      id: `opp-${values.name.toLowerCase().replaceAll(" ", "-")}`,
      ownerId: session.userId,
      probability: Number(values.probability),
      value: Number(values.value)
    });
    setDraft({ ...blankOpportunity, customerId: data.customers[0]?.id ?? "" });
    setErrors({});
  };

  return (
    <div className="space-y-6">
      <Seo
        title="Pipeline"
        path="/pipeline"
        description="Track opportunities, deal values, stages, forecast confidence, and ownership in the Orbit Sales OS pipeline board."
      />
      <SectionHeading
        eyebrow="Sales opportunities"
        title="Pipeline orchestration"
        description="Track deal value, ownership, forecast confidence, and stage transitions in a clean CRM-style board."
      />

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {grouped.map((column) => (
            <Card key={column.stage} className="p-4">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-semibold text-[var(--text-primary)]">{column.stage}</h3>
                <Tag
                  tone={
                    column.stage.includes("Lost")
                      ? "danger"
                      : column.stage.includes("Won")
                        ? "success"
                        : "info"
                  }
                >
                  {column.opportunities.length}
                </Tag>
              </div>
              <div className="mt-4 space-y-4">
                {column.opportunities.length ? (
                  column.opportunities.map((opportunity) => {
                    const customer = data.customers.find((item) => item.id === opportunity.customerId);
                    return (
                      <div
                        key={opportunity.id}
                        className="rounded-[22px] border border-[var(--border-soft)] bg-[var(--surface-muted)] p-4"
                      >
                        <h4 className="font-semibold text-[var(--text-primary)]">{opportunity.name}</h4>
                        <p className="mt-1 text-sm text-[var(--text-secondary)]">{customer?.name}</p>
                        <div className="mt-3 flex items-center justify-between text-sm text-[var(--text-secondary)]">
                          <span>{formatCompactCurrency(opportunity.value)}</span>
                          <span>{opportunity.probability}%</span>
                        </div>
                        <p className="mt-3 text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
                          Close target {formatDate(opportunity.expectedClose)}
                        </p>
                      </div>
                    );
                  })
                ) : (
                  <EmptyState
                    title="No opportunities"
                    body="This stage is currently empty in the demo data."
                  />
                )}
              </div>
            </Card>
          ))}
        </div>

        <Card>
          <h3 className="text-lg font-semibold text-[var(--text-primary)]">Create opportunity</h3>
          <form className="mt-5 grid gap-4" onSubmit={handleCreateOpportunity}>
            {[
              ["name", "Opportunity name", "text"],
              ["value", "Deal value", "number"],
              ["probability", "Probability", "number"],
              ["expectedClose", "Expected close", "date"],
              ["region", "Region", "text"],
              ["source", "Lead source", "text"]
            ].map(([field, label, type]) => (
              <label key={field} className="grid gap-2 text-sm text-[var(--text-secondary)]">
                {label}
                <input
                  type={type}
                  value={draft[field]}
                  onChange={(event) => {
                    setDraft((current) => ({ ...current, [field]: event.target.value }));
                    setErrors((current) => ({ ...current, [field]: null }));
                  }}
                  className="rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-muted)] px-4 py-3 text-[var(--text-primary)] outline-none"
                />
                {errors[field] ? <p className="text-xs text-rose-300">{errors[field]}</p> : null}
              </label>
            ))}

            <CustomSelect
              label="Customer"
              value={draft.customerId}
              onChange={(nextCustomerId) => {
                setDraft((current) => ({ ...current, customerId: nextCustomerId }));
                setErrors((current) => ({ ...current, customerId: null }));
              }}
              options={data.customers.map((customer) => ({
                value: customer.id,
                label: customer.name,
                description: `${customer.region} • ${customer.industry}`
              }))}
              buttonClassName="bg-[var(--surface-muted)]"
            />
            {errors.customerId ? <p className="-mt-2 text-xs text-rose-300">{errors.customerId}</p> : null}

            <CustomSelect
              label="Stage"
              value={draft.stage}
              onChange={(nextStage) => {
                setErrors((current) => ({ ...current, stage: null }));
                setDraft((current) => ({
                  ...current,
                  stage: nextStage,
                  status:
                    nextStage === "Closed Won"
                      ? "Won"
                      : nextStage === "Closed Lost"
                        ? "Lost"
                        : "Open"
                }));
              }}
              options={STAGES.map((stage) => ({
                value: stage,
                label: stage,
                description:
                  stage === "Qualified"
                    ? "Validated interest and initial fit."
                    : stage === "Proposal"
                      ? "Commercial package shared with the buyer."
                      : stage === "Negotiation"
                        ? "Commercial and legal terms under discussion."
                        : stage === "At Risk"
                          ? "Needs intervention to avoid slippage."
                          : stage === "Closed Won"
                            ? "Revenue secured."
                            : "Opportunity not converted."
              }))}
              buttonClassName="bg-[var(--surface-muted)]"
            />
            {errors.stage ? <p className="-mt-2 text-xs text-rose-300">{errors.stage}</p> : null}

            <Button type="submit">
              <FiPlus />
              Add opportunity
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}

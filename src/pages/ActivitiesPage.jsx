import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { Button } from "../components/common/Button";
import { Card } from "../components/common/Card";
import { CustomSelect } from "../components/common/CustomSelect";
import { Seo } from "../components/common/Seo";
import { SectionHeading } from "../components/common/SectionHeading";
import { Tag } from "../components/common/Tag";
import { useAppContext } from "../context/AppContext";
import { formatDate } from "../utils/formatters";

const blankActivity = {
  title: "",
  type: "Call",
  customerId: "",
  dueDate: "2026-05-30",
  outcome: "Scheduled",
  note: ""
};

export function ActivitiesPage() {
  const { data, session, upsertActivity } = useAppContext();
  const [draft, setDraft] = useState({ ...blankActivity, customerId: data.customers[0]?.id ?? "" });

  const handleCreate = (event) => {
    event.preventDefault();
    upsertActivity({
      ...draft,
      id: `act-${Date.now()}`,
      ownerId: session.userId
    });
    setDraft({ ...blankActivity, customerId: data.customers[0]?.id ?? "" });
  };

  return (
    <div className="space-y-6">
      <Seo
        title="Activities"
        path="/activities"
        description="Log calls, meetings, notes, and follow-ups so customer-facing activity stays organized and visible across the CRM."
      />
      <SectionHeading
        eyebrow="Activities"
        title="Calls, meetings, notes, and follow-ups"
        description="Daily sales execution in one timeline so customer-facing work never loses continuity."
      />

      <div className="grid gap-6 xl:grid-cols-[1fr_0.8fr]">
        <Card>
          <div className="space-y-4">
            {data.activities.map((activity) => {
              const customer = data.customers.find((item) => item.id === activity.customerId);
              const owner = data.users.find((item) => item.id === activity.ownerId);
              return (
                <div key={activity.id} className="rounded-[26px] border border-[var(--border-soft)] bg-[var(--surface-muted)] p-5">
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.22em] text-[var(--text-muted)]">{activity.type}</p>
                      <h3 className="mt-2 text-lg font-semibold text-[var(--text-primary)]">{activity.title}</h3>
                    </div>
                    <Tag tone={activity.outcome === "Done" ? "success" : activity.outcome === "Pending" ? "warning" : "info"}>
                      {activity.outcome}
                    </Tag>
                  </div>
                  <p className="mt-3 text-sm text-[var(--text-secondary)]">{activity.note}</p>
                  <div className="mt-4 flex flex-wrap gap-4 text-sm text-[var(--text-secondary)]">
                    <span>{customer?.name}</span>
                    <span>{owner?.name}</span>
                    <span>{formatDate(activity.dueDate)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-[var(--text-primary)]">Log activity</h3>
          <form className="mt-5 grid gap-4" onSubmit={handleCreate}>
            {[
              ["title", "Title", "text"],
              ["dueDate", "Due date", "date"]
            ].map(([field, label, type]) => (
              <label key={field} className="grid gap-2 text-sm text-[var(--text-secondary)]">
                {label}
                <input
                  type={type}
                  value={draft[field]}
                  onChange={(event) => setDraft((current) => ({ ...current, [field]: event.target.value }))}
                  className="rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-muted)] px-4 py-3 text-[var(--text-primary)] outline-none"
                />
              </label>
            ))}

            <CustomSelect
              label="Activity type"
              value={draft.type}
              onChange={(nextType) => setDraft((current) => ({ ...current, type: nextType }))}
              options={[
                { value: "Call", label: "Call", description: "Customer check-ins and phone follow-ups." },
                { value: "Meeting", label: "Meeting", description: "Live stakeholder syncs and workshops." },
                { value: "Note", label: "Note", description: "Internal notes and updates." },
                { value: "Follow-up", label: "Follow-up", description: "Next actions after major conversations." }
              ]}
              buttonClassName="bg-[var(--surface-muted)]"
            />

            <CustomSelect
              label="Customer"
              value={draft.customerId}
              onChange={(nextCustomerId) =>
                setDraft((current) => ({ ...current, customerId: nextCustomerId }))
              }
              options={data.customers.map((customer) => ({
                value: customer.id,
                label: customer.name,
                description: `${customer.region} • ${customer.contactName}`
              }))}
              buttonClassName="bg-[var(--surface-muted)]"
            />

            <CustomSelect
              label="Outcome"
              value={draft.outcome}
              onChange={(nextOutcome) =>
                setDraft((current) => ({ ...current, outcome: nextOutcome }))
              }
              options={[
                { value: "Scheduled", label: "Scheduled", description: "Planned and on the calendar." },
                { value: "Pending", label: "Pending", description: "Awaiting response or next action." },
                { value: "Done", label: "Done", description: "Completed and logged." }
              ]}
              buttonClassName="bg-[var(--surface-muted)]"
            />

            <label className="grid gap-2 text-sm text-[var(--text-secondary)]">
              Notes
              <textarea
                rows="5"
                value={draft.note}
                onChange={(event) => setDraft((current) => ({ ...current, note: event.target.value }))}
                className="rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-muted)] px-4 py-3 text-[var(--text-primary)] outline-none"
              />
            </label>

            <Button type="submit">
              <FiPlus />
              Add activity
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}

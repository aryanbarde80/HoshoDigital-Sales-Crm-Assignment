import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FiEdit2, FiPlus, FiTrash2 } from "react-icons/fi";
import { Button } from "../components/common/Button";
import { Card } from "../components/common/Card";
import { DataTable } from "../components/common/DataTable";
import { Seo } from "../components/common/Seo";
import { SectionHeading } from "../components/common/SectionHeading";
import { Tag } from "../components/common/Tag";
import { useAppContext } from "../context/AppContext";
import { formatCompactCurrency, formatDate } from "../utils/formatters";
import { customerSchema, validateForm } from "../utils/validation";

const blankCustomer = {
  name: "",
  industry: "",
  region: "",
  tier: "Mid-Market",
  healthScore: 80,
  satisfaction: 4.2,
  annualValue: 100000,
  renewalDate: "2026-12-31",
  contactName: "",
  contactEmail: "",
  phone: "",
  notes: "",
  accountPlan: ""
};

export function CustomersPage() {
  const { data, session, upsertCustomer, deleteCustomer } = useAppContext();
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [draft, setDraft] = useState(blankCustomer);
  const [errors, setErrors] = useState({});

  const activeOwnerId = session.userId ?? data.users[0].id;

  const columns = useMemo(
    () => [
      {
        key: "name",
        label: "Customer",
        render: (customer) => (
          <div>
            <Link
              to={`/customers/${customer.id}`}
              className="font-semibold text-[var(--text-primary)] hover:underline"
            >
              {customer.name}
            </Link>
            <p className="mt-1 text-xs text-[var(--text-muted)]">{customer.industry}</p>
          </div>
        )
      },
      { key: "region", label: "Region" },
      {
        key: "tier",
        label: "Tier",
        render: (customer) => <Tag tone="info">{customer.tier}</Tag>
      },
      {
        key: "annualValue",
        label: "Annual Value",
        render: (customer) => formatCompactCurrency(customer.annualValue)
      },
      {
        key: "renewalDate",
        label: "Renewal",
        render: (customer) => formatDate(customer.renewalDate)
      },
      {
        key: "healthScore",
        label: "Health",
        render: (customer) => (
          <span className="font-semibold text-[var(--text-primary)]">
            {customer.healthScore}/100
          </span>
        )
      },
      {
        key: "actions",
        label: "Actions",
        render: (customer) => (
          <div className="flex gap-2">
            <Button
              intent="secondary"
              className="px-3 py-2"
              onClick={() => {
                setEditingCustomer(customer.id);
                setDraft(customer);
                setErrors({});
              }}
            >
              <FiEdit2 />
            </Button>
            <Button
              intent="ghost"
              className="px-3 py-2"
              onClick={() => deleteCustomer(customer.id)}
            >
              <FiTrash2 />
            </Button>
          </div>
        )
      }
    ],
    [deleteCustomer]
  );

  const handleSave = async (event) => {
    event.preventDefault();
    const { errors: validationErrors, values } = await validateForm(customerSchema, draft);

    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    upsertCustomer({
      id: editingCustomer ?? `cust-${draft.name.toLowerCase().replaceAll(" ", "-")}`,
      ownerId: activeOwnerId,
      ...values,
      healthScore: Number(values.healthScore),
      satisfaction: Number(values.satisfaction),
      annualValue: Number(values.annualValue)
    });
    setDraft(blankCustomer);
    setEditingCustomer(null);
    setErrors({});
  };

  return (
    <div className="space-y-6">
      <Seo
        title="Customers"
        path="/customers"
        description="Manage customer profiles, renewal posture, account plans, and interaction context from a polished CRM customer workspace."
      />
      <SectionHeading
        eyebrow="Customer management"
        title="Accounts, contacts, and renewal posture"
        description="Maintain a living customer database with profile depth, commercial value, and account-planning context."
        action={
          <Button
            onClick={() => {
              setEditingCustomer(null);
              setDraft(blankCustomer);
              setErrors({});
            }}
          >
            <FiPlus />
            New customer
          </Button>
        }
      />

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <Card>
          <DataTable columns={columns} rows={data.customers} />
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-[var(--text-primary)]">
            {editingCustomer ? "Edit customer" : "Create customer"}
          </h3>
          <form className="mt-5 grid gap-4" onSubmit={handleSave}>
            {[
              ["name", "Customer name"],
              ["industry", "Industry"],
              ["region", "Region"],
              ["contactName", "Primary contact"],
              ["contactEmail", "Contact email"],
              ["phone", "Phone"],
              ["annualValue", "Annual value"],
              ["renewalDate", "Renewal date"],
              ["healthScore", "Health score"],
              ["satisfaction", "Satisfaction"]
            ].map(([field, label]) => (
              <label key={field} className="grid gap-2 text-sm text-[var(--text-secondary)]">
                {label}
                <input
                  type={
                    field.includes("Date") || field === "renewalDate"
                      ? "date"
                      : field === "annualValue" || field === "healthScore" || field === "satisfaction"
                        ? "number"
                        : "text"
                  }
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

            <label className="grid gap-2 text-sm text-[var(--text-secondary)]">
              Account plan
              <textarea
                rows="4"
                value={draft.accountPlan}
                onChange={(event) => {
                  setDraft((current) => ({ ...current, accountPlan: event.target.value }));
                  setErrors((current) => ({ ...current, accountPlan: null }));
                }}
                className="rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-muted)] px-4 py-3 text-[var(--text-primary)] outline-none"
              />
              {errors.accountPlan ? (
                <p className="text-xs text-rose-300">{errors.accountPlan}</p>
              ) : null}
            </label>

            <label className="grid gap-2 text-sm text-[var(--text-secondary)]">
              Notes
              <textarea
                rows="4"
                value={draft.notes}
                onChange={(event) => {
                  setDraft((current) => ({ ...current, notes: event.target.value }));
                  setErrors((current) => ({ ...current, notes: null }));
                }}
                className="rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-muted)] px-4 py-3 text-[var(--text-primary)] outline-none"
              />
              {errors.notes ? <p className="text-xs text-rose-300">{errors.notes}</p> : null}
            </label>

            <Button type="submit">{editingCustomer ? "Save changes" : "Create customer"}</Button>
          </form>
        </Card>
      </div>
    </div>
  );
}

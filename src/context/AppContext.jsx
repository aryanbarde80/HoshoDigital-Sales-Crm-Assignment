import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { initialData, roles } from "../data/mockData";
import { createAuditEntry } from "../utils/audit";
import { createInsights, createMetricsSnapshot } from "../utils/metrics";
import { readStorage, writeStorage } from "../utils/storage";

const DATA_KEY = "hosho-sales-crm-data";
const SESSION_KEY = "hosho-sales-crm-session";
const THEME_KEY = "hosho-sales-crm-theme";
const AUDIT_KEY = "hosho-sales-crm-audit";

const AppContext = createContext(null);

const themePresets = [
  { id: "midnight", name: "Midnight Graphite", accent: "#38bdf8" },
  { id: "light", name: "Cloud Ledger", accent: "#0284c7" },
  { id: "aurora", name: "Aurora Mint", accent: "#14b8a6" },
  { id: "ember", name: "Ember Executive", accent: "#f97316" }
];

function cloneInitialData() {
  return JSON.parse(JSON.stringify(initialData));
}

export function AppProvider({ children }) {
  const [data, setData] = useState(() => readStorage(DATA_KEY, cloneInitialData()));
  const [session, setSession] = useState(() =>
    readStorage(SESSION_KEY, {
      role: "executive",
      userId: "user-exec-maya"
    })
  );
  const [theme, setTheme] = useState(() => readStorage(THEME_KEY, "midnight"));
  const [auditLogs, setAuditLogs] = useState(() => readStorage(AUDIT_KEY, []));
  const [isBooting, setIsBooting] = useState(true);

  useEffect(() => {
    writeStorage(DATA_KEY, data);
  }, [data]);

  useEffect(() => {
    writeStorage(SESSION_KEY, session);
  }, [session]);

  useEffect(() => {
    writeStorage(THEME_KEY, theme);
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    writeStorage(AUDIT_KEY, auditLogs);
  }, [auditLogs]);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsBooting(false), 1050);
    return () => window.clearTimeout(timer);
  }, []);

  const metrics = useMemo(() => createMetricsSnapshot(data), [data]);
  const insights = useMemo(() => createInsights(data, metrics), [data, metrics]);

  const recordAuditLog = useCallback(
    ({ action, entity, detail, severity = "info", actorOverride, roleOverride }) => {
      const actor =
        actorOverride ?? data.users.find((user) => user.id === session.userId)?.name ?? "Unknown user";
      const role = roleOverride ?? session.role ?? "anonymous";
      const entry = createAuditEntry({
        action,
        entity,
        detail,
        severity,
        actor,
        role
      });

      setAuditLogs((current) => [entry, ...current].slice(0, 40));
      return entry;
    },
    [data.users, session.role, session.userId]
  );

  const value = useMemo(() => {
    const upsertById = (collectionName, payload) => {
      setData((current) => {
        const exists = current[collectionName].some((item) => item.id === payload.id);

        return {
          ...current,
          [collectionName]: exists
            ? current[collectionName].map((item) =>
                item.id === payload.id ? { ...item, ...payload } : item
              )
            : [payload, ...current[collectionName]]
        };
      });
    };

    return {
      data,
      insights,
      metrics,
      roles,
      session,
      theme,
      themePresets,
      auditLogs,
      isBooting,
      recordAuditLog,
      loginAsRole: (roleId) => {
        const matchedUser = data.users.find((user) => user.role === roleId) ?? data.users[0];
        recordAuditLog({
          action: "login",
          entity: "session",
          detail: `Entered workspace as ${roles.find((role) => role.id === roleId)?.title ?? roleId}`,
          actorOverride: matchedUser.name,
          roleOverride: roleId
        });
        setSession({
          role: roleId,
          userId: matchedUser.id
        });
      },
      logout: (reason = "manual") => {
        recordAuditLog({
          action: "logout",
          entity: "session",
          detail: reason === "idle" ? "Secure auto logout after inactivity." : "Manual logout."
        });
        setSession({ role: null, userId: null });
      },
      switchRole: (roleId) => {
        const matchedUser = data.users.find((user) => user.role === roleId) ?? data.users[0];
        recordAuditLog({
          action: "switch_role",
          entity: "session",
          detail: `Changed active role to ${roles.find((role) => role.id === roleId)?.title ?? roleId}`
        });
        setSession({
          role: roleId,
          userId: matchedUser.id
        });
      },
      setTheme,
      toggleTheme: () =>
        setTheme((current) => {
          const currentIndex = themePresets.findIndex((preset) => preset.id === current);
          return themePresets[(currentIndex + 1) % themePresets.length].id;
        }),
      resetDemo: () => {
        recordAuditLog({
          action: "reset_demo",
          entity: "workspace",
          detail: "Reset local CRM demo data back to the seeded baseline.",
          severity: "warning"
        });
        setData(cloneInitialData());
      },
      upsertCustomer: (customer) => {
        recordAuditLog({
          action: customer.id ? "save_customer" : "create_customer",
          entity: "customer",
          detail: `Saved customer record for ${customer.name}.`
        });
        upsertById("customers", customer);
      },
      deleteCustomer: (customerId) => {
        const customer = data.customers.find((item) => item.id === customerId);
        recordAuditLog({
          action: "delete_customer",
          entity: "customer",
          detail: `Removed customer ${customer?.name ?? customerId}.`,
          severity: "warning"
        });
        setData((current) => ({
          ...current,
          customers: current.customers.filter((customer) => customer.id !== customerId)
        }));
      },
      upsertOpportunity: (opportunity) => {
        recordAuditLog({
          action: opportunity.id ? "save_opportunity" : "create_opportunity",
          entity: "opportunity",
          detail: `Updated pipeline item ${opportunity.name}.`
        });
        upsertById("opportunities", opportunity);
      },
      upsertActivity: (activity) => {
        recordAuditLog({
          action: "log_activity",
          entity: "activity",
          detail: `Logged ${activity.type.toLowerCase()} for the customer timeline.`
        });
        upsertById("activities", activity);
      },
      updateDiscountRequest: (requestId, status) => {
        const request = data.discountRequests.find((item) => item.id === requestId);
        const opportunity = data.opportunities.find((item) => item.id === request?.opportunityId);
        recordAuditLog({
          action: "discount_decision",
          entity: "approval",
          detail: `${status} discount request for ${opportunity?.name ?? "opportunity"}.`,
          severity: status === "Rejected" ? "warning" : "info"
        });
        setData((current) => ({
          ...current,
          discountRequests: current.discountRequests.map((entry) =>
            entry.id === requestId ? { ...entry, status } : entry
          )
        }));
      },
      upsertCampaign: (campaign) => upsertById("campaigns", campaign),
      upsertFeatureRequest: (request) => upsertById("featureRequests", request),
      upsertFeedbackItem: (item) => upsertById("feedbackItems", item),
      assignTerritory: (territoryId, ownerId) =>
        setData((current) => ({
          ...current,
          territories: current.territories.map((territory) =>
            territory.id === territoryId ? { ...territory, ownerId } : territory
          )
        }))
    };
  }, [auditLogs, data, insights, metrics, recordAuditLog, session, theme]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }

  return context;
}

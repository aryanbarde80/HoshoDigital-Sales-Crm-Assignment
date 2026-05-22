import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { initialData, roles } from "../data/mockData";
import { createInsights, createMetricsSnapshot } from "../utils/metrics";
import { readStorage, writeStorage } from "../utils/storage";

const DATA_KEY = "hosho-sales-crm-data";
const SESSION_KEY = "hosho-sales-crm-session";
const THEME_KEY = "hosho-sales-crm-theme";

const AppContext = createContext(null);

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
  const [theme, setTheme] = useState(() => readStorage(THEME_KEY, "dark"));

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

  const metrics = useMemo(() => createMetricsSnapshot(data), [data]);
  const insights = useMemo(() => createInsights(data, metrics), [data, metrics]);

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
      loginAsRole: (roleId) => {
        const matchedUser = data.users.find((user) => user.role === roleId) ?? data.users[0];
        setSession({
          role: roleId,
          userId: matchedUser.id
        });
      },
      logout: () => setSession({ role: null, userId: null }),
      switchRole: (roleId) => {
        const matchedUser = data.users.find((user) => user.role === roleId) ?? data.users[0];
        setSession({
          role: roleId,
          userId: matchedUser.id
        });
      },
      toggleTheme: () => setTheme((current) => (current === "dark" ? "light" : "dark")),
      resetDemo: () => setData(cloneInitialData()),
      upsertCustomer: (customer) => upsertById("customers", customer),
      deleteCustomer: (customerId) =>
        setData((current) => ({
          ...current,
          customers: current.customers.filter((customer) => customer.id !== customerId)
        })),
      upsertOpportunity: (opportunity) => upsertById("opportunities", opportunity),
      upsertActivity: (activity) => upsertById("activities", activity),
      updateDiscountRequest: (requestId, status) =>
        setData((current) => ({
          ...current,
          discountRequests: current.discountRequests.map((request) =>
            request.id === requestId ? { ...request, status } : request
          )
        })),
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
  }, [data, insights, metrics, session, theme]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }

  return context;
}

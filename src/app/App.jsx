import { useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Navigate, Route, Routes } from "react-router-dom";
import { ErrorFallback } from "../components/common/ErrorFallback";
import { GlobalLoader } from "../components/common/GlobalLoader";
import { Shell } from "../components/layout/Shell";
import { useAppContext } from "../context/AppContext";
import { ActivitiesPage } from "../pages/ActivitiesPage";
import { CustomerDetailPage } from "../pages/CustomerDetailPage";
import { CustomersPage } from "../pages/CustomersPage";
import { DashboardPage } from "../pages/DashboardPage";
import { ExecutivePage } from "../pages/ExecutivePage";
import { LoginPage } from "../pages/LoginPage";
import { MarketingPage } from "../pages/MarketingPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { PipelinePage } from "../pages/PipelinePage";
import { ProductPage } from "../pages/ProductPage";
import { ReportsPage } from "../pages/ReportsPage";
import { TeamPage } from "../pages/TeamPage";

function ProtectedRoutes() {
  const { recordAuditLog, session } = useAppContext();

  useEffect(() => {
    if (!session.role) {
      return;
    }

    recordAuditLog({
      action: "open_workspace",
      entity: "session",
      detail: `Loaded protected workspace for ${session.role}.`
    });
  }, [recordAuditLog, session.role]);

  if (!session.role) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Shell>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/customers" element={<CustomersPage />} />
        <Route path="/customers/:customerId" element={<CustomerDetailPage />} />
        <Route path="/pipeline" element={<PipelinePage />} />
        <Route path="/activities" element={<ActivitiesPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/marketing" element={<MarketingPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/executive" element={<ExecutivePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Shell>
  );
}

export function App() {
  const { session } = useAppContext();
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setShowLoader(false), 1200);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      {showLoader ? <GlobalLoader /> : null}
      <Routes>
        <Route
          path="/login"
          element={session.role ? <Navigate to="/" replace /> : <LoginPage />}
        />
        <Route path="/*" element={<ProtectedRoutes />} />
      </Routes>
    </ErrorBoundary>
  );
}

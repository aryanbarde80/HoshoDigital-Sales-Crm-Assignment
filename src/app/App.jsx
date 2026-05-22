import { Navigate, Route, Routes } from "react-router-dom";
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
  const { session } = useAppContext();

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

  return (
    <Routes>
      <Route
        path="/login"
        element={session.role ? <Navigate to="/" replace /> : <LoginPage />}
      />
      <Route path="/*" element={<ProtectedRoutes />} />
    </Routes>
  );
}

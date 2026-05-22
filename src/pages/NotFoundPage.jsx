import { Link } from "react-router-dom";
import { EmptyState } from "../components/common/EmptyState";

export function NotFoundPage() {
  return (
    <div className="py-10">
      <EmptyState
        title="Page not found"
        body={
          <>
            That route does not exist in the CRM workspace. <Link to="/" className="text-[var(--accent-strong)]">Return to the dashboard.</Link>
          </>
        }
      />
    </div>
  );
}

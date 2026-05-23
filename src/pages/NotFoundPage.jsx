import { Link } from "react-router-dom";
import { EmptyState } from "../components/common/EmptyState";
import { Seo } from "../components/common/Seo";

export function NotFoundPage() {
  return (
    <div className="py-10">
      <Seo
        title="Not Found"
        path="/404"
        description="The requested Orbit Sales OS page could not be found."
      />
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

import { FiRefreshCw, FiShield } from "react-icons/fi";
import { Button } from "./Button";

export function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="min-h-screen bg-[var(--surface-app)] px-4 py-10 text-[var(--text-primary)]">
      <div className="mx-auto max-w-3xl rounded-[36px] border border-[var(--border-soft)] bg-[var(--surface-card)] p-8 shadow-[var(--shadow-card)]">
        <div className="inline-flex rounded-3xl bg-[var(--surface-muted)] p-4 text-2xl text-[var(--accent-strong)]">
          <FiShield />
        </div>
        <p className="mt-6 text-xs uppercase tracking-[0.32em] text-[var(--text-muted)]">
          Protected recovery
        </p>
        <h1 className="mt-3 text-4xl font-semibold">The workspace hit an unexpected problem.</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--text-secondary)]">
          A production-style error boundary caught the failure before the whole application could crash.
          You can safely retry the current view below.
        </p>
        {error?.message ? (
          <pre className="mt-6 overflow-x-auto rounded-[24px] border border-[var(--border-soft)] bg-black/20 p-4 text-xs text-[var(--text-secondary)]">
            {error.message}
          </pre>
        ) : null}
        <div className="mt-6">
          <Button onClick={resetErrorBoundary}>
            <FiRefreshCw />
            Reload workspace
          </Button>
        </div>
      </div>
    </div>
  );
}

import log from "loglevel";

log.setLevel("info");

export function createAuditEntry({ action, entity, detail, actor, role, severity = "info" }) {
  const entry = {
    id: `audit-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    action,
    entity,
    detail,
    actor,
    role,
    severity,
    timestamp: new Date().toISOString()
  };

  log.info("[audit]", entry);
  return entry;
}

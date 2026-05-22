export function DataTable({ columns, rows }) {
  return (
    <div className="overflow-hidden rounded-[24px] border border-[var(--border-soft)]">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-[var(--border-soft)] text-left">
          <thead className="bg-[var(--surface-muted)]">
            <tr>
              {columns.map((column) => (
                <th key={column.key} className="px-4 py-3 text-xs uppercase tracking-[0.22em] text-[var(--text-muted)]">
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-soft)] bg-[var(--surface-card)]">
            {rows.map((row, rowIndex) => (
              <tr key={row.id ?? rowIndex} className="align-top">
                {columns.map((column) => (
                  <td key={column.key} className="px-4 py-3 text-sm text-[var(--text-secondary)]">
                    {column.render ? column.render(row) : row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

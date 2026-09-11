import { Search } from 'lucide-react'
import { PR_STATUSES, type PRListFilters, type PRStatus } from '../../types/pr'

type PRFiltersProps = {
  filters: PRListFilters
  onChange: (filters: PRListFilters) => void
  onReset: () => void
}

export function PRFilters({ filters, onChange, onReset }: PRFiltersProps) {
  return (
    <div className="grid gap-3 rounded-xl border border-line bg-[#f4f8fc] p-4 md:grid-cols-2 xl:grid-cols-5">
      <label className="block text-xs font-semibold uppercase tracking-wide text-muted">
        Search by PR Number
        <div className="relative mt-1.5">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={filters.prNumber}
            onChange={(event) => onChange({ ...filters, prNumber: event.target.value })}
            placeholder="PR-0001"
            className="h-10 w-full rounded-lg border border-line bg-white pl-9 pr-3 text-sm text-navy outline-none focus:border-navy-700"
          />
        </div>
      </label>

      <label className="block text-xs font-semibold uppercase tracking-wide text-muted">
        Filter by Status
        <select
          value={filters.status}
          onChange={(event) => onChange({ ...filters, status: event.target.value as PRStatus | '' })}
          className="mt-1.5 h-10 w-full rounded-lg border border-line bg-white px-3 text-sm text-navy outline-none focus:border-navy-700"
        >
          <option value="">All statuses</option>
          {PR_STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </label>

      <label className="block text-xs font-semibold uppercase tracking-wide text-muted">
        From Date
        <input
          type="date"
          value={filters.fromDate}
          onChange={(event) => onChange({ ...filters, fromDate: event.target.value })}
          className="mt-1.5 h-10 w-full rounded-lg border border-line bg-white px-3 text-sm text-navy outline-none focus:border-navy-700"
        />
      </label>

      <label className="block text-xs font-semibold uppercase tracking-wide text-muted">
        To Date
        <input
          type="date"
          value={filters.toDate}
          onChange={(event) => onChange({ ...filters, toDate: event.target.value })}
          className="mt-1.5 h-10 w-full rounded-lg border border-line bg-white px-3 text-sm text-navy outline-none focus:border-navy-700"
        />
      </label>

      <div className="flex items-end">
        <button
          type="button"
          onClick={onReset}
          className="h-10 w-full rounded-lg border border-line bg-white px-3 text-sm font-semibold text-navy hover:bg-slate-50"
        >
          Clear filters
        </button>
      </div>
    </div>
  )
}

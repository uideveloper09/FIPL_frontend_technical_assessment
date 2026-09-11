import { Eye, Pencil } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { PurchaseRequisition } from '../../types/pr'
import { formatDisplayDate } from '../../utils/date'
import { StatusBadge } from '../common/StatusBadge'

type PRTableProps = {
  items: PurchaseRequisition[]
}

export function PRTable({ items }: PRTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-line bg-[#f0f5fa] text-[11px] uppercase tracking-wider text-muted">
            <th className="px-4 py-3 font-semibold">PR Number</th>
            <th className="px-4 py-3 font-semibold">Date</th>
            <th className="px-4 py-3 font-semibold">Department</th>
            <th className="px-4 py-3 font-semibold">Requested By</th>
            <th className="px-4 py-3 font-semibold">Status</th>
            <th className="px-4 py-3 font-semibold">Total Items</th>
            <th className="px-4 py-3 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((pr) => {
            const canEdit = pr.status === 'Draft' || pr.status === 'Rejected'
            return (
              <tr key={pr.id} className="border-b border-line last:border-0 hover:bg-slate-50/80">
                <td className="px-4 py-3 font-semibold text-navy">{pr.prNumber}</td>
                <td className="px-4 py-3 text-navy-800">
                  {formatDisplayDate(pr.requestDate)}
                  <span className="ml-1 text-[11px] text-muted">(DD/MM/YYYY)</span>
                </td>
                <td className="px-4 py-3">{pr.department}</td>
                <td className="px-4 py-3">{pr.requestedBy}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={pr.status} />
                </td>
                <td className="px-4 py-3 text-center font-medium">{pr.items.length}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Link
                      to={`/pr/${pr.id}`}
                      title="View"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-line text-navy hover:bg-sky-50 hover:text-sky-700"
                    >
                      <Eye className="h-4 w-4" />
                    </Link>
                    {canEdit ? (
                      <Link
                        to={`/pr/${pr.id}/edit`}
                        title="Edit"
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-line text-navy hover:bg-sky-50 hover:text-sky-700"
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>
                    ) : (
                      <span
                        title="Only Draft or Rejected PRs can be edited"
                        className="inline-flex h-8 w-8 cursor-not-allowed items-center justify-center rounded-full border border-line text-slate-300"
                      >
                        <Pencil className="h-4 w-4" />
                      </span>
                    )}
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

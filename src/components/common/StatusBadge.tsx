import type { PRPriority, PRStatus } from '../../types/pr'

const STATUS_CLASS: Record<PRStatus, string> = {
  Draft: 'bg-[#dbeafe] text-[#1d4ed8]',
  Submitted: 'bg-amber-100 text-amber-800',
  Approved: 'bg-emerald-100 text-emerald-800',
  Rejected: 'bg-rose-100 text-rose-800',
}

const PRIORITY_CLASS: Record<PRPriority, string> = {
  Low: 'bg-slate-100 text-slate-600',
  Medium: 'bg-sky-100 text-sky-800',
  High: 'bg-orange-100 text-orange-800',
}

export function StatusBadge({ status }: { status: PRStatus }) {
  return (
    <span
      className={`inline-flex min-w-20 items-center justify-center rounded-full px-3 py-1 text-xs font-semibold ${STATUS_CLASS[status]}`}
    >
      {status}
    </span>
  )
}

export function PriorityBadge({ priority }: { priority: PRPriority }) {
  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${PRIORITY_CLASS[priority]}`}>
      {priority}
    </span>
  )
}

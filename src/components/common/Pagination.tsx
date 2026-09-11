import { ChevronLeft, ChevronRight } from 'lucide-react'

type PaginationProps = {
  page: number
  pageSize: number
  total: number
  onPageChange: (page: number) => void
}

export function Pagination({ page, pageSize, total, onPageChange }: PaginationProps) {
  const pageCount = Math.max(1, Math.ceil(total / pageSize))
  const start = total === 0 ? 0 : (page - 1) * pageSize + 1
  const end = Math.min(page * pageSize, total)

  return (
    <div className="flex flex-col gap-3 border-t border-line px-4 py-3 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
      <p>
        Showing <span className="font-semibold text-navy">{start}</span> to{' '}
        <span className="font-semibold text-navy">{end}</span> of{' '}
        <span className="font-semibold text-navy">{total}</span> requisitions
      </p>
      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          className="inline-flex items-center gap-1 rounded-lg border border-line bg-white px-3 py-1.5 font-medium text-navy disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </button>
        <span className="min-w-16 text-center font-semibold text-navy">
          {page} / {pageCount}
        </span>
        <button
          type="button"
          disabled={page >= pageCount}
          onClick={() => onPageChange(page + 1)}
          className="inline-flex items-center gap-1 rounded-lg border border-line bg-white px-3 py-1.5 font-medium text-navy disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

import { Plus, RotateCcw } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { EmptyState } from '../components/common/EmptyState'
import { ErrorState } from '../components/common/ErrorState'
import { LoadingState } from '../components/common/LoadingState'
import { Pagination } from '../components/common/Pagination'
import { PRFilters } from '../components/pr/PRFilters'
import { PRTable } from '../components/pr/PRTable'
import { fetchRequisitions, resetSeedData } from '../services/pr-service'
import type { ListUiState, PRListFilters, PurchaseRequisition } from '../types/pr'

const PAGE_SIZE = 5

const EMPTY_FILTERS: PRListFilters = {
  prNumber: '',
  status: '',
  fromDate: '',
  toDate: '',
}

export function PRListPage() {
  const [filters, setFilters] = useState<PRListFilters>(EMPTY_FILTERS)
  const [appliedFilters, setAppliedFilters] = useState<PRListFilters>(EMPTY_FILTERS)
  const [page, setPage] = useState(1)
  const [items, setItems] = useState<PurchaseRequisition[]>([])
  const [state, setState] = useState<ListUiState>('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setAppliedFilters(filters)
      setPage(1)
    }, 250)
    return () => window.clearTimeout(timer)
  }, [filters])

  const load = async () => {
    setState('loading')
    setError('')
    try {
      const data = await fetchRequisitions(appliedFilters)
      setItems(data)
      setState(data.length === 0 ? 'empty' : 'success')
    } catch (err) {
      setItems([])
      setError(err instanceof Error ? err.message : 'Unable to load purchase requisitions.')
      setState('error')
    }
  }

  useEffect(() => {
    void load()
  }, [appliedFilters])

  const pagedItems = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE
    return items.slice(start, start + PAGE_SIZE)
  }, [items, page])

  const hasActiveFilters = Boolean(
    filters.prNumber || filters.status || filters.fromDate || filters.toDate,
  )

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-2 rounded-xl border border-sky-100 bg-[#eef5fb] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-navy">
            This is a reference demo created for Force Intellect's React Developer Technical
            Assessment.
          </p>
          <p className="mt-1 text-sm text-navy-800">
            It demonstrates the expected features and Purchase Requisition workflow to help
            reviewers verify and compare candidate submissions against the assignment
            requirements.
          </p>
        </div>
        <Link
          to="/review"
          className="shrink-0 text-sm font-semibold text-sky-800 hover:underline"
        >
          Open Reviewer Guide
        </Link>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-red">
            4.1 Purchase Requisition Listing
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-navy">Purchase Requisition</h1>
          <p className="mt-1 text-sm text-muted">
            Search, filter, and manage requisitions before they move to approval.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => {
              resetSeedData()
              void load()
            }}
            className="inline-flex items-center gap-2 rounded-lg border border-line bg-white px-3 py-2 text-sm font-semibold text-navy hover:bg-slate-50"
          >
            <RotateCcw className="h-4 w-4" />
            Reset sample data
          </button>
          <Link
            to="/pr/new"
            className="inline-flex items-center gap-2 rounded-lg bg-brand-red px-4 py-2 text-sm font-semibold text-white hover:bg-brand-red-dark"
          >
            <Plus className="h-4 w-4" />
            Create Purchase Requisition
          </Link>
        </div>
      </div>

      <PRFilters
        filters={filters}
        onChange={setFilters}
        onReset={() => setFilters(EMPTY_FILTERS)}
      />

      <div className="overflow-hidden rounded-xl border border-line bg-white shadow-sm">
        {state === 'loading' && <LoadingState />}
        {state === 'error' && <ErrorState message={error} onRetry={() => void load()} />}
        {state === 'empty' && (
          <EmptyState
            title={hasActiveFilters ? 'No requisitions match the filters' : 'No purchase requisitions found'}
            description={
              hasActiveFilters
                ? 'Try another PR number, status, or date range.'
                : 'Create the first purchase requisition to get started.'
            }
            action={
              hasActiveFilters ? (
                <button
                  type="button"
                  onClick={() => setFilters(EMPTY_FILTERS)}
                  className="rounded-lg border border-line px-4 py-2 text-sm font-semibold text-navy"
                >
                  Clear filters
                </button>
              ) : (
                <Link
                  to="/pr/new"
                  className="rounded-lg bg-navy px-4 py-2 text-sm font-semibold text-white"
                >
                  Create Purchase Requisition
                </Link>
              )
            }
          />
        )}
        {state === 'success' && (
          <>
            <PRTable items={pagedItems} />
            <Pagination page={page} pageSize={PAGE_SIZE} total={items.length} onPageChange={setPage} />
          </>
        )}
      </div>
    </div>
  )
}

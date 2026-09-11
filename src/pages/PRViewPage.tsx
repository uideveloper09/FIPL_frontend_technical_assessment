import { Pencil } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ConfirmDialog } from '../components/common/ConfirmDialog'
import { PageSpinner } from '../components/common/LoadingState'
import { PriorityBadge, StatusBadge } from '../components/common/StatusBadge'
import { MaterialItemsTable } from '../components/pr/MaterialItemsTable'
import { fetchRequisition, updateStatus } from '../services/pr-service'
import { useToastStore } from '../store/toast-store'
import type { PRFormErrors, PRFormValues, PRStatus, PurchaseRequisition } from '../types/pr'
import { formatDisplayDate } from '../utils/date'

const EMPTY_ERRORS: PRFormErrors = { itemErrors: {} }

function toFormValues(pr: PurchaseRequisition): PRFormValues {
  return {
    prNumber: pr.prNumber,
    requestDate: pr.requestDate,
    department: pr.department,
    requestedBy: pr.requestedBy,
    priority: pr.priority,
    items: pr.items,
  }
}

export function PRViewPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const showToast = useToastStore((state) => state.showToast)
  const [pr, setPr] = useState<PurchaseRequisition | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [pendingStatus, setPendingStatus] = useState<PRStatus | null>(null)
  const [updating, setUpdating] = useState(false)

  useEffect(() => {
    if (!id) return
    let active = true
    setLoading(true)
    fetchRequisition(id)
      .then((record) => {
        if (!active) return
        if (!record) {
          setError('Purchase requisition not found.')
          return
        }
        setPr(record)
      })
      .catch(() => {
        if (active) setError('Unable to load this purchase requisition.')
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [id])

  const applyStatus = async (status: PRStatus) => {
    if (!pr) return
    setUpdating(true)
    try {
      const updated = await updateStatus(pr.id, status)
      setPr(updated)
      showToast(`${updated.prNumber} marked as ${status}.`)
      if (status === 'Approved' || status === 'Rejected') {
        navigate('/')
      }
    } catch {
      showToast('Unable to update status.', 'error')
    } finally {
      setUpdating(false)
      setPendingStatus(null)
    }
  }

  if (loading) return <PageSpinner label="Loading purchase requisition..." />

  if (error || !pr) {
    return (
      <div className="rounded-xl border border-line bg-white p-8 text-center">
        <p className="font-semibold text-navy">{error || 'Purchase requisition not found.'}</p>
        <Link to="/" className="mt-4 inline-block text-sm font-semibold text-sky-700">
          Back to listing
        </Link>
      </div>
    )
  }

  const canEdit = pr.status === 'Draft' || pr.status === 'Rejected'
  const canDecide = pr.status === 'Submitted'

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-red">View Purchase Requisition</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-navy">{pr.prNumber}</h1>
          <p className="mt-1 text-sm text-muted">
            Requested on {formatDisplayDate(pr.requestDate)} · {pr.department} · {pr.requestedBy}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge status={pr.status} />
          <PriorityBadge priority={pr.priority} />
          {canEdit && (
            <Link
              to={`/pr/${pr.id}/edit`}
              className="inline-flex items-center gap-2 rounded-lg border border-line bg-white px-3 py-2 text-sm font-semibold text-navy hover:bg-slate-50"
            >
              <Pencil className="h-4 w-4" />
              Edit
            </Link>
          )}
          {canDecide && (
            <>
              <button
                type="button"
                onClick={() => setPendingStatus('Rejected')}
                className="rounded-lg border border-rose-200 px-3 py-2 text-sm font-semibold text-brand-red hover:bg-rose-50"
              >
                Reject
              </button>
              <button
                type="button"
                onClick={() => setPendingStatus('Approved')}
                className="rounded-lg bg-emerald-600 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
              >
                Approve
              </button>
            </>
          )}
        </div>
      </div>

      <section className="grid gap-4 rounded-xl border border-line bg-white p-4 sm:grid-cols-2 xl:grid-cols-5">
        <Info label="PR Number" value={pr.prNumber} />
        <Info label="Request Date" value={`${formatDisplayDate(pr.requestDate)} (DD/MM/YYYY)`} />
        <Info label="Department" value={pr.department} />
        <Info label="Requested By" value={pr.requestedBy} />
        <Info label="Priority" value={pr.priority} />
      </section>

      <MaterialItemsTable values={toFormValues(pr)} errors={EMPTY_ERRORS} onChange={() => undefined} readOnly />

      <div>
        <Link to="/" className="text-sm font-semibold text-sky-700 hover:underline">
          Back to listing
        </Link>
      </div>

      <ConfirmDialog
        open={pendingStatus !== null}
        title={pendingStatus === 'Approved' ? 'Approve requisition?' : 'Reject requisition?'}
        message={
          pendingStatus === 'Approved'
            ? `${pr.prNumber} will be marked as Approved.`
            : `${pr.prNumber} will be marked as Rejected and can be edited again.`
        }
        confirmLabel={updating ? 'Updating...' : pendingStatus ?? 'Confirm'}
        tone={pendingStatus === 'Rejected' ? 'danger' : 'primary'}
        onCancel={() => setPendingStatus(null)}
        onConfirm={() => pendingStatus && void applyStatus(pendingStatus)}
      />
    </div>
  )
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-muted">{label}</p>
      <p className="mt-1 text-sm font-semibold text-navy">{value}</p>
    </div>
  )
}

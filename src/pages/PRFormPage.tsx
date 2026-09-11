import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ConfirmDialog } from '../components/common/ConfirmDialog'
import { PageSpinner } from '../components/common/LoadingState'
import { MaterialItemsTable } from '../components/pr/MaterialItemsTable'
import { PRHeaderForm } from '../components/pr/PRHeaderForm'
import { CURRENT_USER } from '../data/masters'
import { fetchRequisition, readRequisitions, saveRequisition } from '../services/pr-service'
import { useToastStore } from '../store/toast-store'
import type { PRFormErrors, PRFormValues, PRStatus, PurchaseRequisition } from '../types/pr'
import { todayIso } from '../utils/date'
import { createEmptyLineItem, createId, nextPrNumber } from '../utils/ids'
import { hasFormErrors, validatePurchaseRequisition } from '../utils/validation'

function emptyErrors(): PRFormErrors {
  return { itemErrors: {} }
}

function createFormValues(prNumber: string): PRFormValues {
  return {
    prNumber,
    requestDate: todayIso(),
    department: '',
    requestedBy: CURRENT_USER.name,
    priority: '',
    items: [createEmptyLineItem()],
  }
}

function toFormValues(pr: PurchaseRequisition): PRFormValues {
  return {
    prNumber: pr.prNumber,
    requestDate: pr.requestDate,
    department: pr.department,
    requestedBy: pr.requestedBy,
    priority: pr.priority,
    items: pr.items.length > 0 ? pr.items.map((item) => ({ ...item })) : [createEmptyLineItem()],
  }
}

export function PRFormPage() {
  const { id } = useParams()
  const isEdit = Boolean(id)
  const navigate = useNavigate()
  const showToast = useToastStore((state) => state.showToast)

  const [values, setValues] = useState<PRFormValues>(() => createFormValues('PR-0001'))
  const [errors, setErrors] = useState<PRFormErrors>(emptyErrors)
  const [existing, setExisting] = useState<PurchaseRequisition | null>(null)
  const [loading, setLoading] = useState(isEdit)
  const [saving, setSaving] = useState(false)
  const [pendingAction, setPendingAction] = useState<PRStatus | null>(null)
  const [loadError, setLoadError] = useState('')

  useEffect(() => {
    if (!id) {
      const nextNumber = nextPrNumber(readRequisitions().map((pr) => pr.prNumber))
      setValues(createFormValues(nextNumber))
      return
    }

    let active = true
    setLoading(true)
    fetchRequisition(id)
      .then((pr) => {
        if (!active) return
        if (!pr) {
          setLoadError('Purchase requisition not found.')
          return
        }
        if (pr.status !== 'Draft' && pr.status !== 'Rejected') {
          setLoadError('Only Draft or Rejected requisitions can be edited.')
          return
        }
        setExisting(pr)
        setValues(toFormValues(pr))
      })
      .catch(() => {
        if (active) setLoadError('Unable to load this purchase requisition.')
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [id])

  const persist = async (status: PRStatus) => {
    const nextErrors = validatePurchaseRequisition(values)
    setErrors(nextErrors)
    if (hasFormErrors(nextErrors)) {
      showToast('Please correct the highlighted fields before continuing.', 'error')
      return
    }

    setSaving(true)
    try {
      const now = new Date().toISOString()
      const record: PurchaseRequisition = {
        id: existing?.id ?? createId('PR'),
        prNumber: values.prNumber,
        requestDate: values.requestDate,
        department: values.department,
        requestedBy: values.requestedBy,
        priority: values.priority === '' ? 'Medium' : values.priority,
        status,
        items: values.items.filter((item) => item.materialCode),
        createdAt: existing?.createdAt ?? now,
        updatedAt: now,
      }
      const saved = await saveRequisition(record)
      showToast(
        status === 'Draft'
          ? `${saved.prNumber} saved as Draft.`
          : `${saved.prNumber} submitted for approval.`,
      )
      navigate(status === 'Draft' ? `/pr/${saved.id}` : '/')
    } catch {
      showToast('Unable to save the purchase requisition.', 'error')
    } finally {
      setSaving(false)
      setPendingAction(null)
    }
  }

  if (loading) {
    return <PageSpinner label="Loading purchase requisition..." />
  }

  if (loadError) {
    return (
      <div className="rounded-xl border border-line bg-white p-8 text-center">
        <p className="font-semibold text-navy">{loadError}</p>
        <Link to="/" className="mt-4 inline-block text-sm font-semibold text-sky-700">
          Back to listing
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-red">
          4.2 Create Purchase Requisition
        </p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-navy">
          {isEdit ? `Edit ${values.prNumber}` : 'Create Purchase Requisition'}
        </h1>
        <p className="mt-1 text-sm text-muted">
          Capture header details and add multiple material line items. Save as Draft or submit for approval.
        </p>
      </div>

      <PRHeaderForm values={values} errors={errors} onChange={setValues} />
      <MaterialItemsTable values={values} errors={errors} onChange={setValues} />

      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <Link
          to="/"
          className="rounded-lg border border-line bg-white px-4 py-2.5 text-center text-sm font-semibold text-navy hover:bg-slate-50"
        >
          Cancel
        </Link>
        <button
          type="button"
          disabled={saving}
          onClick={() => void persist('Draft')}
          className="rounded-lg border border-navy bg-white px-4 py-2.5 text-sm font-semibold text-navy hover:bg-slate-50 disabled:opacity-50"
        >
          Save as Draft
        </button>
        <button
          type="button"
          disabled={saving}
          onClick={() => setPendingAction('Submitted')}
          className="rounded-lg bg-brand-red px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-red-dark disabled:opacity-50"
        >
          Submit for Approval
        </button>
      </div>

      <ConfirmDialog
        open={pendingAction === 'Submitted'}
        title="Submit for approval?"
        message={`${values.prNumber} will move to Submitted status and can no longer be edited until it is rejected.`}
        confirmLabel={saving ? 'Submitting...' : 'Submit'}
        onCancel={() => setPendingAction(null)}
        onConfirm={() => void persist('Submitted')}
      />
    </div>
  )
}

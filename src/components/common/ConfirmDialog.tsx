type ConfirmDialogProps = {
  open: boolean
  title: string
  message: string
  confirmLabel?: string
  tone?: 'primary' | 'danger'
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = 'Confirm',
  tone = 'primary',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-navy/40 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl">
        <h3 className="text-lg font-semibold text-navy">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-muted">{message}</p>
        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-line px-4 py-2 text-sm font-semibold text-navy hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`rounded-lg px-4 py-2 text-sm font-semibold text-white ${
              tone === 'danger' ? 'bg-brand-red hover:bg-brand-red-dark' : 'bg-navy hover:bg-navy-800'
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}

import { CircleCheck, CircleX, Info, X } from 'lucide-react'
import { useToastStore } from '../../store/toast-store'

const ICONS = {
  success: CircleCheck,
  error: CircleX,
  info: Info,
}

const TONE_CLASS = {
  success: 'border-emerald-200 bg-emerald-50 text-emerald-800',
  error: 'border-rose-200 bg-rose-50 text-rose-800',
  info: 'border-sky-200 bg-sky-50 text-sky-800',
}

export function ToastViewport() {
  const toasts = useToastStore((state) => state.toasts)
  const dismissToast = useToastStore((state) => state.dismissToast)

  return (
    <div className="pointer-events-none fixed right-4 top-4 z-[80] flex w-[min(100%-2rem,22rem)] flex-col gap-2">
      {toasts.map((toast) => {
        const Icon = ICONS[toast.tone]
        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 rounded-xl border px-3 py-2.5 shadow-lg ${TONE_CLASS[toast.tone]}`}
          >
            <Icon className="mt-0.5 h-4 w-4 shrink-0" />
            <p className="flex-1 text-sm font-medium">{toast.message}</p>
            <button type="button" onClick={() => dismissToast(toast.id)} className="opacity-70 hover:opacity-100">
              <X className="h-4 w-4" />
            </button>
          </div>
        )
      })}
    </div>
  )
}

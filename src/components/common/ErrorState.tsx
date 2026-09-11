import { AlertTriangle } from 'lucide-react'

type ErrorStateProps = {
  message: string
  onRetry: () => void
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-rose-50 text-brand-red">
        <AlertTriangle className="h-7 w-7" />
      </div>
      <h3 className="text-base font-semibold text-navy">Something went wrong</h3>
      <p className="mt-1 max-w-md text-sm text-muted">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-5 rounded-lg bg-navy px-4 py-2 text-sm font-semibold text-white hover:bg-navy-800"
      >
        Retry
      </button>
    </div>
  )
}

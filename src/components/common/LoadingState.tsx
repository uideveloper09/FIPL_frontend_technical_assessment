export function LoadingState({ rows = 6 }: { rows?: number }) {
  return (
    <div className="space-y-3 p-4" role="status" aria-live="polite" aria-label="Loading">
      {Array.from({ length: rows }).map((_, index) => (
        <div key={index} className="h-11 animate-pulse rounded-lg bg-slate-100" />
      ))}
    </div>
  )
}

export function PageSpinner({ label = 'Loading...' }: { label?: string }) {
  return (
    <div className="flex min-h-72 flex-col items-center justify-center gap-3">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-navy" />
      <p className="text-sm text-muted">{label}</p>
    </div>
  )
}

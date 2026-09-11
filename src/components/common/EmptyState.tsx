import { Inbox } from 'lucide-react'
import type { ReactNode } from 'react'

type EmptyStateProps = {
  title: string
  description: string
  action?: ReactNode
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-sky-50 text-sky-700">
        <Inbox className="h-7 w-7" />
      </div>
      <h3 className="text-base font-semibold text-navy">{title}</h3>
      <p className="mt-1 max-w-md text-sm text-muted">{description}</p>
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  )
}

import { CURRENT_USER, DEPARTMENTS, USERS } from '../../data/masters'
import { PR_PRIORITIES, type PRFormErrors, type PRFormValues, type PRPriority } from '../../types/pr'

type PRHeaderFormProps = {
  values: PRFormValues
  errors: PRFormErrors
  onChange: (values: PRFormValues) => void
  readOnly?: boolean
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return <p className="mt-1 text-xs font-medium text-brand-red">{message}</p>
}

export function PRHeaderForm({ values, errors, onChange, readOnly = false }: PRHeaderFormProps) {
  return (
    <section className="overflow-hidden rounded-xl border border-line bg-white">
      <div className="border-b border-line bg-[#102a43] px-4 py-2.5">
        <h2 className="text-sm font-semibold text-white">4.2.1 Header Information</h2>
      </div>
      <div className="grid gap-4 p-4 md:grid-cols-2 xl:grid-cols-5">
        <label className="block text-xs font-semibold uppercase tracking-wide text-muted">
          PR Number
          <input
            value={values.prNumber}
            readOnly
            className="mt-1.5 h-10 w-full rounded-lg border border-line bg-slate-100 px-3 text-sm font-semibold text-navy"
          />
          <span className="mt-1 block text-[11px] font-normal normal-case tracking-normal text-muted">
            Auto-generated · System generated (read-only)
          </span>
        </label>

        <label className="block text-xs font-semibold uppercase tracking-wide text-muted">
          Request Date
          <input
            type="date"
            value={values.requestDate}
            disabled={readOnly}
            onChange={(event) => onChange({ ...values, requestDate: event.target.value })}
            className="mt-1.5 h-10 w-full rounded-lg border border-line bg-white px-3 text-sm text-navy outline-none focus:border-navy-700 disabled:bg-slate-100"
          />
          <FieldError message={errors.requestDate} />
        </label>

        <label className="block text-xs font-semibold uppercase tracking-wide text-muted">
          Department
          <select
            value={values.department}
            disabled={readOnly}
            onChange={(event) => onChange({ ...values, department: event.target.value })}
            className="mt-1.5 h-10 w-full rounded-lg border border-line bg-white px-3 text-sm text-navy outline-none focus:border-navy-700 disabled:bg-slate-100"
          >
            <option value="">Select from department list</option>
            {DEPARTMENTS.map((department) => (
              <option key={department.id} value={department.name}>
                {department.name}
              </option>
            ))}
          </select>
          <FieldError message={errors.department} />
        </label>

        <label className="block text-xs font-semibold uppercase tracking-wide text-muted">
          Requested By
          <select
            value={values.requestedBy}
            disabled={readOnly}
            onChange={(event) => onChange({ ...values, requestedBy: event.target.value })}
            className="mt-1.5 h-10 w-full rounded-lg border border-line bg-white px-3 text-sm text-navy outline-none focus:border-navy-700 disabled:bg-slate-100"
          >
            <option value="">Select user</option>
            {USERS.map((user) => (
              <option key={user.id} value={user.name}>
                {user.name}
                {user.id === CURRENT_USER.id ? ' (login user)' : ''}
              </option>
            ))}
          </select>
          <FieldError message={errors.requestedBy} />
        </label>

        <label className="block text-xs font-semibold uppercase tracking-wide text-muted">
          Priority
          <select
            value={values.priority}
            disabled={readOnly}
            onChange={(event) => onChange({ ...values, priority: event.target.value as PRPriority | '' })}
            className="mt-1.5 h-10 w-full rounded-lg border border-line bg-white px-3 text-sm text-navy outline-none focus:border-navy-700 disabled:bg-slate-100"
          >
            <option value="">Select priority</option>
            {PR_PRIORITIES.map((priority) => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </select>
          <FieldError message={errors.priority} />
        </label>
      </div>
    </section>
  )
}

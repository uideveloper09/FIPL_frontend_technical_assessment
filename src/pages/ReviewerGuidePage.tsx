import { CheckCircle2, Clock3, Code2, ListChecks, PlayCircle, Shield } from 'lucide-react'
import { Link } from 'react-router-dom'

const STACK = [
  { label: 'React.js', note: 'Latest stable (Vite + React 19)' },
  { label: 'TypeScript', note: 'Typed forms, filters, and domain models' },
  { label: 'Tailwind CSS', note: 'Utility-first ERP layout' },
  { label: 'React Router', note: 'Listing, create, view, and edit routes' },
  { label: 'State / data layer', note: 'Service layer with local persistence' },
]

const LISTING_CHECKS = [
  'Columns: PR Number, Date, Department, Requested By, Status, Total Items, Actions',
  'Date displayed as DD/MM/YYYY',
  'Search by PR Number',
  'Filter by Status',
  'Date range filter',
  'Pagination',
  'Loading, empty, and error states',
  'View and Edit actions',
]

const FORM_CHECKS = [
  'PR Number is auto-generated and read-only (PR-0001 format)',
  'Request Date, Department dropdown, Requested By (login user / select user), Priority (Low / Medium / High)',
  'Multiple material line items: Code, Name, Quantity, Unit, Required Date, Remarks',
  'Add and remove material rows',
  'Quantity must be greater than 0',
  'Duplicate material codes are blocked',
  'Save as Draft and Submit for Approval',
]

const WALKTHROUGH = [
  {
    title: '1. Review the listing',
    detail:
      'Open Purchase Requisition. Confirm sample record PR-0001 dated 25/09/2025 for Production / John Doe in Draft status with 5 items. Use search, status, and date filters. Move between pages.',
  },
  {
    title: '2. Create a requisition',
    detail:
      'Click Create PR. Header fields are prefilled where required. Add MAT-001 Bearing and a second material. Try a duplicate material code and a zero quantity to see validation.',
  },
  {
    title: '3. Save and submit',
    detail:
      'Save as Draft, then open the record and submit for approval. Submitted PRs cannot be edited until they are rejected.',
  },
  {
    title: '4. View and decide',
    detail:
      'Open a Submitted PR and use Approve or Reject. Rejected records can be edited again. Approved records stay read-only.',
  },
]

export function ReviewerGuidePage() {
  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-2xl border border-line bg-white shadow-sm">
        <div className="bg-[#102a43] px-5 py-5 text-white sm:px-7">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">
            Force Intellect Pvt. Ltd.
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight">Reviewer Guide</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-white/80">
            This module was built for the React Developer Technical Assessment. It implements a
            Purchase Requisition flow used in manufacturing ERP — listing, create, validation,
            draft/submit, and approval — using the stack specified in the assignment brief.
          </p>
        </div>
        <div className="grid gap-3 p-5 sm:grid-cols-3 sm:px-7">
          <Highlight icon={Clock3} title="Suggested review time" value="10–15 minutes" />
          <Highlight icon={Shield} title="Purpose" value="Company evaluation only" />
          <Highlight icon={PlayCircle} title="Start here" value="Listing → Create PR" />
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <article className="rounded-2xl border border-line bg-white p-5 shadow-sm sm:p-6">
          <SectionTitle icon={PlayCircle} title="Suggested walkthrough" />
          <ol className="mt-4 space-y-4">
            {WALKTHROUGH.map((step) => (
              <li key={step.title} className="rounded-xl border border-line bg-[#f7fafc] p-4">
                <p className="text-sm font-semibold text-navy">{step.title}</p>
                <p className="mt-1 text-sm leading-6 text-muted">{step.detail}</p>
              </li>
            ))}
          </ol>
          <div className="mt-5 flex flex-wrap gap-2">
            <Link
              to="/"
              className="rounded-lg bg-navy px-4 py-2 text-sm font-semibold text-white hover:bg-navy-800"
            >
              Open listing
            </Link>
            <Link
              to="/pr/new"
              className="rounded-lg bg-brand-red px-4 py-2 text-sm font-semibold text-white hover:bg-brand-red-dark"
            >
              Create a PR
            </Link>
          </div>
        </article>

        <article className="rounded-2xl border border-line bg-white p-5 shadow-sm sm:p-6">
          <SectionTitle icon={Code2} title="Technology stack" />
          <ul className="mt-4 space-y-3">
            {STACK.map((item) => (
              <li key={item.label} className="flex items-start justify-between gap-3 border-b border-line pb-3 last:border-0">
                <span className="text-sm font-semibold text-navy">{item.label}</span>
                <span className="text-right text-xs text-muted">{item.note}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm leading-6 text-muted">
            Data is persisted in the browser so reviewers can create, edit, and approve records
            without a backend. Use <span className="font-semibold text-navy">Reset sample data</span> on
            the listing page to restore the original seed records.
          </p>
        </article>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <ChecklistCard title="4.1 Purchase Requisition Listing" items={LISTING_CHECKS} />
        <ChecklistCard title="4.2 Create Purchase Requisition" items={FORM_CHECKS} />
      </section>

      <section className="rounded-2xl border border-line bg-white p-5 shadow-sm sm:p-6">
        <SectionTitle icon={ListChecks} title="Additional ERP behaviour included" />
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <Note
            title="View"
            text="Read-only header and material lines, with dates in DD/MM/YYYY."
          />
          <Note
            title="Edit rules"
            text="Only Draft or Rejected requisitions can be edited. Submitted and Approved stay locked."
          />
          <Note
            title="Approval"
            text="Submitted records can be Approved or Rejected from the view screen."
          />
        </div>
        <p className="mt-5 text-sm leading-6 text-muted">
          Seed example from the brief: <span className="font-semibold text-navy">PR-0001</span>,
          25/09/2025, Production, John Doe, Draft, 5 items, including MAT-001 Bearing / 10 NOS /
          30/09/2025 / For production.
        </p>
      </section>
    </div>
  )
}

function SectionTitle({ icon: Icon, title }: { icon: typeof Code2; title: string }) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="h-4 w-4 text-brand-red" />
      <h2 className="text-base font-semibold text-navy">{title}</h2>
    </div>
  )
}

function Highlight({
  icon: Icon,
  title,
  value,
}: {
  icon: typeof Clock3
  title: string
  value: string
}) {
  return (
    <div className="rounded-xl border border-line bg-[#f7fafc] px-4 py-3">
      <div className="flex items-center gap-2 text-muted">
        <Icon className="h-4 w-4" />
        <p className="text-[11px] font-semibold uppercase tracking-wide">{title}</p>
      </div>
      <p className="mt-1 text-sm font-semibold text-navy">{value}</p>
    </div>
  )
}

function ChecklistCard({ title, items }: { title: string; items: string[] }) {
  return (
    <article className="rounded-2xl border border-line bg-white p-5 shadow-sm sm:p-6">
      <SectionTitle icon={CheckCircle2} title={title} />
      <ul className="mt-4 space-y-2.5">
        {items.map((item) => (
          <li key={item} className="flex gap-2.5 text-sm leading-6 text-navy-800">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  )
}

function Note({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-xl border border-line bg-[#f7fafc] p-4">
      <p className="text-sm font-semibold text-navy">{title}</p>
      <p className="mt-1 text-sm leading-6 text-muted">{text}</p>
    </div>
  )
}

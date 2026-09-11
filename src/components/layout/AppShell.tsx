import { ClipboardList, FileText, Plus } from 'lucide-react'
import { NavLink, Outlet } from 'react-router-dom'
import { CURRENT_USER } from '../../data/masters'
import { BrandLogo } from './BrandLogo'
import { ToastViewport } from '../common/Toast'

const navClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
    isActive ? 'bg-white/12 text-white' : 'text-white/75 hover:bg-white/8 hover:text-white'
  }`

export function AppShell() {
  return (
    <div className="flex min-h-svh flex-col bg-surface">
      <header className="sticky top-0 z-40">
        <div className="border-b border-line bg-white">
          <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 py-2.5 lg:px-6">
            <div className="flex items-center gap-4">
              <BrandLogo />
              <div className="hidden h-10 w-px bg-line sm:block" />
              <div className="hidden leading-tight sm:block">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">
                  Technical Assessment
                </p>
                <p className="text-sm font-semibold text-navy">React Developer Assignment</p>
              </div>
            </div>

            <div className="text-right leading-tight">
              <p className="text-xs font-semibold text-navy">Confidential</p>
              <p className="text-[11px] text-muted">For Assessment Purpose Only</p>
              <p className="mt-1 hidden text-[10px] tracking-wide text-slate-400 md:block">
                People | Process | Technology | Growth
              </p>
            </div>
          </div>
        </div>

        <div className="bg-navy">
          <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 py-2 lg:px-6">
            <nav className="flex items-center gap-1">
              <NavLink to="/" className={navClass} end>
                <ClipboardList className="h-4 w-4" />
                Purchase Requisition
              </NavLink>
              <NavLink to="/pr/new" className={navClass}>
                <Plus className="h-4 w-4" />
                Create PR
              </NavLink>
              <NavLink to="/review" className={navClass}>
                <FileText className="h-4 w-4" />
                Reviewer Guide
              </NavLink>
            </nav>
            <div className="flex items-center gap-3">
              <div className="hidden text-right sm:block">
                <p className="text-sm font-semibold text-white">{CURRENT_USER.name}</p>
                <p className="text-[11px] text-white/60">Logged-in user</p>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-red text-sm font-semibold text-white">
                JD
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1400px] flex-1 px-4 py-6 lg:px-6">
        <Outlet />
      </main>

      <footer className="border-t border-line bg-white">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-1 px-4 py-3 text-xs text-muted sm:flex-row sm:items-center sm:justify-between lg:px-6">
          <p>Force Intellect Pvt. Ltd. · React Developer Technical Assessment</p>
          <p>adding value, enabling growth</p>
        </div>
        <div className="h-1.5 bg-brand-red" />
      </footer>
      <ToastViewport />
    </div>
  )
}

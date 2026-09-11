import { SEED_REQUISITIONS } from '../data/seed'
import type { PRListFilters, PRStatus, PurchaseRequisition } from '../types/pr'

const STORAGE_KEY = 'fi-pr-requisitions'
const DELAY_MS = 550

function wait(ms = DELAY_MS): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms)
  })
}

function clone<T>(value: T): T {
  return structuredClone(value)
}

export function readRequisitions(): PurchaseRequisition[] {
  const raw = window.localStorage.getItem(STORAGE_KEY)
  if (!raw) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_REQUISITIONS))
    return clone(SEED_REQUISITIONS)
  }

  const parsed = JSON.parse(raw) as PurchaseRequisition[]
  if (!Array.isArray(parsed)) {
    throw new Error('Unable to load purchase requisitions.')
  }
  return parsed
}

function writeRequisitions(items: PurchaseRequisition[]): void {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

export function matchesFilters(pr: PurchaseRequisition, filters: PRListFilters): boolean {
  const query = filters.prNumber.trim().toLowerCase()
  if (query && !pr.prNumber.toLowerCase().includes(query)) return false
  if (filters.status && pr.status !== filters.status) return false
  if (filters.fromDate && pr.requestDate < filters.fromDate) return false
  if (filters.toDate && pr.requestDate > filters.toDate) return false
  return true
}

export async function fetchRequisitions(filters: PRListFilters): Promise<PurchaseRequisition[]> {
  await wait()
  if (window.sessionStorage.getItem('fi-pr-force-error') === '1') {
    throw new Error('Unable to load purchase requisitions. Please try again.')
  }

  return readRequisitions()
    .filter((pr) => matchesFilters(pr, filters))
    .sort((a, b) => b.prNumber.localeCompare(a.prNumber))
}

export async function fetchRequisition(id: string): Promise<PurchaseRequisition | undefined> {
  await wait(350)
  return readRequisitions().find((pr) => pr.id === id)
}

export async function saveRequisition(requisition: PurchaseRequisition): Promise<PurchaseRequisition> {
  await wait(400)
  const items = readRequisitions()
  const index = items.findIndex((item) => item.id === requisition.id)
  const next = clone(requisition)
  next.updatedAt = new Date().toISOString()

  if (index >= 0) {
    items[index] = next
  } else {
    items.push(next)
  }

  writeRequisitions(items)
  return next
}

export async function updateStatus(id: string, status: PRStatus): Promise<PurchaseRequisition> {
  await wait(350)
  const items = readRequisitions()
  const index = items.findIndex((item) => item.id === id)
  if (index < 0) {
    throw new Error('Purchase requisition not found.')
  }

  items[index] = {
    ...items[index],
    status,
    updatedAt: new Date().toISOString(),
  }
  writeRequisitions(items)
  return clone(items[index])
}

export function resetSeedData(): void {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_REQUISITIONS))
}

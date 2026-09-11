export const PR_STATUSES = ['Draft', 'Submitted', 'Approved', 'Rejected'] as const
export type PRStatus = (typeof PR_STATUSES)[number]

export const PR_PRIORITIES = ['Low', 'Medium', 'High'] as const
export type PRPriority = (typeof PR_PRIORITIES)[number]

export type Department = {
  id: string
  name: string
}

export type AppUser = {
  id: string
  name: string
}

export type Material = {
  code: string
  name: string
  unit: string
}

export type MaterialLineItem = {
  id: string
  materialCode: string
  materialName: string
  quantity: number | ''
  unit: string
  requiredDate: string
  remarks: string
}

export type PurchaseRequisition = {
  id: string
  prNumber: string
  requestDate: string
  department: string
  requestedBy: string
  priority: PRPriority
  status: PRStatus
  items: MaterialLineItem[]
  createdAt: string
  updatedAt: string
}

export type PRFormValues = {
  prNumber: string
  requestDate: string
  department: string
  requestedBy: string
  priority: PRPriority | ''
  items: MaterialLineItem[]
}

export type LineItemErrors = {
  materialCode?: string
  materialName?: string
  quantity?: string
  unit?: string
  requiredDate?: string
  duplicate?: string
}

export type PRFormErrors = {
  requestDate?: string
  department?: string
  requestedBy?: string
  priority?: string
  items?: string
  itemErrors: Record<string, LineItemErrors>
}

export type PRListFilters = {
  prNumber: string
  status: PRStatus | ''
  fromDate: string
  toDate: string
}

export type ListUiState = 'idle' | 'loading' | 'success' | 'empty' | 'error'

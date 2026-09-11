import type { LineItemErrors, MaterialLineItem, PRFormErrors, PRFormValues } from '../types/pr'
import { isDateBefore, isValidIsoDate } from './date'

function hasValue(value: string | number | '' | undefined): boolean {
  if (typeof value === 'number') return true
  return Boolean(value && String(value).trim())
}

function parseQuantity(value: number | ''): number | null {
  if (value === '' || value === null || value === undefined) return null
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : null
}

export function validatePurchaseRequisition(values: PRFormValues): PRFormErrors {
  const errors: PRFormErrors = { itemErrors: {} }

  if (!hasValue(values.requestDate) || !isValidIsoDate(values.requestDate)) {
    errors.requestDate = 'Request date is required.'
  }

  if (!hasValue(values.department)) {
    errors.department = 'Department is required.'
  }

  if (!hasValue(values.requestedBy)) {
    errors.requestedBy = 'Requested by is required.'
  }

  if (!hasValue(values.priority)) {
    errors.priority = 'Priority is required.'
  }

  const activeItems = values.items.filter((item) =>
    [item.materialCode, item.materialName, item.unit, item.requiredDate, item.remarks].some((field) =>
      hasValue(field),
    ) || item.quantity !== '',
  )

  if (activeItems.length === 0) {
    errors.items = 'Add at least one material item.'
  }

  const codeCounts = new Map<string, number>()
  for (const item of values.items) {
    const code = item.materialCode.trim().toUpperCase()
    if (!code) continue
    codeCounts.set(code, (codeCounts.get(code) ?? 0) + 1)
  }

  for (const item of values.items) {
    const itemErrors = validateLineItem(item, values.requestDate, codeCounts)
    if (Object.keys(itemErrors).length > 0) {
      errors.itemErrors[item.id] = itemErrors
    }
  }

  return errors
}

export function validateLineItem(
  item: MaterialLineItem,
  requestDate: string,
  codeCounts: Map<string, number>,
): LineItemErrors {
  const errors: LineItemErrors = {}
  const code = item.materialCode.trim().toUpperCase()

  if (!hasValue(item.materialCode)) {
    errors.materialCode = 'Material code is required.'
  }

  if (!hasValue(item.materialName)) {
    errors.materialName = 'Material name is required.'
  }

  const quantity = parseQuantity(item.quantity)
  if (quantity === null) {
    errors.quantity = 'Quantity is required.'
  } else if (quantity <= 0) {
    errors.quantity = 'Quantity must be greater than 0.'
  }

  if (!hasValue(item.unit)) {
    errors.unit = 'Unit is required.'
  }

  if (!hasValue(item.requiredDate) || !isValidIsoDate(item.requiredDate)) {
    errors.requiredDate = 'Required date is required.'
  } else if (requestDate && isDateBefore(item.requiredDate, requestDate)) {
    errors.requiredDate = 'Required date cannot be before request date.'
  }

  if (code && (codeCounts.get(code) ?? 0) > 1) {
    errors.duplicate = `Duplicate material ${code} is not allowed.`
  }

  return errors
}

export function hasFormErrors(errors: PRFormErrors): boolean {
  return Boolean(
    errors.requestDate ||
      errors.department ||
      errors.requestedBy ||
      errors.priority ||
      errors.items ||
      Object.keys(errors.itemErrors).length > 0,
  )
}

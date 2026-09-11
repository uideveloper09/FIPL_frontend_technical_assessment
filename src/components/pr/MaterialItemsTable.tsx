import { Plus, Trash2 } from 'lucide-react'
import { MATERIALS, UNITS, findMaterial } from '../../data/masters'
import type { MaterialLineItem, PRFormErrors, PRFormValues } from '../../types/pr'
import { formatDisplayDate } from '../../utils/date'
import { createEmptyLineItem } from '../../utils/ids'

type MaterialItemsTableProps = {
  values: PRFormValues
  errors: PRFormErrors
  onChange: (values: PRFormValues) => void
  readOnly?: boolean
}

export function MaterialItemsTable({ values, errors, onChange, readOnly = false }: MaterialItemsTableProps) {
  const updateItem = (id: string, patch: Partial<MaterialLineItem>) => {
    onChange({
      ...values,
      items: values.items.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    })
  }

  const applyMaterial = (id: string, code: string) => {
    const material = findMaterial(code)
    updateItem(id, {
      materialCode: code,
      materialName: material?.name ?? '',
      unit: material?.unit ?? '',
    })
  }

  const removeItem = (id: string) => {
    const remaining = values.items.filter((item) => item.id !== id)
    onChange({
      ...values,
      items: remaining.length > 0 ? remaining : [createEmptyLineItem()],
    })
  }

  return (
    <section className="overflow-hidden rounded-xl border border-line bg-white">
      <div className="flex items-center justify-between border-b border-line bg-[#102a43] px-4 py-2.5">
        <h2 className="text-sm font-semibold text-white">4.2.2 Material Items</h2>
        {!readOnly && (
          <button
            type="button"
            onClick={() => onChange({ ...values, items: [...values.items, createEmptyLineItem()] })}
            className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-navy hover:bg-sky-50"
          >
            <Plus className="h-3.5 w-3.5" />
            Add Item
          </button>
        )}
      </div>

      {errors.items ? <p className="px-4 pt-3 text-sm font-medium text-brand-red">{errors.items}</p> : null}

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-line bg-[#f0f5fa] text-[11px] uppercase tracking-wider text-muted">
              <th className="px-3 py-3 font-semibold">Material Code</th>
              <th className="px-3 py-3 font-semibold">Material Name</th>
              <th className="px-3 py-3 font-semibold">Quantity</th>
              <th className="px-3 py-3 font-semibold">Unit</th>
              <th className="px-3 py-3 font-semibold">Required Date</th>
              <th className="px-3 py-3 font-semibold">Remarks</th>
              {!readOnly && <th className="px-3 py-3 font-semibold">Action</th>}
            </tr>
          </thead>
          <tbody>
            {values.items.map((item, index) => {
              const itemErrors = errors.itemErrors[item.id] ?? {}
              const hasError = Object.keys(itemErrors).length > 0
              return (
                <tr key={item.id} className={`border-b border-line last:border-0 ${hasError ? 'bg-rose-50/40' : ''}`}>
                  <td className="px-3 py-3 align-top">
                    {readOnly ? (
                      <span className="font-semibold">{item.materialCode || '—'}</span>
                    ) : (
                      <select
                        value={item.materialCode}
                        onChange={(event) => applyMaterial(item.id, event.target.value)}
                        className="h-10 w-40 rounded-lg border border-line bg-white px-2 text-sm outline-none focus:border-navy-700"
                      >
                        <option value="">Select code</option>
                        {MATERIALS.map((material) => (
                          <option key={material.code} value={material.code}>
                            {material.code}
                          </option>
                        ))}
                      </select>
                    )}
                    {itemErrors.materialCode || itemErrors.duplicate ? (
                      <p className="mt-1 text-xs font-medium text-brand-red">
                        {itemErrors.duplicate ?? itemErrors.materialCode}
                      </p>
                    ) : null}
                  </td>
                  <td className="px-3 py-3 align-top">
                    {readOnly ? (
                      item.materialName || '—'
                    ) : (
                      <input
                        value={item.materialName}
                        readOnly
                        placeholder={index === 0 ? 'Bearing' : 'Auto-filled'}
                        className="h-10 w-44 rounded-lg border border-line bg-slate-100 px-3 text-sm"
                      />
                    )}
                    {itemErrors.materialName ? (
                      <p className="mt-1 text-xs font-medium text-brand-red">{itemErrors.materialName}</p>
                    ) : null}
                  </td>
                  <td className="px-3 py-3 align-top">
                    {readOnly ? (
                      item.quantity
                    ) : (
                      <input
                        type="number"
                        min="0.01"
                        step="0.01"
                        value={item.quantity}
                        placeholder={index === 0 ? '10' : '0'}
                        onChange={(event) =>
                          updateItem(item.id, {
                            quantity: event.target.value === '' ? '' : Number(event.target.value),
                          })
                        }
                        className="h-10 w-24 rounded-lg border border-line px-3 text-sm outline-none focus:border-navy-700"
                      />
                    )}
                    {itemErrors.quantity ? (
                      <p className="mt-1 text-xs font-medium text-brand-red">{itemErrors.quantity}</p>
                    ) : null}
                  </td>
                  <td className="px-3 py-3 align-top">
                    {readOnly ? (
                      item.unit
                    ) : (
                      <select
                        value={item.unit}
                        onChange={(event) => updateItem(item.id, { unit: event.target.value })}
                        className="h-10 w-24 rounded-lg border border-line bg-white px-2 text-sm outline-none focus:border-navy-700"
                      >
                        <option value="">Unit</option>
                        {UNITS.map((unit) => (
                          <option key={unit} value={unit}>
                            {unit}
                          </option>
                        ))}
                      </select>
                    )}
                    {itemErrors.unit ? (
                      <p className="mt-1 text-xs font-medium text-brand-red">{itemErrors.unit}</p>
                    ) : null}
                  </td>
                  <td className="px-3 py-3 align-top">
                    {readOnly ? (
                      formatDisplayDate(item.requiredDate)
                    ) : (
                      <input
                        type="date"
                        value={item.requiredDate}
                        onChange={(event) => updateItem(item.id, { requiredDate: event.target.value })}
                        className="h-10 w-40 rounded-lg border border-line px-3 text-sm outline-none focus:border-navy-700"
                      />
                    )}
                    {itemErrors.requiredDate ? (
                      <p className="mt-1 text-xs font-medium text-brand-red">{itemErrors.requiredDate}</p>
                    ) : null}
                  </td>
                  <td className="px-3 py-3 align-top">
                    {readOnly ? (
                      item.remarks || '—'
                    ) : (
                      <input
                        value={item.remarks}
                        placeholder={index === 0 ? 'For production' : 'Remarks'}
                        onChange={(event) => updateItem(item.id, { remarks: event.target.value })}
                        className="h-10 w-48 rounded-lg border border-line px-3 text-sm outline-none focus:border-navy-700"
                      />
                    )}
                  </td>
                  {!readOnly && (
                    <td className="px-3 py-3 align-top">
                      <button
                        type="button"
                        title="Remove material row"
                        onClick={() => removeItem(item.id)}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-rose-200 text-brand-red hover:bg-rose-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  )}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}

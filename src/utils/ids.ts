export function createId(prefix: string): string {
  return `${prefix}-${crypto.randomUUID()}`
}

export function nextPrNumber(existingNumbers: string[]): string {
  const max = existingNumbers.reduce((highest, number) => {
    const match = /^PR-(\d+)$/.exec(number)
    if (!match) return highest
    return Math.max(highest, Number(match[1]))
  }, 0)

  return `PR-${String(max + 1).padStart(4, '0')}`
}

export function createEmptyLineItem() {
  return {
    id: createId('LINE'),
    materialCode: '',
    materialName: '',
    quantity: '' as const,
    unit: '',
    requiredDate: '',
    remarks: '',
  }
}

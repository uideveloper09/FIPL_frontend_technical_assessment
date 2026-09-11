import type { AppUser, Department, Material } from '../types/pr'

export const CURRENT_USER: AppUser = {
  id: 'USR-001',
  name: 'John Doe',
}

export const DEPARTMENTS: Department[] = [
  { id: 'DEP-01', name: 'Production' },
  { id: 'DEP-02', name: 'Purchase' },
  { id: 'DEP-03', name: 'Quality' },
  { id: 'DEP-04', name: 'Stores' },
  { id: 'DEP-05', name: 'Maintenance' },
  { id: 'DEP-06', name: 'Finance' },
]

export const USERS: AppUser[] = [
  CURRENT_USER,
  { id: 'USR-002', name: 'Priya Sharma' },
  { id: 'USR-003', name: 'Amit Verma' },
  { id: 'USR-004', name: 'Rahul Mehta' },
  { id: 'USR-005', name: 'Sneha Patil' },
]

export const MATERIALS: Material[] = [
  { code: 'MAT-001', name: 'Bearing', unit: 'NOS' },
  { code: 'MAT-002', name: 'Hydraulic Oil', unit: 'LTR' },
  { code: 'MAT-003', name: 'Mild Steel Plate', unit: 'KG' },
  { code: 'MAT-004', name: 'Cutting Tool', unit: 'SET' },
  { code: 'MAT-005', name: 'Safety Gloves', unit: 'PAIR' },
  { code: 'MAT-006', name: 'Welding Rod', unit: 'KG' },
  { code: 'MAT-007', name: 'Ball Bearing 6205', unit: 'NOS' },
  { code: 'MAT-008', name: 'Cotton Waste', unit: 'KG' },
  { code: 'MAT-009', name: 'Gear Oil', unit: 'LTR' },
  { code: 'MAT-010', name: 'Hex Bolt M12', unit: 'NOS' },
]

export const UNITS = ['NOS', 'KG', 'LTR', 'MTR', 'SET', 'BOX', 'PAIR'] as const

export function findMaterial(code: string): Material | undefined {
  return MATERIALS.find((material) => material.code === code)
}

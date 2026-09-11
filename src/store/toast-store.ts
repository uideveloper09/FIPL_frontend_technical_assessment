import { create } from 'zustand'

export type ToastTone = 'success' | 'error' | 'info'

type Toast = {
  id: number
  message: string
  tone: ToastTone
}

type ToastState = {
  toasts: Toast[]
  showToast: (message: string, tone?: ToastTone) => void
  dismissToast: (id: number) => void
}

let nextId = 1

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  showToast: (message, tone = 'success') => {
    const id = nextId++
    set((state) => ({ toasts: [...state.toasts, { id, message, tone }] }))
    window.setTimeout(() => {
      set((state) => ({ toasts: state.toasts.filter((toast) => toast.id !== id) }))
    }, 3200)
  },
  dismissToast: (id) => {
    set((state) => ({ toasts: state.toasts.filter((toast) => toast.id !== id) }))
  },
}))

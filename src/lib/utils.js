import { clsx } from "clsx";
import toast from 'react-hot-toast'
import { twMerge } from "tailwind-merge"
export { EmptyState } from '@/components/empty-state'
export { ToastProvider } from '@/components/toast-provider'
export { ErrorBoundaryWrapper } from '@/components/error-boundary'
export { ConfirmationDialog } from '@/components/confirmation-dialog'

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}



export const showToast = {
  success: (message) => toast.success(message),
  error: (message) => toast.error(message),
  loading: (message) => toast.loading(message),
  custom: toast,
}
import { toast } from 'vue-sonner'

export const useToast = () => {
  return {
    ...toast,
    show: (...args: Parameters<typeof toast>) => toast(...args)
  }
}

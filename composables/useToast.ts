import { toast } from 'vue-sonner'

export function useToast() {
	return {
		...toast,
		show: (...args: Parameters<typeof toast>) => toast(...args),
	}
}

import type { ShallowRef } from 'vue'
import type { SheetProps } from '~/components/ui/sheet'

export interface ModalState<T extends Component = Component> {
	component: T | string
	options?: SheetProps
	props?: ComponentProps<T>
}

export const modalInjectionKey: InjectionKey<ShallowRef<ModalState>> = Symbol('shadcn-ui.modal')

function _useModal() {
	const modalState = inject(modalInjectionKey)

	const isOpen = ref(false)

	function open<T extends Component>(component: T, props?: ComponentProps<T>, options?: SheetProps) {
		if (!modalState)
			throw new Error('useModal() is called without provider')

		modalState.value = {
			component,
			options,
			props,
		}

		isOpen.value = true
	}

	async function close() {
		if (!modalState) return

		isOpen.value = false
	}

	function reset() {
		if (!modalState) return

		modalState.value = {
			component: 'div',
			props: {},
		}
	}

	function patch<T extends Component>(props: Partial<SheetProps & ComponentProps<T>>) {
		if (!modalState) return

		modalState.value = {
			...modalState.value,
			props: {
				...modalState.value.props,
				...props,
			},
		}
	}

	return {
		open,
		close,
		reset,
		patch,
		isOpen,
	}
}

export const useModal = createSharedComposable(_useModal)

import type { RouterOptions } from '@nuxt/schema'

export default <RouterOptions> {
	linkExactActiveClass: 'active',
	scrollBehavior() {
		return { top: 0 }
	},
}

export default defineNuxtPlugin({
	name: 'authorization',
	parallel: true,
	setup() {
		return {
			provide: {
				authorization: {
					resolveClientUser: () => useUserSession().user.value,
				},
			},
		}
	},
})

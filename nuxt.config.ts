// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	typescript: {
		shim: false,
		strict: true,
		typeCheck: 'build',
	},
	compatibilityDate: '2024-07-03',
	ssr: true,
	css: ['~/assets/globals.css'],
	devtools: { enabled: true },
	modules: [
        "@nuxtjs/tailwindcss",
        "shadcn-nuxt",
        "@nuxtjs/color-mode",
        "@vueuse/nuxt",
        "nuxt-security",
        "@nuxtjs/i18n",
        "@pinia/nuxt",
        "@formkit/auto-animate/nuxt",
        "@nuxt/test-utils",
        "@nuxt/image",
        "@nuxt/eslint",
        "@nuxt/fonts",
        "@nuxt/icon"
    ],
	components: [
		{
			path: '~/components',
			pathPrefix: false,
		},
	],
	colorMode: {
		classSuffix: ''
	},
	security: {
		headers: {
			crossOriginEmbedderPolicy: process.env.NODE_ENV === 'development' ? 'unsafe-none' : 'require-corp',
		},
	},
	fonts: {
		families: [
			{ name: 'Poppins', global: true, provider: 'google', weights: [400, 500, 600, 700, 800] }
		]
	},
	i18n: {
		baseUrl: 'http://localhost:3000',
		locales: [
			{
				code: 'en',
				iso: 'en-GB',
				name: 'English',
				isCatchallLocale: true,
				domain: '🇬🇧'
			},
			{
				code: 'it',
				iso: 'it-IT',
				name: 'Italiano',
				isCatchallLocale: true,
				domain: '🇮🇹'
			}
		],
		defaultLocale: 'en',
		strategy: 'prefix_and_default',
		detectBrowserLanguage: {
			useCookie: true,
			cookieKey: 'i18n_redirected',
			redirectOn: 'root',
		},
	},
	app: {
		pageTransition: {
			name: 'page',
			mode: 'out-in',
		},
		layoutTransition: {
			name: 'layout',
			mode: 'out-in',
		},
	},
	routeRules: {
		'/': { ssr: true },
		'/box/**': { ssr: false },
		'/guide/**': { swr: true },
	},
})
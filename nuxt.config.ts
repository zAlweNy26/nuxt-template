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
		"nuxt-zod-i18n",
		"@nuxtjs/i18n",
		"@pinia/nuxt",
		"@formkit/auto-animate/nuxt",
		"@nuxt/test-utils",
		"@nuxt/image",
		"@nuxt/eslint",
		"@nuxt/fonts",
		"@nuxt/icon",
		"nuxt-api-party",
		"@formkit/auto-animate/nuxt",
		"nuxt-lodash"
	],
	vite: {
		optimizeDeps: {
			include: ["lodash-es"],
		},
	},
	components: [
		{
			path: '~/components',
			pathPrefix: false,
		},
	],
	colorMode: {
		classSuffix: ''
	},
	lodash: {
		prefix: '_',
	},
	security: {
		nonce: true,
		csrf: true,
	},
	apiParty: {
		endpoints: {
			api: {
				url: process.env.API_URL,
				headers: {
					Authorization: `Bearer ${process.env.API_TOKEN}`
				},
				//schema: './schema.yaml'
			}
		}
	},
	fonts: {
		families: [
			{ name: 'Poppins', global: true, provider: 'google', weights: [400, 500, 600, 700, 800] }
		]
	},
	zodI18n: {
		dateFormat: {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
		},
		localeCodesMapping: {
			'en-GB': 'en',
			'en-US': 'en',
			'it-IT': 'it',
		},
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
	$development: {
		security: {
			headers: {
				crossOriginEmbedderPolicy: 'unsafe-none',
				contentSecurityPolicy: false
			}
		},
	},
	$production: {
		security: {
			headers: {
				crossOriginEmbedderPolicy: 'require-corp',
			}
		},
	}
})
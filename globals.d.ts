declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: 'development' | 'production' | 'test'
			API_URL: string
			API_TOKEN: string
		}
	}
}

declare module '#auth-utils' {
	interface User {
		id: string
	}

	interface UserSession {
		loggedInAt: Date
	}
}

export { }

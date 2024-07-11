import enGB from './locales/en-GB.json'
import itIT from './locales/it-IT.json'

const i18n = defineI18nConfig(() => ({
	legacy: false,
	locale: 'en',
	allowComposition: true,
	fallbackLocale: 'en',
	datetimeFormats: {
		// Add new languages here
		...['en', 'it'].reduce((acc, locale) => ({
			...acc,
			[locale]: {
				date: {
					year: 'numeric', month: 'short', day: '2-digit',
				},
				time: {
					hour: '2-digit', minute: '2-digit',
				},
				datetime: {
					year: 'numeric', month: 'short', day: '2-digit',
					hour: '2-digit', minute: '2-digit',
				},
			},
		}), {}),
	},
	messages: {
		en: enGB,
		it: itIT,
		// Add new languages here
	},
}))

export default i18n

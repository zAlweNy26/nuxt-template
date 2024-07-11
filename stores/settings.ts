export const useSettingsStore = defineStore('Settings', () => {
  const colorMode = useColorMode()
  const { locale, locales, setLocale, setLocaleCookie } = useI18n()
  const switchLocalePath = useSwitchLocalePath()

	const storage = useLocalStorage('settings', {}, { mergeDefaults: true })

	const isDark = computed(() => colorMode.value === 'dark')
  const isLight = computed(() => colorMode.value === 'light')

  const toggleTheme = () => {
    colorMode.preference = colorMode.value === 'light' ? 'dark' : 'light'
  }

  const changeLocale = (e: string) => {
    switchLocalePath(e)
    setLocaleCookie(e)
    setLocale(e)
  }

  return {
    storage,
    isDark,
    isLight,
    locale,
    locales,
    toggleTheme,
    changeLocale,
  }
})

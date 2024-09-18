export const useSettingsStore = defineStore('Settings', () => {
  const colorMode = useColorMode()
  const { locale, locales, setLocale, setLocaleCookie } = useI18n()
  const switchLocalePath = useSwitchLocalePath()

	const storage = useLocalStorage('settings', {
    pageSize: 25,
  }, { mergeDefaults: true })

	const isDark = computed(() => colorMode.value === 'dark')
  const isLight = computed(() => colorMode.value === 'light')

  const direction = useTextDirection({ initialValue: 'ltr' })
  const textDirection = computed(() => direction.value === 'rtl' ? 'rtl' : 'ltr')

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
    textDirection,
    toggleTheme,
    changeLocale,
  }
})

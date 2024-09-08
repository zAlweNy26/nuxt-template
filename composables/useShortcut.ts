export const keysMap = {
  meta: '',
  command: '⌘',
  shift: '⇧',
  ctrl: 'Ctrl',
  option: '⌥',
  alt: '⎇',
  enter: '↵',
  delete: '⌦',
  backspace: '⌫',
  escape: '⎋',
  tab: '⇥',
  capslock: '⇪',
  arrowup: '↑',
  arrowright: '→',
  arrowdown: '↓',
  arrowleft: '←',
  pageup: '⇞',
  pagedown: '⇟',
  home: '↖',
  end: '↘'
} as const

export type ShortcutKey = keyof typeof keysMap

export type Shortcuts = | 
  [ShortcutKey, ...string[]] | 
  [ShortcutKey, ShortcutKey, ...string[]] |
  [ShortcutKey, ShortcutKey, ShortcutKey, ...string[]] |
  [string, ...string[]]

const _useShortcut = () => {
  const macOS = computed(() => import.meta.client && navigator && navigator.userAgent && navigator.userAgent.match(/Macintosh;/))

  const metaSymbol = ref(' ')

  onMounted(() => {
    metaSymbol.value = macOS.value ? keysMap.command : keysMap.ctrl
  })

  function getShortcutKey(value?: ShortcutKey | string) {
    if (!value) return
    if (value === 'meta') return metaSymbol.value
    return keysMap[value as ShortcutKey] || value.toUpperCase()
  }

  return {
    macOS,
    metaSymbol,
    getShortcutKey
  }
}

export const useShortcut = createSharedComposable(_useShortcut)
<script lang="ts" setup>
import type { DropdownMenuItems } from './ui/dropdown-menu'

const settings = useSettingsStore()
const { changeLocale } = settings
const { locale, locales } = storeToRefs(useSettingsStore())

const localesItems = computed(() => locales.value.map((l) => ({
  label: `${l.domain} ${l.name}`,
  value: l.code
})) as DropdownMenuItems<string>)
</script>

<template>
  <DropdownMenu :content="{ align: 'start' }">
    <Button variant="outline" square>
      <Icon name="ph:globe-hemisphere-east" class="size-5" />
      <span class="sr-only">{{ $t('language.toggle') }}</span>
    </Button>
    <template #content>
      <DropdownMenuRadioGroup v-model="locale" :items="localesItems"
        @update:modelValue="(e: string) => changeLocale(e)" />
    </template>
  </DropdownMenu>
</template>
<script lang="ts" setup>
import type { DropdownRadioItems } from './ui/dropdown-menu'

const settings = useSettingsStore()
const { changeLocale } = settings
const { locale, locales } = storeToRefs(useSettingsStore())

const localesItems = computed(() => locales.value.map((l) => ({
  label: `${l.domain} ${l.name}`,
  value: l.code
})) as DropdownRadioItems)
</script>

<template>
  <DropdownMenu :content="{ align: 'start' }">
    <Button color="foreground" variant="outline" square>
      <Icon name="ph:globe-hemisphere-east" class="size-5" />
      <span class="sr-only">{{ $t('language.toggle') }}</span>
    </Button>
    <template #content>
      <DropdownMenuRadioGroup v-model="locale" :items="localesItems"
        @update:modelValue="(e) => changeLocale(e as string)" />
    </template>
  </DropdownMenu>
</template>
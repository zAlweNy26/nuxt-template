<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem
} from '@/components/ui/dropdown-menu'

const { locale, locales, changeLocale } = useSettingsStore()
</script>

<template>
  <DropdownMenu>
    <template #trigger>
      <Button variant="outline" square>
        <Icon icon="ph:globe-hemisphere-east" class="size-5" />
        <span class="sr-only">{{ $t('language.toggle') }}</span>
      </Button>
    </template>
    <DropdownMenuContent align="end">
      <DropdownMenuRadioGroup v-model="locale" @update:modelValue="(e) => changeLocale(e)">
        <DropdownMenuRadioItem v-for="locale of locales" :key="locale.code" :value="locale.code">
          {{ locale.domain }} {{ locale.name }}
        </DropdownMenuRadioItem>
      </DropdownMenuRadioGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
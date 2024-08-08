<script lang="ts" setup>
const { locale, locales, changeLocale } = useSettingsStore()
</script>

<template>
  <DropdownMenu :content="{ align: 'start' }">
    <Button variant="outline" square>
      <Icon name="ph:globe-hemisphere-east" class="size-5" />
      <span class="sr-only">{{ $t('language.toggle') }}</span>
    </Button>
    <template #content>
      <DropdownMenuRadioGroup v-model="locale" @update:modelValue="(e) => changeLocale(e)">
        <DropdownMenuRadioItem v-for="l of locales" :key="l.code" :value="l.code">
          {{ l.domain }} {{ l.name }}
        </DropdownMenuRadioItem>
      </DropdownMenuRadioGroup>
    </template>
  </DropdownMenu>
</template>
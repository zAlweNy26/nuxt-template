<script lang="ts" setup>

const props = defineProps<{
  class?: ClassValue
}>()
</script>

<template>
  <span role="presentation" aria-hidden="true" :class="cn('flex size-8 items-center justify-center', props.class)">
    <slot>
      <Icon name="ph:dots-three-bold" class="size-4" />
    </slot>
    <span class="sr-only">{{ $t('aria.more') }}</span>
  </span>
</template>

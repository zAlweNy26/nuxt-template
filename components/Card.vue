<script lang="ts" setup>
import { Primitive } from 'radix-vue'
</script>

<template>
  <Primitive class="divide-y divide-accent rounded-lg bg-background shadow ring-1 ring-accent">
    <div v-if="$slots.header" class="p-2 md:p-4">
      <slot name="header" />
    </div>
    <div v-if="$slots.default" class="p-2 md:p-4">
      <slot />
    </div>
    <div v-if="$slots.footer" class="p-2 md:p-4">
      <slot name="footer" />
    </div>
  </Primitive>
</template>
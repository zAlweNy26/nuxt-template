<script setup lang="ts">
import { CollapsibleTrigger } from 'radix-vue'
</script>

<template>
  <CollapsibleTrigger asChild>
    <slot />
  </CollapsibleTrigger>
</template>

<script lang="ts" setup>
import { inject } from 'vue'

const modalState = inject(modalInjectionKey)

const { isOpen, reset } = useModal()
</script>

<template>
  <ResponsiveDialog
    v-if="modalState"
    v-model="isOpen"
    v-bind="modalState.options"
    @update:modelValue="(v) => v && reset()">
    <template #content>
      <component :is="modalState.component" v-bind="modalState.props" />
    </template>
  </ResponsiveDialog>
</template>
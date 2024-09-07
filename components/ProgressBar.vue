<script setup lang="ts">
import type { ClassValue } from 'clsx'
import { ProgressIndicator, ProgressRoot, type ProgressRootProps } from 'radix-vue'

const props = defineProps<ProgressRootProps & { 
  class?: ClassValue
  animation?: 'carousel' | 'carousel-inverse' | 'swing' | 'elastic'
}>()

const delegatedProps = computed(() => {
  const { class: _, animation, ...delegated } = props
  return delegated
})

const relativeValue = computed(() => (100 * (props.modelValue ?? 0)) / (props.max ?? 100))

const isIndeterminate = computed(() => props.modelValue === undefined || props.modelValue === null)

const animation = computed(() => {
  if (!isIndeterminate.value) return ''
  if (props.animation === 'carousel-inverse') return 'bar-animation-carousel-inverse'
  if (props.animation === 'swing') return 'bar-animation-swing'
  if (props.animation === 'elastic') return 'bar-animation-elastic'
  return 'bar-animation-carousel'
})
</script>

<template>
  <ProgressRoot v-bind="delegatedProps"
    :class="cn('relative h-2 w-full overflow-hidden rounded-full bg-primary/20', props.class)">
    <ProgressIndicator class="size-full flex-1 bg-primary transition-all" :class="animation"
      :style="animation ? undefined : `transform: translateX(-${100 - relativeValue}%);`" />
  </ProgressRoot>
</template>

<style scoped>
.bar-animation-carousel {
  animation: carousel 2s ease-in-out infinite;
}

.bar-animation-carousel-inverse {
  animation: carousel-inverse 2s ease-in-out infinite;
}

.bar-animation-swing {
  animation: swing 3s ease-in-out infinite;
}

.bar-animation-elastic {
  animation: elastic 3s ease-in-out infinite;
}

@keyframes carousel {
  0%, 100% {
    width: 50%
  }
  0% {
    transform: translateX(-100%)
  }
  100% {
    transform: translateX(200%)
  }
}

@keyframes carousel-inverse {
  0%, 100% {
    width: 50%
  }
  0% {
    transform: translateX(200%)
  }
  100% {
    transform: translateX(-100%)
  }
}

@keyframes swing {
  0%, 100% {
    width: 50%
  }
  0%, 100% {
    transform: translateX(-25%)
  }
  50% {
    transform: translateX(125%)
  }
}

@keyframes elastic {
  0%, 100% {
    width: 50%;
    margin-left: 25%;
  }
  50% {
    width: 90%;
    margin-left: 5%
  }
}
</style>
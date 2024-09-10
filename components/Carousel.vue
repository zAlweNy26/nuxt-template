<script setup lang="ts" generic="T extends Record<string, any>">
import useEmblaCarousel from 'embla-carousel-vue'
import type { EmblaCarouselVueType } from 'embla-carousel-vue'
import type { ClassValue } from 'clsx'
import type { UnwrapRef } from 'vue'

type CarouselApi = UnwrapRef<EmblaCarouselVueType[1]>
type CarouselOptions = UnwrapRef<Parameters<typeof useEmblaCarousel>[0]>
type CarouselPlugins = UnwrapRef<Parameters<typeof useEmblaCarousel>[1]>

const props = defineProps<{
  options?: CarouselOptions
  plugins?: CarouselPlugins
  orientation?: 'horizontal' | 'vertical'
  class?: ClassValue 
  arrows?: boolean
  contentClass?: ClassValue
  itemClass?: ClassValue
  items: T[]
}>()

const emits = defineEmits<{
  initApi: [api: CarouselApi]
}>()

const [carouselRef, carouselApi] = useEmblaCarousel({
  align: 'start',
  ...props.options,
  axis: props.orientation === 'vertical' ? 'y' : 'x',
}, props.plugins)

function scrollPrev() {
  carouselApi.value?.scrollPrev()
}

function scrollNext() {
  carouselApi.value?.scrollNext()
}

const canScrollNext = ref(false)
const canScrollPrev = ref(false)

function onSelect(api: CarouselApi) {
  canScrollNext.value = api?.canScrollNext() || false
  canScrollPrev.value = api?.canScrollPrev() || false
}

onMounted(() => {
  if (!carouselApi.value) return

  carouselApi.value?.on('init', onSelect)
  carouselApi.value?.on('reInit', onSelect)
  carouselApi.value?.on('select', onSelect)

  emits('initApi', carouselApi.value)
})

defineExpose({
  canScrollNext,
  canScrollPrev,
  carouselApi,
  carouselRef,
  scrollNext,
  scrollPrev,
})

function onKeyDown(event: KeyboardEvent) {
  const prevKey = props.orientation === 'vertical' ? 'ArrowUp' : 'ArrowLeft'
  const nextKey = props.orientation === 'vertical' ? 'ArrowDown' : 'ArrowRight'

  if (event.key === prevKey) {
    event.preventDefault()
    scrollPrev()
  } else if (event.key === nextKey) {
    event.preventDefault()
    scrollNext()
  }
}
</script>

<template>
  <div :class="cn('flex items-center justify-center gap-4', orientation === 'vertical' && 'flex-col', props.class)" 
    role="region" aria-roledescription="carousel" tabindex="0" @keydown="onKeyDown">
    <slot v-if="arrows" name="prev" :canScrollPrev :scrollNext>
      <Button :disabled="!canScrollPrev" :class="cn(
        'touch-manipulation shrink-0 h-8 w-8 rounded-full p-0',
        orientation === 'vertical' && 'rotate-90',
      )" variant="outline" @click="scrollPrev">
        <Icon name="ph:arrow-left" class="size-4 text-current" />
        <span class="sr-only">Previous Slide</span>
      </Button>
    </slot>
    <div ref="carouselRef" class="overflow-hidden">
      <div :class="cn('flex', orientation === 'vertical' ? '-mt-4 flex-col' : '-ml-4', contentClass)">
        <div v-for="(item, index) in items" :key="index" role="group" aria-roledescription="slide" 
          :class="cn('min-w-0 shrink-0 grow-0 basis-full', orientation === 'vertical' ? 'pt-4' : 'pl-4', itemClass)">
          <slot :carouselApi :orientation :item />
        </div>
      </div>
    </div>
    <slot v-if="arrows" name="next" :canScrollNext :scrollPrev>
      <Button :disabled="!canScrollNext" :class="cn(
        'touch-manipulation shrink-0 h-8 w-8 rounded-full p-0',
        orientation === 'vertical' && 'rotate-90',
      )" variant="outline" @click="scrollNext">
        <Icon name="ph:arrow-right" class="size-4 text-current" />
        <span class="sr-only">Next Slide</span>
      </Button>
    </slot>
  </div>
</template>

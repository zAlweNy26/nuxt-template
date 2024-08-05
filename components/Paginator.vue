<script lang="ts" setup>
import { PaginationEllipsis, PaginationRoot, PaginationList, PaginationListItem,
  PaginationFirst, PaginationPrev, PaginationNext, PaginationLast, type PaginationRootProps } from 'radix-vue'
import type { ButtonProps } from './ui/button'

withDefaults(defineProps<Omit<PaginationRootProps, 'as' | 'asChild' | 'page'> & { size: ButtonProps['size'] }>(), {
  disabled: false,
  defaultPage: 1,
  siblingCount: 1,
  showEdges: true,
  itemsPerPage: 10,
  size: 'sm'
})

const model = defineModel<number>({ default: 1 })
</script>

<template>
  <PaginationRoot v-slot="{ page }" v-model:page="model" v-bind="$props">
    <PaginationList v-slot="{ items }" class="flex items-center gap-1">
      <PaginationFirst as-child>
        <Button square variant="outline" :size>
          <Icon name="ph:caret-double-left-bold" class="size-4" />
        </Button>
      </PaginationFirst>
      <PaginationPrev as-child>
        <Button square variant="outline" :size>
          <Icon name="ph:caret-left-bold" class="size-4" />
        </Button>
      </PaginationPrev>
      <template v-for="(item, index) in items">
        <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
          <slot :selected="item.value === page">
            <Button square :size :variant="item.value === page ? 'primary' : 'outline'">
              {{ item.value }}
            </Button>
          </slot>
        </PaginationListItem>
        <PaginationEllipsis v-else :key="item.type" :index="index" class="grid size-8 place-content-center">
          <slot name="ellipsis">
            <Icon name="ph:dots-three-bold" class="size-6" />
          </slot>
        </PaginationEllipsis>
      </template>
      <PaginationNext as-child>
        <Button square variant="outline" :size>
          <Icon name="ph:caret-right-bold" class="size-4" />
        </Button>
      </PaginationNext>
      <PaginationLast as-child>
        <Button square variant="outline" :size>
          <Icon name="ph:caret-double-right-bold" class="size-4" />
        </Button>
      </PaginationLast>
    </PaginationList>
  </PaginationRoot>
</template>
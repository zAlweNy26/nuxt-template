<script setup lang="ts">
import type { ComponentExposed } from 'vue-component-type-helpers'
import type { SortingState } from '@tanstack/vue-table'
import type { SelectItems } from '~/components/ui/select'
import { z } from 'zod'
import { Button, Checkbox, DataTable, Icon } from '#components'
import type { DataColumnDef } from '~/components/DataTable.vue'
import type { RadioItems } from '~/components/ui/radio-group'
import type { BreadcrumbItems } from '~/components/ui/breadcrumb'
import type { AccordionItems } from '~/components/ui/accordion'

const { t } = useI18n()
const { storage, locale } = storeToRefs(useSettingsStore())

useHead({
	title: () => t('headers.home'),
})

const radioItems: RadioItems = [
  { name: 'Text', value: 'text' },
  { name: 'Example', value: 'example' },
  { name: 'Bar', value: 'bar' },
  { name: 'Foo', value: 'foo' },
]

const accordionItems: AccordionItems = [
  { id: 'first', label: 'Accordion 1' },
  { id: 'second', label: 'Accordion 2' },
  { id: 'third', label: 'Accordion 3' },
]

const selectItems: SelectItems = [
  { label: 'Text', value: 'text' },
  { label: 'Example', value: 'example' },
  { label: 'Bar', value: 'bar' },
  { label: 'Foo', value: 'foo' },
]

const breadcrumbItems: BreadcrumbItems = [
  { label: 'Home', href: '/', current: true },
  { label: 'Test', icon: 'ph:acorn-bold', onClick: () => console.log('clicked') },
  { label: 'Products', href: '/products' },
  { label: 'Product 1', href: '/products/1' },
]

const progress = ref(50)
const slider = ref([50])

const zodSchema = z.object({
  username: z.string().min(3).describe('This is your public display name.'),
  password: z.string().min(8).describe('This is your private password.'),
})

interface Payment {
  id: string
  amount: number
  status: 'pending' | 'processing' | 'success' | 'failed'
  email: string
}

const columns: DataColumnDef<Payment>[] = [
  {
    accessorKey: 'select',
    pinned: 'left',
    header: ({ table }) => h(Checkbox, {
      checked: table.getIsAllPageRowsSelected(),
      "onUpdate:checked": (value) => table.toggleAllPageRowsSelected(!!value),
      'ariaLabel': 'Select all',
    }),
    cell: ({ row }) => h(Checkbox, {
      'checked': row.getIsSelected(),
      'onUpdate:checked': (value: boolean) => row.toggleSelected(!!value),
      'ariaLabel': 'Select row',
    }),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => {
      const sort = column.getIsSorted() === 'asc'
      return h(Button, {
        variant: 'ghost',
        onClick: () => column.toggleSorting(sort),
      }, () => ['Status', h(Icon, { name: sort ? 'ph:sort-ascending-bold' : 'ph:sort-descending-bold', class: 'ml-2 size-4' })])
    },
    cell: ({ row }) => {
      const status = row.getValue<string>('status')
      return h('div', { class: 'text-left' }, status)
    },
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => {
      const sort = column.getIsSorted() === 'asc'
      return h(Button, {
        variant: 'ghost',
        onClick: () => column.toggleSorting(sort),
      }, () => ['Amount', h(Icon, { name: sort ? 'ph:sort-ascending-bold' : 'ph:sort-descending-bold', class: 'ml-2 size-4' })])
    },
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue('amount'))
      const formatted = new Intl.NumberFormat(locale.value, {
        style: 'currency',
        currency: 'USD',
      }).format(amount)
      return h('div', { class: 'text-left font-medium' }, formatted)
    },
  }, {
    accessorKey: 'email',
    header: ({ column }) => {
      const sort = column.getIsSorted() === 'asc'
      return h(Button, {
        variant: 'ghost',
        onClick: () => column.toggleSorting(sort),
      }, () => ['Email', h(Icon, { name: sort ? 'ph:sort-ascending-bold' : 'ph:sort-descending-bold', class: 'ml-2 size-4' })])
    },
    cell: ({ row }) => {
      const email = row.getValue<string>('email')
      return h('div', { class: 'text-left' }, email)
    },
  }, {
    accessorKey: 'actions',
    pinned: 'right',
    header: () => h('div'),
    headerClass: 'w-0',
    enableSorting: false,
    enableHiding: false,
  }
]

const data = ref<Payment[]>([])
const sorting = ref<SortingState>([])
const exampleTable = ref<ComponentExposed<typeof DataTable>>()

const filterEmails = computed({
  get: () => exampleTable.value?.table.getColumn('email')?.getFilterValue() as string,
  set: (value) => exampleTable.value?.table.getColumn('email')?.setFilterValue(value),
})

async function getData(): Promise<Payment[]> {
  return [
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'm@example.com',
    },
    {
      id: '724342f',
      amount: 34,
      status: 'failed',
      email: 'fg@example.com',
    },
    {
      id: 'gdfg45',
      amount: 200,
      status: 'success',
      email: 'boh@test.com',
    },
    {
      id: 'fgh34',
      amount: 79,
      status: 'success',
      email: 'yep@wow.com',
    }
  ]
}

onMounted(async () => {
  data.value = await getData()
})
</script>

<template>
  <div class="flex flex-wrap gap-4">
    <ThemeButton />
    <LanguageSwitcher />
    <ResponsiveDialog title="Example title" description="Example description">
      <Button variant="primary">DialogBox</Button>
      <template #content>
        <p>Example content</p>
      </template>
    </ResponsiveDialog>
    <SideSheet title="Example title" side="bottom" description="Example description">
      <Button variant="primary">Bottom Sheet</Button>
      <template #content>
        <p>Example content</p>
      </template>
    </SideSheet>
    <SideSheet title="Example title" side="left" description="Example description">
      <Button variant="primary" size="md">Left Sheet</Button>
      <template #content>
        <p>Example content</p>
      </template>
    </SideSheet>
    <SideSheet title="Example title" side="right" description="Example description">
      <Button variant="primary" size="lg">Right Sheet</Button>
      <template #content>
        <p>Example content</p>
      </template>
    </SideSheet>
    <SideSheet title="Example title" side="top" description="Example description">
      <Button variant="primary" size="xs">Top Sheet</Button>
      <template #content>
        <p>Example content</p>
      </template>
    </SideSheet>
    <Switch id="test-switch" label="Test Switch" />
    <Separator class="my-4" label="Or" />
    <ProgressBar v-model="progress" :max="60" />
    <Slider v-model="slider" :max="100" :min="10" />
    <SelectBox placeholder="Select an item" :items="selectItems" />
    <Avatar src="https://github.com/radix-vue.png" size="xs" />
    <Avatar src="https://github.com/radix-vue.png" size="sm" />
    <Avatar src="https://github.com/radix-vue.png" size="md" />
    <Avatar src="https://github.com/radix-vue.png" size="lg" />
    <Form :schema="zodSchema" @submit="(e) => console.log('valid',e)" 
      @error="(e) => console.log('error', e)" @reset="() => console.log('reset')">
      <FormField v-slot="{ field }" name="username" label="Username" 
        description="Your public display name." help="A name you want to use to be recognized.">
        <InputBox type="text" placeholder="Your username..." v-bind="field" />
      </FormField>
      <FormField v-slot="{ field }" name="password" label="Password" 
        description="Your private password." help="Must be at least 8 characters long.">
        <InputBox type="text" placeholder="A long password..." v-bind="field" />
      </FormField>
      <div class="flex gap-2">
        <Button type="submit" variant="primary">Submit</Button>
        <Button type="reset" variant="primary">Reset</Button>
      </div>
    </Form>
    <Breadcrumb :items="breadcrumbItems" />
    <Button variant="error">Error</Button>
    <Button variant="warning">Warning</Button>
    <Button variant="success">Success</Button>
    <Button variant="info">Info</Button>
    <Button variant="ghost">Ghost</Button>
    <Button variant="link">Link</Button>
    <Button variant="outline">Outline</Button>
    <Button variant="secondary">Secondary</Button>
    <Tooltip>
      <Badge variant="primary">Primary</Badge>
      <template #content>
        <p>Example content</p>
      </template>
    </Tooltip>
    <Accordion type="single" :items="accordionItems" class="max-w-48">
      <template #first-content>
        <p>Accordion 1 content</p>
      </template>
      <template #second-content>
        <p>Accordion 2 content</p>
      </template>
      <template #third-content>
        <p>Accordion 3 content</p>
      </template>
    </Accordion>
    <Badge variant="secondary">Secondary</Badge>
    <Badge variant="success">Success</Badge>
    <Badge variant="error" size="lg">Error</Badge>
    <Badge variant="warning" size="md">Warning</Badge>
    <Badge variant="info" size="sm">Info</Badge>
    <Badge variant="outline" size="xs">Outline</Badge>
    <Paginator :total="data.length" showText :itemsPerPage="storage.pageSize" @update="exampleTable?.table.setPageIndex($event)"
      @first="exampleTable?.table.firstPage()" @last="exampleTable?.table.lastPage()"
      @prev="exampleTable?.table.previousPage()" @next="exampleTable?.table.nextPage()">
      <div class="flex items-center gap-2">
        <InputBox v-model="filterEmails" class="max-w-sm" placeholder="Filter emails..." />
        <DropdownMenu :content="{ align: 'end' }">
          <template #trigger>
            <Button variant="outline" class="ml-auto">
              Columns
              <Icon name="ph:caret-down" class="ml-2 size-4" />
            </Button>
          </template>
          <DropdownMenuCheckItem
            v-for="column in exampleTable?.table.getAllColumns().filter(c => c.getCanHide())" :key="column.id"
            class="capitalize" :checked="column.getIsVisible()" @update:checked="column.toggleVisibility(!!$event)">
            {{ column.id }}
          </DropdownMenuCheckItem>
        </DropdownMenu>
      </div>
      <DataTable ref="exampleTable" v-model:sort="sorting" 
        :columns="columns" :rows="data" :total="data.length" loading class="caption-top">
        <template #caption>
          <h2 class="text-lg font-semibold">Payments</h2>
        </template>
        <template #actions-row="{ context }">
          <div class="text-right">
            <Button variant="ghost" class="size-8 p-0" @click="context.row.toggleExpanded()">
              <span class="sr-only">Open menu</span>
              <Icon name="ph:caret-down-bold" class="size-4 transition-transform" :class="[context.row.getIsExpanded() && 'rotate-180']" />
            </Button>
          </div>
        </template>
        <template #expanded="{ row }">
          {{ JSON.stringify(row.original, undefined, 4) }}
        </template>
      </DataTable>
    </Paginator>
    <Checkbox id="terms1" size="xs" text="Accept terms and conditions" />
    <Checkbox id="terms2" size="sm" text="Accept terms and conditions" />
    <Checkbox id="terms3" size="md" text="Accept terms and conditions" />
    <Checkbox id="terms4" size="lg" text="Accept terms and conditions" />
    <InputBox label="Username" color="primary" size="xs" />
    <InputBox label="Username" color="warning" size="md" />
    <InputBox label="Username" color="info" size="sm" />
    <RadioGroup :items="radioItems" />
    <NumericInput label="Quantity" :defaultValue="18" :min="3" :max="21" />
    <InputBox label="Username" color="success" size="lg" />
  </div>
</template>
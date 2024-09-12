<script setup lang="ts">
import type { ComponentExposed } from 'vue-component-type-helpers'
import type { SortingState } from '@tanstack/vue-table'
import { z } from 'zod'
import { Avatar, Button, Checkbox, DataTable, Icon } from '#components'
import type { DataColumnDef } from '~/components/DataTable.vue'
import type { RadioItems } from '~/components/ui/radio-group'
import type { BreadcrumbItems } from '~/components/ui/breadcrumb'
import type { AccordionItems } from '~/components/ui/accordion'
import type { TabItems } from '~/components/ui/tabs'
import type { CommandItems } from '~/components/ui/command'
import type { SelectItems } from '~/components/ui/select'

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

const tabsItems: TabItems = [
  { id: 'first', label: 'First' },
  { id: 'second', label: 'Second' },
  { id: 'third', label: 'Third' },
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

const commandItems: CommandItems<string> = [
  { label: 'Text', value: 'text', group: 'Foo', shortcuts: ['meta', 'X'] },
  { label: 'Example', value: 'example' },
  { label: 'Bar', value: 'bar' },
  { label: 'Foo', value: 'foo', group: 'Foo' },
  { label: 'Example 2', value: 'test2' },
  { label: 'Test', value: 'test' }
]

const carouselItems = [
  {
    id: '1',
    title: 'First slide',
    description: 'This is the first slide',
    image: 'https://picsum.photos/800/400',
  },
  {
    id: '2',
    title: 'Second slide',
    description: 'This is the second slide',
    image: 'https://picsum.photos/800/400',
  },
  {
    id: '3',
    title: 'Third slide',
    description: 'This is the third slide',
    image: 'https://picsum.photos/800/400',
  },
  {
    id: '4',
    title: 'Fourth slide',
    description: 'This is the fourth slide',
    image: 'https://picsum.photos/800/400',
  },
]

const progress = ref(50)
const slider = ref([50])
const tags = ref<string[]>([])

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

const columnsItems = computed(() => (exampleTable.value?.table.getAllColumns().filter(c => c.getCanHide()).map(c => ({
  label: c.id,
  value: c.id,
})) ?? []))

const selectedColumns = computed(() => exampleTable.value?.table.getAllColumns().filter(c => c.getIsVisible()).map(c => c.id) ?? [])

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
      <Button variant="primary" size="xl">Left Sheet</Button>
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
      <Button variant="primary" size="sm">Top Sheet</Button>
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
    <Chip size="lg">
      <Avatar src="https://github.com/radix-vue.png" size="lg" />
    </Chip>
    <Form :schema="zodSchema" @submit="(e) => console.log('valid', e)" @error="(e) => console.log('error', e)"
      @reset="() => console.log('reset')">
      <FormField v-slot="{ field }" name="username" label="Username" description="Your public display name."
        help="A name you want to use to be recognized.">
        <InputBox type="text" placeholder="Your username..." v-bind="field" />
      </FormField>
      <FormField v-slot="{ field }" name="password" label="Password" description="Your private password."
        help="Must be at least 8 characters long.">
        <InputBox type="text" placeholder="A long password..." v-bind="field" />
      </FormField>
      <div class="flex gap-2">
        <Button type="submit" variant="primary">Submit</Button>
        <Button type="reset" variant="primary">Reset</Button>
      </div>
    </Form>
    <Breadcrumb :items="breadcrumbItems" />
    <Popover>
      <Button variant="error">Error</Button>
      <template #content>
        <p>Example content</p>
      </template>
    </Popover>
    <Tooltip :shortcuts="['alt', 'Z']">
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
    <TagsInput v-model="tags" />
    <Textarea />
    <DropdownMenu :content="{ align: 'end' }">
      <Button variant="outline" class="ml-auto">
        Dropdown Menu
        <Icon name="ph:caret-down" class="ml-2 size-4" />
      </Button>
      <template #content>
        <DropdownMenuGroup>
          <DropdownMenuItem :shortcuts="['meta', 'U']" @click="() => console.log('test click')">My first item</DropdownMenuItem>
          <DropdownMenuItem :shortcuts="['shift', 'E']">Item 2</DropdownMenuItem>
          <DropdownMenuItem :shortcuts="['capslock', 'A']">Item 3</DropdownMenuItem>
        </DropdownMenuGroup>
      </template>
    </DropdownMenu>
    <Tabs :items="tabsItems" :root="{ defaultValue: 'second', orientation: 'vertical' }">
      <template #first-content>
        <p>First content</p>
      </template>
      <template #second-content>
        <p>Second content</p>
      </template>
      <template #third-content>
        <p>Third content</p>
      </template>
    </Tabs>
    <Badge variant="secondary">Secondary</Badge>
    <Badge variant="success">Success</Badge>
    <Badge variant="error" size="lg">Error</Badge>
    <Badge variant="warning" size="md">Warning</Badge>
    <Badge variant="info" size="sm">Info</Badge>
    <Badge variant="outline" size="xs">Outline</Badge>
    <Tabs :items="tabsItems" :root="{ defaultValue: 'second', orientation: 'horizontal' }">
      <template #first-content>
        <p>First content</p>
      </template>
      <template #second-content>
        <p>Second content</p>
      </template>
      <template #third-content>
        <p>Third content</p>
      </template>
    </Tabs>
    <RadioGroup :items="radioItems" />
    <Paginator :total="data.length" showText :itemsPerPage="storage.pageSize"
      @update="exampleTable?.table.setPageIndex($event)" @first="exampleTable?.table.firstPage()"
      @last="exampleTable?.table.lastPage()" @prev="exampleTable?.table.previousPage()"
      @next="exampleTable?.table.nextPage()">
      <div class="flex items-center gap-2">
        <InputBox v-model="filterEmails" class="max-w-sm" placeholder="Filter emails..." />
        <DropdownMenu :content="{ align: 'end' }">
          <Button variant="outline" class="ml-auto">
            Columns
            <Icon name="ph:caret-down" class="ml-2 size-4" />
          </Button>
          <template #content>
            <DropdownMenuCheckItem v-for="col in columnsItems" :key="col.value" :checked="selectedColumns.includes(col.value)" class="capitalize"
              @update:checked="(v) => exampleTable?.table.getColumn(col.value)?.toggleVisibility(v)">
              {{ col.label }}
            </DropdownMenuCheckItem>
          </template>
        </DropdownMenu>
      </div>
      <DataTable ref="exampleTable" v-model:sort="sorting" :columns="columns" :rows="data" :total="data.length" loading
        class="caption-top">
        <template #caption>
          <h2 class="text-lg font-semibold">Payments</h2>
        </template>
        <template #actions-row="{ context }">
          <div class="text-right">
            <Button variant="ghost" class="size-8 p-0" @click="context.row.toggleExpanded()">
              <span class="sr-only">Open menu</span>
              <Icon name="ph:caret-down-bold" class="size-4 transition-transform"
                :class="[context.row.getIsExpanded() && 'rotate-180']" />
            </Button>
          </div>
        </template>
        <template #expanded="{ row }">
          {{ JSON.stringify(row.original, undefined, 4) }}
        </template>
      </DataTable>
    </Paginator>
    <Collapsible>
      <CollapsibleTrigger>
        <Button variant="primary">Collapsible</Button>
      </CollapsibleTrigger>
      <template #content>
        <p>Example content</p>
      </template>
    </Collapsible>
    <Command :items="commandItems" noGroupAsFirst />
    <ComboBox placeholder="Select an item..." :items="commandItems" />
    <Card>
      <template #header>
        <Checkbox id="terms1" size="xs" text="Accept terms and conditions" />
        <Checkbox id="terms2" size="sm" text="Accept terms and conditions" />
        <Checkbox id="terms3" size="md" text="Accept terms and conditions" />
        <Checkbox id="terms4" size="lg" text="Accept terms and conditions" />
      </template>
      <InputBox label="Username" color="primary" size="xs" />
      <InputBox label="Username" color="info" size="sm" />
      <InputBox label="Username" color="warning" size="md" />
      <InputBox label="Username" color="success" size="lg" />
      <template #footer>
        <Toggle square>
          <Icon name="ph:text-b-bold" class="size-4" />
        </Toggle>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
        <Button variant="outline">Outline</Button>
      </template>
    </Card>
    <ToggleGroup type="single">
      <ToggleGroupItem value="bold" aria-label="Toggle bold" square>
        <Icon name="ph:text-italic-bold" class="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic" square>
        <Icon name="ph:text-strikethrough-bold" class="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Toggle underline" square>
        <Icon name="ph:text-underline-bold" class="size-4" />
      </ToggleGroupItem>
    </ToggleGroup>
    <DatePicker />
    <DateRangePicker />
    <ComboGroup>
      <Button variant="warning" @click="$toast.warning('Toast warning')">Warning</Button>
      <Button variant="success" @click="$toast.success('Toast success')">Success</Button>
      <Button variant="info" @click="$toast.info('Toast info')">Info</Button>
      <Button variant="secondary" @click="$modal.open(Avatar, {
        src: 'https://github.com/radix-vue.png'
      }, {
        title: 'Modal title',
        description: 'Modal description',
      })">Secondary</Button>
    </ComboGroup>
    <NumberInput label="Quantity" :defaultValue="18" :min="3" :max="21" />
    <PinInput :digits="4" placeholder="○" @complete="(v) => console.log(v)" />
    <Carousel v-slot="{ item }" :items="carouselItems" arrows contentClass="w-[400px]" itemClass="basis-1/2">
      <div class="flex aspect-square select-none flex-col items-center justify-center overflow-hidden rounded-xl bg-accent text-center">
        <img :src="item.image" alt="carousel image" class="size-48 object-cover" >
        <h2 class="text-lg font-semibold">{{ item.title }}</h2>
        <p>{{ item.description }}</p>
      </div>
    </Carousel>
    <ResizableGroup direction="horizontal" class="max-w-md rounded-lg border">
      <ResizablePanel :defaultSize="50">
        <div class="flex h-[200px] items-center justify-center p-6">
          <span class="font-semibold">One</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel :defaultSize="50">
        <ResizableGroup direction="vertical">
          <ResizablePanel :defaultSize="25">
            <div class="flex h-full items-center justify-center p-6">
              <span class="font-semibold">Two</span>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel :defaultSize="75">
            <div class="flex h-full items-center justify-center p-6">
              <span class="font-semibold">Three</span>
            </div>
          </ResizablePanel>
        </ResizableGroup>
      </ResizablePanel>
    </ResizableGroup>
    <Menubar>
      <MenubarMenu>
        File
        <template #content>
          <MenubarItem :shortcuts="['meta', 'T']">
            New Tab
          </MenubarItem>
          <MenubarItem :shortcuts="['meta', 'N']">
            New Window
          </MenubarItem>
          <MenubarItem disabled>
            New Incognito Window
          </MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            Share
            <template #content>
              <MenubarItem>Email link</MenubarItem>
              <MenubarItem>Messages</MenubarItem>
              <MenubarItem>Notes</MenubarItem>
            </template>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem :shortcuts="['meta', 'P']">
            Print...
          </MenubarItem>
        </template>
      </MenubarMenu>
      <MenubarMenu>
        Edit
        <template #content>
          <MenubarItem :shortcuts="['meta', 'Z']">
            Undo
          </MenubarItem>
          <MenubarItem :shortcuts="['meta', 'Z']">
            Redo
          </MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            Find
            <template #content>
              <MenubarItem>Search the web</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Find...</MenubarItem>
              <MenubarItem>Find Next</MenubarItem>
              <MenubarItem>Find Previous</MenubarItem>
            </template>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem>Cut</MenubarItem>
          <MenubarItem>Copy</MenubarItem>
          <MenubarItem>Paste</MenubarItem>
        </template>
      </MenubarMenu>
      <MenubarMenu>
        View
        <template #content>
          <MenubarCheckItem>Always Show Bookmarks Bar</MenubarCheckItem>
          <MenubarCheckItem checked>
            Always Show Full URLs
          </MenubarCheckItem>
          <MenubarSeparator />
          <MenubarItem :shortcuts="['meta', 'R']">
            Reload
          </MenubarItem>
          <MenubarItem disabled :shortcuts="['shift', 'meta', 'R']">
            Force Reload
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            Toggle Fullscreen
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            Hide Sidebar
          </MenubarItem>
        </template>
      </MenubarMenu>
      <MenubarMenu>
        Profiles
        <template #content>
          <MenubarRadioGroup :items="[
            { label: 'Andy', value: 'andy' },
            { label: 'Benoit', value: 'benoit' },
            { label: 'Luis', value: 'luis' },
          ]" modelValue="benoit" />
          <MenubarSeparator />
          <MenubarItem>
            Edit...
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            Add Profile...
          </MenubarItem>
        </template>
      </MenubarMenu>
    </Menubar>
  </div>
</template>
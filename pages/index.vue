<script setup lang="ts">
import { z } from 'zod'
import type { SelectItems } from '~/components/ui/select'

const { t } = useI18n()

useHead({
	title: () => t('headers.home'),
})

const radioItems = [
  { name: 'Text', value: 'text' },
  { name: 'Example', value: 'example' },
  { name: 'Bar', value: 'bar' },
  { name: 'Foo', value: 'foo' },
]

const selectItems: SelectItems = [
  { label: 'Text', value: 'text' },
  { label: 'Example', value: 'example' },
  { label: 'Bar', value: 'bar' },
  { label: 'Foo', value: 'foo' },
]

const progress = ref(50)
const slider = ref([50])

const zodSchema = z.object({
  username: z.string().min(3).describe('This is your public display name.'),
  password: z.string().min(8).describe('This is your private password.'),
})
</script>

<template>
  <div class="screen-vp flex flex-wrap gap-4">
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
    <Button variant="error">Error</Button>
    <Button variant="warning">Warning</Button>
    <Button variant="success">Success</Button>
    <Button variant="info">Info</Button>
    <Button variant="ghost">Ghost</Button>
    <Button variant="link">Link</Button>
    <Button variant="outline">Outline</Button>
    <Button variant="secondary">Secondary</Button>
    <Badge variant="primary">Primary</Badge>
    <Badge variant="secondary">Secondary</Badge>
    <Badge variant="success">Success</Badge>
    <Badge variant="error" size="lg">Error</Badge>
    <Badge variant="warning" size="md">Warning</Badge>
    <Badge variant="info" size="sm">Info</Badge>
    <Badge variant="outline" size="xs">Outline</Badge>
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
import { twMerge } from 'tailwind-merge'
import { clsx } from 'clsx'

export { tv as compose } from 'tailwind-variants'

export type { ClassValue } from 'clsx'
export type { VariantProps } from 'tailwind-variants'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
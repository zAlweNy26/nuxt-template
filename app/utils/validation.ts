/* eslint-disable security/detect-object-injection */
import { z } from "zod"

/**
 * Retrieves the default values for a given Zod schema.
 * @param schema The Zod schema.
 * @param discriminant Optional discriminant value for discriminated unions.
 * @returns The default values for the schema, or undefined if no defaults are found.
 */
export function getZodDefaults<T extends z.ZodTypeAny>(schema: T, discriminant?: string): z.input<T> | undefined {
	if (schema instanceof z.ZodDiscriminatedUnion) {
		for (const [key, val] of schema._def.optionsMap.entries())
			if (key === discriminant) return getZodDefaults(val, discriminant)
		return getZodDefaults(schema._def.options[0], discriminant)
	}
	else if (schema instanceof z.ZodObject) {
		const shape = schema._def.shape()
		const result: Record<string, any> = {}
		for (const key in shape) {
			const value = getZodDefaults(shape[key], discriminant)
			if (value !== undefined) result[key] = value
		}
		return result
	}
	else if (schema instanceof z.ZodArray) {
		const result = getZodDefaults(schema.element, discriminant)
		const isObj = typeof result === 'object' && Object.keys(result).length > 0
		const isOther = typeof result !== 'object' && result !== undefined
		return isOther || isObj ? [result] : []
	}
	else if (schema instanceof z.ZodEffects) return getZodDefaults(schema.innerType(), discriminant)
	else if (schema instanceof z.ZodDefault) return schema._def.defaultValue()
	else return undefined
}
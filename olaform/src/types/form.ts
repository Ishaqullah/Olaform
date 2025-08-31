import { z } from "zod"

export const FieldTypeEnum = z.enum([
  "text",
  "textarea",
  "number",
  "select",
  "checkbox",
  "radio",
  "date",
])

export const FieldSchema = z.object({
  id: z.string(),
  type: FieldTypeEnum,
  label: z.string().min(1),
  required: z.boolean().default(false),
  placeholder: z.string().optional(),
  options: z.array(z.string()).optional(),
})

export const FormSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  description: z.string().optional(),
  fields: z.array(FieldSchema),
  slug: z.string().min(1),
})

export type FieldType = z.infer<typeof FieldTypeEnum>
export type Field = z.infer<typeof FieldSchema>
export type Form = z.infer<typeof FormSchema>


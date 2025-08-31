import { Form } from "@/types/form"

const forms = new Map<string, Form>()

export function upsertForm(form: Form): Form {
  forms.set(form.id, form)
  return form
}

export function getFormById(id: string): Form | undefined {
  return forms.get(id)
}

export function getFormBySlug(slug: string): Form | undefined {
  for (const f of forms.values()) {
    if (f.slug === slug) return f
  }
  return undefined
}

export function listForms(): Form[] {
  return Array.from(forms.values())
}

export function deleteForm(id: string): boolean {
  return forms.delete(id)
}


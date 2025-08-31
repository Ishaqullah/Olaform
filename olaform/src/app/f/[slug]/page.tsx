import { notFound } from "next/navigation"

async function getForm(slug: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/forms/by-slug/${slug}`, {
    cache: "no-store",
  })
  if (!res.ok) return null
  return res.json()
}

export default async function FormViewerPage({ params }: { params: { slug: string } }) {
  const form = await getForm(params.slug)
  if (!form) notFound()
  return (
    <main className="container py-8">
      <h1 className="text-2xl font-semibold mb-2">{form.title}</h1>
      {form.description && <p className="text-muted-foreground mb-6">{form.description}</p>}
      <div className="space-y-4">
        {form.fields.map((f: any) => (
          <div key={f.id} className="space-y-2">
            <label className="text-sm font-medium">{f.label}</label>
            <FieldInput field={f} />
          </div>
        ))}
      </div>
    </main>
  )
}

function FieldInput({ field }: { field: any }) {
  switch (field.type) {
    case "text":
      return <input className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm" />
    case "textarea":
      return <textarea className="w-full rounded-md border border-input bg-background p-2 text-sm" rows={4} />
    case "number":
      return <input type="number" className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm" />
    case "select":
      return (
        <select className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
          {(field.options || []).map((o: string) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      )
    case "checkbox":
      return <input type="checkbox" />
    case "radio":
      return (
        <div className="space-y-1">
          {(field.options || []).map((o: string) => (
            <label key={o} className="flex items-center gap-2 text-sm">
              <input type="radio" name={field.id} /> {o}
            </label>
          ))}
        </div>
      )
    case "date":
      return <input type="date" className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm" />
  }
}


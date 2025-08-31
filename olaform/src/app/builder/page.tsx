"use client"

import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { generateId } from "@/lib/id"
import type { Field, FieldType, Form } from "@/types/form"

const COMPONENTS: { type: FieldType; label: string }[] = [
  { type: "text", label: "Text" },
  { type: "textarea", label: "Textarea" },
  { type: "number", label: "Number" },
  { type: "select", label: "Select" },
  { type: "checkbox", label: "Checkbox" },
  { type: "radio", label: "Radio Group" },
  { type: "date", label: "Date" },
]

export default function BuilderPage() {
  const [title, setTitle] = useState("Untitled Form")
  const [slug, setSlug] = useState("untitled-form")
  const [fields, setFields] = useState<Field[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const selectedField = useMemo(
    () => fields.find((f) => f.id === selectedId) || null,
    [fields, selectedId]
  )

  function addField(type: FieldType) {
    const newField: Field = {
      id: generateId("fld"),
      type,
      label: `${type[0].toUpperCase()}${type.slice(1)} field` ,
      required: false,
      placeholder: type === "text" ? "Your answer" : undefined,
      options: type === "select" || type === "radio" ? ["Option 1", "Option 2"] : undefined,
    }
    setFields((prev) => [...prev, newField])
    setSelectedId(newField.id)
  }

  function updateSelected(updates: Partial<Field>) {
    setFields((prev) => prev.map((f) => (f.id === selectedId ? { ...f, ...updates } : f)))
  }

  async function handleSave() {
    const form: Form = {
      id: generateId("frm"),
      title,
      description: undefined,
      fields,
      slug,
    }
    const res = await fetch("/api/forms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
    if (!res.ok) {
      alert("Failed to save form")
      return
    }
    const saved = await res.json()
    alert(`Saved form: ${saved.title}`)
  }

  return (
    <main className="container py-8">
      <div className="mb-6 flex items-center gap-2">
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        <Input value={slug} onChange={(e) => setSlug(e.target.value)} className="w-60" />
        <Button onClick={handleSave}>Save</Button>
      </div>
      <div className="grid grid-cols-12 gap-4">
        <section className="col-span-3 rounded-md border p-4 min-h-[60vh]">
          <h2 className="font-medium mb-2">Components</h2>
          <ul className="text-sm text-muted-foreground space-y-2">
            {COMPONENTS.map((c) => (
              <li key={c.type}>
                <Button variant="outline" className="w-full justify-start" onClick={() => addField(c.type)}>
                  + {c.label}
                </Button>
              </li>
            ))}
          </ul>
        </section>
        <section className="col-span-6 rounded-md border p-4 min-h-[60vh]">
          <h2 className="font-medium mb-2">Canvas</h2>
          <div className="space-y-3">
            {fields.length === 0 && (
              <div className="text-sm text-muted-foreground">Add fields from the left</div>
            )}
            {fields.map((f) => (
              <div
                key={f.id}
                className={`rounded-md border p-3 ${selectedId === f.id ? "ring-2 ring-primary" : ""}`}
                onClick={() => setSelectedId(f.id)}
              >
                <Label className="block mb-1">{f.label}</Label>
                <FieldPreview field={f} />
              </div>
            ))}
          </div>
        </section>
        <section className="col-span-3 rounded-md border p-4 min-h-[60vh]">
          <h2 className="font-medium mb-2">Properties</h2>
          {!selectedField && (
            <div className="text-sm text-muted-foreground">Select a field to edit properties</div>
          )}
          {selectedField && (
            <div className="space-y-4">
              <div>
                <Label className="mb-1 block">Label</Label>
                <Input
                  value={selectedField.label}
                  onChange={(e) => updateSelected({ label: e.target.value })}
                />
              </div>
              {"placeholder" in selectedField && (
                <div>
                  <Label className="mb-1 block">Placeholder</Label>
                  <Input
                    value={selectedField.placeholder || ""}
                    onChange={(e) => updateSelected({ placeholder: e.target.value })}
                  />
                </div>
              )}
              {(selectedField.type === "select" || selectedField.type === "radio") && (
                <div>
                  <Label className="mb-1 block">Options (comma separated)</Label>
                  <Input
                    value={(selectedField.options || []).join(", ")}
                    onChange={(e) => updateSelected({ options: e.target.value.split(/\s*,\s*/) })}
                  />
                </div>
              )}
            </div>
          )}
        </section>
      </div>
    </main>
  )
}

function FieldPreview({ field }: { field: Field }) {
  switch (field.type) {
    case "text":
      return <Input placeholder={field.placeholder} />
    case "textarea":
      return <textarea className="w-full rounded-md border border-input bg-background p-2 text-sm" rows={3} />
    case "number":
      return <Input type="number" />
    case "select":
      return (
        <select className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
          {(field.options || []).map((opt) => (
            <option key={opt}>{opt}</option>
          ))}
        </select>
      )
    case "checkbox":
      return <input type="checkbox" />
    case "radio":
      return (
        <div className="space-y-1">
          {(field.options || []).map((opt) => (
            <label key={opt} className="flex items-center gap-2 text-sm">
              <input type="radio" name={field.id} /> {opt}
            </label>
          ))}
        </div>
      )
    case "date":
      return <Input type="date" />
  }
}


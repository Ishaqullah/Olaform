import { NextResponse } from "next/server"
import { FormSchema } from "@/types/form"
import { deleteForm, getFormById, upsertForm } from "../data"

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const form = getFormById(params.id)
  if (!form) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json(form)
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const json = await req.json()
  const parsed = FormSchema.safeParse(json)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }
  const saved = upsertForm(parsed.data)
  return NextResponse.json(saved)
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const ok = deleteForm(params.id)
  return NextResponse.json({ ok })
}


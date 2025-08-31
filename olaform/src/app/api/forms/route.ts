import { NextResponse } from "next/server"
import { z } from "zod"
import { FormSchema } from "@/types/form"
import { listForms, upsertForm } from "./data"

export async function GET() {
  return NextResponse.json(listForms())
}

export async function POST(req: Request) {
  const json = await req.json()
  const parse = FormSchema.safeParse(json)
  if (!parse.success) {
    return NextResponse.json({ error: parse.error.flatten() }, { status: 400 })
  }
  const saved = upsertForm(parse.data)
  return NextResponse.json(saved)
}


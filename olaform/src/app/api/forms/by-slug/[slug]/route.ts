import { NextResponse } from "next/server"
import { getFormBySlug } from "../../data"

export async function GET(_: Request, { params }: { params: { slug: string } }) {
  const form = getFormBySlug(params.slug)
  if (!form) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json(form)
}


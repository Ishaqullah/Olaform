import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NewFormPage() {
  return (
    <main className="container py-10">
      <div className="max-w-xl">
        <h1 className="text-2xl font-semibold mb-4">Create a new form</h1>
        <p className="text-muted-foreground mb-6">A simple placeholder for creating a form.</p>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/builder">Open Builder</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">Cancel</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}


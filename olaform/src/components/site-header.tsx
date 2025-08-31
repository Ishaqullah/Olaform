import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"

export function SiteHeader() {
  return (
    <header className="border-b">
      <div className="container flex h-14 items-center justify-between">
        <Link href="/" className="font-semibold">Olaform</Link>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost">
            <Link href="/builder">Open Builder</Link>
          </Button>
          <Button asChild>
            <Link href="/new">New Form</Link>
          </Button>
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}


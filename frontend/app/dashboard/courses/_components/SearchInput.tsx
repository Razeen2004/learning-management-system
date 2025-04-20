'use client'

import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Search } from "lucide-react"

export default function SearchInput({ onSearch }: { onSearch?: (query: string) => void }) {
  const [query, setQuery] = useState("")

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onSearch) {
      onSearch(query.trim())
    }
  }

  return (
    <div className="relative w-auto">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search..."
        className="pl-10"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  )
}

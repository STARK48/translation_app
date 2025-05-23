'use client'

import * as React from 'react'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X } from 'lucide-react'

const languages = [
  { id: "en-US", name: "English (US)" },
  { id: "fr-FR", name: "French (France)" },
  { id: "it-IT", name: "Italian (Italy)" },
  { id: "de-DE", name: "Deutsch (Germany)" },
  { id: "ja-JP", name: "Japanese (Japan)" }
]

export default function LanguageMultiSelect() {
  const [selected, setSelected] = React.useState<string[]>([])

  const toggleSelection = (value: string) => {
    setSelected(prev =>
      prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
    )
  }

  const removeSelection = (value: string) => {
    setSelected(prev => prev.filter(item => item !== value))
  }

  return (
    <div className="space-y-4 w-full max-w-md mx-auto">
      <div className="flex flex-wrap gap-2">
        {selected.map(id => {
          const lang = languages.find(l => l.id === id)
          return (
            <Badge key={id} variant="secondary" className="flex items-center gap-1">
              {lang?.name}
              <X className="w-3 h-3 cursor-pointer" onClick={() => removeSelection(id)} />
            </Badge>
          )
        })}
      </div>

      <Select onValueChange={toggleSelection}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select languages..." />
        </SelectTrigger>
        <SelectContent>
          {languages.map(lang => (
            <SelectItem key={lang.id} value={lang.id}>
              {lang.name}
              {selected.includes(lang.id) && <span className="ml-2 text-sm text-muted-foreground">(Selected)</span>}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

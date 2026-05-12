import { Minus, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import type { ExperienceItem } from "@/lib/cv"

import { FormTitle, TextField } from "./form-primitives"

type ExperienceEditorProps = {
  experience: ExperienceItem[]
  onAdd: () => void
  onRemove: (index: number) => void
  onUpdate: (index: number, field: keyof ExperienceItem, value: string) => void
}

export function ExperienceEditor({
  experience,
  onAdd,
  onRemove,
  onUpdate,
}: ExperienceEditorProps) {
  return (
    <section className="grid gap-3">
      <div className="flex items-center justify-between gap-3">
        <FormTitle>Experience</FormTitle>
        <Button
          type="button"
          size="xs"
          variant="outline"
          className="rounded-none border-black/25 bg-[#fbfaf4] font-mono uppercase"
          onClick={onAdd}
        >
          <Plus />
          Add
        </Button>
      </div>
      {experience.map((item, index) => (
        <div key={`${item.company}-${index}`} className="form-card grid gap-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] text-[#1f32b7]">
              Position {String(index + 1).padStart(2, "0")}
            </span>
            <Button
              type="button"
              size="icon-xs"
              variant="outline"
              aria-label="Remove position"
              className="rounded-none border-black/25 bg-[#fbfaf4]"
              onClick={() => onRemove(index)}
            >
              <Minus />
            </Button>
          </div>
          <div className="grid gap-3 xl:grid-cols-[0.8fr_1.1fr_0.75fr_2fr]">
            <TextField
              label="Company"
              value={item.company}
              onChange={(value) => onUpdate(index, "company", value)}
            />
            <TextField
              label="Title"
              value={item.title}
              onChange={(value) => onUpdate(index, "title", value)}
            />
            <TextField
              label="Date"
              value={item.date}
              onChange={(value) => onUpdate(index, "date", value)}
            />
            <TextField
              label="Bullets"
              value={item.bullets}
              onChange={(value) => onUpdate(index, "bullets", value)}
              multiline
            />
          </div>
        </div>
      ))}
    </section>
  )
}

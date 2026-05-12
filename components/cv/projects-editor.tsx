import { Minus, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import type { ProjectItem } from "@/lib/cv"

import { FormTitle, TextField } from "./form-primitives"

type ProjectsEditorProps = {
  projects: ProjectItem[]
  onAdd: () => void
  onRemove: (index: number) => void
  onUpdate: (index: number, field: keyof ProjectItem, value: string) => void
}

export function ProjectsEditor({
  projects,
  onAdd,
  onRemove,
  onUpdate,
}: ProjectsEditorProps) {
  return (
    <section className="grid gap-3">
      <div className="flex items-center justify-between gap-3">
        <FormTitle>Projects</FormTitle>
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
      {projects.map((item, index) => (
        <div key={`${item.name}-${index}`} className="form-card grid gap-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] text-[#1f32b7]">
              Project {String(index + 1).padStart(2, "0")}
            </span>
            <Button
              type="button"
              size="icon-xs"
              variant="outline"
              aria-label="Remove project"
              className="rounded-none border-black/25 bg-[#fbfaf4]"
              onClick={() => onRemove(index)}
            >
              <Minus />
            </Button>
          </div>
          <div className="grid gap-3 lg:grid-cols-[0.85fr_1.15fr_1fr_2fr]">
            <TextField
              label="Name"
              value={item.name}
              onChange={(value) => onUpdate(index, "name", value)}
            />
            <TextField
              label="Link"
              value={item.url}
              onChange={(value) => onUpdate(index, "url", value)}
            />
            <TextField
              label="Stack"
              value={item.stack}
              onChange={(value) => onUpdate(index, "stack", value)}
            />
            <TextField
              label="Description"
              value={item.description}
              onChange={(value) => onUpdate(index, "description", value)}
              multiline
            />
          </div>
        </div>
      ))}
    </section>
  )
}

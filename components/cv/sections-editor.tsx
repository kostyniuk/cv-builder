import { Button } from "@/components/ui/button"
import type { SectionKey } from "@/lib/cv"

import { FormTitle } from "./form-primitives"

type SectionsEditorProps = {
  sections: Record<SectionKey, boolean>
  sectionLabels: Record<SectionKey, string>
  onToggle: (section: SectionKey) => void
}

export function SectionsEditor({
  sections,
  sectionLabels,
  onToggle,
}: SectionsEditorProps) {
  return (
    <section className="grid gap-3">
      <FormTitle>Sections</FormTitle>
      <div className="flex flex-wrap gap-2">
        {(Object.keys(sectionLabels) as SectionKey[]).map((section) => (
          <Button
            key={section}
            type="button"
            size="sm"
            variant={sections[section] ? "default" : "outline"}
            className="w-fit rounded-none font-mono text-[10px] uppercase"
            onClick={() => onToggle(section)}
          >
            {sections[section] ? "Remove" : "Add"} {sectionLabels[section]}
          </Button>
        ))}
      </div>
    </section>
  )
}

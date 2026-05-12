import { Minus, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import type { SocialLink } from "@/lib/cv"

import { FormTitle, TextField } from "./form-primitives"

type SocialLinksEditorProps = {
  socialLinks: SocialLink[]
  onAdd: () => void
  onRemove: (index: number) => void
  onUpdate: (index: number, field: keyof SocialLink, value: string) => void
}

export function SocialLinksEditor({
  socialLinks,
  onAdd,
  onRemove,
  onUpdate,
}: SocialLinksEditorProps) {
  return (
    <section className="grid gap-3">
      <div className="flex items-center justify-between gap-3">
        <FormTitle>Social Links</FormTitle>
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
      <div className="grid grid-cols-1 gap-3">
        {socialLinks.map((item, index) => (
          <div key={`${item.label}-${index}`} className="form-card grid gap-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] text-[#1f32b7]">
                Link {String(index + 1).padStart(2, "0")}
              </span>
              <Button
                type="button"
                size="icon-xs"
                variant="outline"
                aria-label="Remove social link"
                disabled={socialLinks.length === 1}
                className="rounded-none border-black/25 bg-[#fbfaf4]"
                onClick={() => onRemove(index)}
              >
                <Minus />
              </Button>
            </div>
            <TextField
              label="Label"
              value={item.label}
              onChange={(value) => onUpdate(index, "label", value)}
            />
            <TextField
              label="URL"
              value={item.url}
              onChange={(value) => onUpdate(index, "url", value)}
            />
          </div>
        ))}
      </div>
    </section>
  )
}

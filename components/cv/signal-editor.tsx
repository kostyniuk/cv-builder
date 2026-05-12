import type { CvData } from "@/lib/cv"

import { FormBlock, TextField } from "./form-primitives"

type SignalEditorProps = {
  data: CvData
  onUpdateField: (
    field: keyof Omit<CvData, "experience" | "projects" | "sections" | "socialLinks">,
    value: string
  ) => void
}

export function SignalEditor({ data, onUpdateField }: SignalEditorProps) {
  return (
    <FormBlock title="Signal">
      <TextField
        label="Additional / Random Info"
        value={data.about}
        onChange={(value) => onUpdateField("about", value)}
        multiline
        wide
      />
      <TextField
        label="Education"
        value={data.education}
        onChange={(value) => onUpdateField("education", value)}
        multiline
      />
      <TextField
        label="Awards"
        value={data.awards}
        onChange={(value) => onUpdateField("awards", value)}
        multiline
      />
      <TextField
        label="Skills"
        value={data.skills}
        onChange={(value) => onUpdateField("skills", value)}
        multiline
      />
      <TextField
        label="Technical & Cultural Taste"
        value={data.taste}
        onChange={(value) => onUpdateField("taste", value)}
        multiline
      />
      <TextField
        label="People / Channels / Sources"
        value={data.inspirations}
        onChange={(value) => onUpdateField("inspirations", value)}
        multiline
      />
    </FormBlock>
  )
}

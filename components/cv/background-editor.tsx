import { backgroundLogoSizes, type BackgroundLogoSize } from "@/lib/cv"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

type BackgroundEditorProps = {
  svg: string
  size: BackgroundLogoSize
  onSvgChange: (value: string) => void
  onSizeChange: (value: BackgroundLogoSize) => void
}

const sizeLabels: Record<BackgroundLogoSize, string> = {
  sm: "SM",
  md: "MD",
  lg: "LG",
  xl: "XL",
}

export function BackgroundEditor({
  svg,
  size,
  onSvgChange,
  onSizeChange,
}: BackgroundEditorProps) {
  return (
    <section className="grid gap-3">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div className="grid gap-1">
          <Label className="font-mono text-[11px] tracking-[0.18em] text-black uppercase">
            CV background SVG
          </Label>
          <p className="text-xs text-black/58">
            Paste any SVG. It prints as a static one-color repeating logo.
          </p>
        </div>
        <div className="inline-grid grid-cols-4 border border-black/20 bg-[#fffdf5]/75">
          {backgroundLogoSizes.map((option) => (
            <Button
              key={option}
              type="button"
              variant="ghost"
              size="sm"
              aria-pressed={size === option}
              onClick={() => onSizeChange(option)}
              className="h-9 rounded-none border-r border-black/12 px-3 font-mono text-[11px] tracking-[0.12em] text-black/62 last:border-r-0 hover:bg-black/5 aria-pressed:bg-[#111] aria-pressed:text-white"
            >
              {sizeLabels[option]}
            </Button>
          ))}
        </div>
      </div>
      <Textarea
        value={svg}
        onChange={(event) => onSvgChange(event.target.value)}
        spellCheck={false}
        className="min-h-40 resize-y rounded-none border-black/25 bg-[#fffdf5]/75 font-mono text-[11px] leading-relaxed focus-visible:ring-[#1f32b7]/25"
      />
    </section>
  )
}

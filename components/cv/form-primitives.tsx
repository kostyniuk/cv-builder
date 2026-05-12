import type { ReactNode } from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function FormBlock({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <section className="grid gap-3">
      <FormTitle>{title}</FormTitle>
      <div className="form-block-grid grid gap-3 md:grid-cols-2">{children}</div>
    </section>
  )
}

export function FormTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-mono text-[11px] tracking-[0.18em] uppercase">
      {children}
    </h2>
  )
}

export function TextField({
  label,
  value,
  onChange,
  multiline = false,
  wide = false,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  multiline?: boolean
  wide?: boolean
}) {
  return (
    <div className={wide ? "grid gap-1.5 md:col-span-2" : "grid gap-1.5"}>
      <Label className="font-mono text-[11px] tracking-[0.12em] text-black/60 uppercase">
        {label}
      </Label>
      {multiline ? (
        <Textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="min-h-24 resize-y rounded-none border-black/25 bg-[#fffdf5]/75 font-mono text-xs leading-relaxed focus-visible:ring-[#1f32b7]/25"
        />
      ) : (
        <Input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="rounded-none border-black/25 bg-[#fffdf5]/75 font-mono text-xs focus-visible:ring-[#1f32b7]/25"
        />
      )}
    </div>
  )
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h3 className="mb-3 font-mono text-xs tracking-[0.08em] text-black uppercase">
      {children}
    </h3>
  )
}

export function MiniTitle({ children }: { children: ReactNode }) {
  return (
    <h4 className="mb-3 flex items-center gap-2 font-mono text-[10px] tracking-[0.1em] uppercase">
      <span className="size-2 bg-[#1f32b7]" />
      {children}
    </h4>
  )
}

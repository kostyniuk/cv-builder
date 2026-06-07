"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"

import { CodeBlockCommand } from "@/components/ui/code-block-command"
import { cn } from "@/lib/utils"

export type AiGenerateBlockProps = {
  prompt: string
  className?: string
}

export function AiGenerateBlock({ prompt, className }: AiGenerateBlockProps) {
  const [open, setOpen] = React.useState(true)

  return (
    <div
      data-slot="ai-generate-block"
      className={cn(
        "overflow-hidden rounded-[3px] border border-black/20 bg-[#fbfaf4]",
        className
      )}
    >
      {/* summary — also the collapse toggle */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Collapse section" : "Expand section"}
        aria-expanded={open}
        className="flex w-full flex-wrap items-center gap-x-3.5 gap-y-1 border-b border-black/10 px-4 py-3 text-left transition-colors hover:bg-[#f4f1e8]/40"
      >
        <span className="font-mono text-[10px] font-bold tracking-[0.2em] text-[#1f32b7] uppercase">
          Generate with AI
        </span>
        <span className="min-w-0 flex-1 font-mono text-xs text-black/55">
          Drop in anything about you — CV, LinkedIn, an article, your site — and
          AI drafts a CV you can{" "}
          <b className="font-bold text-black/75">fine-tune from there</b>.
        </span>
        <ChevronDown
          className={cn(
            "size-3.5 shrink-0 text-black/70 transition-transform duration-300",
            open && "rotate-180"
          )}
        />
      </button>

      {/* body */}
      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-out",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <CodeBlockCommand
            prompt={prompt}
            defaultTab="how"
            className="rounded-none border-0 bg-transparent [&_[data-slot=code-block-command-code]]:text-xs [&_[data-slot=code-block-command-content]]:max-h-72 [&_[data-slot=code-block-command-content]]:overflow-y-auto"
            tabs={[
              {
                value: "how",
                label: "How it works",
                content: (
                  <ol className="m-0 list-decimal pl-5 font-mono text-[13px] leading-[1.85] text-black/75 marker:text-black/40">
                    <li>
                      <b className="font-bold text-black">Copy</b> the prompt.
                    </li>
                    <li>
                      <b className="font-bold text-black">Paste</b> it into any
                      AI chat, then add your old CV, LinkedIn export, or rough
                      notes.
                    </li>
                    <li>
                      The AI rewrites everything into the CV schema and hands you
                      a <b className="font-bold text-black">LeeHireMe URL</b>.
                    </li>
                    <li>
                      <b className="font-bold text-black">Open</b> the URL —
                      print or save as PDF.
                    </li>
                  </ol>
                ),
              },
            ]}
          />
        </div>
      </div>
    </div>
  )
}

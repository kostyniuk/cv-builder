import { lines } from "@/lib/cv"

import { SectionTitle } from "./form-primitives"

export function SummarySection({ summary }: { summary: string }) {
  if (!summary.trim()) {
    return null
  }

  return (
    <section className="cv-section">
      <SectionTitle>Main Ideas</SectionTitle>
      <div className="border-t border-black/18 pt-3 font-mono text-[11px] leading-relaxed">
        {lines(summary).map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </section>
  )
}

import { lines } from "@/lib/cv"

import { SectionTitle } from "./form-primitives"

export function SummarySection({ summary }: { summary: string }) {
  if (!summary.trim()) {
    return null
  }

  return (
    <section className="cv-section">
      <div className="font-mono text-[11px] leading-relaxed">
        {lines(summary).map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </section>
  )
}

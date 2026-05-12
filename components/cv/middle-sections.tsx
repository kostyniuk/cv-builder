import { lines, type CvData } from "@/lib/cv"

import { SectionTitle } from "./form-primitives"

type MiddleSectionKey = "about" | "taste" | "inspirations" | "awards"

export function MiddleSections({
  sections,
  data,
}: {
  sections: MiddleSectionKey[]
  data: CvData
}) {
  if (sections.length === 0) {
    return null
  }

  return (
    <div
      className="cv-middle-sections cv-two-column cv-dynamic-grid grid"
      data-count={sections.length}
    >
      {sections.includes("inspirations") ? (
        <section className="cv-section">
          <SectionTitle>People, Channels & Sources</SectionTitle>
          <div className="font-mono text-[11px] leading-tight">
            <p>
              {lines(data.inspirations).map((line, index, items) => (
                <span key={line}>
                  {line}
                  {index < items.length - 1 ? " · " : ""}
                </span>
              ))}
            </p>
          </div>
        </section>
      ) : null}

      {sections.includes("taste") ? (
        <section className="cv-section">
          <SectionTitle>Technical & Cultural Taste</SectionTitle>
          <div className="font-mono text-[11px] leading-tight">
            {lines(data.taste).map((taste) => (
              <p key={taste}>{taste}</p>
            ))}
          </div>
        </section>
      ) : null}

      {sections.includes("about") ? (
        <section className="cv-section">
          <SectionTitle>Additional Info</SectionTitle>
          <div className="border-t border-black/20 pt-3 font-mono text-[11px] leading-tight">
            {lines(data.about).map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </section>
      ) : null}

      {sections.includes("awards") ? (
        <section className="cv-section">
          <SectionTitle>Award & Recognition</SectionTitle>
          <div className="space-y-1 font-mono text-[11px] leading-tight">
            {lines(data.awards).map((award) => (
              <p key={award}>{award}</p>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  )
}

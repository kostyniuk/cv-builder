import { lines, type ExperienceItem } from "@/lib/cv"

import { SectionTitle } from "./form-primitives"

export function ExperienceSection({
  experience,
}: {
  experience: ExperienceItem[]
}) {
  if (experience.length === 0) {
    return null
  }

  return (
    <section className="cv-section">
      <SectionTitle>Experience</SectionTitle>
      <div className="cv-timeline relative grid gap-5 pl-36">
        <div className="timeline-line absolute top-2 h-[calc(100%-8px)] w-px bg-black/25" />
        {experience.map((item, index) => (
          <div
            key={`${item.company}-${index}`}
            className="cv-experience-row relative grid gap-1"
          >
            <div className="absolute -left-36 w-24 font-mono text-[11px] leading-tight">
              {item.date}
            </div>
            <div className="timeline-node" />
            <div>
              <h3 className="font-mono text-sm font-bold">
                {item.company}
                {item.title ? (
                  <span className="font-normal"> | {item.title}</span>
                ) : null}
              </h3>
            </div>
            <ul className="mt-1 list-disc space-y-1 pl-5 font-mono text-[11px] leading-tight">
              {lines(item.bullets).map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

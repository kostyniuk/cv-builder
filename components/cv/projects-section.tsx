import { Star } from "lucide-react"

import type { ProjectItem } from "@/lib/cv"
import { normalizeUrl } from "@/lib/url"

import { SectionTitle } from "./form-primitives"

export function ProjectsSection({ projects }: { projects: ProjectItem[] }) {
  if (projects.length === 0) {
    return null
  }

  return (
    <section className="cv-section">
      <SectionTitle>Projects</SectionTitle>
      <div className="divide-y divide-black/12 border-y border-black/18">
        {projects.map((project, index) => (
          <div
            key={`${project.name}-${index}`}
            className="cv-project-row grid gap-3 py-3"
          >
            <span className="font-mono text-sm text-[#1f32b7]">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="font-mono text-[11px] leading-tight uppercase">
              <p className="flex flex-wrap items-center gap-1.5 font-bold">
                {project.url.trim() ? (
                  <a
                    href={normalizeUrl(project.url)}
                    target="_blank"
                    rel="noreferrer"
                    className="underline-offset-2 hover:underline"
                  >
                    {project.name}
                  </a>
                ) : (
                  project.name
                )}
                {project.stars.trim() ? (
                  <span className="inline-flex items-center gap-0.5 border border-[#b8860b]/45 bg-[#f5c518]/15 px-1 text-[9px] leading-[1.4] font-normal text-[#8a6508]">
                    <Star className="size-2 fill-[#e3a008] text-[#e3a008]" strokeWidth={0} />
                    {project.stars.trim()}
                  </span>
                ) : null}
              </p>
              <p>{project.stack}</p>
            </div>
            <p className="border-l border-black/20 pl-4 font-mono text-[11px] leading-tight">
              {project.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

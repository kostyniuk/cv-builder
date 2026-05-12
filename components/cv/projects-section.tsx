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
              <p className="font-bold">
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

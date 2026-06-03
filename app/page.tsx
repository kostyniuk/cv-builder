"use client"

import { Download, RotateCcw } from "lucide-react"
import { Suspense } from "react"
import { useQueryState } from "nuqs"

import { CvHeader } from "@/components/cv/cv-header"
import { ExperienceEditor } from "@/components/cv/experience-editor"
import { ExperienceSection } from "@/components/cv/experience-section"
import { FooterSections } from "@/components/cv/footer-sections"
import {
  FormBlock,
  FormTitle,
  TextField,
} from "@/components/cv/form-primitives"
import { MiddleSections } from "@/components/cv/middle-sections"
import { ProjectsEditor } from "@/components/cv/projects-editor"
import { ProjectsSection } from "@/components/cv/projects-section"
import { SectionsEditor } from "@/components/cv/sections-editor"
import { SignalEditor } from "@/components/cv/signal-editor"
import { SocialLinksEditor } from "@/components/cv/social-links-editor"
import { SummarySection } from "@/components/cv/summary-section"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  blankExperience,
  blankProject,
  initialData,
  sectionLabels,
  type CvData,
  type ExperienceItem,
  type ProjectItem,
  type SectionKey,
  type SocialLink,
} from "@/lib/cv"
import { cvDataParser } from "@/lib/cv-query"

function PageContent() {
  const [data, setData] = useQueryState(
    "cv",
    cvDataParser.withDefault(initialData).withOptions({
      history: "replace",
      shallow: true,
    })
  )

  const middleSections = [
    data.sections.about ? "about" : null,
    data.sections.taste ? "taste" : null,
    data.sections.inspirations ? "inspirations" : null,
    data.sections.awards ? "awards" : null,
  ].filter(Boolean) as Array<"about" | "taste" | "inspirations" | "awards">

  const footerSections = [
    data.sections.skills ? "skills" : null,
    data.sections.portfolio ? "portfolio" : null,
    data.sections.education ? "education" : null,
  ].filter(Boolean) as Array<"skills" | "portfolio" | "education">

  function updateField(
    field: keyof Omit<
      CvData,
      "experience" | "projects" | "sections" | "socialLinks"
    >,
    value: string
  ) {
    setData((current) => ({ ...current, [field]: value }))
  }

  function updateSocialLink(
    index: number,
    field: keyof SocialLink,
    value: string
  ) {
    setData((current) => ({
      ...current,
      socialLinks: current.socialLinks.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item
      ),
    }))
  }

  function updateExperience(
    index: number,
    field: keyof ExperienceItem,
    value: string
  ) {
    setData((current) => ({
      ...current,
      experience: current.experience.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item
      ),
    }))
  }

  function updateProject(
    index: number,
    field: keyof ProjectItem,
    value: string
  ) {
    setData((current) => ({
      ...current,
      projects: current.projects.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item
      ),
    }))
  }

  function toggleSection(section: SectionKey) {
    setData((current) => ({
      ...current,
      sections: {
        ...current.sections,
        [section]: !current.sections[section],
      },
    }))
  }

  return (
    <main className="cv-app min-h-svh px-4 py-5 text-[#111] sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-[1720px] flex-col gap-6">
        <section className="no-print flex flex-col gap-2 border-b border-black/10 pb-2">
          <div className="flex flex-col gap-1 sm:gap-2">
            <div className="grid gap-3 xl:grid-cols-[auto_minmax(0,1fr)_auto] xl:items-start xl:gap-6">
              <div className="flex flex-col gap-2">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-xl font-black tracking-tight sm:text-2xl">
                      One-page CV Builder
                    </h1>
                    <Label className="w-fit border border-black/15 bg-[#fbfaf4]/80 px-2 py-1 font-mono text-[10px] tracking-[0.18em] text-[#1f32b7] uppercase">
                      LeeHireMe
                    </Label>
                  </div>
                  <p className="text-xs text-black/62 sm:text-sm">
                    Scroll down to fill the form, then print or save as PDF.
                  </p>
                </div>
              </div>

              <div className="border border-black/12 bg-[#fbfaf4]/70 px-3 py-2 shadow-[4px_4px_0_rgba(15,15,15,0.04)] xl:w-full">
                <p className="font-mono text-[10px] tracking-[0.16em] text-[#1f32b7] uppercase">
                  Why use this?
                </p>
                <p className="mt-1 text-[11px] leading-4 text-black/68 sm:text-xs">
                  Nobody wants to read your CV. Keep it to one page and they
                  might. Go over, and you've already lost them. Your CV is your
                  foot in the door, make it easy to read or it won't open. But
                  it's not just about readable - it's about revealing. Your
                  taste in tools, who you follow, what you care about. That
                  stuff signals culture fit faster than any cover letter. Skills
                  get you considered, fit gets you hired.{" "}
                </p>
              </div>

              <div className="flex flex-col items-start gap-1 xl:items-end">
                <a
                  href="https://x.com/kostyniuk00"
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-[10px] tracking-[0.12em] text-black/60 uppercase transition-colors hover:text-[#1f32b7] xl:text-right"
                >
                  X: @kostyniuk00
                </a>
                <a
                  href="https://github.com/kostyniuk"
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-[10px] tracking-[0.12em] text-black/60 uppercase transition-colors hover:text-[#1f32b7] xl:text-right"
                >
                  GitHub: @kostyniuk
                </a>
                <a
                  href="https://github.com/kostyniuk/lee-hire-me"
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-[10px] tracking-[0.12em] text-black/60 uppercase transition-colors hover:text-[#1f32b7] xl:text-right"
                >
                  Repo: github.com/kostyniuk/lee-hire-me
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="print-area flex min-w-0 justify-center self-center">
          <article className="cv-sheet relative w-full overflow-hidden border border-black/20 bg-[#fbfaf4] text-[#111] shadow-[0_20px_80px_rgba(12,10,3,0.18)]">
            <div className="corner corner-tl" />
            <div className="corner corner-tr" />
            <div className="corner corner-bl" />
            <div className="corner corner-br" />
            <div className="cv-sheet-inner">
              <CvHeader data={data} />
              <SummarySection summary={data.summary} />
              <ExperienceSection experience={data.experience} />
              <ProjectsSection projects={data.projects} />
              <MiddleSections sections={middleSections} data={data} />
              <FooterSections sections={footerSections} data={data} />
            </div>
          </article>
        </section>

        <section className="no-print cv-panel w-full border border-black/15 bg-[#f4f1e8]/90 p-4 shadow-[8px_8px_0_rgba(15,15,15,0.08)] backdrop-blur md:p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-mono text-[10px] tracking-[0.22em] text-[#1f32b7] uppercase">
                Builder controls
              </p>
              <h1 className="mt-1 text-2xl font-black tracking-normal">
                One-page CV Builder
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                aria-label="Reset form"
                title="Reset form"
                onClick={() => setData(initialData)}
                className="border-black/25 bg-[#fbfaf4]"
              >
                <RotateCcw />
              </Button>
              <Button
                className="rounded-none bg-[#111] font-mono text-xs tracking-[0.16em] text-white uppercase hover:bg-[#1f32b7]"
                onClick={() => {
                  const originalTitle = document.title
                  const formattedName = data.name.trim().replace(/\s+/g, "_")
                  document.title = `CV_${formattedName}`
                  window.print()
                  document.title = originalTitle
                }}
              >
                <Download />
                Download PDF
              </Button>
            </div>
          </div>

          <Separator className="my-4 bg-black/20" />

          <div className="grid gap-6">
            <section className="grid gap-3">
              <FormTitle>Identity</FormTitle>
              <div className="grid gap-3 xl:grid-cols-[1.35fr_0.5fr_1.35fr_0.8fr_1.35fr]">
                <TextField
                  label="Name"
                  value={data.name}
                  onChange={(value) => updateField("name", value)}
                />
                <TextField
                  label="Name size (rem)"
                  value={data.nameFontSize}
                  onChange={(value) => updateField("nameFontSize", value)}
                />
                <TextField
                  label="Email"
                  value={data.email}
                  onChange={(value) => updateField("email", value)}
                />
                <TextField
                  label="Phone"
                  value={data.phone}
                  onChange={(value) => updateField("phone", value)}
                />
                <TextField
                  label="Role"
                  value={data.role}
                  onChange={(value) => updateField("role", value)}
                />
              </div>
            </section>

            <FormBlock title="Contact">
              <TextField
                label="Location"
                value={data.location}
                onChange={(value) => updateField("location", value)}
              />
              <TextField
                label="Website"
                value={data.website}
                onChange={(value) => updateField("website", value)}
              />
            </FormBlock>

            <FormBlock title="Profile">
              <TextField
                label="Main Info Before Experience"
                value={data.summary}
                onChange={(value) => updateField("summary", value)}
                multiline
                wide
              />
            </FormBlock>

            <SocialLinksEditor
              socialLinks={data.socialLinks}
              onAdd={() =>
                setData((current) => ({
                  ...current,
                  socialLinks: [
                    ...current.socialLinks,
                    { label: "Profile", url: "https://" },
                  ],
                }))
              }
              onRemove={(index) =>
                setData((current) => ({
                  ...current,
                  socialLinks: current.socialLinks.filter(
                    (_, itemIndex) => itemIndex !== index
                  ),
                }))
              }
              onUpdate={updateSocialLink}
            />

            <SectionsEditor
              sections={data.sections}
              sectionLabels={sectionLabels}
              onToggle={toggleSection}
            />

            <ExperienceEditor
              experience={data.experience}
              onAdd={() =>
                setData((current) => ({
                  ...current,
                  experience: [...current.experience, blankExperience],
                }))
              }
              onRemove={(index) =>
                setData((current) => ({
                  ...current,
                  experience: current.experience.filter(
                    (_, itemIndex) => itemIndex !== index
                  ),
                }))
              }
              onUpdate={updateExperience}
            />

            <ProjectsEditor
              projects={data.projects}
              onAdd={() =>
                setData((current) => ({
                  ...current,
                  projects: [...current.projects, blankProject],
                }))
              }
              onRemove={(index) =>
                setData((current) => ({
                  ...current,
                  projects: current.projects.filter(
                    (_, itemIndex) => itemIndex !== index
                  ),
                }))
              }
              onUpdate={updateProject}
            />

            <SignalEditor data={data} onUpdateField={updateField} />
          </div>
        </section>
      </div>
    </main>
  )
}

export default function Page() {
  return (
    <Suspense
      fallback={
        <main className="cv-app min-h-svh px-4 py-5 text-[#111] sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-[1720px] flex-col gap-6" />
        </main>
      }
    >
      <PageContent />
    </Suspense>
  )
}

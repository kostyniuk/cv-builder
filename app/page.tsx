"use client"

import { useState } from "react"
import { Download, RotateCcw } from "lucide-react"

import { CvHeader } from "@/components/cv/cv-header"
import { ExperienceEditor } from "@/components/cv/experience-editor"
import { ExperienceSection } from "@/components/cv/experience-section"
import { FooterSections } from "@/components/cv/footer-sections"
import {
  FormBlock,
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

export default function Page() {
  const [data, setData] = useState<CvData>(initialData)

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
      <div className="mx-auto grid max-w-[1720px] gap-5 xl:grid-cols-[640px_minmax(0,1fr)]">
        <section className="no-print cv-panel border border-black/15 bg-[#f4f1e8]/90 p-4 shadow-[8px_8px_0_rgba(15,15,15,0.08)] backdrop-blur md:p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h1 className="text-2xl font-black tracking-normal">
                One-page CV Builder
              </h1>
            </div>
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
          </div>

          <Separator className="my-4 bg-black/20" />

          <div className="grid gap-5">
            <FormBlock title="Identity">
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
            </FormBlock>

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

            <SectionsEditor
              sections={data.sections}
              sectionLabels={sectionLabels}
              onToggle={toggleSection}
            />

            <SignalEditor data={data} onUpdateField={updateField} />
          </div>

          <Button
            className="mt-5 w-full rounded-none bg-[#111] font-mono text-xs tracking-[0.16em] text-white uppercase hover:bg-[#1f32b7]"
            onClick={() => window.print()}
          >
            <Download />
            Download PDF
          </Button>
        </section>

        <section className="print-area flex min-w-0 justify-center self-start">
          <article className="cv-sheet relative w-full max-w-[930px] overflow-hidden border border-black/20 bg-[#fbfaf4] p-8 text-[#111] shadow-[0_20px_80px_rgba(12,10,3,0.18)] sm:p-8">
            <div className="corner corner-tl" />
            <div className="corner corner-tr" />
            <div className="corner corner-bl" />
            <div className="corner corner-br" />

            <CvHeader data={data} />
            <SummarySection summary={data.summary} />
            <ExperienceSection experience={data.experience} />
            <ProjectsSection projects={data.projects} />
            <MiddleSections sections={middleSections} data={data} />
            <FooterSections sections={footerSections} data={data} />
          </article>
        </section>
      </div>
    </main>
  )
}

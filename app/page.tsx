"use client"

import { useState } from "react"
import { Download, Globe, Link2, Minus, Plus, RotateCcw } from "lucide-react"

import { PortfolioQrCode } from "@/components/portfolio-qr-code"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { normalizeUrl } from "@/lib/url"

type ExperienceItem = {
  company: string
  title: string
  date: string
  bullets: string
}

type ProjectItem = {
  name: string
  stack: string
  description: string
}

type SocialLink = {
  label: string
  url: string
}

type SectionKey =
  | "about"
  | "awards"
  | "taste"
  | "inspirations"
  | "education"
  | "portfolio"
  | "skills"

type CvData = {
  name: string
  nameFontSize: string
  role: string
  email: string
  phone: string
  location: string
  website: string
  summary: string
  about: string
  socialLinks: SocialLink[]
  experience: ExperienceItem[]
  projects: ProjectItem[]
  education: string
  awards: string
  skills: string
  taste: string
  inspirations: string
  sections: Record<SectionKey, boolean>
}

const blankExperience: ExperienceItem = {
  company: "New Company",
  title: "Role title",
  date: "2026 - Present",
  bullets: "Describe one measurable contribution.",
}

const blankProject: ProjectItem = {
  name: "New Project",
  stack: "Tools, stack",
  description: "Short impact-focused project description.",
}

const initialData: CvData = {
  name: "Alex Kostyniuk",
  nameFontSize: "4.7",
  role: "Software Engineer",
  email: "kostyniukengineering@gmail.com",
  phone: "(12) 345-6787",
  location: "Stockholm, Sweden",
  website: "a13x.space",
  summary:
    "I like building software that feels clear, durable, and useful. I care about systems that reduce noise, make teams faster, and stay understandable as they grow.",
  about:
    "Strong bias toward shipping. Enjoy product taste, developer experience, and reducing complexity in both code and process.",
  socialLinks: [
    { label: "LinkedIn", url: "https://www.linkedin.com/in/alexkostyniuk" },
    { label: "X / Twitter", url: "https://x.com/alexkostyniuk" },
    { label: "GitHub", url: "https://github.com/alexkostyniuk" },
  ],
  experience: [
    {
      company: "Neural Dynamics Corp.",
      title: "Economic job title",
      date: "Jan 2024 - Present",
      bullets:
        "Led a team of 5 engineers designing and implementing microservices architecture using Kubernetes and Docker, improving system throughput by 40%.\nIntegrated a complex machine learning model into the core platform, optimizing data processing efficiency by 60%.\nManaged AWS cloud infrastructure deployment for 12+ critical service components.",
    },
    {
      company: "Apex Labs",
      title: "Realistic Job Title",
      date: "Mar 2022 - Jan 2024",
      bullets:
        "Contributed to decentralized identity protocol development and microservices architecture operations.\nManaged cybersecurity platforms and scalable service deployments for 60% faster handoffs.",
    },
    {
      company: "Vertex Digital",
      title: "Realistic job",
      date: "Aug 2020 - Mar 2022",
      bullets:
        "Built developer tools and internal platform workflows for high-throughput product teams.",
    },
  ],
  projects: [
    {
      name: "AI-Powered Market Predictor",
      stack: "Python, TensorFlow",
      description:
        "Built a forecasting workflow for real-time data streams and reduced error by 20%.",
    },
    {
      name: "Decentralized Data Exchange",
      stack: "Solidity, cryptography",
      description:
        "Created a secure data sharing platform with verifiable permissions.",
    },
    {
      name: "Optimized Core Transactions",
      stack: "React, Node.js",
      description:
        "Refactored processing and optimization work on a high-throughput platform.",
    },
  ],
  education:
    "BSc. Computer Science\nUC Berkeley\nAWS Certified DevOps Engineer\nKubernetes Certified Administrator",
  awards:
    "Google Developer Expert (AI/ML) 2025\nApex Labs Tech Innovation Award 2025\nApex Labs Tech Innovation Award 2023",
  skills:
    "Languages: Python, Go, Rust, TypeScript\nFrameworks: React, Node.js, TensorFlow, Docker, K8s\nTools: AWS, Git, Figma",
  taste:
    "Functional programming, distributed systems, quiet interfaces, developer tools, technical writing",
  inspirations:
    "The Pragmatic Engineer\nByteByteGo\nStrangeloop talks\nDan Abramov\nBret Victor",
  sections: {
    about: true,
    awards: true,
    taste: true,
    inspirations: true,
    education: true,
    portfolio: true,
    skills: true,
  },
}

const sectionLabels: Record<SectionKey, string> = {
  about: "Additional Info",
  awards: "Awards",
  taste: "Taste",
  inspirations: "People & Sources",
  education: "Education",
  portfolio: "QR",
  skills: "Skills",
}

function lines(value: string) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
}

function parseNameFontSize(value: string) {
  const parsed = Number.parseFloat(value)
  return Number.isFinite(parsed) ? parsed : 2.85
}

function socialBadge(label: string, url: string) {
  const source = `${label} ${url}`.toLowerCase()

  if (source.includes("linkedin")) {
    return "in"
  }

  if (
    source.includes("github") ||
    source.includes("gitlab") ||
    source.includes("bitbucket")
  ) {
    return "gh"
  }

  if (
    source.includes("twitter") ||
    source.includes("x.com") ||
    source.includes("x /")
  ) {
    return "x"
  }

  const compact = label.replace(/[^a-z0-9]/gi, "").slice(0, 2)
  return compact ? compact.toLowerCase() : "ln"
}

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
              <p className="font-mono text-[10px] tracking-[0.22em] text-[#1f32b7] uppercase">
                Digital systems
              </p>
              <h1 className="mt-2 text-2xl font-black tracking-normal">
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
                label="Role"
                value={data.role}
                onChange={(value) => updateField("role", value)}
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

            <section className="grid gap-3">
              <div className="flex items-center justify-between gap-3">
                <FormTitle>Social Links</FormTitle>
                <Button
                  type="button"
                  size="xs"
                  variant="outline"
                  className="rounded-none border-black/25 bg-[#fbfaf4] font-mono uppercase"
                  onClick={() =>
                    setData((current) => ({
                      ...current,
                      socialLinks: [
                        ...current.socialLinks,
                        { label: "Profile", url: "https://" },
                      ],
                    }))
                  }
                >
                  <Plus />
                  Add
                </Button>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {data.socialLinks.map((item, index) => (
                  <div
                    key={`${item.label}-${index}`}
                    className="form-card grid gap-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[11px] text-[#1f32b7]">
                        Link {String(index + 1).padStart(2, "0")}
                      </span>
                      <Button
                        type="button"
                        size="icon-xs"
                        variant="outline"
                        aria-label="Remove social link"
                        disabled={data.socialLinks.length === 1}
                        className="rounded-none border-black/25 bg-[#fbfaf4]"
                        onClick={() =>
                          setData((current) => ({
                            ...current,
                            socialLinks: current.socialLinks.filter(
                              (_, itemIndex) => itemIndex !== index
                            ),
                          }))
                        }
                      >
                        <Minus />
                      </Button>
                    </div>
                    <TextField
                      label="Label"
                      value={item.label}
                      onChange={(value) =>
                        updateSocialLink(index, "label", value)
                      }
                    />
                    <TextField
                      label="URL"
                      value={item.url}
                      onChange={(value) =>
                        updateSocialLink(index, "url", value)
                      }
                    />
                  </div>
                ))}
              </div>
            </section>

            <section className="grid gap-3">
              <div className="flex items-center justify-between gap-3">
                <FormTitle>Experience</FormTitle>
                <Button
                  type="button"
                  size="xs"
                  variant="outline"
                  className="rounded-none border-black/25 bg-[#fbfaf4] font-mono uppercase"
                  onClick={() =>
                    setData((current) => ({
                      ...current,
                      experience: [...current.experience, blankExperience],
                    }))
                  }
                >
                  <Plus />
                  Add
                </Button>
              </div>
              {data.experience.map((item, index) => (
                <div
                  key={`${item.company}-${index}`}
                  className="form-card grid gap-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] text-[#1f32b7]">
                      Position {String(index + 1).padStart(2, "0")}
                    </span>
                    <Button
                      type="button"
                      size="icon-xs"
                      variant="outline"
                      aria-label="Remove position"
                      disabled={data.experience.length === 1}
                      className="rounded-none border-black/25 bg-[#fbfaf4]"
                      onClick={() =>
                        setData((current) => ({
                          ...current,
                          experience: current.experience.filter(
                            (_, itemIndex) => itemIndex !== index
                          ),
                        }))
                      }
                    >
                      <Minus />
                    </Button>
                  </div>
                  <div className="grid gap-3 md:grid-cols-[1fr_1fr]">
                    <TextField
                      label="Company"
                      value={item.company}
                      onChange={(value) =>
                        updateExperience(index, "company", value)
                      }
                    />
                    <TextField
                      label="Title"
                      value={item.title}
                      onChange={(value) =>
                        updateExperience(index, "title", value)
                      }
                    />
                  </div>
                  <TextField
                    label="Date"
                    value={item.date}
                    onChange={(value) => updateExperience(index, "date", value)}
                  />
                  <TextField
                    label="Bullets"
                    value={item.bullets}
                    onChange={(value) =>
                      updateExperience(index, "bullets", value)
                    }
                    multiline
                  />
                </div>
              ))}
            </section>

            <section className="grid gap-3">
              <div className="flex items-center justify-between gap-3">
                <FormTitle>Projects</FormTitle>
                <Button
                  type="button"
                  size="xs"
                  variant="outline"
                  className="rounded-none border-black/25 bg-[#fbfaf4] font-mono uppercase"
                  onClick={() =>
                    setData((current) => ({
                      ...current,
                      projects: [...current.projects, blankProject],
                    }))
                  }
                >
                  <Plus />
                  Add
                </Button>
              </div>
              {data.projects.map((item, index) => (
                <div
                  key={`${item.name}-${index}`}
                  className="form-card grid gap-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] text-[#1f32b7]">
                      Project {String(index + 1).padStart(2, "0")}
                    </span>
                    <Button
                      type="button"
                      size="icon-xs"
                      variant="outline"
                      aria-label="Remove project"
                      disabled={data.projects.length === 1}
                      className="rounded-none border-black/25 bg-[#fbfaf4]"
                      onClick={() =>
                        setData((current) => ({
                          ...current,
                          projects: current.projects.filter(
                            (_, itemIndex) => itemIndex !== index
                          ),
                        }))
                      }
                    >
                      <Minus />
                    </Button>
                  </div>
                  <div className="grid gap-3 md:grid-cols-[1fr_1fr]">
                    <TextField
                      label="Name"
                      value={item.name}
                      onChange={(value) => updateProject(index, "name", value)}
                    />
                    <TextField
                      label="Stack"
                      value={item.stack}
                      onChange={(value) => updateProject(index, "stack", value)}
                    />
                  </div>
                  <TextField
                    label="Description"
                    value={item.description}
                    onChange={(value) =>
                      updateProject(index, "description", value)
                    }
                    multiline
                  />
                </div>
              ))}
            </section>

            <section className="grid gap-3">
              <FormTitle>Sections</FormTitle>
              <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                {(Object.keys(sectionLabels) as SectionKey[]).map((section) => (
                  <Button
                    key={section}
                    type="button"
                    size="sm"
                    variant={data.sections[section] ? "default" : "outline"}
                    className="rounded-none font-mono text-[10px] uppercase"
                    onClick={() => toggleSection(section)}
                  >
                    {data.sections[section] ? "Remove" : "Add"}{" "}
                    {sectionLabels[section]}
                  </Button>
                ))}
              </div>
            </section>

            <FormBlock title="Signal">
              <TextField
                label="Additional / Random Info"
                value={data.about}
                onChange={(value) => updateField("about", value)}
                multiline
                wide
              />
              <TextField
                label="Education"
                value={data.education}
                onChange={(value) => updateField("education", value)}
                multiline
              />
              <TextField
                label="Awards"
                value={data.awards}
                onChange={(value) => updateField("awards", value)}
                multiline
              />
              <TextField
                label="Skills"
                value={data.skills}
                onChange={(value) => updateField("skills", value)}
                multiline
              />
              <TextField
                label="Technical & Cultural Taste"
                value={data.taste}
                onChange={(value) => updateField("taste", value)}
                multiline
              />
              <TextField
                label="People / Channels / Sources"
                value={data.inspirations}
                onChange={(value) => updateField("inspirations", value)}
                multiline
              />
            </FormBlock>
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

            <header className="cv-header grid gap-5 border-b border-black/25 pb-2">
              <div>
                <h2
                  className="cv-name leading-[0.82] font-black tracking-[-0.04em]"
                  style={{ fontSize: `${parseNameFontSize(data.nameFontSize)}rem` }}
                >
                  {data.name || "alex"}
                </h2>
                <div className="mt-3 flex items-center gap-2 font-mono text-xs tracking-[0.12em] uppercase">
                  <p>{data.role || "Digital Systems Designer"}</p>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <a
                    href={normalizeUrl(data.website)}
                    target="_blank"
                    rel="noreferrer"
                    className="social-chip"
                  >
                    <span className="social-chip-icon">
                      <Globe className="size-3" />
                    </span>
                    <span>{data.website}</span>
                  </a>
                  {data.socialLinks.map((link) => (
                    <a
                      key={`${link.label}-${link.url}`}
                      href={normalizeUrl(link.url)}
                      target="_blank"
                      rel="noreferrer"
                      className="social-chip"
                    >
                      <span className="social-chip-icon">
                        {socialBadge(link.label, link.url)}
                      </span>
                      <span>{link.label}</span>
                    </a>
                  ))}
                </div>
              </div>

              <div className="cv-contact-grid grid gap-5 self-start font-mono text-[11px] leading-tight uppercase">
                <div className="relative border-l border-black/25 py-2 pl-5">
                  <p>
                    <b>Phone:</b> <span>{data.phone}</span>
                  </p>
                  <p>
                    <b>Email:</b> <span>{data.email}</span>
                  </p>
                  <p>
                    <b>Location:</b> <span>{data.location}</span>
                  </p>
                </div>
              </div>
            </header>

            {data.summary.trim() ? (
              <section className="cv-section">
                <SectionTitle>Main Ideas</SectionTitle>
                <div className="border-t border-black/18 pt-3 font-mono text-[11px] leading-relaxed">
                  {lines(data.summary).map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </section>
            ) : null}

            <section className="cv-section">
              <SectionTitle>Experience</SectionTitle>
              <div className="cv-timeline relative grid gap-5 pl-36">
                <div className="timeline-line absolute top-2 h-[calc(100%-8px)] w-px bg-black/25" />
                {data.experience.map((item, index) => (
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
                      </h3>
                      {item.title ? (
                        <p className="font-mono text-[11px] uppercase">
                          {item.title}
                        </p>
                      ) : null}
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

            <section className="cv-section">
              <SectionTitle>Projects</SectionTitle>
              <div className="divide-y divide-black/12 border-y border-black/18">
                {data.projects.map((project, index) => (
                  <div
                    key={`${project.name}-${index}`}
                    className="cv-project-row grid gap-3 py-3"
                  >
                    <span className="font-mono text-sm text-[#1f32b7]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="font-mono text-[11px] leading-tight uppercase">
                      <p className="font-bold">{project.name}</p>
                      <p>{project.stack}</p>
                    </div>
                    <p className="border-l border-black/20 pl-4 font-mono text-[11px] leading-tight">
                      {project.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {middleSections.length > 0 ? (
              <div
                className="cv-two-column cv-dynamic-grid grid gap-5"
                data-count={middleSections.length}
              >
                {middleSections.includes("about") ? (
                  <section className="cv-section">
                    <SectionTitle>Additional Info</SectionTitle>
                    <div className="border-t border-black/20 pt-3 font-mono text-[11px] leading-tight">
                      {lines(data.about).map((line) => (
                        <p key={line}>{line}</p>
                      ))}
                    </div>
                  </section>
                ) : null}

                {middleSections.includes("taste") ? (
                  <section className="cv-section">
                    <SectionTitle>Technical & Cultural Taste</SectionTitle>
                    <div className="border-t border-black/20 pt-3 font-mono text-[11px] leading-tight">
                      {lines(data.taste).map((taste) => (
                        <p key={taste}>{taste}</p>
                      ))}
                    </div>
                  </section>
                ) : null}

                {middleSections.includes("inspirations") ? (
                  <section className="cv-section">
                    <SectionTitle>People, Channels & Sources</SectionTitle>
                    <div className="space-y-1 font-mono text-[11px] leading-tight">
                      {lines(data.inspirations).map((line) => (
                        <p key={line}>{line}</p>
                      ))}
                    </div>
                  </section>
                ) : null}

                {middleSections.includes("awards") ? (
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
            ) : null}

            {footerSections.length > 0 ? (
              <footer
                className="cv-footer mt-5 grid gap-4 border-t border-black/18 pt-4"
                data-count={footerSections.length}
              >
                {footerSections.includes("skills") ? (
                  <div className="font-mono text-[11px] leading-tight">
                    <MiniTitle>Key Skills & Tools</MiniTitle>
                    {lines(data.skills).map((skill) => (
                      <p key={skill}>{skill}</p>
                    ))}
                  </div>
                ) : null}

                {footerSections.includes("portfolio") ? (
                  <div className="font-mono text-[10px] leading-tight uppercase">
                    <MiniTitle>Portfolio QR Code</MiniTitle>
                    <PortfolioQrCode value={data.website} />
                    <a
                      href={normalizeUrl(data.website)}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2"
                    >
                      <Link2 className="size-3" />
                      {data.website}
                    </a>
                  </div>
                ) : null}

                {footerSections.includes("education") ? (
                  <div className="font-mono text-[11px] leading-tight">
                    <MiniTitle>Education & Certifications</MiniTitle>
                    {lines(data.education).map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                ) : null}
              </footer>
            ) : null}
          </article>
        </section>
      </div>
    </main>
  )
}

function FormBlock({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="grid gap-3">
      <FormTitle>{title}</FormTitle>
      <div className="grid gap-3 md:grid-cols-2">{children}</div>
    </section>
  )
}

function FormTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-mono text-[11px] tracking-[0.18em] uppercase">
      {children}
    </h2>
  )
}

function TextField({
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

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-3 font-mono text-xs tracking-[0.08em] text-black uppercase">
      {children}
    </h3>
  )
}

function MiniTitle({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="mb-3 flex items-center gap-2 font-mono text-[10px] tracking-[0.1em] uppercase">
      <span className="size-2 bg-[#1f32b7]" />
      {children}
    </h4>
  )
}

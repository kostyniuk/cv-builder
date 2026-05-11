"use client"

import { useMemo, useState } from "react"
import { Download, RotateCcw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"

type CvData = {
  name: string
  role: string
  email: string
  phone: string
  location: string
  website: string
  profile: string
  experience: string
  projects: string
  education: string
  awards: string
  skills: string
}

const initialData: CvData = {
  name: "ben",
  role: "Digital Systems Designer",
  email: "austin@example.com",
  phone: "(12) 335-5799",
  location: "Austin, X United States",
  website: "helloben.designs",
  profile: "online profiles / apexLabs\nonline profiles / designs",
  experience:
    "Neural Dynamics Corp. | Economic job title | Jan 2024 - Present\nLed a team of 5 engineers designing and implementing microservices architecture using Kubernetes and Docker, improving system throughput by 40%.\nIntegrated a complex machine learning model into the core platform, optimizing data processing efficiency by 60%.\nManaged AWS cloud infrastructure deployment for 12+ critical service components.\n\nApex Labs | Realistic Job Title | Mar 2022 - Jan 2024\nContributed to decentralized identity protocol development and microservices architecture operations.\nManaged cybersecurity platforms and scalable service deployments for 60% faster handoffs.\n\nVertex Digital | Realistic job | Aug 2020 - Mar 2022\nBuilt developer tools and internal platform workflows for high-throughput product teams.",
  projects:
    "AI-Powered Market Predictor | Python, TensorFlow | Built a forecasting workflow for real-time data streams and reduced error by 20%.\nDecentralized Data Exchange | Solidity, cryptography | Created a secure data sharing platform with verifiable permissions.\nOptimized Core Transactions | React, Node.js | Refactored processing and optimization work on a high-throughput platform.",
  education:
    "BSc. Computer Science\nUC Berkeley\n\nAWS Certified DevOps Engineer\nKubernetes Certified Administrator",
  awards:
    "Google Developer Expert (AI/ML) 2025\nApex Labs Tech Innovation Award 2025\nApex Labs Tech Innovation Award 2023",
  skills:
    "Languages: Python, Go, Rust, TypeScript\nFrameworks: React, Node.js, TensorFlow, Docker, K8s\nTools: AWS, Git, Figma\nMethodology: Agile, CI/CD",
}

const fieldGroups: Array<{
  title: string
  fields: Array<keyof CvData>
}> = [
  { title: "Identity", fields: ["name", "role", "email", "phone"] },
  { title: "Contact", fields: ["location", "website", "profile"] },
  { title: "Career", fields: ["experience", "projects"] },
  { title: "Signal", fields: ["education", "awards", "skills"] },
]

const labels: Record<keyof CvData, string> = {
  name: "Name",
  role: "Role",
  email: "Email",
  phone: "Phone",
  location: "Location",
  website: "Website",
  profile: "Profile links",
  experience: "Experience",
  projects: "Projects",
  education: "Education",
  awards: "Awards",
  skills: "Skills",
}

function parseBlocks(value: string) {
  return value
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) =>
      block
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
    )
}

function parseRows(value: string) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => [line])
}

function splitLine(value: string, fallback = "") {
  return (
    value
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .at(0) ?? fallback
  )
}

export default function Page() {
  const [data, setData] = useState<CvData>(initialData)

  const experience = useMemo(
    () => parseBlocks(data.experience),
    [data.experience]
  )
  const projects = useMemo(() => parseRows(data.projects), [data.projects])
  const education = useMemo(() => parseBlocks(data.education), [data.education])
  const awards = useMemo(() => parseBlocks(data.awards), [data.awards])
  const skills = useMemo(() => parseBlocks(data.skills), [data.skills])

  function updateField(field: keyof CvData, value: string) {
    setData((current) => ({ ...current, [field]: value }))
  }

  return (
    <main className="cv-app min-h-svh px-4 py-5 text-[#111] sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-[1500px] gap-5 xl:grid-cols-[440px_minmax(0,1fr)]">
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
            {fieldGroups.map((group) => (
              <fieldset key={group.title} className="grid gap-3">
                <legend className="mb-1 font-mono text-[11px] tracking-[0.18em] uppercase">
                  {group.title}
                </legend>
                {group.fields.map((field) => {
                  const multiline = [
                    "profile",
                    "experience",
                    "projects",
                    "education",
                    "awards",
                    "skills",
                  ].includes(field)

                  return (
                    <div key={field} className="grid gap-1.5">
                      <Label
                        htmlFor={field}
                        className="font-mono text-[11px] tracking-[0.12em] text-black/60 uppercase"
                      >
                        {labels[field]}
                      </Label>
                      {multiline ? (
                        <Textarea
                          id={field}
                          value={data[field]}
                          onChange={(event) =>
                            updateField(field, event.target.value)
                          }
                          className="min-h-24 resize-y rounded-none border-black/25 bg-[#fffdf5]/75 font-mono text-xs leading-relaxed focus-visible:ring-[#1f32b7]/25"
                        />
                      ) : (
                        <Input
                          id={field}
                          value={data[field]}
                          onChange={(event) =>
                            updateField(field, event.target.value)
                          }
                          className="rounded-none border-black/25 bg-[#fffdf5]/75 font-mono text-xs focus-visible:ring-[#1f32b7]/25"
                        />
                      )}
                    </div>
                  )
                })}
              </fieldset>
            ))}
          </div>

          <Button
            className="mt-5 w-full rounded-none bg-[#111] font-mono text-xs tracking-[0.16em] text-white uppercase hover:bg-[#1f32b7]"
            onClick={() => window.print()}
          >
            <Download />
            Download PDF
          </Button>
        </section>

        <section className="print-area flex min-w-0 justify-center">
          <article className="cv-sheet relative w-full max-w-[930px] overflow-hidden border border-black/20 bg-[#fbfaf4] p-7 text-[#111] shadow-[0_20px_80px_rgba(12,10,3,0.18)] sm:p-9">
            <div className="corner corner-tl" />
            <div className="corner corner-tr" />
            <div className="corner corner-bl" />
            <div className="corner corner-br" />

            <header className="cv-header grid gap-5 border-b border-black/25 pb-5">
              <div>
                <div className="flex items-center gap-5 font-mono text-[10px] tracking-[0.18em] uppercase">
                  <span className="size-3 bg-[#1f32b7]" />
                  <span>Digital Systems</span>
                  <span>Design Solutions</span>
                </div>
                <div className="mt-3 flex items-end gap-3">
                  <h2 className="cv-name leading-[0.82] font-black tracking-[-0.04em] break-all">
                    {data.name || "ben"}
                  </h2>
                  <span className="mb-3 text-5xl font-light text-black/14">
                    &reg;
                  </span>
                </div>
                <p className="mt-3 font-mono text-xs tracking-[0.12em] uppercase">
                  {data.role || "Digital Systems Designer"}
                </p>
              </div>

              <div className="grid grid-cols-[1fr_54px] gap-5 self-end font-mono text-[11px] leading-tight uppercase">
                <div className="relative border-l border-black/25 py-2 pl-5">
                  <p>
                    <b>Phone:</b> <span>{data.phone}</span>
                  </p>
                  <p>
                    <b>Email:</b> <span>{data.email}</span>
                  </p>
                  <p>
                    <b>Site:</b> <span>{data.website}</span>
                  </p>
                  <p>{data.location}</p>
                  {data.profile.split("\n").map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
                <div className="barcode" aria-hidden="true" />
              </div>
            </header>

            <section className="cv-section">
              <SectionTitle>Experience</SectionTitle>
              <div className="cv-timeline relative grid gap-5 pl-44">
                <div className="absolute top-3 left-32 h-[calc(100%-20px)] w-px bg-black/25" />
                {experience.map((item, index) => {
                  const [
                    company = "Company",
                    detail = "",
                    date = "Present",
                    ...bullets
                  ] = item[0].split("|").map((part) => part.trim())
                  const body = bullets.length ? bullets : item.slice(1)

                  return (
                    <div key={`${company}-${index}`} className="relative block">
                      <div className="absolute -left-44 w-28 font-mono text-[11px]">
                        {date}
                      </div>
                      <div className="timeline-node" />
                      <h3 className="font-mono text-sm font-bold">
                        {company}
                        {detail ? (
                          <span className="font-normal"> | {detail}</span>
                        ) : null}
                      </h3>
                      <ul className="mt-1 list-disc space-y-1 pl-5 font-mono text-[11px] leading-tight">
                        {body.map((line) => (
                          <li key={line}>{line}</li>
                        ))}
                      </ul>
                    </div>
                  )
                })}
              </div>
            </section>

            <section className="cv-section">
              <SectionTitle>Projects</SectionTitle>
              <div className="divide-y divide-black/12 border-y border-black/18">
                {projects.map((project, index) => {
                  const [
                    name = "Project",
                    stack = "Stack",
                    description = splitLine(project.join(" ")),
                  ] = project[0].split("|").map((part) => part.trim())

                  return (
                    <div
                      key={`${name}-${index}`}
                      className="cv-project-row grid gap-3 py-3"
                    >
                      <span className="font-mono text-sm text-[#1f32b7]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div className="font-mono text-[11px] leading-tight uppercase">
                        <p>Project Name:</p>
                        <p className="font-bold">{name}</p>
                        <p>{stack}</p>
                      </div>
                      <p className="border-l border-black/20 pl-4 font-mono text-[11px] leading-tight">
                        {description || project.slice(1).join(" ")}
                      </p>
                    </div>
                  )
                })}
              </div>
            </section>

            <div className="cv-two-column grid gap-5">
              <section className="cv-section">
                <SectionTitle>Award & Recognition</SectionTitle>
                <div className="space-y-1 font-mono text-[11px] leading-tight">
                  {awards.flat().map((award) => (
                    <p key={award}>{award}</p>
                  ))}
                </div>
              </section>

              <section className="cv-section">
                <SectionTitle>Technical & Cultural Taste</SectionTitle>
                <div className="relative h-16 border-t border-black/20">
                  <div className="taste-line" />
                  <div className="taste-node left-[8%]" />
                  <div className="taste-node left-[45%]" />
                  <div className="taste-node left-[84%]" />
                </div>
                <div className="space-y-1 font-mono text-[11px] leading-tight">
                  {skills.flat().map((skill) => (
                    <p key={skill}>{skill}</p>
                  ))}
                </div>
              </section>
            </div>

            <footer className="cv-footer mt-5 grid gap-4 border-t border-black/18 pt-4">
              <div className="font-mono text-[11px] leading-tight">
                <MiniTitle>Education & Certifications</MiniTitle>
                {education.flat().map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
              <div className="font-mono text-[10px] leading-tight uppercase">
                <MiniTitle>Portfolio QR Code</MiniTitle>
                <div className="qr-code mx-auto my-2" aria-hidden="true">
                  <span />
                </div>
                <p>{data.website}</p>
              </div>
              <div className="font-mono text-[11px] leading-tight">
                <MiniTitle>Key Skills & Tools</MiniTitle>
                {skills.flat().map((skill) => (
                  <p key={skill}>{skill}</p>
                ))}
              </div>
              <div className="botanical" aria-hidden="true">
                <div className="flower" />
                <div className="stem" />
                <div className="leaf leaf-a" />
                <div className="leaf leaf-b" />
              </div>
            </footer>

            <div className="mt-4 flex items-center justify-between border-t border-black/12 pt-3 font-mono text-[9px] tracking-[0.12em] text-black/55 uppercase">
              <span>// Archive Log: 05.11.2026 18:24:28 UTC</span>
              <span>Secure &middot; Encrypted &middot; Verified</span>
            </div>
          </article>
        </section>
      </div>
    </main>
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

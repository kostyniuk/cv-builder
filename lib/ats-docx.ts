import {
  AlignmentType,
  Document,
  HeadingLevel,
  LevelFormat,
  LevelSuffix,
  LineRuleType,
  PageOrientation,
  Packer,
  Paragraph,
  TextRun,
} from "docx"

import type { CvData } from "@/lib/cv"

const ATS_BULLET_REFERENCE = "ats-standard-bullet"

const TWIPS = {
  inch: 1440,
  halfInch: 720,
  quarterInch: 360,
} as const

function lines(value: string) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
}

function hasText(value: string) {
  return value.trim().length > 0
}

function sectionHeading(label: string) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    children: [new TextRun(label)],
  })
}

function bodyParagraph(text: string) {
  return new Paragraph({
    style: "AtsBody",
    children: [new TextRun(text)],
  })
}

function labeledParagraph(label: string, value: string, style = "AtsContact") {
  return new Paragraph({
    style,
    children: [
      new TextRun({ text: `${label}: `, bold: true }),
      new TextRun(value.trim()),
    ],
  })
}

function bulletParagraph(text: string) {
  return new Paragraph({
    style: "AtsBullet",
    numbering: {
      reference: ATS_BULLET_REFERENCE,
      level: 0,
    },
    children: [new TextRun(text)],
  })
}

function entryTitle(primary: string, secondary?: string) {
  const children = [new TextRun({ text: primary.trim(), bold: true })]

  if (secondary?.trim()) {
    children.push(new TextRun(` | ${secondary.trim()}`))
  }

  return new Paragraph({
    style: "AtsEntryTitle",
    children,
  })
}

function entryMeta(value: string) {
  return new Paragraph({
    style: "AtsEntryMeta",
    children: [new TextRun(value.trim())],
  })
}

function addContactDetails(children: Paragraph[], data: CvData) {
  const contactDetails: Array<[string, string]> = [
    ["Email", data.email],
    ["Phone", data.phone],
    ["Location", data.location],
    ["Website", data.website],
  ]

  for (const [label, value] of contactDetails) {
    if (hasText(value)) {
      children.push(labeledParagraph(label, value))
    }
  }

  for (const socialLink of data.socialLinks) {
    const socialSource = `${socialLink.label} ${socialLink.url}`.toLowerCase()

    if (hasText(socialLink.url) && !socialSource.includes("instagram")) {
      children.push(
        labeledParagraph(socialLink.label || "Profile", socialLink.url)
      )
    }
  }
}

function addSummary(children: Paragraph[], data: CvData) {
  if (!hasText(data.summary)) {
    return
  }

  children.push(sectionHeading("PROFESSIONAL SUMMARY"))
  children.push(...lines(data.summary).map(bodyParagraph))
}

function addExperience(children: Paragraph[], data: CvData) {
  const experience = data.experience.filter(
    (item) =>
      hasText(item.company) ||
      hasText(item.title) ||
      hasText(item.date) ||
      hasText(item.bullets)
  )

  if (experience.length === 0) {
    return
  }

  children.push(sectionHeading("PROFESSIONAL EXPERIENCE"))

  for (const item of experience) {
    const primary = item.title.trim() || item.company.trim()
    const secondary = item.title.trim() ? item.company : ""

    if (primary) {
      children.push(entryTitle(primary, secondary))
    }

    if (hasText(item.date)) {
      children.push(entryMeta(item.date))
    }

    children.push(...lines(item.bullets).map(bulletParagraph))
  }
}

function addProjects(children: Paragraph[], data: CvData) {
  const projects = data.projects.filter(
    (project) =>
      hasText(project.name) ||
      hasText(project.url) ||
      hasText(project.description)
  )

  if (projects.length === 0) {
    return
  }

  children.push(sectionHeading("PROJECTS"))

  for (const project of projects) {
    if (hasText(project.name) || hasText(project.url)) {
      children.push(
        entryTitle(
          project.name.trim() || "Project",
          hasText(project.url) ? project.url : undefined
        )
      )
    }

    if (hasText(project.description)) {
      children.push(bodyParagraph(project.description.trim()))
    }
  }
}

function addSkills(children: Paragraph[], data: CvData) {
  if (!data.sections.skills || !hasText(data.skills)) {
    return
  }

  children.push(sectionHeading("SKILLS"))
  children.push(...lines(data.skills).map(bulletParagraph))
}

function addEducation(children: Paragraph[], data: CvData) {
  if (!data.sections.education || !hasText(data.education)) {
    return
  }

  children.push(sectionHeading("EDUCATION"))
  children.push(...lines(data.education).map(bodyParagraph))
}

function addAwards(children: Paragraph[], data: CvData) {
  if (!data.sections.awards || !hasText(data.awards)) {
    return
  }

  children.push(sectionHeading("AWARDS"))
  children.push(...lines(data.awards).map(bulletParagraph))
}

function addAdditionalInformation(children: Paragraph[], data: CvData) {
  const includeAbout = data.sections.about && hasText(data.about)
  const includeTaste = data.sections.taste && hasText(data.taste)
  const includeInspirations =
    data.sections.inspirations && hasText(data.inspirations)

  if (!includeAbout && !includeTaste && !includeInspirations) {
    return
  }

  children.push(sectionHeading("ADDITIONAL INFORMATION"))

  if (includeAbout) {
    children.push(...lines(data.about).map(bodyParagraph))
  }

  if (includeTaste) {
    for (const [index, value] of lines(data.taste).entries()) {
      children.push(
        index === 0
          ? labeledParagraph("Technical interests", value, "AtsBody")
          : bodyParagraph(value)
      )
    }
  }

  if (includeInspirations) {
    children.push(
      labeledParagraph(
        "Professional influences",
        lines(data.inspirations).join(", "),
        "AtsBody"
      )
    )
  }
}

export function createAtsDocument(data: CvData) {
  const children: Paragraph[] = [
    new Paragraph({
      style: "AtsName",
      children: [new TextRun(data.name.trim() || "Candidate Name")],
    }),
  ]

  if (hasText(data.role)) {
    children.push(
      new Paragraph({
        style: "AtsRole",
        children: [new TextRun(data.role.trim())],
      })
    )
  }

  addContactDetails(children, data)
  addSummary(children, data)
  addExperience(children, data)
  addProjects(children, data)
  addSkills(children, data)
  addEducation(children, data)
  addAwards(children, data)
  addAdditionalInformation(children, data)

  return new Document({
    creator: data.name.trim() || "LeeHireMe",
    title: `${data.name.trim() || "Candidate"} CV`,
    subject: data.role.trim() || "Professional CV",
    keywords: [data.role, ...lines(data.skills)].filter(Boolean).join(", "),
    description:
      "Single-column CV generated by LeeHireMe for reliable applicant tracking system parsing.",
    styles: {
      default: {
        document: {
          run: {
            font: "Arial",
            size: 22,
            color: "000000",
          },
          paragraph: {
            alignment: AlignmentType.LEFT,
            spacing: {
              before: 0,
              after: 40,
              line: 264,
              lineRule: LineRuleType.AUTO,
            },
          },
        },
        heading1: {
          run: {
            font: "Arial",
            size: 24,
            bold: true,
            color: "000000",
          },
          paragraph: {
            spacing: {
              before: 200,
              after: 80,
              line: 264,
              lineRule: LineRuleType.AUTO,
            },
            keepNext: true,
            keepLines: true,
            outlineLevel: 0,
          },
        },
      },
      paragraphStyles: [
        {
          id: "AtsName",
          name: "ATS Name",
          quickFormat: true,
          run: {
            font: "Arial",
            size: 36,
            bold: true,
            color: "000000",
          },
          paragraph: {
            spacing: {
              before: 0,
              after: 40,
              line: 264,
              lineRule: LineRuleType.AUTO,
            },
            keepNext: true,
            keepLines: true,
          },
        },
        {
          id: "AtsRole",
          name: "ATS Target Role",
          quickFormat: true,
          run: {
            font: "Arial",
            size: 24,
            bold: true,
            color: "000000",
          },
          paragraph: {
            spacing: {
              before: 0,
              after: 80,
              line: 264,
              lineRule: LineRuleType.AUTO,
            },
            keepNext: true,
            keepLines: true,
          },
        },
        {
          id: "AtsContact",
          name: "ATS Contact Detail",
          quickFormat: true,
          run: {
            font: "Arial",
            size: 20,
            color: "000000",
          },
          paragraph: {
            spacing: {
              before: 0,
              after: 20,
              line: 252,
              lineRule: LineRuleType.AUTO,
            },
            keepLines: true,
          },
        },
        {
          id: "AtsBody",
          name: "ATS Body",
          quickFormat: true,
          run: {
            font: "Arial",
            size: 22,
            color: "000000",
          },
          paragraph: {
            spacing: {
              before: 0,
              after: 60,
              line: 264,
              lineRule: LineRuleType.AUTO,
            },
          },
        },
        {
          id: "AtsEntryTitle",
          name: "ATS Entry Title",
          quickFormat: true,
          run: {
            font: "Arial",
            size: 22,
            color: "000000",
          },
          paragraph: {
            spacing: {
              before: 80,
              after: 20,
              line: 264,
              lineRule: LineRuleType.AUTO,
            },
            keepNext: true,
            keepLines: true,
          },
        },
        {
          id: "AtsEntryMeta",
          name: "ATS Entry Date",
          quickFormat: true,
          run: {
            font: "Arial",
            size: 20,
            italics: true,
            color: "000000",
          },
          paragraph: {
            spacing: {
              before: 0,
              after: 40,
              line: 252,
              lineRule: LineRuleType.AUTO,
            },
            keepNext: true,
            keepLines: true,
          },
        },
        {
          id: "AtsBullet",
          name: "ATS Standard Bullet",
          quickFormat: true,
          run: {
            font: "Arial",
            size: 22,
            color: "000000",
          },
          paragraph: {
            spacing: {
              before: 0,
              after: 40,
              line: 264,
              lineRule: LineRuleType.AUTO,
            },
          },
        },
      ],
    },
    numbering: {
      config: [
        {
          reference: ATS_BULLET_REFERENCE,
          levels: [
            {
              level: 0,
              format: LevelFormat.BULLET,
              text: "•",
              alignment: AlignmentType.LEFT,
              suffix: LevelSuffix.SPACE,
              style: {
                run: {
                  font: "Arial",
                  size: 22,
                },
                paragraph: {
                  indent: {
                    left: TWIPS.halfInch,
                    hanging: TWIPS.quarterInch,
                  },
                  spacing: {
                    before: 0,
                    after: 40,
                    line: 264,
                    lineRule: LineRuleType.AUTO,
                  },
                },
              },
            },
          ],
        },
      ],
    },
    sections: [
      {
        properties: {
          page: {
            size: {
              width: 12240,
              height: 15840,
              orientation: PageOrientation.PORTRAIT,
            },
            margin: {
              top: TWIPS.inch,
              right: TWIPS.inch,
              bottom: TWIPS.inch,
              left: TWIPS.inch,
              header: 708,
              footer: 708,
              gutter: 0,
            },
          },
        },
        children,
      },
    ],
  })
}

export function getAtsDocxFilename(name: string) {
  const safeName = name
    .trim()
    .replace(/[<>:"/\\|?*\u0000-\u001F]/g, "")
    .replace(/\s+/g, "_")
    .replace(/[. ]+$/g, "")

  return `CV_${safeName || "Candidate"}_ATS.docx`
}

export async function downloadAtsDocx(data: CvData) {
  const blob = await Packer.toBlob(createAtsDocument(data))
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")

  link.href = url
  link.download = getAtsDocxFilename(data.name)
  link.style.display = "none"
  document.body.appendChild(link)
  link.click()
  link.remove()

  window.setTimeout(() => URL.revokeObjectURL(url), 1_000)
}

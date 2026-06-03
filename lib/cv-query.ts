import { parseAsJson } from "nuqs"

import {
  initialData,
  type CvData,
  type ExperienceItem,
  type ProjectItem,
  type SectionKey,
  type SocialLink,
} from "@/lib/cv"

const sectionKeys = Object.keys(initialData.sections) as SectionKey[]

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function readString(value: unknown, fallback: string) {
  return typeof value === "string" ? value : fallback
}

function readSocialLinks(value: unknown, fallback: SocialLink[]): SocialLink[] {
  if (!Array.isArray(value)) {
    return fallback
  }

  return value.map((item, index) => {
    const fallbackItem = fallback[index] ?? {
      label: "Profile",
      url: "https://",
    }

    if (!isRecord(item)) {
      return fallbackItem
    }

    return {
      label: readString(item.label, fallbackItem.label),
      url: readString(item.url, fallbackItem.url),
    }
  })
}

function readExperience(
  value: unknown,
  fallback: ExperienceItem[]
): ExperienceItem[] {
  if (!Array.isArray(value)) {
    return fallback
  }

  return value.map((item, index) => {
    const fallbackItem = fallback[index] ?? {
      company: "New Company",
      title: "Role title",
      date: "2026 - Present",
      bullets: "Describe one measurable contribution.",
    }

    if (!isRecord(item)) {
      return fallbackItem
    }

    return {
      company: readString(item.company, fallbackItem.company),
      title: readString(item.title, fallbackItem.title),
      date: readString(item.date, fallbackItem.date),
      bullets: readString(item.bullets, fallbackItem.bullets),
    }
  })
}

function readProjects(value: unknown, fallback: ProjectItem[]): ProjectItem[] {
  if (!Array.isArray(value)) {
    return fallback
  }

  return value.map((item, index) => {
    const fallbackItem = fallback[index] ?? {
      name: "New Project",
      url: "https://",
      stack: "Tools, stack",
      description: "Short impact-focused project description.",
    }

    if (!isRecord(item)) {
      return fallbackItem
    }

    return {
      name: readString(item.name, fallbackItem.name),
      url: readString(item.url, fallbackItem.url),
      stack: readString(item.stack, fallbackItem.stack),
      description: readString(item.description, fallbackItem.description),
    }
  })
}

function readSections(value: unknown): CvData["sections"] {
  const source = isRecord(value) ? value : {}

  return sectionKeys.reduce<CvData["sections"]>(
    (sections, key) => {
      sections[key] =
        typeof source[key] === "boolean"
          ? source[key]
          : initialData.sections[key]
      return sections
    },
    {} as CvData["sections"]
  )
}

function parseCvData(value: unknown): CvData | null {
  if (!isRecord(value)) {
    return null
  }

  return {
    name: readString(value.name, initialData.name),
    nameFontSize: readString(value.nameFontSize, initialData.nameFontSize),
    role: readString(value.role, initialData.role),
    email: readString(value.email, initialData.email),
    phone: readString(value.phone, initialData.phone),
    location: readString(value.location, initialData.location),
    website: readString(value.website, initialData.website),
    summary: readString(value.summary, initialData.summary),
    about: readString(value.about, initialData.about),
    socialLinks: readSocialLinks(value.socialLinks, initialData.socialLinks),
    experience: readExperience(value.experience, initialData.experience),
    projects: readProjects(value.projects, initialData.projects),
    education: readString(value.education, initialData.education),
    awards: readString(value.awards, initialData.awards),
    skills: readString(value.skills, initialData.skills),
    taste: readString(value.taste, initialData.taste),
    inspirations: readString(value.inspirations, initialData.inspirations),
    sections: readSections(value.sections),
  }
}

export const cvDataParser = parseAsJson<CvData>(parseCvData)

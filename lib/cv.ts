export type ExperienceItem = {
  company: string
  title: string
  date: string
  bullets: string
}

export type ProjectItem = {
  name: string
  url: string
  stack: string
  description: string
}

export type SocialLink = {
  label: string
  url: string
}

export type SectionKey =
  | "about"
  | "awards"
  | "taste"
  | "inspirations"
  | "education"
  | "portfolio"
  | "skills"

export const backgroundLogoSizes = ["sm", "md", "lg", "xl", "2xl"] as const

export type BackgroundLogoSize = (typeof backgroundLogoSizes)[number]

export type CvData = {
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
  backgroundSvg: string
  backgroundLogoSize: BackgroundLogoSize
  sections: Record<SectionKey, boolean>
}

export const blankExperience: ExperienceItem = {
  company: "New Company",
  title: "Role title",
  date: "2026 - Present",
  bullets: "Describe one measurable contribution.",
}

export const blankProject: ProjectItem = {
  name: "New Project",
  url: "https://",
  stack: "Tools, stack",
  description: "Short impact-focused project description.",
}

export const initialData: CvData = {
  name: "Alex Kostyniuk",
  nameFontSize: "4.7",
  role: "Software Engineer | Team Lead @ AMFG",
  email: "alexandru.costiniuc00@gmail.com",
  phone: "",
  location: "Stockholm, Sweden",
  website: "a13x.space",
  summary:
    "Software Engineer focused on solving customer problems. When I was a child I wanted to become a footballer, that was my passion and a goal. I still love football, but building things is my passion too, now. I love helping people and work in teams when we can achieve big goals together. Really like Agentic Workflows with AI. Love to build great architectures. When I was a teen, I thought that I would be a backend engineer because frontend is easy and not interesting, now I enjoy both, but frontend is ♥︎. I'm also active on Twitter if you like my tweets we can be friends 😅.",
  about:
    "I like to create beautiful UIs, like to dress well, and like NBA and football. I'm a big dog lover - have one myself, named Theo. I used to run and a lot, and had run a half-marathon back in the day. I love rap festivals, I was at Rolling Loud and others, saw Travis Scott, Playboi Carti and some more, planning on visiting more. Trying to be happy and make people around me happy too.",
  socialLinks: [
    { label: "LinkedIn", url: "https://www.linkedin.com/in/kostyniuk" },
    { label: "X / Twitter", url: "https://x.com/kostyniuk00" },
    { label: "GitHub", url: "https://github.com/kostyniuk" },
    { label: "Instagram", url: "https://www.instagram.com/costiniuc00" },
  ],
  experience: [
    {
      company: "AMFG",
      title: "Team Lead",
      date: "May 2025 - Present",
      bullets:
        "Leading architecture and delivery across frontend modernization, backend platform work, performance improvements, and team-wide developer experience initiatives while managing a team of 2-3 engineers.\nLed migration from Kendo to shadcn/ui and Tailwind CSS, improving iteration speed & developer experience.\nBuilt a 3D model similarity engine using cosine similarity, vector embeddings, and pgvector in PostgreSQL.",
    },
    {
      company: "AMFG",
      title: "Senior Fullstack Software Engineer",
      date: "May 2023 - April 2025",
      bullets:
        "Led team-wide adoption of AI-assisted engineering workflows, frontend modernization.\nDeveloped a sandboxed scripting environment for customer Python and JavaScript action automations.\nConducted 50+ engineering interviews and helped shape team growth and hiring standards.",
    },
    {
      company: "AMFG",
      title: "Middle Fullstack Software Engineer",
      date: "December 2021 - May 2023",
      bullets:
        "Built a custom Gantt timeline with drag-and-drop task management, zoom levels, real-time sync, and conflict detection.\nWorked on a large workflow automation system supporting event triggers and 10+ follow-up actions across email, push, and status changes.",
    },
    {
      company: "AMFG",
      title: "Junior Fullstack Software Engineer",
      date: "October 2020 - November 2021",
      bullets:
        "Adjusting to full-time engineering work while balancing university and building communication skills.",
    },
  ],
  projects: [
    {
      name: "GlassCN",
      url: "https://glasscn-components.vercel.app/",
      stack: "shadcn/ui, glassmorphism, component library",
      description:
        "A library of Apple-like glass components for shadcn/ui, with 20+ glass-styled primitives, 5 glass effect variants for dark and light themes, clear surfaces, and SVG-based physical refraction for realistic light bending through thick glass.",
    },
    {
      name: "Mellow Lines",
      url: "https://mellowlines.dev",
      stack: "Canvas, Shiki, FFmpeg WASM",
      description:
        "A code animation studio that turns code snippets into cinematic videos entirely in the browser.",
    },
    {
      name: "Mellow fmt",
      url: "https://mellowfmt.vercel.app",
      stack: "Tanstack Start, formatting tool",
      description:
        "An interactive playground for exploring and comparing Prettier and Oxfmt formatting options.",
    },
    {
      name: "Alex Posts",
      url: "https://alex-posts.netlify.app/",
      stack: "Technical writing",
      description:
        "A technical blog with deep dives into database internals, React mechanics, and JavaScript tooling.",
    },
  ],
  education:
    "National Technical University of Ukraine “Igor Sikorsky Kyiv Polytechnic Institute”\nFaculty of Informatics and Computer Engineering\nBachelor Degree, Computer Engineering, 2017 - 2021",
  awards: "",
  skills:
    "Languages: TypeScript, JavaScript, SQL\nFrontend: React, all Tanstack, Next.js, Tailwind CSS, shadcn/ui\nBackend: Node.js, Bun, PostgreSQL\nTooling: oxc",
  taste:
    "TypeScript, Next.js, Bun, Vercel, TanStack, Drizzle, shadcn, OpenAI, T3 Code",
  inspirations:
    "Theo\nTanner Linsley\nGuillermo Rauch\nLee Robinson\nRyo Lu\nPauline P. Narvas\nOrcDev\nshadcn\nOpenAI\nCursor\nVercel\nPlanetscale\nLovable",
  backgroundSvg: "",
  backgroundLogoSize: "md",
  sections: {
    about: true,
    awards: false,
    taste: true,
    inspirations: true,
    education: true,
    portfolio: true,
    skills: true,
  },
}

export const sectionLabels: Record<SectionKey, string> = {
  about: "Additional Info",
  awards: "Awards",
  taste: "Taste",
  inspirations: "People & Sources",
  education: "Education",
  portfolio: "QR",
  skills: "Skills",
}

export function lines(value: string) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
}

export function parseNameFontSize(value: string) {
  const parsed = Number.parseFloat(value)
  return Number.isFinite(parsed) ? parsed : 2.85
}

export function socialBadge(label: string, url: string) {
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

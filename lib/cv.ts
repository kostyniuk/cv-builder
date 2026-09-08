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
  stars: string
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
  stars: "",
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
    "Software Engineer focused on solving customer problems. Six years at AMFG, from Junior to Team Lead, building the automation, scheduling, and integration surfaces behind a platform used by 100+ manufacturers and machine shops. I love helping people and work in teams when we can achieve big goals together. Really like Agentic Workflows with AI and building great architectures. When I was a teen, I thought that I would be a backend engineer because frontend is easy and not interesting, now I enjoy both, but frontend is ♥︎. I'm also active on tech side of Twitter if you like my tweets we can be friends 😅.",
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
        "Leading architecture across frontend, backend, and performance for a product built by 15+ engineers, and directly managing a team of 4.\n3D model similarity search: designed and built the engine that surfaces previously quoted models with similar geometry, after estimators flagged manual geometry analysis as a top time sink - cut an estimate from 15-20 minutes to about a minute; embeddings indexed with pgvector, tuned for recall vs latency.\nPublic API and MCP server: shipped the integration surface that lets customers and their AI agents drive AMFG workflows programmatically, replacing in-app data export - scoped the first endpoints with customers directly, then expanded the API release by release as their integrations grew.\nFrontend replatform: led the Kendo to shadcn/ui and Tailwind CSS migration component by component so releases never froze, trading a rigid third-party library for primitives we own and iterate on freely.\nCI pipeline: cut test suite runtime 5x, 20 min to 4, by reworking how tests provision and isolate database state - the bottleneck was per-test setup, not the tests.\nTooling: replaced Prettier with oxfmt and ESLint with oxlint, cutting format and lint in CI 30x.",
    },
    {
      company: "AMFG",
      title: "Fullstack Software Engineer (Junior to Senior)",
      date: "October 2020 - April 2025",
      bullets:
        "Customer scripting runtime: built the sandboxed environment running customer-authored Python and JavaScript, solving isolation and resource limits for untrusted multi-tenant code - unlocked chained sequences of 10+ actions the fixed trigger system could not express.\nWorkflow automation: built the event-trigger system supporting 10+ follow-up action types across email, push, and status changes, generalising recurring customer requests into rules they configure themselves.\nScheduling Gantt: built the custom drag-and-drop timeline that schedules 10,000+ builds a month as most customers' primary production tool, replacing manual scheduling - the hard part was reconciling concurrent edits from multiple planners without losing work.\nDrove team-wide adoption of AI-assisted workflows and ran 50+ interviews shaping hiring standards.",
    },
  ],
  projects: [
    {
      name: "GlassCN",
      url: "https://glasscn-components.vercel.app/",
      stack: "shadcn/ui, glassmorphism, component library",
      description:
        "A library of Apple-like glass components for shadcn/ui, with 20+ glass-styled primitives, 5 glass effect variants for dark and light themes, clear surfaces, and SVG-based physical refraction for realistic light bending through thick glass.",
      stars: "74",
    },
    {
      name: "Mellow Lines",
      url: "https://mellowlines.dev",
      stack: "Canvas, Shiki, FFmpeg WASM",
      description:
        "A code animation studio that turns code snippets into cinematic videos entirely in the browser.",
      stars: "20",
    },
    {
      name: "Mellow fmt",
      url: "https://mellowfmt.vercel.app",
      stack: "Tanstack Start, formatting tool",
      description:
        "An interactive playground for exploring and comparing Prettier and Oxfmt formatting options.",
      stars: "3",
    },
    {
      name: "Alex Posts",
      url: "https://alex-posts.netlify.app/",
      stack: "Technical writing",
      description:
        "A technical blog with deep dives into database internals, React mechanics, and JavaScript tooling.",
      stars: "",
    },
  ],
  education:
    "National Technical University of Ukraine “Igor Sikorsky Kyiv Polytechnic Institute”\nFaculty of Informatics and Computer Engineering\nBachelor Degree, Computer Engineering, 2017 - 2021",
  awards: "",
  skills:
    "Languages: TypeScript, JavaScript, SQL\nFrontend: React, all TanStack, Next.js, Tailwind CSS, shadcn/ui\nBackend: Node.js, Bun, PostgreSQL, MySQL, Redis\nTooling: oxc, Vite, Vitest",
  taste:
    "TypeScript, Next.js, Bun, Vercel, TanStack, Drizzle, shadcn, OpenAI, T3 Code",
  inspirations:
    "Theo\nTanner Linsley\nGuillermo Rauch\nLee Robinson\nRyo Lu\nPauline P. Narvas\nshadcn\nOpenAI\nSpaceX\nLovable",
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

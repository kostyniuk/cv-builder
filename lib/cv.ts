export type ExperienceItem = {
  company: string;
  title: string;
  date: string;
  bullets: string;
};

export type ProjectItem = {
  name: string;
  stack: string;
  description: string;
};

export type SocialLink = {
  label: string;
  url: string;
};

export type SectionKey =
  | "about"
  | "awards"
  | "taste"
  | "inspirations"
  | "education"
  | "portfolio"
  | "skills";

export type CvData = {
  name: string;
  nameFontSize: string;
  role: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  summary: string;
  about: string;
  socialLinks: SocialLink[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
  education: string;
  awards: string;
  skills: string;
  taste: string;
  inspirations: string;
  sections: Record<SectionKey, boolean>;
};

export const blankExperience: ExperienceItem = {
  company: "New Company",
  title: "Role title",
  date: "2026 - Present",
  bullets: "Describe one measurable contribution.",
};

export const blankProject: ProjectItem = {
  name: "New Project",
  stack: "Tools, stack",
  description: "Short impact-focused project description.",
};

export const initialData: CvData = {
  name: "Alex Kostyniuk",
  nameFontSize: "4.7",
  role: "Team Lead @ AMFG",
  email: "alexandru.costiniuc00@gmail.com",
  phone: "",
  location: "Stockholm, Sweden",
  website: "a13x.space",
  summary:
    "Team Lead and fullstack engineer focused on frontend modernization, backend platform work, performance improvements, and developer experience. I care about shipping durable systems that reduce complexity, improve iteration speed, and make teams more effective.",
  about:
    "Strong bias toward shipping and simplifying systems. Interested in AI-assisted engineering workflows, UI architecture, internal platform improvements, and practical automation that removes friction for both teams and customers.",
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
        "Leading architecture and delivery across frontend modernization, backend platform work, performance improvements, and team-wide developer experience initiatives while managing a team of 2-3 engineers.\nLed migration from Kendo to shadcn/ui and Tailwind CSS, improving iteration speed, developer experience, and UI consistency.\nBuilt a 3D model similarity engine using cosine similarity, vector embeddings, and pgvector in PostgreSQL.",
    },
    {
      company: "AMFG",
      title: "Senior Fullstack Software Engineer",
      date: "May 2023 - April 2025",
      bullets:
        "Led team-wide adoption of AI-assisted engineering workflows, frontend modernization, and internal platform initiatives.\nArchitected a sandboxed scripting environment for customer Python and JavaScript automation against the platform API.\nConducted 50+ engineering interviews and helped shape team growth and hiring standards.",
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
        "Started full-time engineering career while balancing with university. Building core collaboration skills.",
    },
  ],
  projects: [
    {
      name: "Mellow Lines",
      stack: "TypeScript, Canvas, Shiki, FFmpeg WASM",
      description:
        "A code animation studio that turns code snippets into cinematic videos entirely in the browser.",
    },
    {
      name: "Mellow fmt",
      stack: "Next.js, TypeScript, formatting tooling",
      description:
        "An interactive playground for exploring and comparing Prettier and Oxfmt formatting options.",
    },
    {
      name: "Alex Posts",
      stack: "Technical writing, PostgreSQL, React, JavaScript",
      description:
        "A technical blog with deep dives into database internals, React mechanics, and JavaScript tooling.",
    },
  ],
  education:
    "National Technical University of Ukraine “Igor Sikorsky Kyiv Polytechnic Institute”\nFaculty of Informatics and Computer Engineering\nBachelor Degree, Computer Engineering, 2017 - 2021",
  awards: "",
  skills:
    "Languages: TypeScript, JavaScript, SQL, Python\nFrontend: React, Next.js, Tailwind CSS, shadcn/ui, Angular migration\nBackend: Node.js, PostgreSQL, pgvector, sandboxed scripting\nTooling: Bun, pnpm, oxlint, oxfmt, ESLint, Prettier\nPlatform: Vercel, AWS",
  taste:
    "React, TypeScript, Next.js, PostgreSQL, Bun, Vercel, TanStack, Drizzle, shadcn/ui, Tailwind CSS, AI-assisted engineering",
  inspirations: "OpenAI\nAnthropic\nshadcn\nNext.js\nTanStack Start\nMellow software interfaces",
  sections: {
    about: true,
    awards: false,
    taste: true,
    inspirations: true,
    education: true,
    portfolio: true,
    skills: true,
  },
};

export const sectionLabels: Record<SectionKey, string> = {
  about: "Additional Info",
  awards: "Awards",
  taste: "Taste",
  inspirations: "People & Sources",
  education: "Education",
  portfolio: "QR",
  skills: "Skills",
};

export function lines(value: string) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export function parseNameFontSize(value: string) {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 2.85;
}

export function socialBadge(label: string, url: string) {
  const source = `${label} ${url}`.toLowerCase();

  if (source.includes("linkedin")) {
    return "in";
  }

  if (source.includes("github") || source.includes("gitlab") || source.includes("bitbucket")) {
    return "gh";
  }

  if (source.includes("twitter") || source.includes("x.com") || source.includes("x /")) {
    return "x";
  }

  const compact = label.replace(/[^a-z0-9]/gi, "").slice(0, 2);
  return compact ? compact.toLowerCase() : "ln";
}

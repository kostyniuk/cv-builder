export type ExperienceItem = {
  company: string
  title: string
  date: string
  bullets: string
}

export type ProjectItem = {
  name: string
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
  stack: "Tools, stack",
  description: "Short impact-focused project description.",
}

export const initialData: CvData = {
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

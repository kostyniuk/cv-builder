export const aiCvPrompt = `You are helping me turn an existing CV, resume, LinkedIn profile, portfolio, or raw career notes into a finished one-page CV URL for LeeHireMe.

Goal:
Analyze the information I provide, rewrite it into the exact CV data structure below, then generate a URL that opens the CV directly with the data inside the "cv" query parameter.

Output requirements:
1. Ask at most 3 short clarification questions only if critical information is missing. Otherwise proceed.
2. Return exactly two things:
   - A short note listing any assumptions you made.
   - The final URL.
3. The final URL must be a complete URL in this format:
   https://www.leehireme.xyz/?cv=<encoded-json>
4. Build <encoded-json> by running encodeURIComponent(JSON.stringify(cvData)).
5. Do not wrap the final URL in markdown code fences.
6. Do not invent employers, degrees, dates, links, or metrics. You may improve wording, grouping, and clarity.
7. Keep the CV concise enough for a one-page layout.

Data structure:
{
  "name": "Full name",
  "nameFontSize": "4.7",
  "role": "Current or target role",
  "email": "email@example.com",
  "phone": "",
  "location": "City, Country",
  "website": "personal-site.com",
  "summary": "Short, human, specific profile paragraph. 3-6 sentences max.",
  "about": "Optional additional personal or professional context. Use newline-separated points if helpful.",
  "socialLinks": [
    { "label": "LinkedIn", "url": "https://www.linkedin.com/in/example" },
    { "label": "GitHub", "url": "https://github.com/example" }
  ],
  "experience": [
    {
      "company": "Company name",
      "title": "Role title",
      "date": "Month YYYY - Month YYYY or Present",
      "bullets": "One achievement per line. Use newline characters between bullets."
    }
  ],
  "projects": [
    {
      "name": "Project name",
      "url": "https://project-url.com",
      "stack": "Main tools, technologies, or domain",
      "description": "One short impact-focused description."
    }
  ],
  "education": "Institution\\nProgram or degree\\nDates or notes",
  "awards": "Award or recognition per line",
  "skills": "Category: skill, skill, skill\\nCategory: skill, skill, skill",
  "taste": "Tools, technologies, products, or ideas the person likes, comma-separated",
  "inspirations": "People, companies, communities, or sources of inspiration, one per line",
  "sections": {
    "about": true,
    "awards": false,
    "taste": true,
    "inspirations": true,
    "education": true,
    "portfolio": true,
    "skills": true
  }
}

Field guidance:
- name: Use the person's real full name. If the name is long, lower nameFontSize to "3.5" or "4.0"; otherwise use "4.7".
- role: Make this compact and specific, for example "Frontend Engineer", "Product Engineer", or "Engineering Manager".
- summary: Make it sound like a real person, not corporate boilerplate. Include strengths, domain, and working style.
- about: Use only if it adds memorable signal. It can include interests, collaboration style, side interests, or personal context.
- socialLinks: Include only links that are present or strongly implied. Prefer LinkedIn, GitHub, portfolio, X/Twitter, personal site.
- experience: Put newest roles first. Merge weak or very old roles if needed. Keep 2-4 bullets per role. Prefer measurable achievements and concrete scope.
- projects: Include 0-4 strongest projects. Prefer shipped, inspectable, or technically distinctive projects.
- education: Preserve exact institution and degree when available.
- awards: Leave empty and set sections.awards to false if no awards exist.
- skills: Group skills by category. Keep it scannable.
- taste: Use this as a culture-fit signal: tools, frameworks, products, engineering taste, communities, or creative preferences.
- inspirations: Use only real names/sources from the provided information, or leave empty if unknown.
- sections: Set a section to false when its corresponding field is empty or weak. Set portfolio to true if website, GitHub, or project links exist.

URL generation example:
const cvData = { ...the completed object... };
const finalUrl = "https://www.leehireme.xyz/?cv=" + encodeURIComponent(JSON.stringify(cvData));

Small generated URL example:
https://www.leehireme.xyz/?cv=%7B%22name%22%3A%22Alex%20Kostyniuk%22%2C%22nameFontSize%22%3A%224.7%22%2C%22role%22%3A%22Product%20Engineer%22%2C%22email%22%3A%22alex%40example.com%22%2C%22phone%22%3A%22%22%2C%22location%22%3A%22Stockholm%2C%20Sweden%22%2C%22website%22%3A%22a13x.space%22%2C%22summary%22%3A%22Product%20engineer%20focused%20on%20useful%2C%20polished%20software.%22%2C%22about%22%3A%22%22%2C%22socialLinks%22%3A%5B%7B%22label%22%3A%22GitHub%22%2C%22url%22%3A%22https%3A%2F%2Fgithub.com%2Fkostyniuk%22%7D%5D%2C%22experience%22%3A%5B%7B%22company%22%3A%22AMFG%22%2C%22title%22%3A%22Team%20Lead%22%2C%22date%22%3A%22May%202025%20-%20Present%22%2C%22bullets%22%3A%22Led%20frontend%20modernization.%5CnImproved%20developer%20workflows.%22%7D%5D%2C%22projects%22%3A%5B%7B%22name%22%3A%22LeeHireMe%22%2C%22url%22%3A%22https%3A%2F%2Fwww.leehireme.xyz%2F%22%2C%22stack%22%3A%22Next.js%2C%20Tailwind%20CSS%22%2C%22description%22%3A%22A%20one-page%20CV%20builder%20driven%20by%20URL%20data.%22%7D%5D%2C%22education%22%3A%22%22%2C%22awards%22%3A%22%22%2C%22skills%22%3A%22Frontend%3A%20React%2C%20Next.js%2C%20Tailwind%20CSS%5CnBackend%3A%20Node.js%2C%20PostgreSQL%22%2C%22taste%22%3A%22TypeScript%2C%20shadcn%2Fui%2C%20Vercel%22%2C%22inspirations%22%3A%22%22%2C%22sections%22%3A%7B%22about%22%3Afalse%2C%22awards%22%3Afalse%2C%22taste%22%3Atrue%2C%22inspirations%22%3Afalse%2C%22education%22%3Afalse%2C%22portfolio%22%3Atrue%2C%22skills%22%3Atrue%7D%7D

Now analyze the CV or information I provide and generate the final URL.`

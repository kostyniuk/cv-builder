import { Link2 } from "lucide-react"

import { PortfolioQrCode } from "@/components/portfolio-qr-code"
import { lines, type CvData } from "@/lib/cv"
import { normalizeUrl } from "@/lib/url"

import { MiniTitle } from "./form-primitives"

type FooterSectionKey = "skills" | "portfolio" | "education"

export function FooterSections({
  sections,
  data,
}: {
  sections: FooterSectionKey[]
  data: CvData
}) {
  if (sections.length === 0) {
    return null
  }

  return (
    <footer
      className="cv-footer mt-5 grid gap-4 border-t border-black/18 pt-4"
      data-count={sections.length}
    >
      {sections.includes("skills") ? (
        <div className="font-mono text-[11px] leading-tight">
          <MiniTitle>Key Skills & Tools</MiniTitle>
          {lines(data.skills).map((skill) => (
            <p key={skill}>{skill}</p>
          ))}
        </div>
      ) : null}

      {sections.includes("portfolio") ? (
        <div className="font-mono text-[10px] leading-tight uppercase">
          <MiniTitle>Portfolio QR Code</MiniTitle>
          <div className="portfolio-qr-block">
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
        </div>
      ) : null}

      {sections.includes("education") ? (
        <div className="font-mono text-[11px] leading-tight">
          <MiniTitle>Education & Certifications</MiniTitle>
          {lines(data.education).map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      ) : null}
    </footer>
  )
}

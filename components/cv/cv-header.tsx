import { Globe } from "lucide-react"

import { normalizeUrl } from "@/lib/url"
import {
  parseNameFontSize,
  socialBadge,
  type CvData,
} from "@/lib/cv"

type CvHeaderProps = {
  data: CvData
}

export function CvHeader({ data }: CvHeaderProps) {
  return (
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
          {data.website.trim() ? (
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
          ) : null}
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
  )
}

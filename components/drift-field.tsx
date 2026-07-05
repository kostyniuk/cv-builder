import type { CSSProperties } from "react"

export const driftFieldSizes = {
  sm: { logo: 44, tile: 112 },
  md: { logo: 64, tile: 152 },
  lg: { logo: 92, tile: 208 },
  xl: { logo: 132, tile: 288 },
  "2xl": { logo: 176, tile: 368 },
} as const

export type DriftFieldSize = keyof typeof driftFieldSizes

export type DriftFieldProps = {
  svg: string
  size?: DriftFieldSize
  opacity?: number
  className?: string
  style?: CSSProperties
}

function normalizeSvgInput(svg: string) {
  const source = svg.trim()

  if (source.toLowerCase().includes("<svg")) {
    return source
  }

  try {
    const decoded = decodeURIComponent(source.replace(/\+/g, " "))

    return decoded.toLowerCase().includes("<svg") ? decoded : ""
  } catch {
    return ""
  }
}

function prepareSvg(svg: string) {
  const source = normalizeSvgInput(svg)

  if (!source) {
    return ""
  }

  return source
    .replace(/\s+[a-zA-Z][\w:-]*=\{[^}]*\}/g, "")
    .replace(/\sclassName=(["'])/g, " class=$1")
    .replace(/<\?xml[\s\S]*?\?>/i, "")
    .trim()
    .replace(
      /<svg\b(?![^>]*\bxmlns=)/i,
      '<svg xmlns="http://www.w3.org/2000/svg"'
    )
}

function toSvgDataUrl(svg: string) {
  const preparedSvg = prepareSvg(svg)

  if (!preparedSvg) {
    return ""
  }

  return `data:image/svg+xml,${encodeURIComponent(preparedSvg)}`
}

export function DriftField({
  svg,
  size = "md",
  opacity = 0.08,
  className,
  style,
}: DriftFieldProps) {
  const { logo, tile } = driftFieldSizes[size] ?? driftFieldSizes.md
  const src = toSvgDataUrl(svg)

  if (!src) {
    return null
  }

  const css = {
    position: "absolute",
    inset: 0,
    display: "grid",
    gridTemplateColumns: `repeat(auto-fill, ${tile}px)`,
    gridAutoRows: `${tile}px`,
    justifyContent: "start",
    alignContent: "start",
    overflow: "hidden",
    opacity,
    pointerEvents: "none",
    ...style,
  } as CSSProperties

  return (
    <div aria-hidden className={className} style={css}>
      {Array.from({ length: 180 }).map((_, index) => (
        <span
          key={index}
          style={{
            display: "grid",
            width: tile,
            height: tile,
            placeItems: "center",
          }}
        >
          <img
            alt=""
            draggable={false}
            src={src}
            style={{
              display: "block",
              width: logo,
              height: logo,
              objectFit: "contain",
            }}
          />
        </span>
      ))}
    </div>
  )
}

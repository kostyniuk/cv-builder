import type { CSSProperties } from "react"

export const driftFieldSizes = {
  sm: 76,
  md: 112,
  lg: 156,
  xl: 220,
} as const

export type DriftFieldSize = keyof typeof driftFieldSizes

export type DriftFieldProps = {
  svg: string
  size?: DriftFieldSize
  color?: string
  opacity?: number
  position?: string
  repeat?: CSSProperties["backgroundRepeat"]
  className?: string
  style?: CSSProperties
}

function toMonochromeSvg(svg: string, color: string) {
  const source = svg.trim()

  if (!source.toLowerCase().includes("<svg")) {
    return ""
  }

  const withoutXml = source.replace(/<\?xml[\s\S]*?\?>/i, "").trim()
  const withNamespace = withoutXml.replace(
    /<svg\b(?![^>]*\bxmlns=)/i,
    '<svg xmlns="http://www.w3.org/2000/svg"'
  )
  const style = `<style>:where(path,rect,circle,ellipse,line,polyline,polygon,text){fill:${color}!important;stroke:${color}!important}:where([fill="none"]){fill:none!important}:where([stroke="none"]){stroke:none!important}</style>`

  return withNamespace.replace(/<svg\b([^>]*)>/i, `<svg$1>${style}`)
}

function toSvgDataUrl(svg: string, color: string) {
  const monochromeSvg = toMonochromeSvg(svg, color)

  if (!monochromeSvg) {
    return ""
  }

  return `data:image/svg+xml,${encodeURIComponent(monochromeSvg)}`
}

export function DriftField({
  svg,
  size = "md",
  color = "#111111",
  opacity = 0.055,
  position = "0 0",
  repeat = "repeat",
  className,
  style,
}: DriftFieldProps) {
  const tile = driftFieldSizes[size] ?? driftFieldSizes.md
  const src = toSvgDataUrl(svg, color)

  if (!src) {
    return null
  }

  const css = {
    position: "absolute",
    inset: 0,
    backgroundImage: `url("${src}")`,
    backgroundPosition: position,
    backgroundRepeat: repeat,
    backgroundSize: `${tile}px ${tile}px`,
    opacity,
    pointerEvents: "none",
    ...style,
  } as CSSProperties

  return <div aria-hidden className={className} style={css} />
}

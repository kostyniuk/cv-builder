import type { CSSProperties } from "react"

export type DriftFieldProps = {
  /**
   * Tile image (any URL — any SVG or raster image). Use a SQUARE asset; bake
   * transparent padding into it if you want a visible gap between tiles — in CSS
   * tiling, the image fills its whole cell, so the gap has to live inside the artwork.
   */
  src: string
  /** Cell size in px. This is BOTH the rendered tile size and the loop period. */
  tile?: number
  /** Drift speed in px per second (resolution/refresh-independent). */
  speed?: number
  /**
   * Whole-tile steps `[x, y]` — the drift direction/angle. MUST be integers:
   * the keyframe travels `step * tile` px, and only whole multiples of the tile
   * keep the loop seamless. `[1,1]` = 45°, `[2,1]` = gentle, `[1,2]` = steep.
   */
  steps?: [number, number]
  /** Color painted behind the tiles. */
  background?: string
  className?: string
  style?: CSSProperties
}

export function DriftField({
  src,
  tile = 22,
  speed = 14,
  steps = [2, 1],
  background = "#0a0a0b",
  className,
  style,
}: DriftFieldProps) {
  const tx = Math.round(steps[0]) * tile // integer × tile → seamless in X
  const ty = Math.round(steps[1]) * tile // integer × tile → seamless in Y
  const duration = Math.hypot(tx, ty) / Math.max(speed, 0.01)

  const css = {
    position: "absolute",
    inset: 0,
    backgroundColor: background,
    backgroundImage: `url("${src}")`,
    backgroundRepeat: "repeat",
    backgroundSize: `${tile}px ${tile}px`,
    animation: `drift-bg ${duration}s linear infinite`,
    willChange: "background-position",
    "--drift-tx": `${tx}px`,
    "--drift-ty": `${ty}px`,
    ...style,
  } as CSSProperties

  return <div aria-hidden className={className} style={css} />
}

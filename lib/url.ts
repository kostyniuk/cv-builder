export function normalizeUrl(value: string) {
  if (!value.trim()) {
    return "#"
  }

  return /^https?:\/\//i.test(value) ? value : `https://${value}`
}

"use client"

import { useEffect, useState } from "react"
import QRCode from "qrcode"

import { normalizeUrl } from "@/lib/url"

type PortfolioQrCodeProps = {
  value: string
}

export function PortfolioQrCode({ value }: PortfolioQrCodeProps) {
  const [qrCode, setQrCode] = useState("")

  useEffect(() => {
    let active = true

    QRCode.toDataURL(normalizeUrl(value), {
      color: {
        dark: "#111111",
        light: "#fbfaf4",
      },
      errorCorrectionLevel: "M",
      margin: 1,
      scale: 5,
    }).then((url) => {
      if (active) {
        setQrCode(url)
      }
    })

    return () => {
      active = false
    }
  }, [value])

  return (
    <a
      href={normalizeUrl(value)}
      className="portfolio-qr block"
      aria-label={`Open portfolio ${value}`}
    >
      {qrCode ? <img src={qrCode} alt="" /> : <span />}
    </a>
  )
}

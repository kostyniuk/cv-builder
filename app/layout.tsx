import type { Metadata } from "next"
import { Geist_Mono, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { NuqsAdapter } from "nuqs/adapters/next/app"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

const SITE_URL =
  process.env.NEXT_PUBLIC_APP_URL?.trim() || "http://localhost:3000"

const SITE_TITLE = "LeeHireMe"
const SITE_DESCRIPTION =
  "A print-friendly CV and resume builder with live editing, section controls, and browser PDF export."

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "LeeHireMe",
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_TITLE}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "cv builder",
    "resume builder",
    "one-page resume",
    "pdf resume",
    "next.js",
  ],
  authors: [{ name: "Alex Kostyniuk" }],
  creator: "Alex Kostyniuk",
  publisher: "Alex Kostyniuk",
  icons: {
    icon: [{ url: "/logo-tranparent.svg", type: "image/svg+xml" }],
    shortcut: "/logo-tranparent.svg",
    apple: "/logo-tranparent.svg",
  },
  openGraph: {
    type: "website",
    siteName: SITE_TITLE,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    images: [
      {
        url: "/social-card.png",
        width: 1200,
        height: 630,
        alt: "LeeHireMe social preview card",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/social-card.png"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        inter.variable
      )}
    >
      <body>
        <NuqsAdapter>
          <ThemeProvider>{children}</ThemeProvider>
        </NuqsAdapter>
        <Analytics />
      </body>
    </html>
  )
}

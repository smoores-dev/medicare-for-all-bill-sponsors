import { Analytics } from "@vercel/analytics/react"
import { Inter } from "next/font/google"

import { ReactNode } from "react"
import { ColorSchemeScript } from "@mantine/core"
import { AppShell } from "@/components/AppShell"

import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

interface Props {
  children: ReactNode
}

export default async function Layout({ children }: Props) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        <link
          rel="icon"
          type="image/png"
          href="/favicon-192x192.png"
          sizes="192x192"
        />
        <link
          rel="icon"
          type="image/png"
          href="/favicon-512x512.png"
          sizes="512x512"
        />
        <link rel="manifest" href="/icons/site.webmanifest" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <ColorSchemeScript />
      </head>
      <body className="overflow-x-hidden" suppressHydrationWarning>
        <AppShell>{children}</AppShell>
        <Analytics />
      </body>
    </html>
  )
}

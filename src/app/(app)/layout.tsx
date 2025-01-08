import { Analytics } from "@vercel/analytics/react"
import { Metadata } from "next"
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
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="manifest" href="/icons/site.webmanifest" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <ColorSchemeScript />
      </head>
      <body className="overflow-x-hidden bg-canvas" suppressHydrationWarning>
        <AppShell>{children}</AppShell>
        <Analytics />
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  title: "Support Medicare For All",
}

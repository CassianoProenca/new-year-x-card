import type React from "react"
import type { Metadata } from "next"
import { Cormorant_Garamond, Geist } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-serif",
})

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Feliz Ano Novo 2026 | Cartão Corporativo",
  description: "Cartão de Ano Novo",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${cormorant.variable} ${geist.variable}`}>
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}



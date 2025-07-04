import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { LanguageProvider } from "./contexts/LanguageContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "LegalConsult BD - Expert Legal Services in Bangladesh",
  description:
    "Professional legal services in Bangladesh. Company registration, tax law, family law, property law and more. Get expert help in 30 minutes.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}

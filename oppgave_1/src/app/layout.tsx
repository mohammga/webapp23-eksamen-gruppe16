import "./globals.css"

import type { Metadata } from "next"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Oppgave 1 - Webapplikasjoner eksamen 2023",
  description: "En oppgave i webapplikasjoner eksamen 2023",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="no">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

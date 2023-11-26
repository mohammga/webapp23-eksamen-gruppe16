import "./globals.css"

import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Header from "@/components/navigation/Navigation"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Eksamen H23 - Oppgave 2",
  description: "Eksamen H23 - Oppgave 2",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Header />
        {children}
      </body>
    </html>
  )
}

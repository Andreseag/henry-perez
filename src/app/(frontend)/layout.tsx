import type { Metadata } from 'next'
import { Montserrat, Anton } from 'next/font/google'
import React from 'react'
import './styles.css'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import SmoothScroll from '../components/layout/SmoothScroll'
import { ScrollToTop } from '../components/layout/ScrollToTop'

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
})

const anton = Anton({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-heading',
})

export const metadata: Metadata = {
  title: 'Henry Pérez',
  description:
    'Una trayectoria construida desde el territorio, el servicio y el compromiso con nuestra gente.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${montserrat.variable} ${anton.variable}`}>
      <body className={montserrat.className}>
        <ScrollToTop />
        <SmoothScroll>
          <Header />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  )
}

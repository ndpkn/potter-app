import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header/Header'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Harry Potter',
  description: 'Harry Potter info datebase',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <header>
          <Header/>
        </header>
        <main className='p-5 flex justify-center'>
          {children}
        </main>
      </body>
    </html>
  )
}

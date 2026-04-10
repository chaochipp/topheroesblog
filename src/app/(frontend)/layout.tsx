import React from 'react'
import './styles.css'

export const metadata = {
  description: 'A simple blog powered by Payload CMS and Cloudflare.',
  title: 'Top Heroes Blog',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}

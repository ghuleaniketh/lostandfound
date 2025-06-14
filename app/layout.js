import './globals.css'

export const metadata = {
  title: 'Lost and Found App',
  description: 'Find your lost items or report found items',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}

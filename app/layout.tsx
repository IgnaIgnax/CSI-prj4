import './globals.css'

export const metadata = {
  title: 'BloodBytes',
  description: 'Blood tests and personalized nutritional advice',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
} 
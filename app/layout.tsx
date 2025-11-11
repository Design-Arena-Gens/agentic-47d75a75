import './globals.css'

export const metadata = {
  title: 'Fruit Cannibalism - AI Stop Motion Animation',
  description: 'Hyperrealistic 3D rendered fruit creatures in grotesque stop-motion sequences',
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

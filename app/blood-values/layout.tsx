export default function BloodValuesLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-red-50/50 to-white">
        <div className="container mx-auto py-6">
          {children}
        </div>
      </div>
    )
  }
  
  
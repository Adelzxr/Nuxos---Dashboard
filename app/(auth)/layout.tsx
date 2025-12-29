export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Animated background decorations */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-violet-500/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px]" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 grid-pattern opacity-30" />
        
        {/* Floating particles effect */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-violet-500/50 rounded-full float" style={{ animationDelay: '0s' }} />
        <div className="absolute top-40 right-40 w-3 h-3 bg-blue-500/50 rounded-full float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-40 left-1/3 w-2 h-2 bg-purple-500/50 rounded-full float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 right-1/4 w-2 h-2 bg-cyan-500/50 rounded-full float" style={{ animationDelay: '0.5s' }} />
      </div>
      
      {children}
    </div>
  )
}


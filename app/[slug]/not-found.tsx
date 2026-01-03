import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-vibe-dark flex items-center justify-center px-4">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 text-center">
        <div className="mb-8">
          <span className="text-9xl">😕</span>
        </div>
        
        <h1 className="text-6xl font-bold mb-4 bg-gradient-vibe bg-clip-text text-transparent">
          404
        </h1>
        
        <h2 className="text-3xl font-bold text-white mb-4">
          Campaign Not Found
        </h2>
        
        <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
          Oops! The bio link page you're looking for doesn't exist or has been removed.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-vibe text-white font-bold rounded-lg hover:opacity-90 active:scale-95 transition-all duration-200"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  )
          }

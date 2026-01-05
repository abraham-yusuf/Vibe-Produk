'use client'

import Sidebar from '@/components/Sidebar'

interface AdminLayoutClientProps {
  children: React.ReactNode
  user: {
    email?: string
    user_metadata?: {
      avatar_url?: string
      full_name?: string
    }
  }
}

export default function AdminLayoutClient({ children, user }: AdminLayoutClientProps) {
  return (
    <div className="flex min-h-screen bg-vibe-dark">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-float" />
      </div>

      <Sidebar user={user} />
      
      <main className="flex-1 relative z-10 p-4 lg:p-8 transition-all duration-300">
        {/* Add padding-left for desktop when sidebar is visible */}
        <div className="lg:ml-64 max-w-7xl mx-auto pt-16 lg:pt-0">
          {children}
        </div>
      </main>
    </div>
  )
}
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FiHome, FiPackage, FiBarChart2, FiSettings, FiLogOut } from 'react-icons/fi'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

interface SidebarProps {
  user: {
    email?: string
    user_metadata?: {
      avatar_url?: string
      full_name?: string
    }
  }
}

export default function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  const navItems = [
    { icon: FiHome, label: 'Dashboard', href: '/dashboard' },
    { icon: FiBarChart2, label: 'Campaigns', href: '/campaigns' },
    { icon: FiPackage, label: 'Products', href: '/products' },
    { icon: FiSettings, label: 'Settings', href: '/settings' },
  ]

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-vibe-darker/50 backdrop-blur-xl border-r border-white/10 z-50">
      <div className="flex flex-col h-full p-6">
        {/* Logo */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold bg-gradient-vibe bg-clip-text text-transparent">
            Vibe Produk ID
          </h1>
          <p className="text-xs text-gray-500 mt-1">Affiliate Bio Links</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* User Profile */}
        <div className="pt-6 border-t border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-vibe flex items-center justify-center text-white font-bold">
              {user.email?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {user.user_metadata?.full_name || 'User'}
              </p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>
          </div>
          
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-red-500/10 hover:border-red-500/20 border border-transparent transition-all duration-200"
          >
            <FiLogOut className="w-5 h-5" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </div>
    </aside>
  )
}
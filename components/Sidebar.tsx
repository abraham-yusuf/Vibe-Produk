'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FiHome, FiPackage, FiBarChart2, FiSettings, FiLogOut, FiMenu, FiX } from 'react-icons/fi'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

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
  const [isOpen, setIsOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('menu-open')
    } else {
      document.body.classList.remove('menu-open')
    }
    return () => document.body.classList.remove('menu-open')
  }, [isOpen])

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [])

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
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden p-3 bg-vibe-darker/90 backdrop-blur-xl border border-white/10 rounded-lg text-white hover:bg-white/10 transition-all duration-200"
      >
        {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
      </button>

      {/* Desktop Collapse Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="hidden lg:block fixed top-4 left-4 z-50 p-3 bg-vibe-darker/90 backdrop-blur-xl border border-white/10 rounded-lg text-white hover:bg-white/10 transition-all duration-200"
        style={{ left: isCollapsed ? '4px' : '256px' }}
      >
        <FiMenu className="w-5 h-5" />
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 h-screen bg-vibe-darker/50 backdrop-blur-xl border-r border-white/10 z-50
          transition-all duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${isCollapsed ? 'lg:w-20' : 'lg:w-64'}
          w-64
        `}
      >
        <div className="flex flex-col h-full p-6">
          {/* Logo */}
          <div className="mb-8 overflow-hidden">
            <h1
              className={`
                text-2xl font-bold bg-gradient-vibe bg-clip-text text-transparent
                transition-all duration-300
                ${isCollapsed ? 'lg:text-center lg:text-xl' : ''}
              `}
            >
              {isCollapsed ? (
                <span className="hidden lg:block">VP</span>
              ) : (
                'Vibe Produk ID'
              )}
            </h1>
            <p
              className={`
                text-xs text-gray-500 mt-1 transition-all duration-300
                ${isCollapsed ? 'lg:opacity-0 lg:h-0' : 'opacity-100'}
              `}
            >
              Affiliate Bio Links
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                    ${isActive
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }
                    ${isCollapsed ? 'lg:justify-center' : ''}
                  `}
                  title={isCollapsed ? item.label : undefined}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  <span
                    className={`
                      font-medium transition-all duration-300
                      ${isCollapsed ? 'lg:hidden' : ''}
                    `}
                  >
                    {item.label}
                  </span>
                </Link>
              )
            })}
          </nav>

          {/* User Profile */}
          <div className="pt-6 border-t border-white/10">
            <div
              className={`
                flex items-center gap-3 mb-4 transition-all duration-300
                ${isCollapsed ? 'lg:flex-col lg:gap-2' : ''}
              `}
            >
              <div className="w-10 h-10 rounded-full bg-gradient-vibe flex items-center justify-center text-white font-bold flex-shrink-0">
                {user.email?.charAt(0).toUpperCase()}
              </div>
              <div
                className={`
                  flex-1 min-w-0 transition-all duration-300
                  ${isCollapsed ? 'lg:hidden' : ''}
                `}
              >
                <p className="text-sm font-medium text-white truncate">
                  {user.user_metadata?.full_name || 'User'}
                </p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
            </div>
            
            <button
              onClick={handleSignOut}
              className={`
                flex items-center gap-3 w-full px-4 py-3 rounded-lg text-gray-400 
                hover:text-white hover:bg-red-500/10 hover:border-red-500/20 
                border border-transparent transition-all duration-200
                ${isCollapsed ? 'lg:justify-center' : ''}
              `}
              title={isCollapsed ? 'Sign Out' : undefined}
            >
              <FiLogOut className="w-5 h-5 flex-shrink-0" />
              <span
                className={`
                  font-medium transition-all duration-300
                  ${isCollapsed ? 'lg:hidden' : ''}
                `}
              >
                Sign Out
              </span>
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}
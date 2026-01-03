import { ReactNode } from 'react'

interface GlassCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
}

export default function GlassCard({ children, className = '', hover = false }: GlassCardProps) {
  return (
    <div
      className={`
        bg-white/5 backdrop-blur-md 
        border border-white/10 
        rounded-xl 
        shadow-xl
        ${hover ? 'transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:scale-[1.02]' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  )
}

import ResetPasswordForm from '@/components/auth/ResetPasswordForm'
import Link from 'next/link'

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-vibe-dark flex items-center justify-center px-4">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h1 className="text-4xl font-bold bg-gradient-vibe bg-clip-text text-transparent mb-2">
              Vibe Produk ID
            </h1>
          </Link>
          <p className="text-gray-400">Create a new password</p>
        </div>

        {/* Reset Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">Reset Password</h2>
            <p className="text-gray-400 text-sm">
              Enter your new password below.
            </p>
          </div>

          <ResetPasswordForm />
        </div>
      </div>
    </div>
  )
      }

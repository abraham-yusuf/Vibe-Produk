import Link from 'next/link'
import { FiZap, FiTrendingUp, FiTarget, FiBarChart } from 'react-icons/fi'

export default function HomePage() {
  const features = [
    {
      icon: FiZap,
      title: 'Lightning Fast',
      description: 'Bio links yang load dengan cepat untuk conversion maksimal',
      color: 'purple',
    },
    {
      icon: FiTrendingUp,
      title: 'Advanced Tracking',
      description: 'TikTok Pixel, Meta Pixel, dan GTM terintegrasi otomatis',
      color: 'pink',
    },
    {
      icon: FiTarget,
      title: 'A/B Testing',
      description: 'Test berbagai CTA untuk meningkatkan click-through rate',
      color: 'orange',
    },
    {
      icon: FiBarChart,
      title: 'Real-time Analytics',
      description: 'Monitor performa produk dan platform secara real-time',
      color: 'blue',
    },
  ]

  return (
    <div className="min-h-screen bg-vibe-dark relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-float" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Logo/Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full mb-8 animate-fade-in">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm text-gray-400">Trusted by 1000+ Affiliates</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-fade-in">
              Bio Link untuk
              <br />
              <span className="bg-gradient-vibe bg-clip-text text-transparent animate-pulse-slow">
                Affiliate Marketer
              </span>
            </h1>

            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto animate-fade-in">
              Platform bio link terbaik dengan tracking pixel advanced, A/B testing, dan analytics real-time untuk maximize income dari TikTok & Shopee affiliate.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
              <Link
                href="/dashboard"
                className="px-8 py-4 bg-gradient-vibe text-white font-bold rounded-lg hover:opacity-90 active:scale-95 transition-all duration-200 shadow-xl shadow-purple-500/20"
              >
                Get Started Free
              </Link>
              <Link
                href="#features"
                className="px-8 py-4 bg-white/5 backdrop-blur-md border border-white/10 text-white font-bold rounded-lg hover:bg-white/10 hover:border-white/20 active:scale-95 transition-all duration-200"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4">
              Semua yang Kamu Butuhkan
            </h2>
            <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
              Tools lengkap untuk scale affiliate marketing kamu ke level berikutnya
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon
                const colorClasses = {
                  purple: 'bg-purple-500/20 text-purple-400 border-purple-500/20',
                  pink: 'bg-pink-500/20 text-pink-400 border-pink-500/20',
                  orange: 'bg-orange-500/20 text-orange-400 border-orange-500/20',
                  blue: 'bg-blue-500/20 text-blue-400 border-blue-500/20',
                }

                return (
                  <div
                    key={index}
                    className="p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
                  >
                    <div className={`w-12 h-12 rounded-lg ${colorClasses[feature.color as keyof typeof colorClasses]} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {feature.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-4 border-t border-white/10">
          <div className="max-w-6xl mx-auto text-center">
            <h3 className="text-2xl font-bold bg-gradient-vibe bg-clip-text text-transparent mb-2">
              Vibe Produk ID
            </h3>
            <p className="text-gray-500 text-sm">
              © 2026 Vibe Produk ID. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
                             }

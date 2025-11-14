"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export function HomePage() {
  const router = useRouter()
  const [user, setUser] = useState<{ id?: number; email?: string } | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true);
        
        // Cookie-based token will be sent automatically when credentials: 'include' is set
        const res = await fetch(`${API_BASE}/auth/me`, {
          credentials: 'include',
        })

        if (!res.ok) {
          router.push('/')
          return
        }

        const data = await res.json().catch(() => ({}))
        
        if (data && data.user) {
          setUser(data.user);
          setIsLoading(false);
        } else {
          router.push('/');
        }
      } catch (e) {
        router.push('/')
      }
    }

    checkAuth()
  }, [router, API_BASE])

  const handleLogout = async () => {
    try {
      await fetch(`${API_BASE}/auth/logout`, { method: 'POST', credentials: 'include' })
    } catch (e) {
      // Logout failed, but user should still be redirected
      console.error('Logout error:', e)
    }
    router.push('/')
  }

  if (isLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-4"
        style={{
          backgroundImage: "url('/beautiful-nature-landscape-forest-mountains-clouds.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative">
          <div className="bg-blue-900/50 backdrop-blur-md border border-white/30 rounded-3xl p-6 lg:p-8 shadow-2xl">
            <h2 className="text-white text-2xl lg:text-3xl font-bold mb-2">Checking authentication...</h2>
            <p className="text-white/80 mb-6 text-sm lg:text-base">Please wait while we verify your login.</p>
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span className="text-white/80 text-sm lg:text-base">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: "url('/beautiful-nature-landscape-forest-mountains-clouds.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute inset-0 bg-black/30"></div>

      <div className="relative w-full max-w-4xl">
        {/* Header with Logout */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Welcome Card */}
        <div className="bg-blue-900/50 backdrop-blur-md border border-white/30 rounded-3xl p-6 lg:p-8 shadow-2xl">
          <h2 className="text-white text-2xl lg:text-3xl font-bold mb-2">Welcome back!</h2>
          <p className="text-white/80 mb-6 text-sm lg:text-base">You are successfully logged in.</p>

          {user && (
            <>
              <div className="text-white/90 mb-6 text-sm lg:text-base">
                <strong>Email:</strong> {user.email}
              </div>
              <div className="text-white/90 mb-6 text-sm lg:text-base">
                <strong>User ID:</strong> {user.id}
              </div>
            </>
          )}

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            <div className="bg-white/10 backdrop-blur-md border border-white/30 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-2">🔐 Secure Auth</h3>
              <p className="text-white/80 text-sm">
                JWT tokens with httpOnly cookies for maximum security.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/30 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-2">⚡ Fast & Modern</h3>
              <p className="text-white/80 text-sm">
                Built with Next.js and React for optimal performance.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/30 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-2">🎨 Beautiful UI</h3>
              <p className="text-white/80 text-sm">
                Modern design with Tailwind CSS and responsive layout.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-8">
            <button
              onClick={() => alert('Profile management coming soon!')}
              className="px-4 py-2.5 lg:py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors"
            >
              Manage Profile
            </button>
            <button
              onClick={() => alert('Settings coming soon!')}
              className="px-4 py-2.5 lg:py-3 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors"
            >
              Settings
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-white/60">
          <p className="text-sm">
            Protected route • Authenticated with JWT • Powered by Next.js
          </p>
        </div>
      </div>
    </div>
  )
}
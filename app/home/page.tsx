"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()
  const [user, setUser] = useState<{ id?: number; email?: string } | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

  useEffect(() => {
    const check = async () => {
      try {
        setIsLoading(true);
        
        console.log('Checking authentication at:', `${API_BASE}/api/me`);
        console.log('Current cookies:', document.cookie);
        
        // Cookie-based token will be sent automatically when credentials: 'include' is set
        const res = await fetch(`${API_BASE}/api/me`, {
          credentials: 'include',
        })

        console.log('Auth check response status:', res.status);
        console.log('Auth check response headers:', Object.fromEntries(res.headers.entries()));

        if (!res.ok) {
          console.log('Auth check failed, redirecting to login');
          router.push('/')
          return
        }

        const data = await res.json().catch(() => ({}))
        console.log('Auth check response data:', data);
        
        if (data && data.user) {
          console.log('User authenticated:', data.user);
          setUser(data.user);
          setIsLoading(false);
        } else {
          console.log('No user data in response, redirecting to login');
          router.push('/');
        }
      } catch (e) {
        console.error('Auth check error:', e);
        router.push('/')
      }
    }

    check()
  }, [router])

  function handleLogout() {
    const doLogout = async () => {
      try {
  await fetch(`${API_BASE}/api/logout`, { method: 'POST', credentials: 'include' })
      } catch (e) {
        // Logout failed, but user should still be redirected to handle client-side state
      }
      router.push('/')
    }
    doLogout()
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

      <div className="relative w-full max-w-3xl grid grid-cols-1 gap-8 items-center">
        <div className="w-full lg:col-span-2 mx-auto">
          <div className="bg-blue-900/50 backdrop-blur-md border border-white/30 rounded-3xl p-8 shadow-2xl">
            {isLoading ? (
              <>
                <h2 className="text-white text-3xl font-bold mb-2">Checking authentication...</h2>
                <p className="text-white/80 mb-6">Please wait while we verify your login.</p>
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span className="text-white/80">Loading...</span>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-white text-3xl font-bold mb-2">Welcome back</h2>
                <p className="text-white/80 mb-6">You are logged in.</p>

                {user ? (
                  <div className="text-white/90 mb-6">Logged in as <strong>{user.email}</strong></div>
                ) : null}

                <div className="flex gap-3">
                  <button
                    onClick={handleLogout}
                    className="px-4 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg"
                  >
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

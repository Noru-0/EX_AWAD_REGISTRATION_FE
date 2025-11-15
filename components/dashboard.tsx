"use client"

import { useAuth, useLogout } from '@/hooks/use-auth'
import { ProtectedRoute } from './protected-route'

export function Dashboard() {
  const { user, isLoading } = useAuth()
  const logoutMutation = useLogout()

  const handleLogout = () => {
    logoutMutation.mutate()
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
            <h2 className="text-white text-2xl lg:text-3xl font-bold mb-2">Loading dashboard...</h2>
            <p className="text-white/80 mb-6 text-sm lg:text-base">Please wait while we load your information.</p>
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
    <ProtectedRoute>
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
              disabled={logoutMutation.isPending}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 disabled:bg-red-500/50 text-white font-semibold rounded-lg transition-colors flex items-center space-x-2"
            >
              {logoutMutation.isPending ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Signing out...</span>
                </>
              ) : (
                <span>Logout</span>
              )}
            </button>
          </div>

          {/* Main Dashboard Content */}
          <div className="bg-white/10 backdrop-blur-md border border-white/30 rounded-3xl p-6 lg:p-8 shadow-2xl">
            <div className="text-center mb-8">
              <h2 className="text-white text-2xl lg:text-3xl font-bold mb-4">
                Welcome back{user?.email ? `, ${user.email.split('@')[0]}` : ''}!
              </h2>
              <p className="text-white/80 text-sm lg:text-base">
                You have successfully signed in to your account.
              </p>
            </div>

            {/* User Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/5 border border-white/20 rounded-2xl p-6">
                <h3 className="text-white text-lg font-semibold mb-4">Account Information</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-white/60 text-sm">Email:</span>
                    <p className="text-white font-medium">{user?.email || 'N/A'}</p>
                  </div>
                  <div>
                    <span className="text-white/60 text-sm">User ID:</span>
                    <p className="text-white font-medium">{user?.id || 'N/A'}</p>
                  </div>
                  <div>
                    <span className="text-white/60 text-sm">Account Created:</span>
                    <p className="text-white font-medium">
                      {user?.created_at 
                        ? new Date(user.created_at).toLocaleDateString()
                        : 'N/A'
                      }
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/20 rounded-2xl p-6">
                <h3 className="text-white text-lg font-semibold mb-4">Session Information</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-white/60 text-sm">Authentication:</span>
                    <p className="text-white font-medium">✅ Authenticated</p>
                  </div>
                  <div>
                    <span className="text-white/60 text-sm">Token Storage:</span>
                    <p className="text-white font-medium">Memory + localStorage</p>
                  </div>
                  <div>
                    <span className="text-white/60 text-sm">Auto Refresh:</span>
                    <p className="text-white font-medium">✅ Enabled</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="mt-8">
              <h3 className="text-white text-lg font-semibold mb-4">Features Implemented</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-green-500/20 border border-green-500/50 rounded-xl p-4">
                  <p className="text-green-300 font-medium">✅ JWT Authentication</p>
                  <p className="text-green-200/80 text-sm">Access + Refresh tokens</p>
                </div>
                <div className="bg-green-500/20 border border-green-500/50 rounded-xl p-4">
                  <p className="text-green-300 font-medium">✅ Token Storage</p>
                  <p className="text-green-200/80 text-sm">Memory + localStorage</p>
                </div>
                <div className="bg-green-500/20 border border-green-500/50 rounded-xl p-4">
                  <p className="text-green-300 font-medium">✅ Auto Refresh</p>
                  <p className="text-green-200/80 text-sm">Automatic token refresh</p>
                </div>
                <div className="bg-green-500/20 border border-green-500/50 rounded-xl p-4">
                  <p className="text-green-300 font-medium">✅ Protected Routes</p>
                  <p className="text-green-200/80 text-sm">Route-based protection</p>
                </div>
                <div className="bg-green-500/20 border border-green-500/50 rounded-xl p-4">
                  <p className="text-green-300 font-medium">✅ React Query</p>
                  <p className="text-green-200/80 text-sm">API state management</p>
                </div>
                <div className="bg-green-500/20 border border-green-500/50 rounded-xl p-4">
                  <p className="text-green-300 font-medium">✅ Form Validation</p>
                  <p className="text-green-200/80 text-sm">React Hook Form</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}

// For backward compatibility
export function HomePage() {
  return <Dashboard />
}
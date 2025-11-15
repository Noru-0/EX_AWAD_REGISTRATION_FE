"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function Home() {
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  const router = useRouter()
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'
  const API_BASE = baseUrl.endsWith('/api') ? baseUrl : `${baseUrl}/api`

  useEffect(() => {
    let isCancelled = false;
    
    const checkAuth = async () => {
      try {
        const res = await fetch(`${API_BASE}/auth/me`, {
          credentials: 'include',
        })
        
        if (isCancelled) return; // Prevent redirect if component unmounted
        
        if (res.ok) {
          // User is already logged in, redirect to dashboard
          router.push('/home')
          return
        }
      } catch (error) {
        if (isCancelled) return;
        // Not authenticated, stay on landing page
      } finally {
        if (!isCancelled) {
          setIsCheckingAuth(false)
        }
      }
    }

    checkAuth()
    
    return () => {
      isCancelled = true;
    };
  }, [API_BASE, router])

  // Show loading while checking authentication
  if (isCheckingAuth) {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-4"
        style={{
          backgroundImage: "url('/beautiful-nature-landscape-forest-mountains-clouds.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative">
          <div className="bg-blue-900/50 backdrop-blur-md border border-white/30 rounded-3xl p-6 lg:p-8 shadow-2xl">
            <h2 className="text-white text-2xl lg:text-3xl font-bold mb-2">Checking authentication...</h2>
            <p className="text-white/80 mb-6 text-sm lg:text-base">Please wait while we verify your login status.</p>
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
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-black/30"></div>
      
      <div className="relative max-w-md w-full sm:max-w-lg">
        <Card className="bg-white/10 backdrop-blur-md border border-white/30 text-white">
          <CardHeader className="text-center px-4 sm:px-6">
            <CardTitle className="text-2xl sm:text-3xl font-bold mb-2">
              Welcome to Registration App
            </CardTitle>
            <CardDescription className="text-white/80 text-sm sm:text-base">
              A secure user registration and authentication system
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4 px-4 sm:px-6">
            <div className="text-center space-y-4">
              <p className="text-white/90 text-sm sm:text-base">
                Get started by logging in to your account or creating a new one.
              </p>
              
              <div className="flex flex-col gap-3">
                <Link href="/login">
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    size="lg"
                  >
                    Login to Your Account
                  </Button>
                </Link>
                
                <Link href="/register">
                  <Button 
                    variant="outline" 
                    className="w-full border-white/30 text-black hover:bg-white/10"
                    size="lg"
                  >
                    Create New Account
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="pt-4 border-t border-white/20">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center text-xs sm:text-sm text-white/70">
                <div className="sm:border-r border-white/20 pb-2 sm:pb-0">
                  <div className="font-semibold">Secure</div>
                  <div>Password hashing</div>
                </div>
                <div className="sm:border-r border-white/20 pb-2 sm:pb-0">
                  <div className="font-semibold">Fast</div>
                  <div>React + Next.js</div>
                </div>
                <div>
                  <div className="font-semibold">Modern</div>
                  <div>Latest UI/UX</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

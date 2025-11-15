"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, LogIn, ChevronLeft, ChevronRight } from "lucide-react"
import { useLogin } from "@/hooks/use-auth"
import { authStorage } from "@/lib/auth-storage"

const carouselImages = [
  "/mountain-sunset-vista.png",
  "/tropical-beach-palms.png", 
  "/forest-waterfall-nature.jpg",
  "/desert-sand-dunes-sunset.jpg",
  "/snowy-mountain-peaks.png",
]

type FormValues = { 
  email: string; 
  password: string 
}

export function NewLoginPage({ onSwitch }: { onSwitch?: (page: 'login' | 'register') => void }) {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>()
  const [showPassword, setShowPassword] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  const router = useRouter()
  const loginMutation = useLogin()


  // Check if user is already authenticated
  useEffect(() => {
    const checkAuth = () => {
      try {
        const accessToken = authStorage.getAccessToken();
        
        if (accessToken) {
          // User is already logged in, redirect to home
          router.push('/home')
          return
        }
      } catch (error) {
        // Not authenticated, continue to login page
      } finally {
        setIsCheckingAuth(false)
      }
    }

    checkAuth()
  }, [router])

  const onSubmit = (data: FormValues) => {
    loginMutation.mutate(data);
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length)
  }

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

      <div className="relative w-full max-w-6xl lg:max-w-7xl grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-8 items-center px-4 lg:px-0">
        {/* Left Card - Image Carousel (Larger) */}
        <div className="hidden lg:block lg:col-span-3">
          <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-3xl p-6 lg:p-8 shadow-2xl overflow-hidden">
            {/* Carousel Container */}
            <div className="relative w-full h-80 lg:h-96 rounded-2xl overflow-hidden mb-4">
              <img
                src={carouselImages[currentImageIndex] || "/placeholder.svg"}
                alt={`Carousel image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />

              {/* Navigation Buttons */}
              <button
                onClick={prevImage}
                className="absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white rounded-full p-1.5 lg:p-2 transition z-10"
              >
                <ChevronLeft className="w-4 h-4 lg:w-6 lg:h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white rounded-full p-1.5 lg:p-2 transition z-10"
              >
                <ChevronRight className="w-4 h-4 lg:w-6 lg:h-6" />
              </button>

              {/* Carousel Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {carouselImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition ${
                      index === currentImageIndex ? "bg-white" : "bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Title Section */}
            <div className="text-center">
              <h2 className="text-white text-2xl lg:text-3xl font-bold mb-2">Welcome Back</h2>
              <p className="text-white/80 text-xs lg:text-sm">Sign in to continue your journey</p>
            </div>
          </div>
        </div>

        {/* Right Card - Login Form (Smaller) */}
        <div className="w-full lg:col-span-2 p-4 lg:p-0">
          <div className="bg-blue-900/50 backdrop-blur-md border border-white/30 rounded-3xl p-6 lg:p-8 shadow-2xl">
            {/* Header */}
            <h2 className="text-white text-2xl lg:text-3xl font-bold mb-2 text-balance">Welcome back to your account.</h2>

            {/* Form Title */}
            <h3 className="text-white/80 text-xs font-semibold mb-6 lg:mb-8 uppercase tracking-wider">UX UI Components</h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 lg:space-y-6">
              {/* Email Input */}
              <div>
                <label className="block text-white text-sm font-medium mb-2 lg:mb-3">Email Address</label>
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-white/90 text-gray-900 placeholder-gray-400 rounded-lg px-4 py-2.5 lg:py-3 text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition"
                />
                {errors.email && (
                  <p className="text-red-300 text-xs lg:text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-white text-sm font-medium mb-2 lg:mb-3">Password</label>
                <div className="relative">
                  <input
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters"
                      }
                    })}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="w-full bg-white/90 text-gray-900 placeholder-gray-400 rounded-lg px-4 py-2.5 lg:py-3 text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 transition"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4 lg:w-5 lg:h-5" /> : <Eye className="w-4 h-4 lg:w-5 lg:h-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-300 text-xs lg:text-sm mt-1">{errors.password.message}</p>
                )}
              </div>

              {/* Error Display */}
              {loginMutation.error && (
                <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-3">
                  <p className="text-red-300 text-xs lg:text-sm">
                    {loginMutation.error instanceof Error ? loginMutation.error.message : 'Login failed'}
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loginMutation.isPending}
                className="w-full bg-gradient-to-r from-blue-500 to-orange-400 hover:from-blue-600 hover:to-orange-500 disabled:from-blue-500/50 disabled:to-orange-400/50 text-white font-bold py-2.5 lg:py-3 text-sm lg:text-base rounded-lg transition transform hover:scale-105 disabled:hover:scale-100 flex items-center justify-center gap-2 mt-6 lg:mt-8"
              >
                {loginMutation.isPending ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 lg:w-5 lg:h-5 border-b-2 border-white"></div>
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4 lg:w-5 lg:h-5" />
                    <span>Sign In</span>
                  </>
                )}
              </button>

              {/* Link to register */}
              <p className="text-center text-white/80 text-xs lg:text-sm">
                Don&apos;t have an account?{" "}
                {onSwitch ? (
                  <button
                    type="button"
                    onClick={() => onSwitch('register')}
                    className="text-white font-semibold hover:underline"
                  >
                    Sign up
                  </button>
                ) : (
                  <button
                    type="button" 
                    onClick={() => router.push('/register')}
                    className="text-white font-semibold hover:underline"
                  >
                    Sign up
                  </button>
                )}
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

// Export as default for backward compatibility
export function LoginPage(props: any) {
  return <NewLoginPage {...props} />
}
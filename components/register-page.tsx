"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, LogIn, ChevronLeft, ChevronRight } from "lucide-react"
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { useToast } from '@/components/ui/use-toast'

const carouselImages = [
  "/mountain-sunset-vista.png",
  "/tropical-beach-palms.png",
  "/forest-waterfall-nature.jpg",
  "/desert-sand-dunes-sunset.jpg",
  "/snowy-mountain-peaks.png",
]

export function RegisterPage({ onSwitch }: { onSwitch?: (page: 'login' | 'register') => void }) {
  const [showPassword, setShowPassword] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const { toast } = useToast()

  const router = useRouter()
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

  type FormValues = { email: string; password: string; confirm: string }
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormValues>({ mode: 'onTouched' })

  const mutation = useMutation({
    mutationFn: async (payload: { email: string; password: string }) => {
  const res = await fetch(`${API_BASE}/user/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw body
      }
      return res.json()
    }
  })

  const onSubmit = async (data: FormValues) => {
    try {
      const result = await mutation.mutateAsync({ email: data.email, password: data.password })
      
      // Show success toast
      toast({
        title: "Account Created Successfully! 🎉",
        description: result.message || "You can now log in with your credentials.",
        variant: "default",
      })
      
      // Wait a moment for user to see the toast, then redirect
      setTimeout(() => {
        if (onSwitch) onSwitch('login')
        else router.push('/login')
      }, 2000)
    } catch (err: any) {
      // handled below by reading mutation.error
    }
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length)
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
              <h2 className="text-white text-2xl lg:text-3xl font-bold mb-2">Explore the World</h2>
              <p className="text-white/80 text-xs lg:text-sm">Travel to beautiful destinations with ease</p>
            </div>
          </div>
        </div>

        {/* Right Card - Register Form (Smaller) */}
        <div className="w-full lg:col-span-2 p-4 lg:p-0">
          <div className="bg-blue-900/50 backdrop-blur-md border border-white/30 rounded-3xl p-6 lg:p-8 shadow-2xl">
            {/* Header */}
            <h2 className="text-white text-2xl lg:text-3xl font-bold mb-2 text-balance">Create an account to start your journey.</h2>

            {/* Form Title */}
            <h3 className="text-white/80 text-xs font-semibold mb-6 lg:mb-8 uppercase tracking-wider">UX UI Components</h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 lg:space-y-6">
              {/* Email/Phone Input */}
              <div>
                <label className="block text-white text-sm font-medium mb-2 lg:mb-3">Email / Phone number</label>
                <input
                  type="text"
                  placeholder="Email"
                  {...register('email', { required: 'Email is required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' } })}
                  className="w-full bg-white/90 text-gray-900 placeholder-gray-400 rounded-lg px-4 py-2.5 lg:py-3 text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition"
                />
                {errors.email ? <p className="text-red-300 text-xs lg:text-sm mt-1">{errors.email.message}</p> : null}
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-white text-sm font-medium mb-2 lg:mb-3">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
                    className="w-full bg-white/90 text-gray-900 placeholder-gray-400 rounded-lg px-4 py-2.5 lg:py-3 text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 transition"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4 lg:w-5 lg:h-5" /> : <Eye className="w-4 h-4 lg:w-5 lg:h-5" />}
                  </button>
                  {errors.password ? <p className="text-red-300 text-xs lg:text-sm mt-1">{errors.password.message}</p> : null}
                </div>
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2 lg:mb-3">Confirm password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    {...register('confirm', { required: 'Please confirm password', validate: (val) => val === watch('password') || 'Passwords do not match' })}
                    className="w-full bg-white/90 text-gray-900 placeholder-gray-400 rounded-lg px-4 py-2.5 lg:py-3 text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition pr-12"
                  />
                {errors.confirm ? <p className="text-red-300 text-xs lg:text-sm mt-1">{errors.confirm.message}</p> : null}
                </div>
              </div>

              {/* Create Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-orange-400 hover:from-blue-600 hover:to-orange-500 text-white font-bold py-2.5 lg:py-3 text-sm lg:text-base rounded-lg transition transform hover:scale-105 flex items-center justify-center gap-2 mt-6 lg:mt-8"
              >
                <LogIn className="w-4 h-4 lg:w-5 lg:h-5" />
                Create account
              </button>

              {mutation.status === 'error' ? (
                <div className="text-center text-red-300 mt-3 text-xs lg:text-sm">
                  {Array.isArray((mutation.error as any)?.errors) ? ((mutation.error as any).errors.map((e: any) => e.message).join(', ')) : ((mutation.error as any).error || 'Registration failed')}
                </div>
              ) : null}

              {/* Link to login */}
              <p className="text-center text-white/80 text-xs lg:text-sm">
                Already have an account?{' '}
                {onSwitch ? (
                  <button type="button" onClick={() => onSwitch('login')} className="text-white font-semibold hover:underline">
                    Log in
                  </button>
                ) : (
                  <button type="button" onClick={() => router.push('/login')} className="text-white font-semibold hover:underline">
                    Log in
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

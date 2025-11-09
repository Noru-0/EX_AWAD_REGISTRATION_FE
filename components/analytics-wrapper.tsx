"use client"

import { useEffect, useState } from 'react'
import { Analytics } from '@vercel/analytics/next'

export function AnalyticsWrapper() {
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    // Only render analytics in production
    const isProduction = process.env.NEXT_PUBLIC_ENVIRONMENT === 'production' || 
                         process.env.NODE_ENV === 'production'
    setShouldRender(isProduction)
  }, [])

  if (!shouldRender) {
    return null
  }

  return <Analytics />
}
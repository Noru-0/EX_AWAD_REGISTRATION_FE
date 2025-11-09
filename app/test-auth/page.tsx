"use client"

import { useState } from 'react'

export default function TestAuth() {
  const [result, setResult] = useState('')
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

  const testAuth = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/me`, {
        credentials: 'include',
      })
      
      const data = await res.text()
      setResult(`Status: ${res.status}\nResponse: ${data}`)
    } catch (e: any) {
      setResult(`Error: ${e.message}`)
    }
  }

  return (
    <div className="p-4">
      <h1>Auth Test</h1>
      <button onClick={testAuth} className="bg-blue-500 text-white p-2 rounded">
        Test Auth
      </button>
      <pre className="mt-4 p-2 bg-gray-100 rounded">
        {result}
      </pre>
    </div>
  )
}
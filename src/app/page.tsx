'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export default function Home() {
  const [message, setMessage] = useState<string>('')
  const [health, setHealth] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Test main endpoint
        const response = await axios.get(`${API_BASE_URL}/`)
        setMessage(response.data.message)
        
        // Test health endpoint
        const healthResponse = await axios.get(`${API_BASE_URL}/api/health`)
        setHealth(healthResponse.data)
      } catch (error) {
        console.error('Error fetching data:', error)
        setMessage('Error connecting to backend')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Full Stack App
        </h1>
        
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg mb-6">
          <h2 className="text-xl mb-4">Backend Connection:</h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div>
              <p className="text-green-600 dark:text-green-400 mb-2">{message}</p>
              {health && (
                <div className="text-sm">
                  <p>Status: <span className="text-blue-600">{health.status}</span></p>
                  <p>Environment: <span className="text-purple-600">{health.environment}</span></p>
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="text-center text-sm text-gray-600">
          <p>API URL: {API_BASE_URL}</p>
        </div>
      </div>
    </main>
  )
}
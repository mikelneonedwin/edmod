'use client'

import { useEffect, useState } from 'react'
import { getSession } from '@/lib/get-session'

export default function ExampleComponent() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    async function fetchSession() {
      const userSession = await getSession()
      setSession(userSession)
    }
    fetchSession()
  }, [])

  if (!session) return <div>Loading...</div>

  return <div>Welcome, {session.user.name}!</div>
}


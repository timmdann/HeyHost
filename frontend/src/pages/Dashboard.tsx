import { useEffect, useState } from 'react'

interface User {
  firstName: string
  lastName: string
  email: string
}

export function Dashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token')

      if (!token) {
        setError('No authorization token')
        setLoading(false)
        return
      }

      try {
        const res = await fetch('https://heyhost-backend.onrender.com/api/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!res.ok) throw new Error('Data loading error')

        const data = await res.json()
        setUser(data)
      } catch (err) {
        setError('Error loading user')
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  if (loading) return <div className="p-4">Loading...</div>
  if (error) return <div className="p-4 text-red-500">{error}</div>
  if (!user) return <div className="p-4">User not found</div>

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user.firstName}!</h1>
      <div className="space-y-2 text-lg">
        <p><strong>Name:</strong> {user.firstName}</p>
        <p><strong>Last name:</strong> {user.lastName}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
    </div>
  )
}

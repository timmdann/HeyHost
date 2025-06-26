import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const res = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (res.status === 401) {
        setError('Неверный email или пароль')
        return
      }

      if (!res.ok) throw new Error('Ошибка сервера')

      const data = await res.json()
      localStorage.setItem('token', data.token)
      navigate('/dashboard')
    } catch (err) {
      console.error('Login error:', err)
      setError('Ошибка входа')
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white">
      <Card className="w-full max-w-sm bg-neutral-100 border border-neutral-200 shadow-md">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-neutral-950 text-left mb-2">Login to your account</CardTitle>
              <CardDescription className="text-neutral-700 text-left">
                Enter your email below to login to your account
              </CardDescription>
            </div>
            <CardAction>
              <Button variant="link" onClick={() => navigate('/register')}>
                Sign Up
              </Button>
            </CardAction>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-neutral-700">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password" className="text-neutral-700">Password</Label>
                <a
                  href="#"
                  className="ml-auto text-sm text-white hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}
          </form>
        </CardContent>

        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full" form="login-form">
            Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

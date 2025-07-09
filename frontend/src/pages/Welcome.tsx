import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

export function Welcome() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-6 p-8 border rounded-lg shadow-md max-w-sm text-center">
        <img src="/logo.png" alt="HeyHost Logo" className="h-32 w-60" />
        <p className="text-muted-foreground">
          Please choose an option to get started
        </p>
        <div className="flex flex-col gap-3 w-full">
          <Button asChild className="w-full text-white" >
            <Link to="/login">Login</Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link to="/register">Sign Up</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

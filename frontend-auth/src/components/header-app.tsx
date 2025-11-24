import { LogOut } from 'lucide-react'
import { Button } from './ui/button'
import { useNavigate } from 'react-router'
import { ModeToggle } from './mode-toggle'

export function HeaderApp() {
  const navigate = useNavigate()

  function handleSignOutFn() {
    localStorage.removeItem('token')
    navigate('/sign-in', { replace: true })
  }

  return (
    <div className="flex h-20 items-center justify-between px-10 md:px-20">
      <h1 className="text-4xl tracking-tighter">AUTH</h1>

      <div className="flex items-center gap-5">
        <ModeToggle />

        <Button
          asChild
          className="bg-red-600/80 hover:bg-red-500"
          onClick={() => handleSignOutFn()}
        >
          <button>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sair</span>
          </button>
        </Button>
      </div>
    </div>
  )
}

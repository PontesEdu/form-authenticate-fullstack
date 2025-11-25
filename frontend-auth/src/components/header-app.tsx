import { LogOut } from 'lucide-react'
import { Button } from './ui/button'
import { useNavigate } from 'react-router'
import { ModeToggle } from './mode-toggle'
import { signOut } from '@/api/sign-out'
import { useMutation } from '@tanstack/react-query'
import { queryClient } from '@/lib/react-query'
import { useAuth } from '@/context/authProvider'

export function HeaderApp() {
  const navigate = useNavigate()
  const { setToken } = useAuth()

  const { mutateAsync: signOutFn } = useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      // 1. remove access token da memória
      setToken(null)

      // 2. limpa cache do React Query
      queryClient.clear()
      navigate('/sign-in', { replace: true })
    },
  })

  return (
    <div className="flex h-20 items-center justify-between px-10 md:px-20">
      <h1 className="text-4xl tracking-tighter">AUTH</h1>

      <div className="flex items-center gap-5">
        <ModeToggle />

        <Button
          asChild
          className="bg-red-600/80 hover:bg-red-500"
          onClick={() => signOutFn()}
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

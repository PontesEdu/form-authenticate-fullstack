import { getProfile } from '@/api/profile'
import { useQuery } from '@tanstack/react-query'

export function Dashboard() {
  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
  })

  return (
    <div className="flex justify-center p-10">
      <h1 className="text-3xl">
        Obrigado {profile?.user.name} por fazer a Autenticação
      </h1>
      <p></p>
    </div>
  )
}

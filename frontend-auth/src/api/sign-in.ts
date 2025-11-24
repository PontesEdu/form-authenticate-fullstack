import { api } from '@/lib/axios'

interface SignInProps {
  email: string
  password: string
}

export async function signIn({ email, password }: SignInProps) {
  const res = await api.post('/authenticate', { email, password })
  return res.data // <- retorna o token
}

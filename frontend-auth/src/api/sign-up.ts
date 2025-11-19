import { api } from '@/lib/axios'

interface SignInProps {
  email: string
  password: string
}

export async function signIn({ email, password }: SignInProps) {
  await api.post('/authenticate', { email, password })
}

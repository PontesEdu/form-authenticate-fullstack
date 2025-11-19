import { api } from '@/lib/axios'

interface RegisterUserProps {
  name: string
  email: string
  password: string
}

export async function registerUser({
  name,
  email,
  password,
}: RegisterUserProps) {
  await api.post('/users', { name, email, password })
}

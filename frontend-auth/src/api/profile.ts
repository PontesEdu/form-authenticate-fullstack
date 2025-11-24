import { api } from '@/lib/axios'

interface GetProfileResponse {
  user: {
    name: string
    id: string
    email: string
    password_hash: string
    created_at: Date
  }
}

export async function getProfile() {
  const response = await api.get<GetProfileResponse>('/profile')

  return response.data
}

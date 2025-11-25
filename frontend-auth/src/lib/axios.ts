import { useAuth } from '@/context/authProvider'
import { env } from '@/env'
import axios from 'axios'

export const api = axios.create({
  baseURL: env.VITE_API_URL,
  withCredentials: true,
})

// if (env.VITE_ENABLE_API_DELAY) {
//   api.interceptors.request.use(async (config) => {
//     await new Promise((resolve) => setTimeout(resolve, 2000))
//     return config
//   })
// }

// LOCALSTORAGE
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token')

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`
//   }

//   return config
// })

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status

    if (status === 401) {
      try {
        const refreshResponse = await api.patch('/token/refresh', null, {
          withCredentials: true,
        })

        const newToken = refreshResponse.data.token

        const { setToken } = useAuth()

        // salva em memória
        setToken(newToken)

        // repete a requisição com o novo token
        error.config.headers.Authorization = `Bearer ${newToken}`
        return api.request(error.config)
      } catch {
        return Promise.reject(error)
      }
    }

    return Promise.reject(error)
  },
)

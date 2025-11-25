// loaders/authLoader.js

// LOCALSTORAGE
// import { redirect } from 'react-router'

// export async function authLoader() {
//   const token = localStorage.getItem('token')

//   if (!token) {
//     throw redirect('/sign-in')
//   }

//   const res = await fetch('http://localhost:3333/profile', {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   })

//   if (!res.ok) {
//     throw redirect('/sign-in')
//   }

//   return res.json()
// }

import { getProfile } from '@/api/profile'
import { redirect } from 'react-router'

export async function authLoader() {
  try {
    await getProfile() // se passar → autenticado
    return null
  } catch {
    return redirect('/sign-in')
  }
}

import { HeaderAuth } from '@/components/header-auth'
import { Outlet } from 'react-router'

export function AuthLayout() {
  return (
    <div className="min-h-screen antialiased">
      <HeaderAuth />

      <div className="mt-10">
        <Outlet />
      </div>
    </div>
  )
}

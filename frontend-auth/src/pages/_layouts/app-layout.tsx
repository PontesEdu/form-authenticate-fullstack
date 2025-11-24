import { HeaderApp } from '@/components/header-app'
import { Outlet } from 'react-router'

export function AppLayout() {
  return (
    <div className="min-h-screen antialiased">
      <HeaderApp />

      <div className="mt-10">
        <Outlet />
      </div>
    </div>
  )
}

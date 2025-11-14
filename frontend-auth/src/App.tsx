import { RouterProvider } from 'react-router'
import { router } from './routes'
import { ThemeProvider } from './components/theme-provider'

export function App() {
  return (
    <>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  )
}

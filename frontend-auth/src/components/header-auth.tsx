import { Link } from 'react-router'
import { Button } from './ui/button'
import { ModeToggle } from './mode-toggle'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import { Menu } from 'lucide-react'

export function HeaderAuth() {
  return (
    <div className="flex h-20 items-center justify-between px-10 md:px-20">
      <h1 className="text-4xl tracking-tighter">AUTH</h1>

      <div className="hidden items-center gap-5 md:flex">
        <ModeToggle />

        <Button asChild variant="default" size="sm">
          <Link to="/sign-up">Sign up</Link>
        </Button>

        <Button asChild variant="ghost" size="sm">
          <Link to="/sign-in">Sign in</Link>
        </Button>
      </div>

      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Menu className="h-7 w-7" />
          </SheetTrigger>

          <SheetContent side="right" className="flex flex-col gap-6 p-6">
            <ModeToggle />

            <Button asChild variant="default" size="sm" className="w-full">
              <Link to="/sign-up">Sign up</Link>
            </Button>

            <Button asChild variant="ghost" size="sm" className="w-full">
              <Link to="/sign-in">Sign in</Link>
            </Button>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}

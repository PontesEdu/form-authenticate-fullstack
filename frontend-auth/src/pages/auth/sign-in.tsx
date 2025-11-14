import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router'
import z from 'zod'

const signUpForm = z.object({
  email: z.email(),
  password: z.string(),
})

type SignUpForm = z.infer<typeof signUpForm>

export function SignIn() {
  const [searchParams] = useSearchParams()

  const { register, handleSubmit } = useForm<SignUpForm>({
    resolver: zodResolver(signUpForm),
    defaultValues: {
      email: searchParams.get('email') ?? '',
    },
  })

  async function handleSignIn(data: SignUpForm) {
    console.log(data)
  }

  return (
    <div className="p-5">
      <div className="flex w-full flex-col items-center justify-center gap-5">
        <div className="flex flex-col gap-1 text-center">
          <h1 className="text-3xl font-semibold tracking-tight">
            Acessar painel
          </h1>

          <p className="text-muted-foreground text-sm">
            Acompanhe suas negocios pelo painel do parceiro!
          </p>
        </div>

        <div
          onSubmit={handleSubmit(handleSignIn)}
          className="w-full rounded-xl border-2 p-5 shadow-xl sm:w-[350px]"
        >
          <form className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail:</Label>
              <Input
                type="email"
                id="email"
                placeholder="Digite seu e-mail"
                className="shadow-md"
                required
                {...register('email')}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">senha:</Label>
              <Input
                type="password"
                id="password"
                placeholder="digite sua senha"
                className="shadow-md"
                required
                {...register('password')}
              />
            </div>
            <Button className="w-full" type="submit">
              Acessar Painel
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

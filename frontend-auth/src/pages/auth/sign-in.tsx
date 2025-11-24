import { signIn } from '@/api/sign-in'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router'
import { toast } from 'sonner'
import z from 'zod'

const signUpForm = z.object({
  email: z.email(),
  password: z.string(),
})

type SignUpForm = z.infer<typeof signUpForm>

export function SignIn() {
  const [searchParams] = useSearchParams()

  const navigate = useNavigate()

  const { register, handleSubmit } = useForm<SignUpForm>({
    resolver: zodResolver(signUpForm),
    defaultValues: {
      email: searchParams.get('email') ?? '',
    },
  })

  const { mutateAsync: authenticate } = useMutation({
    mutationFn: signIn,
  })

  async function handleSignIn(data: SignUpForm) {
    try {
      const result = await authenticate({
        email: data.email,
        password: data.password,
      })

      // SALVAR TOKEN
      localStorage.setItem('token', result.token)

      toast.success('autenticado com sucesso!')
      navigate('/')
    } catch {
      toast.error('Credenciais inválidas.')
    }
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

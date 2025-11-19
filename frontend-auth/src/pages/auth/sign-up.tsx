import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import z from 'zod'
import { useNavigate } from 'react-router'
import { useMutation } from '@tanstack/react-query'
import { registerUser } from '@/api/register-user'
import { toast } from 'sonner'

const signUpForm = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string().min(6),
})

type SignUpForm = z.infer<typeof signUpForm>

export function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpForm),
  })

  const navigate = useNavigate()

  const { mutateAsync: RegisterUserFn } = useMutation({
    mutationFn: registerUser,
  })

  async function handleSignUp(data: SignUpForm) {
    try {
      await RegisterUserFn({
        name: data.name,
        email: data.email,
        password: data.password,
      })

      toast.success('conta criada com sucesso!', {
        action: {
          label: 'Entrar',
          onClick: () => navigate(`/sign-in?email=${data.email}`),
        },
      })
    } catch {
      toast.error('falha ao fazer cadastro')
    }
  }

  return (
    <div className="p-5">
      <div className="flex w-full flex-col items-center justify-center gap-5">
        <div className="flex flex-col gap-1 text-center">
          <h1 className="text-3xl font-semibold tracking-tight">
            Criar conta grátis
          </h1>

          <p className="text-muted-foreground text-sm">
            Seja um parceiro e começe suas vendas!
          </p>
        </div>

        <div className="w-full rounded-xl border-2 p-7 shadow-xl sm:w-[350px]">
          <form className="space-y-5" onSubmit={handleSubmit(handleSignUp)}>
            <div className="space-y-2">
              <Label htmlFor="name">Nome:</Label>
              <Input
                type="text"
                id="name"
                placeholder="digite seu nome"
                className="shadow-md"
                required
                {...register('name')}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail:</Label>
              <Input
                type="email"
                id="email"
                placeholder="digite seu e-mail"
                className="shadow-md"
                required
                {...register('email')}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">senha:</Label>
              <Input
                type="password"
                id="password"
                placeholder="digite sua senha"
                className="shadow-md"
                required
                {...register('password')}
              />
            </div>
            <Button className="w-full" type="submit" disabled={isSubmitting}>
              Acessar Painel
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

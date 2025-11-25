import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { PrismaUsersRepository } from '../../repositories/prisma/prisma-users-repository.js'
import { AuthenticateUseCase } from '@/usecase/authenticate.js'

export async function authenticateController(
  req: FastifyRequest,
  res: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(req.body)

  try {
    const authenticateUseCase = new AuthenticateUseCase(
      new PrismaUsersRepository(),
    )

    const { user } = await authenticateUseCase.execute({ email, password })

    const token = await res.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
        },
      },
    )

    const refreshToken = await res.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
          expiresIn: '7d',
        },
      },
    )

    return await res
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true, // o front não vai conseguir ler o cookie
        sameSite: true, // so vai ser lido se estiver no mesmo site
        httpOnly: true, // so o back-end vai poder acessar
      })
      .status(200)
      .send({ token })
  } catch (error) {
    return await res.status(401).send()
  }
}

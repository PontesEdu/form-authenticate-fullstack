import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { PrismaUsersRepository } from '../../repositories/prisma/prisma-users-repository.js'
import { RegisterUseCase } from '@/usecase/register.js'

export async function registerController(
  req: FastifyRequest,
  res: FastifyReply,
) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(req.body)

  try {
    const registersUseCase = new RegisterUseCase(new PrismaUsersRepository())

    await registersUseCase.execute({ name, email, password })
  } catch (error) {
    return res.status(409).send()
  }

  await res.status(201).send()
}

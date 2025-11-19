import type { FastifyReply, FastifyRequest } from 'fastify'
import { PrismaUsersRepository } from '../../repositories/prisma/prisma-users-repository.js'
import { ProfileUseCase } from '@/usecase/profile.js'

export async function profileController(
  req: FastifyRequest,
  res: FastifyReply,
) {
  const profileUseCase = new ProfileUseCase(new PrismaUsersRepository())

  const { user } = await profileUseCase.execute({ userId: req.user.sub })

  await res.status(200).send({
    user: {
      ...user,
      password_hash: undefined,
    },
  })
}

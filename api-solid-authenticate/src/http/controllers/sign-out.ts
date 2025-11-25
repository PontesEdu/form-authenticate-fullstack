import type { FastifyReply, FastifyRequest } from 'fastify'

export async function signOut(req: FastifyRequest, res: FastifyReply) {
  res.clearCookie('refreshToken', {
    path: '/', // o mesmo path usado no setCookie
  })

  return res.status(200).send({ message: 'Logged out' })
}

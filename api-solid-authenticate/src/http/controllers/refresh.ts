import type { FastifyReply, FastifyRequest } from 'fastify'

export async function refresh(req: FastifyRequest, res: FastifyReply) {
  await req.jwtVerify({ onlyCookie: true }) // ele só vai olhar no cookie se tem algum token se passar dessa linha e porque e valido

  const token = await res.jwtSign(
    {},
    {
      sign: {
        sub: req.user.sub, // aqui e pego o id pelo sub por que se passou da validação e por que tem salvo
      },
    },
  )

  const refreshToken = await res.jwtSign(
    {},
    {
      sign: {
        sub: req.user.sub,
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
}

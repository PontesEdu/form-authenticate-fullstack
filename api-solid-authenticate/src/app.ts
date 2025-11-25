import fastify from 'fastify'
import { appRoutes } from './http/routes.js'
import fastifyJwt from '@fastify/jwt'
import { env } from './env/index.js'
import cors from '@fastify/cors'
import fastifyCookie from '@fastify/cookie'

export const app = fastify()

app.register(fastifyCookie)

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    // para o req.jwtVerify({ onlyCookie: true }) verificar se tem no cookie
    cookieName: 'refreshToken', // estou juntando o cookie que salvei (setCookie)
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})

await app.register(cors, {
  origin: 'http://localhost:5173',
  credentials: true, // 👈 necessário também aqui
})

app.register(appRoutes)

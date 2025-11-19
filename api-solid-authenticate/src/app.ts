import fastify from 'fastify'
import { appRoutes } from './http/routes.js'
import fastifyJwt from '@fastify/jwt'
import { env } from './env/index.js'
import cors from '@fastify/cors'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

await app.register(cors, {
  origin: 'http://localhost:5173',
  credentials: true, // 👈 necessário também aqui
})

app.register(appRoutes)

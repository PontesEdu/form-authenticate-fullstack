import type { FastifyInstance } from 'fastify'
import { registerController } from './controllers/register-controller.js'
import { authenticateController } from './controllers/authenticate-controller.js'
import { profileController } from './controllers/profile-controller.js'
import { verifyJWT } from '../middlewares/verify-jwt.js'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', registerController)
  app.post('/authenticate', authenticateController)

  /** Authenticate */
  app.get('/profile', { onRequest: [verifyJWT] }, profileController)
}

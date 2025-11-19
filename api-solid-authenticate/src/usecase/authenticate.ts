import { compare } from 'bcryptjs'
import type { UsersRepository } from '../repositories/users-repository.js'
import type { User } from '@prisma/client'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUseCaseResponse {
  user: User
}

export class AuthenticateUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new Error('credentials not existe.')
    }

    const compareToPassword = await compare(password, user.password_hash)

    if (!compareToPassword) {
      throw new Error('credentials not existe.')
    }

    return {
      user,
    }
  }
}

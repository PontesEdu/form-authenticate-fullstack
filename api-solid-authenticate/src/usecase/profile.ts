import type { User } from '@prisma/client'
import type { UsersRepository } from '../repositories/users-repository.js'

interface ProfileUseCaseRequest {
  userId: string
}

interface ProfileUseCaseResponse {
  user: User
}

export class ProfileUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute({
    userId,
  }: ProfileUseCaseRequest): Promise<ProfileUseCaseResponse> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new Error('credentials not existe')
    }

    return {
      user,
    }
  }
}

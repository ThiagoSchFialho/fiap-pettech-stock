import { User } from '@/entities/user.entity'
import { IUserRepository } from '@/repositories/user.repostitory.interface'

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async handler(user: User): Promise<User | undefined> {
    return this.userRepository.create(user)
  }
}

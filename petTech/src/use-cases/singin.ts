import { IUserRepository } from '@/repositories/user.repostitory.interface'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

export class SinginUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async handler(username: string) {
    const user = await this.userRepository.findByUserName(username)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    return user
  }
}

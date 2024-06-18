import { UserRepository } from '@/repositories/pg/user.repository'
import { SinginUseCase } from '../singin'

export function makeSinginUseCase() {
  const userRepository = new UserRepository()

  const singinUseCase = new SinginUseCase(userRepository)

  return singinUseCase
}

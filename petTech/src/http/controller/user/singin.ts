import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { makeSinginUseCase } from '@/use-cases/factory/make-singin-use-case'
import { compare } from 'bcryptjs'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function singin(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    username: z.string(),
    password: z.string(),
  })

  const { username, password } = registerBodySchema.parse(request.body)

  const singinUseCase = makeSinginUseCase()
  const user = await singinUseCase.handler(username)

  const doestPasswordMath = await compare(password, user.password)

  if (!doestPasswordMath) {
    throw new InvalidCredentialsError()
  }

  const token = await reply.jwtSign({ username })

  return reply.status(200).send(token)
}

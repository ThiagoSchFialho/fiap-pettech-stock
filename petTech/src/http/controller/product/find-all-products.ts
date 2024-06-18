import { makeFindAllProductsUseCase } from '@/use-cases/factory/make-find-all-products-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function findAllProduct(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerQuerySchema = z.object({
    page: z.coerce.number().default(1),
    limit: z.coerce.number().default(10),
  })

  const { page, limit } = registerQuerySchema.parse(request.query)

  const findAllProductsUseCase = makeFindAllProductsUseCase()
  const product = await findAllProductsUseCase.handler(page, limit)

  return reply.status(200).send(product)
}

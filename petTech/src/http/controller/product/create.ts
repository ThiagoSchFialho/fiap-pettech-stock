import { makeCreateProductUseCase } from '@/use-cases/factory/make-create-product-use-case'
import { createProductInStock } from '@/utils/client-http'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const registeBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    image_url: z.string(),
    price: z.coerce.number(),
    categories: z
      .array(
        z.object({
          id: z.coerce.number().optional(),
          name: z.string(),
        }),
      )
      .optional(),
  })

  const { name, description, image_url, price, categories } =
    registeBodySchema.parse(request.body)

  const createProductUseCase = makeCreateProductUseCase()

  const product = await createProductUseCase.handler({
    name,
    description,
    image_url,
    price,
    categories,
  })

  await createProductInStock(
    {
      name: product.name,
      quantity: 0,
      relationalId: String(product.id),
    },
    request.headers.authorization as string,
  )

  return reply.status(200).send(product)
}

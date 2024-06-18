import { FastifyInstance } from 'fastify'
import { create } from './create'
import { update } from './update'
import { findAllProduct } from './find-all-products'
import { deleteProduct } from './delete'
import { findProduct } from './find-product'

export async function productRoutes(app: FastifyInstance) {
  app.get('/product', findAllProduct)
  app.get('/product/:id', findProduct)
  app.post('/product', create)
  app.put('/product/:id', update)
  app.delete('/product/:id', deleteProduct)
}

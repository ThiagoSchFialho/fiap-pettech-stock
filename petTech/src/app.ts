import 'reflect-metadata'
import '@/lib/typeorm/typeorm'
import fastify from 'fastify'
import { personRoutes } from '@/http/controller/person/routes'
import { userRoutes } from './http/controller/user/routes'
import { globalErrorHandler } from './utils/global-error-handler'
import { addressRoutes } from './http/controller/address/routes'
import { productRoutes } from './http/controller/product/routes'
import { categoryRoutes } from './http/controller/category/routes'
import fastifyJwt from '@fastify/jwt'
import { env } from './env'
import { validateJwt } from './http/middlewares/jwt-validate'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: { expiresIn: '10m' }, // tempo para o token expirar depois que o usuário fez o sign in
})

app.addHook('onRequest', validateJwt)

app.register(personRoutes)
app.register(userRoutes)
app.register(addressRoutes)
app.register(productRoutes)
app.register(categoryRoutes)

app.setErrorHandler(globalErrorHandler)

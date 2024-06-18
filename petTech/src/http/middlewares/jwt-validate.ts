import { FastifyReply, FastifyRequest } from 'fastify'

export async function validateJwt(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const routesFreeList = ['POST-/user', 'POST-/user/signin']
    const validadeRoute = `${request.method}-${request.routerPath}`

    if (routesFreeList.includes(validadeRoute)) return // se a rota for a de cadastro de usuario (unica que não precisa de autenticação nesse caso)

    await request.jwtVerify()
  } catch (error) {
    reply.status(401).send({ message: 'Unauthorized' })
  }
}

import { FastifyReply, FastifyRequest } from 'fastify'

export async function checkSessionIdExists(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const userSessionId = request.cookies.userSessionId

  if (!userSessionId) {
    return reply.status(401).send({
      error: 'Unauthorized',
    })
  }
}

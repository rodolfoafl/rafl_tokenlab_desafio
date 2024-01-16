import { FastifyInstance } from 'fastify'
import { z } from 'zod'

export async function authenticationRoutes(app: FastifyInstance) {
  app.post('/signin', async (req, reply) => {
    const createSigninBodySchema = z.object({
      email: z.string().email(),
      password: z.string().min(5),
    })

    const { email, password } = createSigninBodySchema.parse(req.body)
    console.log(email, password)

    // TODO: find user by email & "verify" password

    return reply.status(201).send()
  })

  app.post('/signup', async (req, reply) => {
    const createSignupBodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(5),
    })

    const { name, email, password } = createSignupBodySchema.parse(req.body)
    console.log(name, email, password)

    // TODO: create user

    return reply.status(201).send()
  })
}

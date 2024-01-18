import crypto from 'node:crypto'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../database'

export async function authenticationRoutes(app: FastifyInstance) {
  // REMOVE: dev verification only
  app.get('/users', async () => {
    const users = await knex('users').select()

    return {
      users,
    }
  })

  app.post('/signin', async (req, reply) => {
    const createSigninBodySchema = z.object({
      email: z.string().email(),
      password: z.string().min(5),
    })

    const { email, password } = createSigninBodySchema.parse(req.body)

    // verify if user is already logged in
    const { userSessionId } = req.cookies
    if (userSessionId) {
      return reply.status(409).send()
    }

    // verify if user exists
    const user = await knex('users')
      .where({
        email,
        password,
      })
      .first()

    if (!user) {
      return reply.status(404).send()
    }

    // set user session cookie
    reply.cookie('userSessionId', user.id, {
      path: '/',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    })

    return reply.status(200).send()
  })

  app.post('/signup', async (req, reply) => {
    const createSignupBodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(5),
    })

    const { name, email, password } = createSignupBodySchema.parse(req.body)

    // verify if user already exists
    const existingUser = await knex('users').where({ email }).first()
    if (existingUser) {
      return reply.status(409).send()
    }

    // create user session id & set cookie
    const userSessionId = crypto.randomUUID()
    reply.cookie('userSessionId', userSessionId, {
      path: '/',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    })

    // insert user into database
    await knex('users').insert({
      id: userSessionId,
      name,
      email,
      password,
    })

    return reply.status(201).send()
  })
}

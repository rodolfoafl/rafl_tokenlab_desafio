import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { checkSessionIdExists } from '../middlewares/check-session-id-exists'

import crypto from 'node:crypto'
import { knex } from '../database'

export async function eventsRoutes(app: FastifyInstance) {
  app.get(
    '/:id',
    { preHandler: [checkSessionIdExists] },
    async (req, reply) => {
      const getEventParamsSchema = z.object({
        id: z.string().uuid(),
      })

      const { id } = getEventParamsSchema.parse(req.params)
      if (!id) {
        return reply.status(400).send()
      }

      const { userSessionId } = req.cookies

      const event = await knex('events')
        .where({ id, userId: userSessionId })
        .first()

      return {
        event,
      }
    },
  )

  app.post('/', { preHandler: [checkSessionIdExists] }, async (req, reply) => {
    const createEventBodySchema = z.object({
      description: z.string(),
      startDate: z.string(),
      endDate: z.string(),
    })

    const { userSessionId } = req.cookies

    const { description, startDate, endDate } = createEventBodySchema.parse(
      req.body,
    )

    const existingEvent = await knex('events')
      .where({
        userId: userSessionId,
        startDate,
        endDate,
      })
      .first()

    if (existingEvent) {
      return reply.status(409).send()
    }

    const id = crypto.randomUUID()

    await knex('events').insert({
      id,
      description,
      startDate,
      endDate,
      userId: userSessionId,
    })

    return reply.status(201).send({ id })
  })

  app.put(
    '/:id',
    { preHandler: [checkSessionIdExists] },
    async (req, reply) => {
      const getEventParamsSchema = z.object({
        id: z.string().uuid(),
      })

      const { id } = getEventParamsSchema.parse(req.params)

      if (!id || !req.body || !Object.keys(req.body).length) {
        return reply.status(400).send()
      }

      const { userSessionId } = req.cookies

      const event = await knex('events')
        .where({ id, userId: userSessionId })
        .first()

      if (!event) {
        return reply.status(404).send()
      }

      await knex('events').update(req.body).where({ id, userId: userSessionId })

      return reply.status(200).send()
    },
  )

  app.delete(
    '/:id',
    { preHandler: [checkSessionIdExists] },
    async (req, reply) => {
      const getEventParamsSchema = z.object({
        id: z.string().uuid(),
      })

      const { userSessionId } = req.cookies

      const { id } = getEventParamsSchema.parse(req.params)

      const event = await knex('events')
        .where({ id, userId: userSessionId })
        .first()

      if (!event) {
        return reply.status(404).send()
      }

      await knex('events').where({ id, userId: userSessionId }).delete()

      return reply.status(200).send()
    },
  )

  app.get('/', { preHandler: [checkSessionIdExists] }, async (req) => {
    const { userSessionId } = req.cookies

    const events = await knex('events').where({ userId: userSessionId })

    return {
      events,
    }
  })
}
